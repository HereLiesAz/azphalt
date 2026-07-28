export default function Home() {
  /*
   * The storefront UI is a Compose Multiplatform (Kotlin/Wasm) app.
   *
   * There is deliberately **no `<canvas>` here.** `ComposeViewport(document.body)` (see
   * `apps/storefront-cmp/src/wasmJsMain/kotlin/Main.kt`) creates its own container element and
   * appends it to `<body>` — it does not adopt an existing one.
   *
   * This page used to render `<canvas id="ComposeTarget" style="width:100vw;height:100vh">`, which
   * looked like the mount point and was not. Compose's own container was appended *after* it, so the
   * entire app sat one full viewport below the fold, and `overflow: hidden` meant it could not be
   * scrolled to. What a visitor saw was the empty canvas: a black page where nothing rendered,
   * nothing could be clicked, and no error appeared anywhere — the app was running correctly, just
   * off-screen.
   *
   * The script is also loaded **without `async`**, matching the wasm build's own `index.html`. That
   * shell is the configuration this bundle is actually tested against, and there is no reason for
   * this one to differ from it.
   */
  return (
    <>
      {/*
        The mount point, rendered by React and filled by Compose.

        `suppressHydrationWarning` because Compose puts its own canvas inside this div after
        hydration, which React would otherwise flag as server/client markup drift on every render.
      */}
      <div id="compose-root" suppressHydrationWarning style={{ width: '100vw', height: '100vh' }} />
      <script src="/storefront-cmp.js"></script>
      {/*
        Legal links, in real DOM rather than inside the Compose surface. Compose renders to a canvas,
        which is opaque to crawlers, screen readers, and anyone running without WebGL — exactly the
        parties most likely to be looking for a privacy policy, an app-store reviewer among them.
      */}
      <footer
        style={{
          position: 'fixed',
          right: '0.75rem',
          bottom: '0.5rem',
          zIndex: 1,
          font: '400 0.75rem/1 ui-sans-serif, system-ui, sans-serif',
          color: '#8a867f',
          pointerEvents: 'auto',
        }}
      >
        <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
          Privacy
        </a>
        <span aria-hidden="true" style={{ margin: '0 0.4rem' }}>
          ·
        </span>
        <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
          Terms
        </a>
      </footer>
    </>
  );
}
