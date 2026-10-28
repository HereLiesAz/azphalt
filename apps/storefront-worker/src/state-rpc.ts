/**
 * The Durable Object side of in-app purchasing: the payout ledger and the small tables around it,
 * behind one `POST /rpc { method, args }` route so the Worker never builds SQL itself. Every method
 * runs inside the single-threaded Durable Object, so each call is atomic with respect to the others.
 */
import { PlayLedger, type Part, type SaleInput, type SqlLike } from "./ledger";

export function migrateInApp(sql: SqlLike): void {
  PlayLedger.migrate(sql);
  // A verified Play purchase token → the entitlement it produced. What makes the exchange idempotent.
  sql.exec(
    "CREATE TABLE IF NOT EXISTS play_purchases (" +
    "purchase_token TEXT PRIMARY KEY, package_name TEXT NOT NULL, product_id TEXT NOT NULL, " +
    "package_id TEXT NOT NULL, order_id TEXT, session_id TEXT NOT NULL, created_at TEXT NOT NULL)",
  );
  sql.exec("CREATE INDEX IF NOT EXISTS play_purchases_order_idx ON play_purchases(order_id)");
  // The Play product sync's memory: what was last written for each (app, product).
  sql.exec(
    "CREATE TABLE IF NOT EXISTS play_products (" +
    "package_name TEXT NOT NULL, product_id TEXT NOT NULL, package_id TEXT NOT NULL, fingerprint TEXT NOT NULL, " +
    "region_prices TEXT NOT NULL, synced_at TEXT NOT NULL, PRIMARY KEY(package_name, product_id))",
  );
  // In-app Stripe sessions: which app, which Google programme, and the token Google needs reported.
  sql.exec(
    "CREATE TABLE IF NOT EXISTS session_extras (" +
    "session_id TEXT PRIMARY KEY, app_id TEXT, program TEXT, region TEXT, admin_area TEXT, " +
    "external_transaction_token TEXT, created_at TEXT NOT NULL)",
  );
  // Alternative-billing sales owed to Google's externalTransactions API (24-hour deadline).
  sql.exec(
    "CREATE TABLE IF NOT EXISTS external_reports (" +
    "external_id TEXT PRIMARY KEY, session_id TEXT NOT NULL UNIQUE, package_name TEXT NOT NULL, token TEXT NOT NULL, " +
    "pre_tax_micros INTEGER NOT NULL, tax_micros INTEGER NOT NULL, currency TEXT NOT NULL, region TEXT NOT NULL, " +
    "admin_area TEXT, transaction_time TEXT NOT NULL, status TEXT NOT NULL, refund_status TEXT, " +
    "attempts INTEGER NOT NULL DEFAULT 0, last_error TEXT)",
  );
  sql.exec("CREATE TABLE IF NOT EXISTS kv (name TEXT PRIMARY KEY, value TEXT NOT NULL)");
}

type Args = Record<string, unknown>;
const str = (v: unknown) => (v === null || v === undefined ? undefined : String(v));

export function inAppRpc(sql: SqlLike, method: string, a: Args): unknown {
  const ledger = new PlayLedger(sql);
  const now = a.now ? new Date(String(a.now)) : new Date();
  switch (method) {
    // ── ledger ──
    case "ledger.record": return ledger.record(a.sale as SaleInput, now);
    case "ledger.get": return { sale: ledger.get(String(a.orderId)) ?? null, events: ledger.events(String(a.orderId)) };
    case "ledger.claimDue": return ledger.claimDue(now, Number(a.limit ?? 50));
    case "ledger.markPaid": ledger.markPaid(String(a.orderId), a.part as Part, str(a.transferId), now); return {};
    case "ledger.markRetry": ledger.markRetry(String(a.orderId), a.part as Part, String(a.reason), now); return {};
    case "ledger.markReview": ledger.markReview(String(a.orderId), a.part as Part, String(a.reason)); return {};
    case "ledger.release": return { released: ledger.release(String(a.orderId), a.part as Part) };
    case "ledger.applyVoid": return ledger.applyVoid(String(a.orderId), now);
    case "ledger.markReversed": ledger.markReversed(String(a.orderId), a.part as Part, String(a.reversalId), Number(a.cents)); return {};
    case "ledger.addDebit": ledger.addDebit(String(a.sellerId), String(a.currency), Number(a.cents), String(a.orderId), String(a.reason)); return {};
    case "ledger.list": return {
      sales: ledger.list({ status: str(a.status), sellerId: str(a.sellerId), limit: a.limit ? Number(a.limit) : undefined }),
      summary: ledger.summary(),
      debits: ledger.debits(),
    };

    // ── Play purchases ──
    case "playPurchase.get": {
      const row = [...sql.exec("SELECT * FROM play_purchases WHERE purchase_token=?", String(a.purchaseToken))][0];
      return row ? {
        purchaseToken: String(row.purchase_token), packageName: String(row.package_name), productId: String(row.product_id),
        packageId: String(row.package_id), orderId: str(row.order_id) ?? null, sessionId: String(row.session_id),
      } : null;
    }
    case "playPurchase.put":
      sql.exec(
        "INSERT OR IGNORE INTO play_purchases(purchase_token,package_name,product_id,package_id,order_id,session_id,created_at) VALUES(?,?,?,?,?,?,?)",
        String(a.purchaseToken), String(a.packageName), String(a.productId), String(a.packageId), str(a.orderId) ?? null, String(a.sessionId), now.toISOString(),
      );
      return {};
    case "playPurchase.byToken": {
      const row = [...sql.exec("SELECT session_id, order_id FROM play_purchases WHERE purchase_token=?", String(a.purchaseToken))][0];
      return row ? { sessionId: String(row.session_id), orderId: str(row.order_id) ?? null } : null;
    }

    // ── Play products ──
    case "playProduct.fingerprint": {
      const row = [...sql.exec("SELECT fingerprint FROM play_products WHERE package_name=? AND product_id=?", String(a.packageName), String(a.productId))][0];
      return { fingerprint: row ? String(row.fingerprint) : null };
    }
    case "playProduct.save":
      sql.exec(
        "INSERT INTO play_products(package_name,product_id,package_id,fingerprint,region_prices,synced_at) VALUES(?,?,?,?,?,?) " +
        "ON CONFLICT(package_name,product_id) DO UPDATE SET package_id=excluded.package_id, fingerprint=excluded.fingerprint, " +
        "region_prices=CASE WHEN excluded.region_prices='{}' THEN play_products.region_prices ELSE excluded.region_prices END, synced_at=excluded.synced_at",
        String(a.packageName), String(a.productId), String(a.packageId), String(a.fingerprint), JSON.stringify(a.regionPrices ?? {}), String(a.syncedAt),
      );
      return {};
    case "playProduct.regionPrice": {
      const row = [...sql.exec("SELECT region_prices FROM play_products WHERE package_name=? AND product_id=?", String(a.packageName), String(a.productId))][0];
      const prices = row ? JSON.parse(String(row.region_prices)) as Record<string, { currency: string; micros: number }> : {};
      return { price: prices[String(a.region ?? "").toUpperCase()] ?? null };
    }

    // ── in-app Stripe sessions and Google reports ──
    case "sessionExtras.put":
      sql.exec(
        "INSERT OR IGNORE INTO session_extras(session_id,app_id,program,region,admin_area,external_transaction_token,created_at) VALUES(?,?,?,?,?,?,?)",
        String(a.sessionId), str(a.appId) ?? null, str(a.program) ?? null, str(a.region) ?? null, str(a.adminArea) ?? null,
        str(a.externalTransactionToken) ?? null, now.toISOString(),
      );
      return {};
    case "sessionExtras.get": {
      const row = [...sql.exec("SELECT * FROM session_extras WHERE session_id=?", String(a.sessionId))][0];
      return row ? {
        appId: str(row.app_id) ?? null, program: str(row.program) ?? null, region: str(row.region) ?? null,
        adminArea: str(row.admin_area) ?? null, externalTransactionToken: str(row.external_transaction_token) ?? null,
      } : null;
    }
    case "externalReport.enqueue":
      sql.exec(
        "INSERT OR IGNORE INTO external_reports(external_id,session_id,package_name,token,pre_tax_micros,tax_micros,currency,region,admin_area,transaction_time,status) " +
        "VALUES(?,?,?,?,?,?,?,?,?,?,'pending')",
        String(a.externalId), String(a.sessionId), String(a.packageName), String(a.token), Number(a.preTaxMicros), Number(a.taxMicros),
        String(a.currency), String(a.region), str(a.adminArea) ?? null, String(a.transactionTime),
      );
      return {};
    case "externalReport.due":
      return [...sql.exec(
        "SELECT * FROM external_reports WHERE status='pending' OR refund_status='pending' ORDER BY transaction_time LIMIT 100",
      )].map((r) => ({
        externalId: String(r.external_id), sessionId: String(r.session_id), packageName: String(r.package_name), token: String(r.token),
        preTaxMicros: Number(r.pre_tax_micros), taxMicros: Number(r.tax_micros), currency: String(r.currency), region: String(r.region),
        adminArea: str(r.admin_area), transactionTime: String(r.transaction_time), status: String(r.status), refundStatus: str(r.refund_status) ?? null,
      }));
    case "externalReport.mark":
      if (a.refund) sql.exec("UPDATE external_reports SET refund_status=?, attempts=attempts+1, last_error=? WHERE external_id=?", String(a.status), str(a.error) ?? null, String(a.externalId));
      else sql.exec("UPDATE external_reports SET status=?, attempts=attempts+1, last_error=? WHERE external_id=?", String(a.status), str(a.error) ?? null, String(a.externalId));
      return {};
    case "externalReport.refund":
      sql.exec("UPDATE external_reports SET refund_status='pending' WHERE session_id=? AND refund_status IS NULL", String(a.sessionId));
      return {};

    // ── cursors ──
    case "kv.get": {
      const row = [...sql.exec("SELECT value FROM kv WHERE name=?", String(a.name))][0];
      return { value: row ? String(row.value) : null };
    }
    case "kv.put":
      sql.exec("INSERT INTO kv(name,value) VALUES(?,?) ON CONFLICT(name) DO UPDATE SET value=excluded.value", String(a.name), String(a.value));
      return {};
  }
  throw new Error("unknown rpc method " + method);
}
