/**
 * The payout ledger for Play-route sales.
 *
 * On the Play route Google collects the money and pays it to the platform, so the seller is paid by a
 * Stripe Connect transfer from the platform balance once the sale is past its refund window. Every
 * verified Play sale becomes one row here; the row's money moves in two parts:
 *
 * - `main`: the seller share less the holdback, due `PLAY_PAYOUT_HOLD_HOURS` after purchase.
 * - `holdback`: `PLAY_HOLDBACK_BPS` of the share, due `PLAY_HOLDBACK_DAYS` after purchase.
 *
 * A void (refund, chargeback) found by the Voided Purchases sweep is taken from unreleased holdback
 * first (this sale's, then the seller's other sales'), then from unpaid parts, then by reversing paid
 * transfers; what a reversal cannot recover becomes a debit netted against the seller's next payout.
 *
 * Every state change writes a `ledger_events` row, so the history of each sale is auditable. All
 * amounts are integers: buyer-currency micros for what Google reported, payout-currency cents for
 * what the seller is paid.
 */

export type SqlLike = { exec(query: string, ...bindings: unknown[]): Iterable<Record<string, unknown>> };

export type PartStatus = "pending" | "processing" | "retry" | "paid" | "cancelled" | "reversed" | "review";
export type Part = "main" | "holdback";

export interface FeeSettings {
  /** Google's service fee on the sale, basis points of the pre-tax amount. */
  googleFeeBps: number;
  /** The web platform fee (PLATFORM_FEE_BPS). */
  platformFeeBps: number;
  /** Added on top for in-app sales (IN_APP_FEE_BPS). */
  inAppFeeBps: number;
  /** Share of each seller payout held back (PLAY_HOLDBACK_BPS). */
  holdbackBps: number;
}

export interface PlaySplit {
  netMicros: number;
  googleFeeMicros: number;
  platformFeeMicros: number;
  sellerShareMicros: number;
}

/**
 * gross (tax-inclusive) − tax = net; seller share = net − Google's fee − (platform + in-app) fee.
 * Both fees are taken on the pre-tax amount; the platform never pays a fee on tax it only collected.
 */
export function splitPlaySale(grossMicros: number, taxMicros: number, fees: FeeSettings): PlaySplit {
  const netMicros = Math.max(0, grossMicros - Math.max(0, taxMicros));
  const googleFeeMicros = Math.round(netMicros * fees.googleFeeBps / 10_000);
  const platformFeeMicros = Math.round(netMicros * (fees.platformFeeBps + fees.inAppFeeBps) / 10_000);
  const sellerShareMicros = Math.max(0, netMicros - googleFeeMicros - platformFeeMicros);
  return { netMicros, googleFeeMicros, platformFeeMicros, sellerShareMicros };
}

/**
 * The seller share in the payout currency (the listing's), in cents.
 *
 * Same currency: exact. Different currency: the seller is paid the same FRACTION of the listing price
 * as the share is of the net (`listingCents × share / net`). That is deterministic and auditable; the
 * platform carries the difference between it and Google's own exchange rate. Undefined when the net
 * is zero, which leaves the row for review rather than paying a made-up amount.
 */
export function payoutCents(
  split: PlaySplit,
  buyerCurrency: string,
  listing: { amountCents: number; currency: string },
): number | undefined {
  if (buyerCurrency.toUpperCase() === listing.currency.toUpperCase()) {
    return Math.floor(split.sellerShareMicros / 10_000);
  }
  if (split.netMicros <= 0) return undefined;
  return Math.floor(listing.amountCents * split.sellerShareMicros / split.netMicros);
}

export function holdbackOf(cents: number, holdbackBps: number): { main: number; holdback: number } {
  const holdback = Math.round(cents * holdbackBps / 10_000);
  return { main: cents - holdback, holdback };
}

export interface SaleInput {
  orderId: string;
  packageName: string;
  purchaseToken: string;
  packageId: string;
  sellerId: string;
  buyerCountry?: string;
  currency: string;
  grossMicros: number;
  taxMicros: number;
  /** Where the amounts came from: `order` (orders.get) or `catalog` (the synced regional price). */
  amountSource: "order" | "catalog";
  split: PlaySplit;
  payoutCurrency: string;
  /** Undefined: not computable, so the row goes to review. */
  payoutCents?: number;
  holdbackBps: number;
  purchasedAt: string;
  holdHours: number;
  holdbackDays: number;
}

export interface SaleRow {
  orderId: string;
  packageName: string;
  purchaseToken: string;
  packageId: string;
  sellerId: string;
  buyerCountry: string | null;
  currency: string;
  grossMicros: number;
  taxMicros: number;
  googleFeeMicros: number;
  platformFeeMicros: number;
  sellerShareMicros: number;
  amountSource: string;
  payoutCurrency: string;
  mainCents: number;
  holdbackCents: number;
  mainDueAt: string;
  holdbackDueAt: string;
  mainStatus: PartStatus;
  holdbackStatus: PartStatus;
  mainTransferId: string | null;
  holdbackTransferId: string | null;
  mainPaidCents: number;
  holdbackPaidCents: number;
  attempts: number;
  nextAttemptAt: string | null;
  voidedAt: string | null;
  purchasedAt: string;
  note: string | null;
}

/** One transfer the payout run should make. `cents` already has the seller's debits netted out. */
export interface PayoutClaim {
  orderId: string;
  part: Part;
  sellerId: string;
  currency: string;
  /** What the part is worth. */
  grossCents: number;
  /** Debit netted against it. */
  debitCents: number;
  /** grossCents − debitCents: what to transfer. Zero: nothing to send, the debit absorbed it. */
  cents: number;
  idempotencyKey: string;
}

/** A paid transfer a void needs (partly) reversed. */
export interface ReversalAction {
  orderId: string;
  part: Part;
  transferId: string;
  cents: number;
}

const HOUR = 3600_000;

export class PlayLedger {
  constructor(private readonly sql: SqlLike) {}

  static migrate(sql: SqlLike): void {
    sql.exec(
      "CREATE TABLE IF NOT EXISTS play_sales (" +
      "order_id TEXT PRIMARY KEY, package_name TEXT NOT NULL, purchase_token TEXT NOT NULL UNIQUE, " +
      "package_id TEXT NOT NULL, seller_id TEXT NOT NULL, buyer_country TEXT, currency TEXT NOT NULL, " +
      "gross_micros INTEGER NOT NULL, tax_micros INTEGER NOT NULL, google_fee_micros INTEGER NOT NULL, " +
      "platform_fee_micros INTEGER NOT NULL, seller_share_micros INTEGER NOT NULL, amount_source TEXT NOT NULL, " +
      "payout_currency TEXT NOT NULL, main_cents INTEGER NOT NULL, holdback_cents INTEGER NOT NULL, " +
      "main_due_at TEXT NOT NULL, holdback_due_at TEXT NOT NULL, " +
      "main_status TEXT NOT NULL, holdback_status TEXT NOT NULL, " +
      "main_transfer_id TEXT, holdback_transfer_id TEXT, " +
      "main_paid_cents INTEGER NOT NULL DEFAULT 0, holdback_paid_cents INTEGER NOT NULL DEFAULT 0, " +
      "main_claimed_cents INTEGER, holdback_claimed_cents INTEGER, main_claimed_debit INTEGER, holdback_claimed_debit INTEGER, " +
      "attempts INTEGER NOT NULL DEFAULT 0, next_attempt_at TEXT, claimed_at TEXT, voided_at TEXT, " +
      "purchased_at TEXT NOT NULL, note TEXT, created_at TEXT NOT NULL)",
    );
    sql.exec("CREATE INDEX IF NOT EXISTS play_sales_seller_idx ON play_sales(seller_id, payout_currency)");
    sql.exec(
      "CREATE TABLE IF NOT EXISTS seller_debits (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, seller_id TEXT NOT NULL, currency TEXT NOT NULL, " +
      "amount_cents INTEGER NOT NULL, settled_cents INTEGER NOT NULL DEFAULT 0, order_id TEXT NOT NULL, " +
      "reason TEXT NOT NULL, created_at TEXT NOT NULL)",
    );
    sql.exec(
      "CREATE TABLE IF NOT EXISTS ledger_events (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT NOT NULL, event TEXT NOT NULL, detail TEXT, at TEXT NOT NULL)",
    );
    sql.exec("CREATE INDEX IF NOT EXISTS ledger_events_order_idx ON ledger_events(order_id, id)");
  }

  private event(orderId: string, event: string, detail: unknown, at = new Date().toISOString()): void {
    this.sql.exec(
      "INSERT INTO ledger_events(order_id,event,detail,at) VALUES(?,?,?,?)",
      orderId, event, detail === undefined ? null : JSON.stringify(detail), at,
    );
  }

  /** Record a verified sale. Idempotent on the order id (and the purchase token): a repeat is a no-op. */
  record(input: SaleInput, now = new Date()): { created: boolean; sale: SaleRow } {
    const existing = this.get(input.orderId) ?? this.byToken(input.purchaseToken);
    if (existing) return { created: false, sale: existing };
    const purchased = new Date(input.purchasedAt).getTime();
    const review = input.payoutCents === undefined;
    const { main, holdback } = holdbackOf(input.payoutCents ?? 0, input.holdbackBps);
    const status: PartStatus = review ? "review" : "pending";
    this.sql.exec(
      "INSERT INTO play_sales(order_id,package_name,purchase_token,package_id,seller_id,buyer_country,currency," +
      "gross_micros,tax_micros,google_fee_micros,platform_fee_micros,seller_share_micros,amount_source," +
      "payout_currency,main_cents,holdback_cents,main_due_at,holdback_due_at,main_status,holdback_status," +
      "purchased_at,note,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      input.orderId, input.packageName, input.purchaseToken, input.packageId, input.sellerId,
      input.buyerCountry ?? null, input.currency.toUpperCase(),
      input.grossMicros, input.taxMicros, input.split.googleFeeMicros, input.split.platformFeeMicros,
      input.split.sellerShareMicros, input.amountSource, input.payoutCurrency.toUpperCase(), main, holdback,
      new Date(purchased + input.holdHours * HOUR).toISOString(),
      new Date(purchased + input.holdbackDays * 24 * HOUR).toISOString(),
      status, status, input.purchasedAt,
      review ? "payout amount could not be computed (currency mismatch with zero net)" : null,
      now.toISOString(),
    );
    this.event(input.orderId, "recorded", { ...input.split, main, holdback, amountSource: input.amountSource });
    return { created: true, sale: this.get(input.orderId)! };
  }

  get(orderId: string): SaleRow | undefined {
    const row = [...this.sql.exec("SELECT * FROM play_sales WHERE order_id=?", orderId)][0];
    return row ? toSale(row) : undefined;
  }

  byToken(purchaseToken: string): SaleRow | undefined {
    const row = [...this.sql.exec("SELECT * FROM play_sales WHERE purchase_token=?", purchaseToken)][0];
    return row ? toSale(row) : undefined;
  }

  /** Outstanding (unsettled) debit for a seller in a currency. */
  debit(sellerId: string, currency: string): number {
    const row = [...this.sql.exec(
      "SELECT COALESCE(SUM(amount_cents - settled_cents),0) AS owed FROM seller_debits WHERE seller_id=? AND currency=?",
      sellerId, currency.toUpperCase(),
    )][0];
    return Number(row?.owed ?? 0);
  }

  /**
   * Claim every part that is due, fixing its amount (debits netted) and marking it `processing`, so a
   * crashed run retries the SAME amount under the SAME idempotency key and Stripe answers with the
   * transfer it already made. A part stuck in `processing` for [staleMinutes] is reclaimed as-is.
   */
  claimDue(now = new Date(), limit = 50, staleMinutes = 10): PayoutClaim[] {
    const nowIso = now.toISOString();
    const stale = new Date(now.getTime() - staleMinutes * 60_000).toISOString();
    const claims: PayoutClaim[] = [];
    for (const part of ["main", "holdback"] as const) {
      const due = [...this.sql.exec(
        `SELECT * FROM play_sales WHERE ${part}_due_at<=? AND (` +
        `(${part}_status IN ('pending','retry') AND (next_attempt_at IS NULL OR next_attempt_at<=?)) OR ` +
        `(${part}_status='processing' AND claimed_at<=?)) ORDER BY ${part}_due_at LIMIT ?`,
        nowIso, nowIso, stale, limit,
      )].map(toSale);
      for (const sale of due) {
        const row = [...this.sql.exec(
          `SELECT ${part}_status AS st, ${part}_claimed_cents AS cc, ${part}_claimed_debit AS cd FROM play_sales WHERE order_id=?`,
          sale.orderId,
        )][0];
        const gross = part === "main" ? sale.mainCents : sale.holdbackCents;
        let debitCents: number;
        if (row.st === "processing" && row.cc !== null && row.cc !== undefined) {
          debitCents = Number(row.cd ?? 0);
        } else {
          debitCents = Math.min(gross, this.debit(sale.sellerId, sale.payoutCurrency));
          this.sql.exec(
            `UPDATE play_sales SET ${part}_status='processing', ${part}_claimed_cents=?, ${part}_claimed_debit=?, claimed_at=? WHERE order_id=?`,
            gross - debitCents, debitCents, nowIso, sale.orderId,
          );
          this.event(sale.orderId, "claimed", { part, gross, debitCents });
        }
        claims.push({
          orderId: sale.orderId,
          part,
          sellerId: sale.sellerId,
          currency: sale.payoutCurrency,
          grossCents: gross,
          debitCents,
          cents: gross - debitCents,
          idempotencyKey: "azp_payout_" + part + "_" + sale.orderId,
        });
      }
    }
    return claims;
  }

  /** A claimed part was transferred ([transferId] undefined when a debit absorbed all of it). */
  markPaid(orderId: string, part: Part, transferId: string | undefined, now = new Date()): void {
    const row = [...this.sql.exec(
      `SELECT seller_id, payout_currency, ${part}_claimed_cents AS cc, ${part}_claimed_debit AS cd, ${part}_status AS st FROM play_sales WHERE order_id=?`,
      orderId,
    )][0];
    if (!row || row.st !== "processing") return;
    this.settleDebit(String(row.seller_id), String(row.payout_currency), Number(row.cd ?? 0));
    this.sql.exec(
      `UPDATE play_sales SET ${part}_status='paid', ${part}_transfer_id=?, ${part}_paid_cents=?, attempts=0, next_attempt_at=NULL WHERE order_id=?`,
      transferId ?? null, Number(row.cc ?? 0), orderId,
    );
    this.event(orderId, "paid", { part, transferId, cents: Number(row.cc ?? 0), debitSettled: Number(row.cd ?? 0) }, now.toISOString());
  }

  /** Stripe could not transfer now (e.g. balance_insufficient): back off and retry. */
  markRetry(orderId: string, part: Part, reason: string, now = new Date()): void {
    const sale = this.get(orderId);
    if (!sale) return;
    const attempts = sale.attempts + 1;
    // 15 min, 30, 1h, 2h … capped at 24h.
    const delay = Math.min(24 * 60, 15 * 2 ** (attempts - 1)) * 60_000;
    this.sql.exec(
      `UPDATE play_sales SET ${part}_status='retry', ${part}_claimed_cents=NULL, ${part}_claimed_debit=NULL, attempts=?, next_attempt_at=? WHERE order_id=?`,
      attempts, new Date(now.getTime() + delay).toISOString(), orderId,
    );
    this.event(orderId, "retry", { part, reason, attempts }, now.toISOString());
  }

  /** Something an operator must look at (no connected account, account not payable). */
  markReview(orderId: string, part: Part, reason: string): void {
    this.sql.exec(
      `UPDATE play_sales SET ${part}_status='review', ${part}_claimed_cents=NULL, ${part}_claimed_debit=NULL, note=? WHERE order_id=?`,
      reason, orderId,
    );
    this.event(orderId, "review", { part, reason });
  }

  /** Put a reviewed part back in the queue. */
  release(orderId: string, part: Part): boolean {
    const sale = this.get(orderId);
    if (!sale || (part === "main" ? sale.mainStatus : sale.holdbackStatus) !== "review" || sale.voidedAt) return false;
    this.sql.exec(`UPDATE play_sales SET ${part}_status='pending', note=NULL, next_attempt_at=NULL WHERE order_id=?`, orderId);
    this.event(orderId, "released", { part });
    return true;
  }

  private settleDebit(sellerId: string, currency: string, cents: number): void {
    let left = cents;
    if (left <= 0) return;
    for (const d of [...this.sql.exec(
      "SELECT id, amount_cents - settled_cents AS owed FROM seller_debits WHERE seller_id=? AND currency=? AND amount_cents > settled_cents ORDER BY id",
      sellerId, currency,
    )]) {
      const take = Math.min(left, Number(d.owed));
      this.sql.exec("UPDATE seller_debits SET settled_cents = settled_cents + ? WHERE id=?", take, d.id);
      left -= take;
      if (left <= 0) break;
    }
  }

  addDebit(sellerId: string, currency: string, cents: number, orderId: string, reason: string): void {
    if (cents <= 0) return;
    this.sql.exec(
      "INSERT INTO seller_debits(seller_id,currency,amount_cents,order_id,reason,created_at) VALUES(?,?,?,?,?,?)",
      sellerId, currency.toUpperCase(), cents, orderId, reason, new Date().toISOString(),
    );
    this.event(orderId, "debit", { sellerId, cents, reason });
  }

  /**
   * Apply a void. Idempotent: a second call for the same order returns no actions.
   *
   * Order of recovery: this sale's unreleased holdback, the seller's other unreleased holdbacks
   * (earliest due first), this sale's unpaid main part, then reversals of this sale's paid transfers.
   * Returns the reversals the caller must make with Stripe; whatever a reversal fails to recover the
   * caller turns into a debit with {@link addDebit}.
   */
  applyVoid(orderId: string, now = new Date()): { found: boolean; newly: boolean; reversals: ReversalAction[] } {
    const sale = this.get(orderId);
    if (!sale) return { found: false, newly: false, reversals: [] };
    if (sale.voidedAt) return { found: true, newly: false, reversals: [] };
    const at = now.toISOString();
    this.sql.exec("UPDATE play_sales SET voided_at=? WHERE order_id=?", at, orderId);

    const unpaid = (s: PartStatus) => s === "pending" || s === "retry" || s === "review";
    // What the seller was owed for this sale and must not keep.
    let owed = sale.mainCents + sale.holdbackCents;

    // 1. This sale's own holdback, if not yet released.
    if (unpaid(sale.holdbackStatus)) {
      owed -= sale.holdbackCents;
      this.sql.exec("UPDATE play_sales SET holdback_status='cancelled' WHERE order_id=?", orderId);
      this.event(orderId, "cancelled", { part: "holdback", cents: sale.holdbackCents }, at);
    }
    // 2. This sale's main part, if not yet paid: nothing left of the sale to pay.
    if (unpaid(sale.mainStatus)) {
      owed -= sale.mainCents;
      this.sql.exec("UPDATE play_sales SET main_status='cancelled' WHERE order_id=?", orderId);
      this.event(orderId, "cancelled", { part: "main", cents: sale.mainCents }, at);
    }
    // 3. The seller's other unreleased holdbacks.
    if (owed > 0) {
      for (const other of [...this.sql.exec(
        "SELECT order_id, holdback_cents FROM play_sales WHERE seller_id=? AND payout_currency=? AND order_id<>? " +
        "AND holdback_status IN ('pending','retry') AND holdback_cents > 0 AND voided_at IS NULL ORDER BY holdback_due_at",
        sale.sellerId, sale.payoutCurrency, orderId,
      )]) {
        const take = Math.min(owed, Number(other.holdback_cents));
        this.sql.exec("UPDATE play_sales SET holdback_cents = holdback_cents - ? WHERE order_id=?", take, other.order_id);
        this.event(String(other.order_id), "holdback_applied", { toOrder: orderId, cents: take }, at);
        this.event(orderId, "recovered_from_holdback", { fromOrder: other.order_id, cents: take }, at);
        owed -= take;
        if (owed <= 0) break;
      }
    }
    // 4. Reverse what was transferred for this sale.
    const reversals: ReversalAction[] = [];
    const fresh = this.get(orderId)!;
    for (const part of ["main", "holdback"] as const) {
      if (owed <= 0) break;
      const status = part === "main" ? fresh.mainStatus : fresh.holdbackStatus;
      const transferId = part === "main" ? fresh.mainTransferId : fresh.holdbackTransferId;
      const paid = part === "main" ? fresh.mainPaidCents : fresh.holdbackPaidCents;
      if (status === "processing") {
        // In flight: whatever lands is clawed back by debit.
        continue;
      }
      if (status !== "paid") continue;
      const cents = Math.min(owed, paid);
      if (transferId && cents > 0) reversals.push({ orderId, part, transferId, cents });
      owed -= cents;
    }
    // Anything still owed (an in-flight transfer, a netted payout with no transfer) is a debit now.
    if (owed > 0) this.addDebit(sale.sellerId, sale.payoutCurrency, owed, orderId, "void");
    this.event(orderId, "voided", { reversals: reversals.map((r) => ({ part: r.part, cents: r.cents })), debited: Math.max(0, owed) }, at);
    return { found: true, newly: true, reversals };
  }

  markReversed(orderId: string, part: Part, reversalId: string, cents: number): void {
    this.sql.exec(`UPDATE play_sales SET ${part}_status='reversed' WHERE order_id=?`, orderId);
    this.event(orderId, "reversed", { part, reversalId, cents });
  }

  list(filter: { status?: string; sellerId?: string; limit?: number } = {}): SaleRow[] {
    const where: string[] = [];
    const args: unknown[] = [];
    if (filter.sellerId) { where.push("seller_id=?"); args.push(filter.sellerId); }
    if (filter.status === "voided") where.push("voided_at IS NOT NULL");
    else if (filter.status) { where.push("(main_status=? OR holdback_status=?)"); args.push(filter.status, filter.status); }
    args.push(Math.min(500, filter.limit ?? 100));
    return [...this.sql.exec(
      "SELECT * FROM play_sales" + (where.length ? " WHERE " + where.join(" AND ") : "") + " ORDER BY purchased_at DESC LIMIT ?",
      ...args,
    )].map(toSale);
  }

  events(orderId: string): { event: string; detail: unknown; at: string }[] {
    return [...this.sql.exec("SELECT event, detail, at FROM ledger_events WHERE order_id=? ORDER BY id", orderId)].map((r) => ({
      event: String(r.event),
      detail: r.detail ? JSON.parse(String(r.detail)) : null,
      at: String(r.at),
    }));
  }

  /** Totals by part status, for the admin view. */
  summary(): Record<string, { count: number; cents: Record<string, number> }> {
    const out: Record<string, { count: number; cents: Record<string, number> }> = {};
    for (const part of ["main", "holdback"] as const) {
      for (const r of [...this.sql.exec(
        `SELECT ${part}_status AS st, payout_currency AS cur, COUNT(*) AS n, SUM(${part}_cents) AS c FROM play_sales GROUP BY st, cur`,
      )]) {
        const key = part + ":" + String(r.st);
        out[key] ??= { count: 0, cents: {} };
        out[key].count += Number(r.n);
        out[key].cents[String(r.cur)] = (out[key].cents[String(r.cur)] ?? 0) + Number(r.c ?? 0);
      }
    }
    return out;
  }

  debits(): { sellerId: string; currency: string; owedCents: number }[] {
    return [...this.sql.exec(
      "SELECT seller_id, currency, SUM(amount_cents - settled_cents) AS owed FROM seller_debits GROUP BY seller_id, currency HAVING owed > 0",
    )].map((r) => ({ sellerId: String(r.seller_id), currency: String(r.currency), owedCents: Number(r.owed) }));
  }
}

function toSale(r: Record<string, unknown>): SaleRow {
  const s = (v: unknown) => (v === null || v === undefined ? null : String(v));
  return {
    orderId: String(r.order_id),
    packageName: String(r.package_name),
    purchaseToken: String(r.purchase_token),
    packageId: String(r.package_id),
    sellerId: String(r.seller_id),
    buyerCountry: s(r.buyer_country),
    currency: String(r.currency),
    grossMicros: Number(r.gross_micros),
    taxMicros: Number(r.tax_micros),
    googleFeeMicros: Number(r.google_fee_micros),
    platformFeeMicros: Number(r.platform_fee_micros),
    sellerShareMicros: Number(r.seller_share_micros),
    amountSource: String(r.amount_source),
    payoutCurrency: String(r.payout_currency),
    mainCents: Number(r.main_cents),
    holdbackCents: Number(r.holdback_cents),
    mainDueAt: String(r.main_due_at),
    holdbackDueAt: String(r.holdback_due_at),
    mainStatus: String(r.main_status) as PartStatus,
    holdbackStatus: String(r.holdback_status) as PartStatus,
    mainTransferId: s(r.main_transfer_id),
    holdbackTransferId: s(r.holdback_transfer_id),
    mainPaidCents: Number(r.main_paid_cents ?? 0),
    holdbackPaidCents: Number(r.holdback_paid_cents ?? 0),
    attempts: Number(r.attempts ?? 0),
    nextAttemptAt: s(r.next_attempt_at),
    voidedAt: s(r.voided_at),
    purchasedAt: String(r.purchased_at),
    note: s(r.note),
  };
}
