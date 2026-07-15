export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <canvas id="ComposeTarget" style={{ width: "100%", height: "100%" }}></canvas>
      <script src="/storefront-cmp.js"></script>
    </div>
  );
}
