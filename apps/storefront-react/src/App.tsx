import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  fetchPackages,
  fetchA2AAgents,
  fetchCheckoutStatus,
  fetchPurchases,
  fetchSellerStatus,
  fetchReports,
  resolveReport,
  fileReport,
  publishPackage,
  ratePackage,
  REPORT_REASONS,
  startSellerOnboarding,
  downloadPurchase,
  formatCount,
  formatRating,
  isMature,
  isPaid,
  priceLabel,
  installCount,
  safeHref,
  hostOf,
  startCheckout,
  type A2AAgentListing,
  type LlmBlock,
  type PackageSummary,
  type Purchase,
  type PublishTicket,
  type Report,
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

// Expressive hero keylines: width changes continuously as the focal index moves.
// The focal slot stays at the same left inset; cards move through that keyline.
const HERO = 268;
const MEDIUM = 186;
const SMALL = 120;
const THIN = 64;
const HERO_H = 282;
const CAROUSEL_GAP = 12;
const HERO_INSET = 24;
const SLOT = MEDIUM + CAROUSEL_GAP;

const ROW_W = 244;
const ROW_H = 216;

/** Width of a visible hero card at its distance from the fixed keyline. */
function slotWidth(distance: number): number {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  if (distance <= -2) return THIN;
  if (distance <= -1) return lerp(THIN, SMALL, distance + 2);
  if (distance <= 0) return lerp(SMALL, HERO, distance + 1);
  if (distance <= 1) return lerp(HERO, MEDIUM, distance);
  if (distance <= 2) return lerp(MEDIUM, SMALL, distance - 1);
  if (distance <= 3) return lerp(SMALL, THIN, distance - 2);
  return THIN;
}

/**
 * Keyline layout computed in track coordinates. All widths and positions are
 * derived together, so changing a card's mask cannot move the scroll origin or
 * leave gaps where the old index-based scroll math expected a fixed item pitch.
 */
export function heroKeylines(count: number, focus: number): Array<{ left: number; width: number }> {
  if (count <= 0) return [];
  const position = Math.max(0, Math.min(count - 1, focus));
  const widths = Array.from({ length: count }, (_, i) => slotWidth(i - position));
  const origins = widths.map(() => 0);
  for (let i = 1; i < count; i++) origins[i] = origins[i - 1] + widths[i - 1] + CAROUSEL_GAP;
  const before = Math.floor(position);
  const fraction = position - before;
  const focalOrigin = origins[before] + fraction * ((origins[before + 1] ?? origins[before]) - origins[before]);
  return widths.map((width, i) => ({ left: origins[i] + HERO_INSET - focalOrigin, width }));
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

/** Short tier label for a `kind:"llm"` card: where the prompts go, before anything else. */
function llmTierLabel(llm: LlmBlock): string {
  return llm.tier === "sandbox-weights" ? "PRIVATE SANDBOX" : "HOSTED";
}

const PROMPT_HANDLING: Record<string, string> = {
  "not-retained": "Prompts are not retained.",
  logged: "Prompts are logged by the operator.",
  "may-train": "Prompts may be used to train models.",
  unknown: "The operator does not say what happens to prompts.",
};

function formatBytes(bytes: number): string {
  return bytes >= 1e9 ? (bytes / 1e9).toFixed(1) + " GB" : Math.round(bytes / 1e6) + " MB";
}

/**
 * What `spec/llm.md` § Discovery requires the store to show before install: the tier, the data
 * handling, and the permissions the one-time setup token needs — plus the weights' own licence,
 * which a host must surface too.
 */
function LlmDisclosure({ llm }: { llm: LlmBlock }) {
  const dh = llm.dataHandling;
  const token = llm.setup?.requires?.githubToken ?? [];
  const license = llm.weights?.modelLicense;
  const size = (llm.weights?.files ?? []).reduce((n, f) => n + (f.byteSize ?? 0), 0);
  const req = llm.weights?.requirements;
  const row = (label: string, value: React.ReactNode) => (
    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
      <span style={{ minWidth: 140, fontSize: 13, fontWeight: 700, color: "var(--on-surface-variant)" }}>{label}</span>
      <span style={{ fontSize: 14 }}>{value}</span>
    </div>
  );
  return (
    <section aria-label="Before you install" style={{ marginTop: 24, padding: "18px 22px", background: "var(--surface-highest)", borderRadius: 26 }}>
      <div style={{ fontWeight: 800, fontSize: 16 }}>Before you install</div>
      {row("Runs", llm.tier === "sandbox-weights"
        ? "Open weights in your own private GitHub Actions sandbox. Prompts stay there."
        : `A third-party service${hostOf(llm.endpoint?.baseUrl) ? " at " + hostOf(llm.endpoint?.baseUrl) : ""}. Prompts leave your sandbox.`)}
      {dh && row("Prompts", <>
        {PROMPT_HANDLING[dh.prompts ?? "unknown"] ?? PROMPT_HANDLING.unknown}
        {dh.operator && <> Operator: {dh.operator}.</>}
        {dh.modelPinned === false && <> The model behind it can change without notice.</>}
        {safeHref(dh.terms) && <> <a href={safeHref(dh.terms)} target="_blank" rel="noopener noreferrer">Terms</a></>}
      </>)}
      {llm.endpoint?.defaultModel && row("Model", llm.endpoint.defaultModel)}
      {license && row("Model licence", <>
        {license.spdx ?? "unspecified"}{license.commercialUse === false && " · non-commercial"}
        {safeHref(license.url) && <> <a href={safeHref(license.url)} target="_blank" rel="noopener noreferrer">Read</a></>}
      </>)}
      {size > 0 && row("Download", `${formatBytes(size)} of weights, cached in the sandbox`)}
      {req && row("Runner needs", [
        req.accelerator, req.minRamMB && `${Math.round(req.minRamMB / 1024)} GB RAM`,
        req.minDiskMB && `${Math.round(req.minDiskMB / 1024)} GB disk`, req.contextTokens && `${req.contextTokens} tokens context`,
      ].filter(Boolean).join(" · "))}
      {row("Setup token", token.length > 0
        ? <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>{token.map((t) => <code key={t}>{t}</code>)}</span>
        : "A GitHub token for the sandbox repository")}
      <div style={{ fontSize: 12.5, color: "var(--on-surface-variant)", marginTop: 10 }}>
        Setup runs once, off this device, in a private repository used only for azphalt sandboxes.
      </div>
    </section>
  );
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

/** A pack of surfaces (`spec/package-format.md` § Surface format): it lists at least one `surface` asset. */
export const isSurfacePack = (p: PackageSummary) => (p.types ?? []).includes("surface");

/**
 * The front outline of each surface in a pack of surfaces, drawn from the surface's own profile data
 * (tools/surface-previews.mjs), on a light tile so the stroke reads on any card colour.
 */
function SurfaceThumbs({ surfaces, size = 72, max }: { surfaces: { surface: string; image: string }[]; size?: number; max?: number }) {
  const shown = max ? surfaces.slice(0, max) : surfaces;
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {shown.map((s) => (
        <figure key={s.image} style={{ margin: 0, textAlign: "center" }}>
          <img
            src={s.image}
            alt={`${s.surface} front outline`}
            loading="lazy"
            width={size}
            height={size}
            style={{ display: "block", borderRadius: 12, background: "rgba(255,255,255,0.9)" }}
          />
          {size >= 72 && <figcaption style={{ fontSize: 12.5, marginTop: 4 }}>{s.surface}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/**
 * Rendered sample strokes of a brush pack: one row per brush, one image per scenario. A kinetic brush has
 * several (speeds, a held pen, bursts), so the row scrolls and snaps; a plain brush has a single stroke.
 * The images are real renders of the brush, not icons.
 */
function StrokePreviews({ strokes }: { strokes: { brush: string; label: string; image: string }[] }) {
  const groups = new Map<string, typeof strokes>();
  for (const s of strokes) groups.set(s.brush, [...(groups.get(s.brush) ?? []), s]);
  return (
    <section aria-label="Sample strokes" style={{ marginTop: 28 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 12px" }}>Sample strokes</h3>
      {[...groups].map(([brush, list]) => (
        <div key={brush} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            {brush}
            {list.length > 1 && <span style={{ color: "var(--on-surface-variant)", fontWeight: 400 }}> · {list.length} scenarios</span>}
          </div>
          <div
            role="group"
            aria-label={`${brush} sample strokes`}
            tabIndex={list.length > 1 ? 0 : undefined}
            style={{ display: "flex", gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 6 }}
          >
            {list.map((s) => (
              <figure key={s.image} style={{ margin: 0, flex: "0 0 min(84%, 420px)", scrollSnapAlign: "start" }}>
                <img
                  src={s.image}
                  alt={`${brush}: ${s.label} sample stroke`}
                  loading="lazy"
                  style={{ width: "100%", display: "block", borderRadius: 14, background: "#0a0a0a" }}
                />
                <figcaption style={{ fontSize: 12.5, color: "var(--on-surface-variant)", marginTop: 4 }}>{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/**
 * A modal: `role="dialog"`, `aria-modal`, initial focus on its first control, Tab kept inside, Escape
 * and a scrim click close it, and focus goes back to whatever opened it.
 */
function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Held in a ref so a parent re-render (new inline lambda) does not re-run the effect and steal focus.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const el = ref.current;
    const focusables = () =>
      Array.from(
        el?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [],
      );
    (focusables()[0] ?? el)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) {
        e.preventDefault();
        return;
      }
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, []);
  return (
    <div className="dialog-scrim" onClick={() => closeRef.current()}>
      <div
        ref={ref}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div id={titleId} style={{ fontWeight: 800, fontSize: 18 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

/* ─────────────── hero + controls ─────────────── */

function heroPill(total: number, loading: boolean, failed: boolean): string {
  if (failed) return "Couldn't load";
  if (loading) return "Loading the Azphalt Store…";
  return `${total} portable ${total === 1 ? "extension" : "extensions"} · one open standard`;
}

function Hero({ total, loading, failed }: { total: number; loading: boolean; failed: boolean }) {
  return (
    <div style={{ padding: "40px 0 20px" }}>
      <span className="pill" style={{ background: "var(--secondary-container)", color: "var(--on-secondary-container)", fontSize: 13, padding: "8px 16px" }}>
        {heroPill(total, loading, failed)}
      </span>
      <h1 style={{ fontSize: 56, lineHeight: 1.05, fontWeight: 850, letterSpacing: -1.5, margin: "20px 0 0" }}>
        The open extension
        <br />
        <span style={{ color: "var(--primary)" }}>marketplace.</span>
      </h1>
      <p style={{ fontSize: 16, color: "var(--on-surface-variant)", maxWidth: 640, marginTop: 16 }}>
        Brushes, filters, tools and more — install an extension once and use it in any app that speaks Azphalt.
      </p>
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
  width?: number | string;
  height?: number;
}) {
  const [container, on] = paletteFor(pkg.id);
  const held = isHeld(useContext(InventoryContext), pkg.id);
  const paid = isPaid(pkg);
  const ratingLabel = formatRating(pkg.rating, pkg.ratingCount);
  return (
    <button
      className="pkg-card"
      onClick={() => onOpen(pkg)}
      style={{ width, height, background: container, color: on }}
    >
      <div style={{ position: "relative", flex: 1 }}>
        {pkg.preview?.surfaces?.length ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 10 }}>
            <SurfaceThumbs surfaces={pkg.preview.surfaces} size={56} max={3} />
          </div>
        ) : (
          <PreviewCanvas pkg={pkg} tint={on} active={active} />
        )}
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill text={pkg.kind.toUpperCase()} bg={rgba(on, 0.16)} fg={on} />
            {pkg.llm && <Pill text={llmTierLabel(pkg.llm)} bg={rgba(on, 0.16)} fg={on} />}
            {pkg.font?.variable && <Pill text={`VARIABLE · ${pkg.font.axes.join(" ")}`} bg={rgba(on, 0.16)} fg={on} />}
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
          {installCount(pkg) > 0 && <span style={{ opacity: 0.7 }}>{formatCount(installCount(pkg))} installs</span>}
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

/** A package may advertise several types; never infer the list from mediaDomains alone. */
export function packageTypeKeys(pkg: PackageSummary): string[] {
  const values = [
    pkg.kind,
    ...(pkg.types ?? []),
    ...(pkg.mediaDomains ?? []),
  ];
  return [...new Set(values.map((value) => value.trim().toLowerCase()).filter(Boolean))];
}

export function typeLabel(type: string): string {
  const names: Record<string, string> = {
    "3d": "3D", "2d": "2D", ai: "AI", a2a: "A2A", llm: "LLM",
    mcp: "MCP", ui: "UI", ux: "UX", hdri: "HDRI", vr: "VR", ar: "AR",
  };
  return names[type] ?? type.split(/[ _-]+/).map((part) =>
    part ? part[0].toUpperCase() + part.slice(1) : "",
  ).join(" ");
}

/** Featured carousel followed by complete, dynamically discovered type grids. */
export function buildSections(packages: PackageSummary[]): CatalogSection[] {
  if (packages.length === 0) return [];
  const byDownloads = (a: PackageSummary, b: PackageSummary) => installCount(b) - installCount(a);
  const groups = new Map<string, PackageSummary[]>();
  for (const pkg of packages) {
    for (const type of packageTypeKeys(pkg)) {
      const group = groups.get(type) ?? [];
      group.push(pkg);
      groups.set(type, group);
    }
  }
  return [
    { title: "Popular", subtitle: "Most installed across every host", items: [...packages].sort(byDownloads).slice(0, 14) },
    ...[...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([type, items]) => ({
      title: typeLabel(type),
      subtitle: `${items.length} ${items.length === 1 ? "extension" : "extensions"}`,
      items,
    })),
  ];
}

/**
 * Start-aligned Material 3 Expressive hero: one fixed focal keyline,
 * continuous card resizing, and horizontal drag/wheel/keyboard navigation.
 * Widths change within the tiles rather than cutting off a full-size card.
 * No automatic advancing: interaction, not a timer, owns the scroll position.
 */
function HeroCarousel({ section, onOpen }: { section: CatalogSection; onOpen: (p: PackageSummary) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef<{ id: number; startX: number; start: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const lastWheel = useRef(0);
  const max = section.items.length - 1;
  const clamp = (index: number) => Math.max(0, Math.min(max, index));
  const layout = heroKeylines(section.items.length, focus);
  const active = Math.round(focus);

  useEffect(() => {
    setFocus(0);
  }, [section.title]);

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      if (!horizontal) return;
      const delta = event.shiftKey && event.deltaX === 0 ? event.deltaY : event.deltaX;
      if ((delta < 0 && focus <= 0) || (delta > 0 && focus >= max)) return;
      event.preventDefault();
      if (event.timeStamp - lastWheel.current < 350) return;
      lastWheel.current = event.timeStamp;
      setFocus((previous) => clamp(Math.round(previous) + Math.sign(delta)));
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [focus, max]);

  const settle = (next: number) => {
    setDragging(false);
    setFocus(clamp(Math.round(next)));
  };

  return (
    <section className="expressive-hero-section" aria-label={section.title}>
      <div className="expressive-hero-heading">
        <div>
          <h2>{section.title}</h2>
          {section.subtitle && <div className="catalog-section-subtitle">{section.subtitle}</div>}
        </div>
        <div className="expressive-hero-actions">
          <button className="chip" type="button" aria-label="Previous featured extension"
            disabled={active === 0} onClick={() => settle(active - 1)}>‹</button>
          <button className="chip" type="button" aria-label="Next featured extension"
            disabled={active >= max} onClick={() => settle(active + 1)}>›</button>
        </div>
      </div>
      <div ref={scroller} className="expressive-hero-track" data-dragging={dragging ? "true" : "false"}
        role="region" aria-roledescription="carousel" aria-label={section.title} tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); settle(active + 1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); settle(active - 1); }
          if (event.key === "Home") { event.preventDefault(); settle(0); }
          if (event.key === "End") { event.preventDefault(); settle(max); }
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          pointer.current = { id: event.pointerId, startX: event.clientX, start: focus, moved: false };
          suppressClick.current = false;
        }}
        onPointerMove={(event) => {
          const p = pointer.current;
          if (!p || p.id !== event.pointerId) return;
          const delta = event.clientX - p.startX;
          if (Math.abs(delta) > 6) {
            p.moved = true;
            suppressClick.current = true;
            setDragging(true);
          }
          if (p.moved) {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            setFocus(clamp(p.start - delta / SLOT));
          }
        }}
        onPointerUp={(event) => {
          const p = pointer.current;
          if (!p || p.id !== event.pointerId) return;
          pointer.current = null;
          settle(p.moved ? focus : p.start);
        }}
        onPointerCancel={() => {
          pointer.current = null;
          setDragging(false);
          setFocus((previous) => clamp(Math.round(previous)));
        }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {section.items.map((pkg, i) => {
          const item = layout[i];
          return (
            <div key={pkg.id} className="expressive-hero-item" role="group"
              aria-roledescription="slide" aria-label={`${pkg.name}, ${i + 1} of ${section.items.length}`}
              style={{ left: item.left, width: item.width, height: HERO_H }}>
              <PackageCard pkg={pkg} active={i === active} onOpen={onOpen} width="100%" height={HERO_H} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Responsive grid: show every matching extension without a horizontal scroll strip. */
function CardRow({ section, onOpen }: { section: CatalogSection; onOpen: (p: PackageSummary) => void }) {
  return (
    <section className="catalog-section">
      <div className="catalog-section-heading">
        <h2>{section.title}</h2>
        {section.subtitle && <div className="catalog-section-subtitle">{section.subtitle}</div>}
      </div>
      <div className="catalog-grid">
        {section.items.map((pkg) => (
          <div key={pkg.id} className="catalog-grid-item">
            <PackageCard pkg={pkg} active={false} onOpen={onOpen} width="100%" height={ROW_H} />
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
  // The aggregate as the server last reported it; replaced by the response when this browser rates.
  const [aggregate, setAggregate] = useState({ rating: pkg.rating, ratingCount: pkg.ratingCount });
  const [myStars, setMyStars] = useState(0);
  const [rateNote, setRateNote] = useState<string | null>(null);
  const ratingLabel = formatRating(aggregate.rating, aggregate.ratingCount);
  const hosts = useMemo(() => hostsFor(pkg, catalog), [pkg, catalog]);

  const rate = async (stars: number) => {
    setMyStars(stars);
    setRateNote(null);
    try {
      const r = await ratePackage(pkg.id, stars);
      if (r.error) {
        setRateNote(r.error);
        setMyStars(0);
      } else {
        setAggregate({ rating: r.rating, ratingCount: r.ratingCount });
        setRateNote("Thanks — your rating is saved for this browser.");
      }
    } catch (e) {
      setRateNote((e as Error).message);
      setMyStars(0);
    }
  };

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
      <div style={{ position: "relative", height: 220, overflow: "hidden", background: container, color: on, borderRadius: 26, marginTop: 20 }}>
        <PreviewCanvas pkg={pkg} tint={on} active />
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: 20 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <Pill text={pkg.kind.toUpperCase()} bg={rgba(on, 0.16)} fg={on} />
            {pkg.llm && <Pill text={llmTierLabel(pkg.llm)} bg={rgba(on, 0.16)} fg={on} />}
            {pkg.font?.variable && <Pill text={`VARIABLE · ${pkg.font.axes.join(" ")}`} bg={rgba(on, 0.16)} fg={on} />}
            {isMature(pkg) && <Pill text="18+" bg="var(--secondary-container)" fg="var(--on-secondary-container)" />}
          </div>
          <Pill text={`v${pkg.version}`} bg={rgba(on, 0.16)} fg={on} />
        </div>
      </div>
      <h2 style={{ fontSize: 34, fontWeight: 800, margin: "28px 0 0" }}>{pkg.name}</h2>
      {pkg.author && <div style={{ color: "var(--on-surface-variant)", fontSize: 16, marginTop: 6 }}>by {pkg.author}</div>}

      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 16, fontWeight: 700 }}>
        <span style={{ color: ratingLabel ? "var(--primary)" : "var(--on-surface-variant)" }}>{ratingLabel ?? "No ratings yet"}</span>
        {installCount(pkg) > 0 && <span style={{ color: "var(--on-surface-variant)" }}>{formatCount(installCount(pkg))} installs</span>}
      </div>

      <p style={{ fontSize: 16, color: "var(--on-surface-variant)", marginTop: 20 }}>{pkg.description ?? "No description available."}</p>
      {pkg.capabilities && pkg.capabilities.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
          {pkg.capabilities.map((c) => (
            <Pill key={c} text={c} bg="var(--secondary-container)" fg="var(--on-secondary-container)" />
          ))}
        </div>
      )}
      {pkg.preview?.strokes && pkg.preview.strokes.length > 0 && <StrokePreviews strokes={pkg.preview.strokes} />}
      {pkg.preview?.surfaces && pkg.preview.surfaces.length > 0 && (
        <section aria-label="Surfaces in this pack" style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 12px" }}>Surfaces</h3>
          <SurfaceThumbs surfaces={pkg.preview.surfaces} size={96} />
        </section>
      )}
      {pkg.llm && <LlmDisclosure llm={pkg.llm} />}
      {(pkg.targetApps ?? []).length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface-variant)" }}>Available in</span>
          {(pkg.targetApps ?? []).map((a) => (
            <a key={a} className="chip" href={`/app/${encodeURIComponent(a)}`} style={{ textDecoration: "none" }}>
              {a.split(".").pop() ?? a}
            </a>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 20 }} role="group" aria-label="Rate this extension">
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface-variant)", marginRight: 6 }}>Rate</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className="chip"
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            aria-pressed={myStars === n}
            onClick={() => void rate(n)}
            style={{ fontSize: 18, padding: "0 12px", color: n <= myStars ? "var(--primary)" : "var(--on-surface-variant)" }}
          >
            ★
          </button>
        ))}
      </div>
      <div role="status" aria-live="polite" style={{ fontSize: 13, color: "var(--on-surface-variant)", marginTop: 6 }}>{rateNote}</div>
      <button
        onClick={buy}
        disabled={busy}
        style={{ marginTop: 32, border: "none", borderRadius: 999, padding: "14px 28px", fontSize: 16, fontWeight: 700, background: "var(--primary)", color: "var(--on-primary)" }}
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

      <div style={{ marginTop: 28 }}>
        <a
          href={`/report?${new URLSearchParams({ packageId: pkg.id, version: pkg.version }).toString()}`}
          style={{ fontSize: 13, color: "var(--on-surface-variant)" }}
        >
          Report this extension
        </a>
      </div>

      {dialog && (
        <Dialog title={paid ? "Checkout" : "Install"} onClose={() => setDialog(null)}>
          <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>{dialog}</p>
          <button className="chip" style={{ marginTop: 8 }} onClick={() => setDialog(null)}>OK</button>
        </Dialog>
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
    <Dialog title={`Install “${pkg.name}”`} onClose={onDismiss}>
        <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>
          Nothing on this device opened the link. Download the package and open it in a host, or install one below.
        </p>

        <a
          href={downloadUrl(pkg.id, pkg.version)}
          download
          className="action"
          style={{ marginTop: 16, background: "var(--primary)", color: "var(--on-primary)" }}
        >
          Download .azp
        </a>

        {hosts.length > 0 && (
          <>
            <div style={{ marginTop: 20, fontSize: 13, fontWeight: 700, color: "var(--on-surface-variant)" }}>
              {(pkg.targetApps ?? []).length === 0 ? "Apps that run Azphalt extensions" : "Made for"}
            </div>
            {hosts.map((h) => (
              <a
                key={h.hostId}
                href={h.installUrl}
                target="_blank"
                /* The listings are third-party URLs from the registry — deny them window.opener. */
                rel="noopener noreferrer"
                className="action"
                style={{ background: "var(--surface-highest)", color: "var(--on-surface)" }}
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
    </Dialog>
  );
}

/* ─────────────── app ─────────────── */

function StorefrontApp() {
  const [packages, setPackages] = useState<PackageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const load = () => {
    setLoading(true);
    setLoadError(null);
    fetchPackages()
      .then((all) => {
        setPackages(all);
        // `/?package=<id>` opens that package's detail — the link the per-app page uses.
        const wanted = new URLSearchParams(window.location.search).get("package");
        const hit = wanted ? all.find((p) => p.id === wanted) : undefined;
        if (hit) open(hit);
      })
      .catch((e) => {
        console.error("Failed to fetch packages:", e);
        setLoadError(
          navigator.onLine === false
            ? "You're offline. Connect to the internet and try again."
            : "The Azphalt Store didn't answer. It may be down for a moment — try again.",
        );
      })
      .finally(() => setLoading(false));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(load, []);

  const categories = useMemo(
    () => [...new Set(packages.flatMap(packageTypeKeys))].sort(),
    [packages],
  );
  const apps = useMemo(() => [...new Set(packages.flatMap((p) => p.targetApps ?? []))].sort(), [packages]);

  const filtering = query.trim() !== "" || price !== 0 || category !== null || app !== null || owned !== 0;
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = packages.filter((p) => {
      const matchesQuery = !q || [p.name, p.description ?? "", p.author ?? "", p.id].some((s) => s.toLowerCase().includes(q));
      const matchesPrice = price === 1 ? !isPaid(p) : price === 2 ? isPaid(p) : true;
      const matchesCat = !category || packageTypeKeys(p).includes(category);
      const matchesApp = !app || (p.targetApps ?? []).length === 0 || (p.targetApps ?? []).includes(app);
      // `removed` is kept rather than deleted so a reinstall can be offered, so "have it" is a
      // question about the state and not about the key being present — hence `isHeld`, not `in`.
      const held = isHeld(inventory, p.id);
      const matchesOwned = owned === 1 ? held : owned === 2 ? !held : true;
      return matchesQuery && matchesPrice && matchesCat && matchesApp && matchesOwned;
    });
    const by = {
      popular: (a: PackageSummary, b: PackageSummary) => installCount(b) - installCount(a),
      rating: (a: PackageSummary, b: PackageSummary) => (b.rating ?? -1) - (a.rating ?? -1),
      recent: (a: PackageSummary, b: PackageSummary) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
      name: (a: PackageSummary, b: PackageSummary) => a.name.localeCompare(b.name),
    }[sort];
    return [...filtered].sort(by);
  }, [packages, query, price, category, app, owned, inventory, sort]);
  const sections = useMemo(() => buildSections(shown), [shown]);

  return (
    <InventoryContext.Provider value={inventory}>
    <div style={{ minHeight: "100%", paddingBottom: 96 }}>
      <div style={{ padding: "0 24px" }}>
        <Hero total={packages.length} loading={loading} failed={loadError !== null} />
        <nav style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "-6px 0 22px" }} aria-label="Store account actions">
          <a className="chip" href="/purchases" style={{ textDecoration: "none" }}>Purchases</a>
          <a className="chip" href="/connect/onboard" style={{ textDecoration: "none" }}>Sell on Azphalt</a>
          <a className="chip" href="/publish" style={{ textDecoration: "none" }}>Publish</a>
          <a className="chip" href="/agents" style={{ textDecoration: "none" }}>A2A Agents</a>
        </nav>
        <div style={{ marginBottom: 24 }}>
          <input
            type="search"
            className="field"
            aria-label="Search extensions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search extensions…"
            style={{ padding: "14px 22px" }}
          />
          <div className="store-filter-bar" role="group" aria-label="Store filters">
            <label className="store-filter-select">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                {SORTS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="store-filter-select">
              <span>Price</span>
              <select value={price} onChange={(e) => setPrice(Number(e.target.value))}>
                <option value={0}>All</option>
                <option value={1}>Free</option>
                <option value={2}>Paid</option>
              </select>
            </label>
            <label className="store-filter-select">
              <span>Installed</span>
              <select value={owned} onChange={(e) => setOwned(Number(e.target.value))}>
                <option value={0}>Any</option>
                <option value={1}>Installed</option>
                <option value={2}>Not installed</option>
              </select>
            </label>
            <label className="store-filter-select">
              <span>Types</span>
              <select value={category ?? ""} onChange={(e) => setCategory(e.target.value || null)}>
                <option value="">All types</option>
                {categories.map((type) => <option key={type} value={type}>{typeLabel(type)}</option>)}
              </select>
            </label>
            <label className="store-filter-select">
              <span>Apps</span>
              <select value={app ?? ""} onChange={(e) => setApp(e.target.value || null)}>
                <option value="">All apps</option>
                {apps.map((value) => <option key={value} value={value}>{value.split(".").pop() ?? value}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--on-surface-variant)" }}>Loading…</div>
      ) : loadError ? (
        <div role="alert" style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Couldn't load the extensions</div>
          <p style={{ color: "var(--on-surface-variant)", margin: "8px auto 16px", maxWidth: 480 }}>{loadError}</p>
          <button className="chip" onClick={load} style={{ background: "var(--primary)", color: "var(--on-primary)" }}>Retry</button>
        </div>
      ) : shown.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--on-surface-variant)" }}>No extensions match your search.</div>
      ) : (
        <>
          {category === null ? (
            <>
              {query.trim() === "" && sort !== "name" && shown.length > 0 && (
                <HeroCarousel
                  section={{
                    title: SORTS.find(([key]) => key === sort)?.[1] ?? "Featured",
                    subtitle: sort === "popular" ? "Most installed across every host" : sort === "rating" ? "Highest rated by the community" : "Recently published and updated",
                    items: shown.slice(0, 14),
                  }}
                  onOpen={open}
                />
              )}
              {filtering && (
                <div className="catalog-results-heading">
                  <h2>Results</h2>
                  <div>{shown.length} matching</div>
                </div>
              )}
              {sections.slice(1).map((section) => (
                <CardRow key={section.title} section={section} onOpen={open} />
              ))}
            </>
          ) : (
            <CardRow section={{ title: typeLabel(category), subtitle: `${shown.length} matching`, items: shown }} onOpen={open} />
          )}
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

/** Two-letter codes Stripe Express accepts for a seller, the common ones first. */
const SELLER_COUNTRIES: Array<[string, string]> = [
  ["US", "United States"], ["GB", "United Kingdom"], ["CA", "Canada"], ["AU", "Australia"], ["IE", "Ireland"],
  ["DE", "Germany"], ["FR", "France"], ["ES", "Spain"], ["IT", "Italy"], ["NL", "Netherlands"], ["BE", "Belgium"],
  ["AT", "Austria"], ["CH", "Switzerland"], ["SE", "Sweden"], ["NO", "Norway"], ["DK", "Denmark"], ["FI", "Finland"],
  ["PT", "Portugal"], ["PL", "Poland"], ["CZ", "Czechia"], ["NZ", "New Zealand"], ["JP", "Japan"], ["SG", "Singapore"],
  ["HK", "Hong Kong"], ["MX", "Mexico"], ["BR", "Brazil"],
];

/** Where "Request an invite" goes: the store owner's inbox. */
const INVITE_REQUEST_HREF =
  "mailto:hereliesaz@gmail.com?" +
  new URLSearchParams({
    subject: "Sell on Azphalt: invite request",
    body: "Hi, I'd like to sell extensions on the Azphalt Store.\n\nSeller ID I'd like: seller_\nWhat I make: \n",
  })
    .toString()
    .replace(/\+/g, "%20");

function SellerOnboardingPage() {
  const params = new URLSearchParams(window.location.search);
  const initialSeller = params.get("sellerId") ?? "";
  const [sellerId, setSellerId] = useState(initialSeller);
  // The operator issues one code per seller id; it may arrive as ?invite= on the link they send.
  const [inviteCode, setInviteCode] = useState(params.get("invite") ?? "");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [status, setStatus] = useState<{ text: string; error: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const ok = (text: string) => setStatus({ text, error: false });
  const fail = (text: string) => setStatus({ text, error: true });

  useEffect(() => {
    if (!initialSeller) return;
    fetchSellerStatus(initialSeller, true)
      .then((seller) => {
        if (seller.error) fail(seller.error);
        else if (!seller.onboarded) ok("Stripe account not started yet.");
        else if (seller.chargesEnabled && seller.payoutsEnabled) ok("Ready to sell and receive payouts.");
        else ok("Stripe still needs information before this seller can receive purchases.");
      })
      .catch(() => fail("Couldn't check this seller's status. Check your connection and reload the page."));
  }, [initialSeller]);

  const begin = async () => {
    const id = sellerId.trim();
    if (!id) {
      fail("Enter a seller ID.");
      return;
    }
    if (!inviteCode.trim()) {
      fail("Enter the invite code you were sent for this seller ID. No code yet? Request an invite below.");
      return;
    }
    setBusy(true);
    ok("Opening Stripe…");
    try {
      const result = await startSellerOnboarding({
        sellerId: id,
        inviteCode: inviteCode.trim(),
        email: email.trim() || undefined,
        country: country.trim().toUpperCase() || undefined,
      });
      if (result.error) {
        fail(result.error);
        return;
      }
      if (result.url) {
        window.location.assign(result.url);
        return;
      }
      fail("Stripe didn't send back a setup link. Try again in a few minutes.");
    } catch {
      fail("Couldn't reach the Azphalt Store. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const label = { display: "block", marginTop: 18, fontWeight: 800 } as const;
  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 720, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>Sell on Azphalt</h1>
      <p style={{ color: "var(--on-surface-variant)" }}>
        Connect a Stripe Express account to get paid. Stripe handles identity checks and payouts; Azphalt keeps only
        your connected-account id and whether it is ready.
      </p>
      <p style={{ color: "var(--on-surface-variant)" }}>
        Selling is invite-only for now. <a href={INVITE_REQUEST_HREF} style={{ color: "var(--ink)", fontWeight: 800 }}>Request an invite</a>
        {" "}and you'll get a seller ID and invite code by email.
      </p>
      <form onSubmit={(e) => { e.preventDefault(); void begin(); }}>
        <label htmlFor="seller-id" style={label}>Seller ID</label>
        <input id="seller-id" className="field" aria-describedby="seller-id-hint" value={sellerId} onChange={(e) => setSellerId(e.target.value)} placeholder="seller_yourname" autoComplete="off" spellCheck={false} style={{ marginTop: 6 }} />
        <p id="seller-id-hint" className="hint">The name your extensions are sold under, like seller_yourname. It comes with your invite.</p>
        <label htmlFor="invite-code" style={label}>Invite code</label>
        <input id="invite-code" className="field" aria-describedby="invite-code-hint" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} autoComplete="off" spellCheck={false} style={{ marginTop: 6 }} />
        <p id="invite-code-hint" className="hint">The one-time code in your invite email. It only works with the seller ID it was issued for.</p>
        <label htmlFor="seller-email" style={label}>Email (optional)</label>
        <input id="seller-email" className="field" aria-describedby="seller-email-hint" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" style={{ marginTop: 6 }} />
        <p id="seller-email-hint" className="hint">Pre-fills Stripe's form.</p>
        <label htmlFor="seller-country" style={label}>Country</label>
        <select id="seller-country" className="field" aria-describedby="seller-country-hint" value={country} onChange={(e) => setCountry(e.target.value)} style={{ marginTop: 6, maxWidth: 320 }}>
          {SELLER_COUNTRIES.map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        <p id="seller-country-hint" className="hint">Where your bank account is. Stripe can't change this later.</p>
        <div>
          <button
            type="submit"
            disabled={busy}
            style={{ marginTop: 22, border: 0, borderRadius: 999, minHeight: 44, padding: "14px 24px", fontWeight: 800, background: "var(--primary)", color: "var(--on-primary)" }}
          >
            {busy ? "Opening Stripe…" : "Continue with Stripe"}
          </button>
        </div>
      </form>
      <p role="status" aria-live="polite" style={{ marginTop: 18, color: status?.error ? "var(--error)" : "var(--on-surface-variant)", fontWeight: status?.error ? 700 : 400 }}>
        {status?.text}
      </p>
    </main>
  );
}

function CheckoutSuccessPage() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id") ?? "";
  const [status, setStatus] = useState(sessionId ? "Waiting for payment confirmation…" : "Missing checkout session.");
  const [packageId, setPackageId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;
    let timer = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const result = await fetchCheckoutStatus(sessionId);
        if (cancelled) return;
        if (result.status === "ready" && result.packageId && result.token) {
          setPackageId(result.packageId);
          setToken(result.token);
          setStatus("Purchase ready.");
          return;
        }
        if (result.status === "revoked") {
          setStatus("This purchase was refunded or disputed, so it no longer carries a licence.");
          return;
        }
        setStatus("Payment received. Preparing your license…");
      } catch (error) {
        if (!cancelled) setStatus(error instanceof Error ? error.message : "Could not check purchase.");
      }
      if (!cancelled && attempts < 60) timer = window.setTimeout(poll, 1500);
      else if (!cancelled && attempts >= 60) setStatus("Still waiting for fulfilment. Your purchase remains recoverable from Purchases.");
    };

    void poll();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [sessionId]);

  const download = async () => {
    if (!packageId || !token) return;
    setBusy(true);
    try {
      await downloadPurchase(packageId, token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 720, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>Purchase</h1>
      <p style={{ fontSize: 18, color: "var(--on-surface-variant)" }}>{status}</p>
      {packageId && token && (
        <>
          <div style={{ marginTop: 24, fontWeight: 800 }}>{packageId}</div>
          <button
            onClick={download}
            disabled={busy}
            style={{ marginTop: 18, border: 0, padding: "14px 24px", fontWeight: 800, background: "var(--primary)", color: "var(--on-primary)" }}
          >
            {busy ? "Downloading…" : "Download .azp"}
          </button>
        </>
      )}
      <div style={{ marginTop: 24 }}>
        <a href="/purchases">Recover all purchases</a>
      </div>
    </main>
  );
}

function PurchasesPage() {
  const [items, setItems] = useState<Purchase[]>([]);
  const [status, setStatus] = useState("Loading purchases…");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    fetchPurchases()
      .then((purchases) => {
        setItems(purchases);
        setStatus(purchases.length ? "" : "No purchases are linked to this browser yet.");
      })
      .catch((error) => setStatus(error instanceof Error ? error.message : "Could not load purchases."));
  }, []);

  const download = async (purchase: Purchase) => {
    setBusy(purchase.sessionId);
    try {
      await downloadPurchase(purchase.packageId, purchase.token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 820, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>Purchases</h1>
      {status && <p style={{ color: "var(--on-surface-variant)" }}>{status}</p>}
      <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
        {items.map((purchase) => (
          <div key={purchase.sessionId} style={{ padding: 18, background: "var(--surface-highest)", borderRadius: 20 }}>
            <div style={{ fontWeight: 850 }}>{purchase.packageId}</div>
            <div style={{ fontSize: 13, marginTop: 4, color: "var(--on-surface-variant)" }}>
              {new Date(purchase.issuedAt).toLocaleString()}
            </div>
            <button
              onClick={() => void download(purchase)}
              disabled={busy === purchase.sessionId}
              style={{ marginTop: 12, border: 0, padding: "10px 18px", fontWeight: 800, background: "var(--primary)", color: "var(--on-primary)" }}
            >
              {busy === purchase.sessionId ? "Downloading…" : "Download .azp"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

/**
 * `/report?packageId=…&version=…` — file a report (`spec/marketplace-integrity.md` § 2). A web report
 * is untrusted: it goes to the moderation queue and never takes anything down on its own.
 */
function ReportPage() {
  const params = new URLSearchParams(window.location.search);
  const [packageId, setPackageId] = useState(params.get("packageId") ?? "");
  const version = params.get("version") ?? undefined;
  const [reason, setReason] = useState<string>("broken");
  const [detail, setDetail] = useState("");
  const [originalPackageId, setOriginalPackageId] = useState("");
  const [claimant, setClaimant] = useState("");
  const [signature, setSignature] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string }>({ kind: "idle" });
  const ipClaim = reason === "ip-claim";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ kind: "sending" });
    const r = await fileReport({
      packageId: packageId.trim(),
      version,
      reason,
      detail: detail.trim() || undefined,
      ...(ipClaim
        ? {
            originalPackageId: originalPackageId.trim(),
            claimant: claimant.trim() || undefined,
            signature: signature.trim() || undefined,
          }
        : {}),
    }).catch((err: Error) => ({ error: err.message }));
    setState(r.error ? { kind: "error", message: r.error } : { kind: "sent" });
  };

  const field = { width: "100%", boxSizing: "border-box" as const, border: "2px solid var(--on-background)", borderRadius: 22, background: "var(--fold-light)", color: "var(--on-background)", padding: "10px 12px", fontSize: 15, marginTop: 6 };
  const label = { display: "block", marginTop: 18, fontSize: 13, fontWeight: 700, color: "var(--on-surface-variant)" };

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 640, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>Report an extension</h1>
      {state.kind === "sent" ? (
        <p style={{ color: "var(--on-surface-variant)" }}>
          Thanks. Your report is in the moderation queue. Nothing that identifies you was stored with it
          {ipClaim && claimant.trim() ? ", apart from the name you gave" : ""}.
        </p>
      ) : (
        <form onSubmit={(e) => void submit(e)}>
          <p style={{ color: "var(--on-surface-variant)" }}>
            A moderator reviews every report. Reports from the web never remove anything automatically.
          </p>
          <label style={label}>
            Package id
            <input required value={packageId} onChange={(e) => setPackageId(e.target.value)} style={field} />
          </label>
          <label style={label}>
            What's wrong
            <select value={reason} onChange={(e) => setReason(e.target.value)} style={field}>
              {REPORT_REASONS.map(([value, text]) => (
                <option key={value} value={value}>{text}</option>
              ))}
            </select>
          </label>
          {ipClaim && (
            <>
              <label style={label}>
                Your original package id
                <input required value={originalPackageId} onChange={(e) => setOriginalPackageId(e.target.value)} style={field} />
              </label>
              <label style={label}>
                Your name or organisation (optional — stored with the claim)
                <input value={claimant} onChange={(e) => setClaimant(e.target.value)} style={field} />
              </label>
              <label style={label}>
                Signature (optional) — base64 Ed25519 signature of{" "}
                <code>azphalt-ip-claim:v1:{packageId || "<packageId>"}:{originalPackageId || "<originalPackageId>"}</code>{" "}
                by your package's publisher key
                <input value={signature} onChange={(e) => setSignature(e.target.value)} style={field} />
              </label>
            </>
          )}
          <label style={label}>
            Details (optional)
            <textarea value={detail} onChange={(e) => setDetail(e.target.value)} maxLength={4000} rows={6} style={field} />
          </label>
          {state.kind === "error" && <p role="alert" style={{ color: "var(--error)", fontWeight: 700 }}>{state.message}</p>}
          <button
            type="submit"
            disabled={state.kind === "sending"}
            style={{ marginTop: 20, border: 0, padding: "12px 22px", fontWeight: 800, background: "var(--primary)", color: "var(--on-primary)" }}
          >
            {state.kind === "sending" ? "Sending…" : "Send report"}
          </button>
        </form>
      )}
    </main>
  );
}

/**
 * `/moderation` — the report queue, newest first. Gated by the store's `ADMIN_TOKEN`, which is held in
 * this page's memory only: it is never written to storage, so closing the tab signs out.
 */
function ModerationPage() {
  const [token, setToken] = useState("");
  const [reports, setReports] = useState<Report[] | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const load = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setStatus("Loading…");
    try {
      setReports(await fetchReports(token));
      setStatus(null);
    } catch (err) {
      setReports(null);
      setStatus((err as Error).message);
    }
  };

  const resolve = async (r: Report, action: "dismiss" | "yank") => {
    if (action === "yank" && !window.confirm(
      `Yank ${r.packageId}${r.version ? " " + r.version : ""}? It stops downloading and installed hosts are told to disable it.`,
    )) return;
    try {
      await resolveReport(token, r.id, action);
      await load();
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 820, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>Moderation queue</h1>
      <p style={{ color: "var(--on-surface-variant)" }}>
        Filed reports, newest first. Every web report is untrusted: it waits here for a person and never
        quarantines a package on its own.
      </p>
      <form onSubmit={(e) => void load(e)} style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Admin token"
          autoComplete="off"
          style={{ flex: 1, border: "2px solid var(--on-background)", borderRadius: 22, background: "var(--fold-light)", color: "var(--on-background)", padding: "10px 12px", fontSize: 15 }}
        />
        <button className="chip" type="submit">{reports ? "Refresh" : "Open"}</button>
      </form>
      {status && <p style={{ color: "var(--on-surface-variant)" }}>{status}</p>}
      {reports && reports.length === 0 && <p style={{ color: "var(--on-surface-variant)" }}>No reports filed.</p>}
      <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
        {(reports ?? []).map((r) => (
          <div key={r.id} style={{ padding: 18, background: "var(--surface-highest)", borderRadius: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
              <strong>{r.packageId}{r.version ? ` @ ${r.version}` : ""}</strong>
              <span style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{new Date(r.reportedAt).toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, fontSize: 12 }}>
              <Pill text={r.reason} bg="var(--secondary-container)" fg="var(--on-secondary-container)" />
              <span style={{ color: "var(--on-surface-variant)" }}>{r.trusted ? "trusted" : "untrusted"}</span>
            </div>
            {r.reason === "ip-claim" && (
              <div style={{ fontSize: 13, marginTop: 8, color: "var(--on-surface-variant)" }}>
                Claims to copy <strong>{r.originalPackageId}</strong>
                {r.claimant ? ` · claimant: ${r.claimant}` : ""}
                {r.signature ? " · signature supplied (unverified)" : ""}
              </div>
            )}
            {r.detail && <p style={{ fontSize: 13, whiteSpace: "pre-wrap", color: "var(--on-surface-variant)", marginBottom: 0 }}>{r.detail}</p>}
            <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center", fontSize: 13 }}>
              {r.resolution ? (
                <span style={{ color: "var(--on-surface-variant)" }}>
                  {r.resolution === "yanked" ? "Yanked" : "Dismissed"}
                  {r.resolvedAt ? ` · ${new Date(r.resolvedAt).toLocaleString()}` : ""}
                </span>
              ) : (
                <>
                  <button className="chip" type="button" onClick={() => void resolve(r, "dismiss")}>Dismiss</button>
                  <button className="chip" type="button" onClick={() => void resolve(r, "yank")}>
                    Yank {r.version ? r.version : "current version"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/**
 * `/app/<appId>` — the packages one host app can see: those scoped to it (its companions and
 * app-specific packages) and every global one (`spec/repository-api.md` § App scoping).
 */
function AppCatalogPage({ appId }: { appId: string }) {
  const [packages, setPackages] = useState<PackageSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages().then(setPackages).catch((e: Error) => setError(e.message));
  }, []);

  const scoped = (packages ?? []).filter((p) => (p.targetApps ?? []).includes(appId));
  const global = (packages ?? []).filter((p) => (p.targetApps ?? []).length === 0);
  const host = (packages ?? []).find((p) => p.kind === "app" && p.app?.hostId === appId);

  const list = (title: string, items: PackageSummary[]) =>
    items.length > 0 && (
      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20 }}>{title} <span style={{ color: "var(--on-surface-variant)", fontWeight: 400 }}>· {items.length}</span></h2>
        <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
          {items.map((p) => (
            <a
              key={p.id}
              href={`/?package=${encodeURIComponent(p.id)}`}
              style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 16px", background: "var(--surface-highest)", color: "var(--on-surface)", textDecoration: "none" }}
            >
              <span><strong>{p.name}</strong> <span style={{ color: "var(--on-surface-variant)", fontSize: 13 }}>{p.kind}</span></span>
              <span style={{ color: "var(--on-surface-variant)", fontSize: 13 }}>{priceLabel(p)}</span>
            </a>
          ))}
        </div>
      </section>
    );

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 820, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>{host?.name ?? appId}</h1>
      <p style={{ color: "var(--on-surface-variant)" }}>
        Everything <code>{appId}</code> can use: packages made for it, plus every package that works in any app.
      </p>
      {error && <p style={{ color: "var(--on-surface-variant)" }}>{error}</p>}
      {!packages && !error && <p style={{ color: "var(--on-surface-variant)" }}>Loading…</p>}
      {packages && scoped.length === 0 && <p style={{ color: "var(--on-surface-variant)" }}>Nothing is made specifically for this app yet.</p>}
      {list("Made for this app", scoped)}
      {list("Works in any app", global)}
    </main>
  );
}

/**
 * `/publish` — send a signed `.azp` to the store. Nothing goes live from here: the store opens a pull
 * request against its git-backed catalog, and the merge is what publishes (`spec/repository-api.md` § 9).
 */
function PublishPage() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<
    { kind: "idle" | "sending" } | { kind: "done"; ticket: PublishTicket } | { kind: "error"; message: string; details?: string[] }
  >({ kind: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setState({ kind: "sending" });
    try {
      const r = await publishPackage(await file.arrayBuffer());
      setState("error" in r ? { kind: "error", message: r.error, details: r.details } : { kind: "done", ticket: r });
    } catch (err) {
      setState({ kind: "error", message: (err as Error).message });
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 640, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, marginTop: 32 }}>Publish</h1>
      <p style={{ color: "var(--on-surface-variant)" }}>
        Send a <strong>signed</strong> <code>.azp</code> (<code>signAzp</code> with your publisher key). The store checks it
        and opens a pull request; it goes live when a maintainer merges it. Your first publish of an id pins your key —
        every later version must be signed by the same key. Up to 4 MB; put heavy assets behind <code>remoteUrl</code>.
      </p>
      {state.kind === "done" ? (
        <div style={{ padding: 18, background: "var(--surface-highest)", borderRadius: 20, marginTop: 24 }}>
          <div style={{ fontWeight: 850 }}>{state.ticket.id} {state.ticket.version} is waiting for review</div>
          <p style={{ color: "var(--on-surface-variant)", fontSize: 14 }}>
            {state.ticket.publisher.pin === "new"
              ? "This is the first publish of this id: merging it pins your key."
              : "Signed by the key already pinned for this id."}
          </p>
          <a href={state.ticket.review} target="_blank" rel="noopener noreferrer">Follow the review →</a>
        </div>
      ) : (
        <form onSubmit={(e) => void submit(e)} style={{ marginTop: 24 }}>
          <input type="file" accept=".azp,application/vnd.azphalt.package" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <div>
            <button
              type="submit"
              disabled={!file || state.kind === "sending"}
              style={{ marginTop: 20, border: 0, padding: "12px 22px", fontWeight: 800, background: "var(--primary)", color: "var(--on-primary)" }}
            >
              {state.kind === "sending" ? "Checking…" : "Publish"}
            </button>
          </div>
          {state.kind === "error" && (
            <div role="alert" style={{ marginTop: 16, color: "var(--error)", fontWeight: 700 }}>
              <p style={{ margin: 0 }}>{state.message}</p>
              {state.details && (
                <ul style={{ fontSize: 13 }}>
                  {state.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )}
            </div>
          )}
        </form>
      )}
    </main>
  );
}

/**
 * /agents is a discovery directory of external A2A agents, not the signed Azphalt
 * package catalog. A model asset or an Azphalt llm install is NEVER inferred from a card.
 */
function AgentDirectoryPage() {
  const [agents, setAgents] = useState<A2AAgentListing[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchA2AAgents()
      .then(setAgents)
      .catch((failure: Error) => setError(failure.message))
      .finally(() => setLoading(false));
  }, []);

  const terms = query.trim().toLowerCase();
  const filtered = agents.filter((agent) =>
    !terms || [agent.name, agent.description, agent.endpoint, agent.ans_claim?.name ?? "", ...agent.skills.flatMap((skill) =>
      [skill.name, skill.description, ...(Array.isArray(skill.tags) ? skill.tags : [])])]
      .some((value) => typeof value === "string" && value.toLowerCase().includes(terms))
  );

  return (
    <main style={{ minHeight: "100vh", padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <a href="/" className="chip" style={{ textDecoration: "none" }}>← Azphalt Store</a>
      <h1 style={{ fontSize: 44, margin: "32px 0 6px" }}>A2A Agents</h1>
      <p style={{ color: "var(--on-surface-variant)", maxWidth: 700 }}>
        Discovered automatically by SearchA2A. These are third-party agent endpoints, not verified
        running services, installable models, or signed Azphalt packages.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "20px 0 28px" }}>
        <input type="search" className="field" value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="Search agent names, skills, protocols…" aria-label="Search discovered A2A agents"
          style={{ flex: "1 1 240px", padding: "13px 20px" }} />
        <a className="chip" href="https://searcha2a.azphalt.store/" rel="noopener noreferrer"
          target="_blank" style={{ textDecoration: "none" }}>Live SearchA2A</a>
      </div>
      {loading && <p>Loading discovered agents…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <p style={{ color: "var(--on-surface-variant)" }}>
        {filtered.length} discovered agent{filtered.length === 1 ? "" : "s"}
      </p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14 }}>
        {filtered.map((agent) => (
          <article key={agent.id} style={{ background: "var(--surface-highest)", borderRadius: 22, padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 750, color: "var(--on-surface-variant)" }}>
              EXTERNAL A2A · CARD ONLY
            </div>
            <h2 style={{ fontSize: 20, margin: "10px 0 8px" }}>{agent.name}</h2>
            {agent.ans_claim && <p style={{ fontSize: 12, color: "var(--on-surface-variant)", overflowWrap: "anywhere" }}>
              <strong>ANS claim (unverified): </strong>{agent.ans_claim.name}
            </p>}
            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", whiteSpace: "pre-wrap" }}>
              {agent.description || "No description supplied by the Agent Card."}
            </p>
            {agent.skills.length > 0 && <div style={{ marginBottom: 12, fontSize: 13 }}>
              <strong>Skills: </strong>{agent.skills.map((skill) => skill.name).join(", ")}
            </div>}
            {agent.protocols.length > 0 && <div style={{ fontSize: 13 }}>
              <strong>Protocols: </strong>{agent.protocols.join(", ")}
            </div>}
            {agent.security_schemes.length > 0 && <div style={{ fontSize: 13 }}>
              <strong>Authentication: </strong>{agent.security_schemes.join(", ")}
            </div>}
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap", fontSize: 13 }}>
              {safeHref(agent.source_url) && <a href={safeHref(agent.source_url)} target="_blank" rel="noopener noreferrer">Agent Card</a>}
              {safeHref(agent.discovery_url) && <a href={safeHref(agent.discovery_url)} target="_blank" rel="noopener noreferrer">Metadata</a>}
              {safeHref(agent.endpoint) && <a href={safeHref(agent.endpoint)} target="_blank" rel="noopener noreferrer">Endpoint</a>}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

/** Every page's footer: the legal pages, and the version of the build that is actually deployed. */
function SiteFooter() {
  return (
    <footer style={{ padding: "24px 32px 32px", textAlign: "center", fontSize: 12, color: "var(--on-surface-variant)" }}>
      <a href="/privacy" style={{ color: "inherit" }}>Privacy</a>
      <span aria-hidden="true" style={{ margin: "0 0.5rem" }}>·</span>
      <a href="/terms" style={{ color: "inherit" }}>Terms</a>
      <span aria-hidden="true" style={{ margin: "0 0.5rem" }}>·</span>
      <a href="https://azphalt.org" style={{ color: "inherit" }}>Docs</a>
      <span aria-hidden="true" style={{ margin: "0 0.5rem" }}>·</span>
      <span title="Store version">v{__AZPHALT_VERSION__}</span>
    </footer>
  );
}

function Page() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/checkout/success") return <CheckoutSuccessPage />;
  if (path === "/purchases") return <PurchasesPage />;
  if (path === "/connect/onboard") return <SellerOnboardingPage />;
  if (path === "/report") return <ReportPage />;
  if (path === "/moderation") return <ModerationPage />;
  if (path === "/publish") return <PublishPage />;
  if (path === "/agents") return <AgentDirectoryPage />;
  const app = path.match(/^\/app\/([^/]+)$/);
  if (app) return <AppCatalogPage appId={decodeURIComponent(app[1])} />;
  return <StorefrontApp />;
}

export function App() {
  return (
    <>
      <Page />
      <SiteFooter />
    </>
  );
}

