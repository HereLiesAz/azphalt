import { useEffect, useMemo, useRef, useState } from "react";
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

type Sort = "popular" | "rating" | "recent" | "name";
const SORTS: Array<[Sort, string]> = [
  ["popular", "Popular"],
  ["rating", "Top rated"],
  ["recent", "Recent"],
  ["name", "A–Z"],
];
const STILL = 0.32;

// Hero-carousel card geometry. The card is a fixed size; the surrounding mask (see .carousel-item)
// clips it narrower as it scrolls away from the focus point — the M3 multi-browse effect.
const CARD_W = 340;
const CARD_H = 300;
const MASK_MIN = 152;

/* ─────────────── shared bits ─────────────── */

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

function PackageCard({ pkg, active, onOpen }: { pkg: PackageSummary; active: boolean; onOpen: (p: PackageSummary) => void }) {
  const [container, on] = paletteFor(pkg.id);
  const [hover, setHover] = useState(false);
  const paid = isPaid(pkg);
  const ratingLabel = formatRating(pkg.rating, pkg.ratingCount);
  return (
    <button
      className="pkg-card"
      onClick={() => onOpen(pkg)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: CARD_W,
        height: CARD_H,
        background: rgba(container, 0.14),
        color: on,
        border: `${hover ? 2 : 1}px solid ${rgba(on, hover ? 0.95 : 0.5)}`,
        transform: hover ? "scale(1.02)" : "none",
      }}
    >
      <div style={{ position: "relative", flex: 1, background: rgba(on, 0.05) }}>
        <PreviewCanvas pkg={pkg} tint={on} active={active} />
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill text={pkg.kind.toUpperCase()} bg={rgba(on, 0.16)} fg={on} />
            {isMature(pkg) && <Pill text="18+" bg="var(--secondary-container)" fg="var(--on-secondary-container)" />}
          </div>
          <Pill text={priceLabel(pkg)} bg={paid ? "var(--primary)" : rgba(on, 0.16)} fg={paid ? "var(--on-primary)" : on} />
        </div>
      </div>
      <div style={{ padding: "14px 20px 16px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pkg.name}</div>
        <div style={{ fontSize: 14, opacity: 0.75, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {pkg.description ?? "No description available."}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 12, fontWeight: 700 }}>
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
 * A section rendered as an M3 Expressive multi-browse hero carousel: a scroll-snapping strip where the
 * focused card is full-width and neighbours peek smaller. As you scroll, a per-item mask width is
 * recomputed from the item's distance to the strip's leading edge, clipping (not squishing) each card.
 * Exactly one card animates its live preview at a time, cycling across the row.
 */
function HeroCarousel({ section, onOpen }: { section: CatalogSection; onOpen: (p: PackageSummary) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (section.items.length === 0) return;
    const t = setInterval(() => setActive((i) => (i + 1) % section.items.length), 2600);
    return () => clearInterval(t);
  }, [section.items.length]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const focus = el.getBoundingClientRect().left + 24; // account for the strip's content padding
      el.querySelectorAll<HTMLElement>(".carousel-item").forEach((mask) => {
        const dist = Math.abs(mask.getBoundingClientRect().left - focus);
        const t = Math.min(dist / (CARD_W * 1.25), 1);
        mask.style.width = `${CARD_W - (CARD_W - MASK_MIN) * t}px`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const first = requestAnimationFrame(update);
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(first);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [section.items]);

  return (
    <section style={{ marginBottom: 30 }}>
      <div style={{ padding: "0 24px 14px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 720, margin: 0 }}>{section.title}</h2>
        {section.subtitle && <div style={{ fontSize: 14, color: "var(--on-surface-variant)", marginTop: 2 }}>{section.subtitle}</div>}
      </div>
      <div ref={scroller} className="carousel">
        {section.items.map((pkg, i) => (
          <div key={pkg.id} className="carousel-item" style={{ width: CARD_W }}>
            <PackageCard pkg={pkg} active={i === active} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── detail ─────────────── */

function Detail({ pkg, onBack }: { pkg: PackageSummary; onBack: () => void }) {
  const [container, on] = paletteFor(pkg.id);
  const [dialog, setDialog] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const paid = isPaid(pkg);
  const ratingLabel = formatRating(pkg.rating, pkg.ratingCount);

  const buy = async () => {
    if (!paid) {
      setDialog(`“${pkg.name}” is free — install it from any Azphalt-conforming host.`);
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
        {busy ? "Working…" : paid ? `Get  ·  ${priceLabel(pkg)}` : "Install  ·  Free"}
      </button>

      {dialog && (
        <div onClick={() => setDialog(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 60 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface)", padding: 24, maxWidth: 420, border: "1px solid var(--outline)" }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{paid ? "Checkout" : "Install"}</div>
            <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>{dialog}</p>
            <button className="chip" style={{ marginTop: 8 }} onClick={() => setDialog(null)}>OK</button>
          </div>
        </div>
      )}
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

  const filtering = query.trim() !== "" || price !== 0 || category !== null || app !== null;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = packages.filter((p) => {
      const matchesQuery = !q || [p.name, p.description ?? "", p.author ?? "", p.id].some((s) => s.toLowerCase().includes(q));
      const matchesPrice = price === 1 ? !isPaid(p) : price === 2 ? isPaid(p) : true;
      const matchesCat = !category || (p.mediaDomains ?? []).includes(category);
      const matchesApp = !app || (p.targetApps ?? []).length === 0 || (p.targetApps ?? []).includes(app);
      return matchesQuery && matchesPrice && matchesCat && matchesApp;
    });
    const by = {
      popular: (a: PackageSummary, b: PackageSummary) => (b.downloads ?? 0) - (a.downloads ?? 0),
      rating: (a: PackageSummary, b: PackageSummary) => (b.rating ?? -1) - (a.rating ?? -1),
      recent: (a: PackageSummary, b: PackageSummary) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
      name: (a: PackageSummary, b: PackageSummary) => a.name.localeCompare(b.name),
    }[sort];
    return [...filtered].sort(by);
  }, [packages, query, price, category, app, sort]);

  return (
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
          <HeroCarousel section={{ title: "Results", subtitle: `${shown.length} matching`, items: shown }} onOpen={open} />
        )
      ) : (
        sections.map((s) => <HeroCarousel key={s.title} section={s} onOpen={open} />)
      )}

      {selected && (
        <div className="detail-overlay" data-visible={detailVisible ? "true" : "false"}>
          <Detail pkg={selected} onBack={close} />
        </div>
      )}
    </div>
  );
}
