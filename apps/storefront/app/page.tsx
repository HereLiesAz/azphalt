export default function Home() {
  // The UI is a Compose Multiplatform (Kotlin/Wasm) app; the built bundle renders into this canvas
  // (#ComposeTarget). Size it to the full viewport directly (viewport units, so it doesn't depend on
  // an ancestor's resolved height); the html/body reset lives in globals.css.
  return (
    <>
      <canvas id="ComposeTarget" style={{ display: 'block', width: '100vw', height: '100vh' }}></canvas>
      <script src="/storefront-cmp.js" async></script>
      {/*
        Legal links, in real DOM rather than inside the canvas.
        A canvas is opaque to crawlers, screen readers, and anyone running without WebGL, so links
        drawn by the Wasm app would be undiscoverable to exactly the parties most likely to need
        them — an app-store reviewer checking for a privacy policy, or a user on assistive tech.
        Rendering them here costs nothing and keeps them reachable however the page is being read.
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
