export default function Home() {
  // The UI is a Compose Multiplatform (Kotlin/Wasm) app; the built bundle renders into this canvas
  // (#ComposeTarget). Size it to the full viewport directly (viewport units, so it doesn't depend on
  // an ancestor's resolved height); the html/body reset lives in globals.css.
  return (
    <>
      <canvas id="ComposeTarget" style={{ display: 'block', width: '100vw', height: '100vh' }}></canvas>
      <script src="/storefront-cmp.js" async></script>
    </>
  );
}
