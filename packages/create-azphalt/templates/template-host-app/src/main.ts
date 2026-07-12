import { readAzp } from "@azphalt/azp";
import { RepositoryClient } from "@azphalt/repository-client";

const app = document.getElementById("app")!;

app.innerHTML = `
  <h1>Azphalt Host App</h1>
  <p>Loading repository data...</p>
  <pre id="output"></pre>
`;

async function init() {
  const output = document.getElementById("output")!;
  try {
    // 1. Setup client to a hypothetical repository
    // const client = new RepositoryClient({ url: "https://hub.example.com" });
    // const index = await client.getIndex();
    // output.textContent = JSON.stringify(index, null, 2);
    
    output.textContent = "Repository Client is ready. Uncomment the code to test against a real server!";
  } catch (e) {
    output.textContent = "Error: " + (e as Error).message;
  }
}

init();
