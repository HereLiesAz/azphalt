import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  fetchPackages,
  formatCount,
  formatRating,
  isMature,
  isPaid,
  priceLabel,
  startCheckout,
  type PackageSummary,
} from "./api";
import { drawPreview, paletteFor, rgba } from "./preview";
import {
  attemptHandoff,
  downloadUrl,
  forgetInstall,
  hostsFor,
  installLink,
  isHeld,
  loadInventory,
  recordInstalled,
  type HostOption,
  type InventoryEntry,
} from "@azphalt/web-handoff";

type Sort = "popular" | "rating" | "recent" | "name";
const SORTS: Array<[Sort, string]> = [
  ["popular", "Popular"],
  ["rating", "Top rated"],
  ["recent", "Recent"],
  ["name", "A–Z"],
];
const STILL = 0.32;

// Hero-carousel card geometry. The card is drawn at HERO width; a per-item mask (see .carousel-item)
// clips it down toward the edges, so a row reads thin · small · medium · HERO · medium · small · thin ·
// thin… symmetric around a centered focus keyline (the M3 Expressive hero layout).
// The top hero carousel's masked tiers.
const HERO = 268;
const MEDIUM = 186;
const SMALL = 120;
const THIN = 64;
const HERO_H = 282; // the hero row's cards are taller than the plain rows below

// The plain rows below the hero carousel: uniform cards (the design we had before the carousels).
const ROW_W = 244;
const ROW_H = 216;

// The hero sits at the 2nd slot at rest (index 1), so a row reads small · HERO · medium · small ·
// thin · thin …, and shifts one slot per SLOT pixels of scroll.
const HERO_SLOT = 1;
/**
 * Scroll distance that advances the focus by one card: the card's laid-out width plus the flex gap
 * between items (`.carousel` gap, theme.css).
 *
 * The gap used to be left out — SLOT was set equal to MEDIUM — which made the focus index drift by
 * the gap's share of the pitch on every slot, about 5%, so roughly one whole card after sixteen. It
 * was wrong before the cards shrank and shrinking made it worse, because the gap is a larger fraction
 * of a smaller card.
 */
const CAROUSEL_GAP = 12;
const SLOT = MEDIUM + CAROUSEL_GAP;

/**
 * Mask width for a card `d` slots from the focus (0 = the hero; negative = to its left). Asymmetric:
 * a single small peek on the left, and a medium → small → thin falloff on the right — so a row reads
 * small · HERO · medium · small · thin · thin … with the hero as the 2nd card at rest.
 */
function slotWidth(d: number): number {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  if (d <= -2) return THIN; // scrolled-past cards on the left collapse to thin
  if (d <= -1) return lerp(THIN, SMALL, d + 2); // [-2,-1]: thin → small (the left peek)
  if (d <= 0) return lerp(SMALL, HERO, d + 1); //  [-1, 0]: small → hero
  if (d <= 1) return lerp(HERO, MEDIUM, d); //      [ 0, 1]: hero → medium
  if (d <= 2) return lerp(MEDIUM, SMALL, d - 1); // [ 1, 2]: medium → small
  if (d <= 3) return lerp(SMALL, THIN, d - 2); //   [ 2, 3]: small → thin
  return THIN; // anything further right stays thin
}

/* ─────────────── shared bits ─────────────── */

/**
 * What this browser has handed to a host, for the cards.
 *
 * A context rather than a prop threaded through HeroCarousel and CardRow: every card wants it and
 * neither of those components has anything else to do with it. The Compose storefront uses a
 * CompositionLocal for the same reason (models/LocalHostInventory.kt).
 */
const InventoryContext = createContext<Record<string, InventoryEntry>>({});

function Pill({ text, bg, fg }: { text: string; bg: string; fg: string }) {
  return <span className="pill" style={{ background: bg, color: fg }}>{text}</span>;
}

/** A canvas that animates the plugin preview only when `active`; otherwise it holds a still frame. */
function PreviewCanvas({ pkg, tint, active }: { pkg: PackageSummary; tint: string; active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const size = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    let raf = 0;
    if (active) {
      let start = 0;
      const loop = (t: number) => {
        if (!start) start = t;
        const phase = ((t - start) / 5200) % 1;
        drawPreview(ctx, canvas.clientWidth, canvas.clientHeight, phase, tint, pkg);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      drawPreview(ctx, canvas.clientWidth, canvas.clientHeight, STILL, tint, pkg);
    }
    return () => cancelAnimationFrame(raf);
  }, [active, tint, pkg]);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ─────────────── hero + controls ─────────────── */

function Hero({ total }: { total: number }) {
  return (
    <div style={{ padding: "40px 0 20px" }}>
      <span className="pill" style={{ background: "var(--secondary-container)", color: "var(--on-secondary-container)", fontSize: 13, padding: "8px 16px" }}>
        {total > 0 ? `${total} portable extensions · one open standard` : "Loading the registry…"}
      </span>
      <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 850, letterSpacing: -1.5, margin: "20px 0 0" }}>
        The open extension
        <br />
        <span style={{ color: "var(--primary)" }}>marketplace.</span>
      </h1>
      <p style={{ fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 640, marginTop: 16 }}>
        Write an extension once — a brush, a filter, a tool — and run it in any app that speaks Azphalt. This is
        the <strong>React</strong> PWA, a sibling to the Compose (Kotlin/Wasm) storefront on the same API.
      </p>
    </div>
  );
}

function ChipRow<T>({ items, value, onSelect, label }: { items: Array<[T, string]>; value: T; onSelect: (v: T) => void; label?: string }) {
  return (
    <div style={{ marginTop: 8 }}>
      {label && <div style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface-variant)", marginBottom: 6 }}>{label}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map(([v, text]) => (
          <button key={String(v)} className="chip" aria-pressed={value === v} onClick={() => onSelect(v)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── card + hero carousel ─────────────── */

function PackageCard({
  pkg,
  active,
  onOpen,
  width = ROW_W,
  height = ROW_H,
}: {
  pkg: PackageSummary;
  active: boolean;
  onOpen: (p: PackageSummary) => void;
  width?: number;
  height?: number;
}) {
  const [container, on] = paletteFor(pkg.id);
  const [hover, setHover] = useState(false);
  const held = isHeld(useContext(InventoryContext), pkg.id);
  const paid = isPaid(pkg);
  const ratingLabel = formatRating(pkg.rating, pkg.ratingCount);
  return (
    <button
      className="pkg-card"
      onClick={() => onOpen(pkg)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width,
        height,
        background: rgba(container, 0.14),
        color: on,
        border: `${hover ? 2 : 1}px solid ${rgba(on, hover ? 0.95 : 0.5)}`,
        transform: hover ? "scale(1.02)" : "none",
      }}
    >
      <div style={{ position: "relative", flex: 1, background: rgba(on, 0.05) }}>
        <PreviewCanvas pkg={pkg} tint={on} active={active} />
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill text={pkg.kind.toUpperCase()} bg={rgba(on, 0.16)} fg={on} />
            {isMature(pkg) && <Pill text="18+" bg="var(--secondary-container)" fg="var(--on-secondary-container)" />}
            {/* Sits with kind and maturity rather than with the price: it describes the viewer's
                relationship to the package, not the package's terms. Without it the install
                confirmation promised a marking the catalogue never showed. */}
            {held && <Pill text="INSTALLED" bg="var(--primary)" fg="var(--on-primary)" />}
          </div>
          <Pill text={priceLabel(pkg)} bg={paid ? "var(--primary)" : rgba(on, 0.16)} fg={paid ? "var(--on-primary)" : on} />
        </div>
      </div>
      <div style={{ padding: "9px 12px 10px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pkg.name}</div>
        {/* One line, not two. At two, a card is as tall as its longest description rather than as
            tall as anything about the extension, and a row reads as a wall of prose. */}
        <div style={{ fontSize: 12.5, opacity: 0.75, marginTop: 2, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {pkg.description ?? "No description available."}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6, fontSize: 11.5, fontWeight: 700 }}>
          {ratingLabel && <span>{ratingLabel}</span>}
          {(pkg.downloads ?? 0) > 0 && <span style={{ opacity: 0.7 }}>{formatCount(pkg.downloads as number)} installs</span>}
        </div>
      </div>
    </button>
  );
}

interface CatalogSection {
  title: string;
  subtitle?: string;
  items: PackageSummary[];
}

/** VSCode-style browse sections (mirrors the Compose storefront's buildSections). */
function buildSections(packages: PackageSummary[]): CatalogSection[] {
  if (packages.length === 0) return [];
  const out: CatalogSection[] = [];
  const add = (title: string, subtitle: string | undefined, items: PackageSummary[], limit = 14) => {
    if (items.length) out.push({ title, subtitle, items: items.slice(0, limit) });
  };
  const byDownloads = (a: PackageSummary, b: PackageSummary) => (b.downloads ?? 0) - (a.downloads ?? 0);

  add("Popular", "Most installed across every host", [...packages].sort(byDownloads));
  add(
    "Top rated",
    "Highest rated by the community",
    packages.filter((p) => p.rating != null && (p.ratingCount ?? 0) > 0).sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
  );
  add(
    "Fresh",
    "Recently published and updated",
    packages.filter((p) => p.updatedAt).sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")),
  );
  for (const c of [...new Set(packages.flatMap((p) => p.mediaDomains ?? []))].sort()) {
    add(c[0].toUpperCase() + c.slice(1), undefined, packages.filter((p) => (p.mediaDomains ?? []).includes(c)).sort(byDownloads));
  }
  add("More extensions", undefined, packages.filter((p) => (p.mediaDomains ?? []).length === 0).sort(byDownloads));
  return out;
}

/**
 * The single top **M3 Expressive hero carousel**. A scroll strip whose cards are masked by width around
 * a fixed keyline that sits just left of centre, so a row reads thin · small · medium · HERO · medium ·
 * small · thin · thin …, symmetric around the hero (the 4th item at rest). Each item's mask width comes
 * from its centre's distance to the keyline (see slotWidth); the card is clipped, never squished. Its
 * cards are taller than the plain rows below. One live preview animates at a time.
 */
function HeroCarousel({ section, onOpen }: { section: CatalogSection; onOpen: (p: PackageSummary) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (section.items.length === 0) return;
    const t = setInterval(() => setActive((i) => (i + 1) % section.items.length), 2600);
    return () => clearInterval(t);
  }, [section.items.length]);

  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      // Index-based keylines (like M3's carousel): a card's mask width is a function of how many slots
      // it is from the focus, which advances continuously with scroll. This tracks the arrangement
      // exactly (item HERO_SLOT is the hero at rest) without the width↔position circularity of measuring.
      const items = Array.from(el.querySelectorAll<HTMLElement>(".carousel-item"));
      const focus = HERO_SLOT + el.scrollLeft / SLOT;
      items.forEach((m, i) => {
        m.style.width = `${Math.round(slotWidth(i - focus))}px`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update(); // size before first paint
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [section.items]);

  return (
    <section style={{ marginBottom: 34 }}>
      <div style={{ padding: "0 24px 16px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 760, margin: 0 }}>{section.title}</h2>
        {section.subtitle && <div style={{ fontSize: 15, color: "var(--on-surface-variant)", marginTop: 2 }}>{section.subtitle}</div>}
      </div>
      <div ref={scroller} className="carousel">
        {section.items.map((pkg, i) => (
          <div key={pkg.id} className="carousel-item" style={{ width: HERO, height: HERO_H }}>
            <PackageCard pkg={pkg} active={i === active} onOpen={onOpen} width={HERO} height={HERO_H} />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * A plain browse row: uniform cards in a horizontal scroll strip (the design from before the carousel
 * work). Used for every section below the top hero carousel. One live preview animates at a time.
 */
function CardRow({ section, onOpen }: { section: CatalogSection; onOpen: (p: PackageSummary) => void }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (section.items.length === 0) return;
    const t = setInterval(() => setActive((i) => (i + 1) % section.items.length), 2600);
    return () => clearInterval(t);
  }, [section.items.length]);

  return (
    <section style={{ marginBottom: 30 }}>
      <div style={{ padding: "0 24px 14px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 720, margin: 0 }}>{section.title}</h2>
        {section.subtitle && <div style={{ fontSize: 14, color: "var(--on-surface-variant)", marginTop: 2 }}>{section.subtitle}</div>}
      </div>
      <div className="card-row">
        {section.items.map((pkg, i) => (
          <div key={pkg.id} className="row-item" style={{ width: ROW_W }}>
            <PackageCard pkg={pkg} active={i === active} onOpen={onOpen} width={ROW_W} height={ROW_H} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── detail ─────────────── */

function Detail({
  pkg,
  catalog,
  onBack,
  onHandedOff,
  onForget,
}: {
  pkg: PackageSummary;
  catalog: PackageSummary[];
  onBack: () => void;
  /** A host took the link. The store records it so the catalog can show and filter on it. */
  onHandedOff: (p: PackageSummary) => void;
  /** The user says the store's record is wrong. See `forgetInstall`. */
  onForget: (p: PackageSummary) => void;
}) {
  const held = isHeld(useContext(InventoryContext), pkg.id);
  const [container, on] = paletteFor(pkg.id);
  const [dialog, setDialog] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // The install fallback (spec/web-handoff.md § When no host is installed). Set only once a handoff
  // attempt has come back with "nothing claimed it" — never shown pre-emptively, because on a device
  // that does have a host the user should simply arrive there.
  const [noHost, setNoHost] = useState(false);
  const paid = isPaid(pkg);
  const ratingLabel = formatRating(pkg.rating, pkg.ratingCount);
  const hosts = useMemo(() => hostsFor(pkg, catalog), [pkg, catalog]);

  const hand = async () => {
    setBusy(true);
    // Close the sheet before re-attempting, so a retry does not sit on screen unchanged for the whole
    // wait window looking like a dead button. The Compose storefront does the same at its call site;
    // the two are meant to behave identically.
    setNoHost(false);
    try {
      // One link shape for everything free, packs included — a pack is a package with an id, and the
      // host resolves its members (spec/web-handoff.md § Packs). Nothing here names a host.
      const handed = await attemptHandoff(installLink(pkg.id, pkg.version));
      if (handed) {
        // Record it, and say so. The successful path used to be the silent one: the user left for a
        // host, came back, and the page looked exactly as it had — no acknowledgement, and every card
        // still offering to install it.
        onHandedOff(pkg);
        setDialog(
          `“${pkg.name}” was sent to your host. It'll show as installed here — if it didn't arrive, install it again.`,
        );
      }
      setNoHost(!handed);
    } finally {
      setBusy(false);
    }
  };

  const buy = async () => {
    if (!paid) {
      await hand();
      return;
    }
    setBusy(true);
    try {
      const r = await startCheckout(pkg.id);
      setDialog(r.error ?? r.message ?? "Checkout started.");
    } catch (e) {
      setDialog((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: 24 }}>
      <button className="chip" onClick={onBack}>←  Back</button>
      <div style={{ position: "relative", height: 220, overflow: "hidden", background: rgba(container, 0.14), border: `1px solid ${rgba(on, 0.55)}`, marginTop: 20 }}>
        <PreviewCanvas pkg={pkg} tint={on} active />
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: 20 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill text={pkg.kind.toUpperCase()} bg={rgba(on, 0.16)} fg={on} />
            {isMature(pkg) && <Pill text="18+" bg="var(--secondary-container)" fg="var(--on-secondary-container)" />}
          </div>
          <Pill text={`v${pkg.version}`} bg={rgba(on, 0.16)} fg={on} />
        </div>
      </div>
      <h2 style={{ fontSize: 34, fontWeight: 800, margin: "28px 0 0" }}>{pkg.name}</h2>
      {pkg.author && <div style={{ color: "var(--on-surface-variant)", fontSize: 16, marginTop: 6 }}>by {pkg.author}</div>}

      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 16, fontWeight: 700 }}>
        <span style={{ color: ratingLabel ? "var(--primary)" : "var(--on-surface-variant)" }}>{ratingLabel ?? "No ratings yet"}</span>
        {(pkg.downloads ?? 0) > 0 && <span style={{ color: "var(--on-surface-variant)" }}>{formatCount(pkg.downloads as number)} installs</span>}
      </div>

      <p style={{ fontSize: 16, color: "var(--on-surface-variant)", marginTop: 20 }}>{pkg.description ?? "No description available."}</p>
      {pkg.capabilities && pkg.capabilities.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
          {pkg.capabilities.map((c) => (
            <Pill key={c} text={c} bg="var(--secondary-container)" fg="var(--on-secondary-container)" />
          ))}
        </div>
      )}
      <button
        onClick={buy}
        disabled={busy}
        style={{ marginTop: 32, border: "none", borderRadius: 0, padding: "14px 28px", fontSize: 16, fontWeight: 700, background: "var(--primary)", color: "var(--on-primary)" }}
      >
        {busy ? "Working…" : held ? "Install again" : paid ? `Get  ·  ${priceLabel(pkg)}` : "Install  ·  Free"}
      </button>

      {/* The store's record is a guess: a handoff can succeed and the install still not happen, and
          on the web nothing ever contradicts it. This is how the user says so. */}
      {held && (
        <div>
          <button
            className="chip"
            style={{ marginTop: 12 }}
            onClick={() => onForget(pkg)}
          >
            Not installed? Remove from my library
          </button>
        </div>
      )}

      {dialog && (
        <div onClick={() => setDialog(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 60 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface)", padding: 24, maxWidth: 420, border: "1px solid var(--outline)" }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{paid ? "Checkout" : "Install"}</div>
            <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>{dialog}</p>
            <button className="chip" style={{ marginTop: 8 }} onClick={() => setDialog(null)}>OK</button>
          </div>
        </div>
      )}

      {noHost && (
        <NoHostSheet pkg={pkg} hosts={hosts} onRetry={hand} onDismiss={() => setNoHost(false)} />
      )}
    </div>
  );
}

/**
 * What happens when nothing on the device claimed the link — spec/web-handoff.md § When no host is
 * installed.
 *
 * Deliberately not phrased as an error. On a device with no host, downloading the package *is* the
 * successful outcome of pressing Install: a host registered for the `.azp` media type opens the file
 * directly, with no link support involved at all. The copy this replaced sent the user back to the app
 * they had just left and stopped there.
 */
function NoHostSheet({
  pkg,
  hosts,
  onRetry,
  onDismiss,
}: {
  pkg: PackageSummary;
  hosts: HostOption[];
  onRetry: () => void;
  onDismiss: () => void;
}) {
  return (
    <div onClick={onDismiss} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 60 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface)", padding: 24, maxWidth: 420, width: "100%", border: "1px solid var(--outline)" }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Install “{pkg.name}”</div>
        <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>
          Nothing on this device opened the link. Download the package and open it in a host, or install one below.
        </p>

        <a
          href={downloadUrl(pkg.id, pkg.version)}
          download
          style={{ display: "block", textAlign: "center", marginTop: 16, padding: "12px 20px", fontWeight: 700, background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none" }}
        >
          Download .azp
        </a>

        {hosts.length > 0 && (
          <>
            <div style={{ marginTop: 20, fontSize: 13, fontWeight: 700, color: "var(--on-surface-variant)" }}>
              {(pkg.targetApps ?? []).length === 0 ? "Hosts that run azphalt extensions" : "Made for"}
            </div>
            {hosts.map((h) => (
              <a
                key={h.hostId}
                href={h.installUrl}
                target="_blank"
                /* The listings are third-party URLs from the registry — deny them window.opener. */
                rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", marginTop: 8, padding: "10px 20px", border: "1px solid var(--outline)", color: "var(--on-surface)", textDecoration: "none" }}
              >
                Get {h.name}
              </a>
            ))}
          </>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button className="chip" onClick={onRetry}>Try again</button>
          <button className="chip" onClick={onDismiss}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── app ─────────────── */

export function App() {
  const [packages, setPackages] = useState<PackageSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected item + its expand/collapse animation state. Opening scales the detail in; Back collapses
  // it, then unmounts after the transition (see .detail-overlay in theme.css).
  const [selected, setSelected] = useState<PackageSummary | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [price, setPrice] = useState(0);
  // 0 = Any, 1 = Installed, 2 = Not installed — over the store’s own record, not the catalog.
  const [owned, setOwned] = useState(0);
  // What this browser has handed to a host. Loaded once; recording an install re-renders every card.
  const [inventory, setInventory] = useState<Record<string, InventoryEntry>>(() => loadInventory());
  const [category, setCategory] = useState<string | null>(null);
  const [app, setApp] = useState<string | null>(null);

  const open = (p: PackageSummary) => {
    setSelected(p);
    requestAnimationFrame(() => setDetailVisible(true));
  };
  const close = () => {
    setDetailVisible(false);
    window.setTimeout(() => setSelected(null), 420);
  };

  useEffect(() => {
    fetchPackages()
      .then(setPackages)
      .catch((e) => console.error("Failed to fetch packages:", e))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => [...new Set(packages.flatMap((p) => p.mediaDomains ?? []))].sort(), [packages]);
  const apps = useMemo(() => [...new Set(packages.flatMap((p) => p.targetApps ?? []))].sort(), [packages]);
  const sections = useMemo(() => buildSections(packages), [packages]);

  const filtering = query.trim() !== "" || price !== 0 || category !== null || app !== null || owned !== 0;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = packages.filter((p) => {
      const matchesQuery = !q || [p.name, p.description ?? "", p.author ?? "", p.id].some((s) => s.toLowerCase().includes(q));
      const matchesPrice = price === 1 ? !isPaid(p) : price === 2 ? isPaid(p) : true;
      const matchesCat = !category || (p.mediaDomains ?? []).includes(category);
      const matchesApp = !app || (p.targetApps ?? []).length === 0 || (p.targetApps ?? []).includes(app);
      // `removed` is kept rather than deleted so a reinstall can be offered, so "have it" is a
      // question about the state and not about the key being present — hence `isHeld`, not `in`.
      const held = isHeld(inventory, p.id);
      const matchesOwned = owned === 1 ? held : owned === 2 ? !held : true;
      return matchesQuery && matchesPrice && matchesCat && matchesApp && matchesOwned;
    });
    const by = {
      popular: (a: PackageSummary, b: PackageSummary) => (b.downloads ?? 0) - (a.downloads ?? 0),
      rating: (a: PackageSummary, b: PackageSummary) => (b.rating ?? -1) - (a.rating ?? -1),
      recent: (a: PackageSummary, b: PackageSummary) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
      name: (a: PackageSummary, b: PackageSummary) => a.name.localeCompare(b.name),
    }[sort];
    return [...filtered].sort(by);
  }, [packages, query, price, category, app, owned, inventory, sort]);

  return (
    <InventoryContext.Provider value={inventory}>
    <div style={{ minHeight: "100%", paddingBottom: 96 }}>
      <div style={{ padding: "0 24px" }}>
        <Hero total={packages.length} />
        <div style={{ marginBottom: 24 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search extensions…"
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--outline)", background: "var(--surface)", color: "var(--on-background)", borderRadius: 0, padding: "14px 18px", fontSize: 16, outline: "none" }}
          />
          <ChipRow label="Sort" items={SORTS} value={sort} onSelect={setSort} />
          <ChipRow label="Filter" items={[[0, "All"], [1, "Free"], [2, "Paid"]] as Array<[number, string]>} value={price} onSelect={setPrice} />
          <ChipRow items={[[0, "Any"], [1, "Installed"], [2, "Not installed"]] as Array<[number, string]>} value={owned} onSelect={setOwned} />
          {categories.length > 0 && (
            <ChipRow
              items={[[null, "All types"], ...categories.map((c) => [c, c[0].toUpperCase() + c.slice(1)] as [string, string])] as Array<[string | null, string]>}
              value={category}
              onSelect={setCategory}
            />
          )}
          {apps.length > 0 && (
            <ChipRow
              items={[[null, "All apps"], ...apps.map((a) => [a, a.split(".").pop() ?? a] as [string, string])] as Array<[string | null, string]>}
              value={app}
              onSelect={setApp}
            />
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--on-surface-variant)" }}>Loading…</div>
      ) : filtering ? (
        shown.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "var(--on-surface-variant)" }}>No extensions match your search.</div>
        ) : (
          // A search collapses to one plain results row (the hero carousel is reserved for the top of browse).
          <CardRow section={{ title: "Results", subtitle: `${shown.length} matching`, items: shown }} onOpen={open} />
        )
      ) : (
        <>
          {sections[0] && <HeroCarousel section={sections[0]} onOpen={open} />}
          {sections.slice(1).map((s) => (
            <CardRow key={s.title} section={s} onOpen={open} />
          ))}
        </>
      )}

      {selected && (
        <div className="detail-overlay" data-visible={detailVisible ? "true" : "false"}>
          {/* The whole catalogue, so the install fallback can build the host directory from its
              kind:"app" listings (spec/web-handoff.md § Host directory) without a second fetch. */}
          <Detail
            pkg={selected}
            catalog={packages}
            onBack={close}
            onHandedOff={(p) => setInventory((inv) => recordInstalled(inv, p.id, p.version))}
            onForget={(p) => setInventory((inv) => forgetInstall(inv, p.id))}
          />
        </div>
      )}
    </div>
    </InventoryContext.Provider>
  );
}
