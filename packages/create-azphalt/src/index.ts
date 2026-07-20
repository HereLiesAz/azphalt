#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateKeyPairSync } from "node:crypto";
import prompts from "prompts";
import { blue, cyan, green, reset, yellow } from "kolorist";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate an Ed25519 publisher signing key. Mirrors `@azphalt/azp`'s `generateSigningKey` but uses
 * `node:crypto` directly so the scaffolder takes no runtime dependency on the SDK. The PKCS8 PEM
 * private key is the publisher's secret (store it as a CI secret); the base64 SPKI public key is the
 * publisher's identity that hosts pin on first install.
 */
function generatePublisherKey(): { privateKey: string; publicKey: string } {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  return {
    privateKey: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
    publicKey: Buffer.from(publicKey.export({ type: "spki", format: "der" })).toString("base64"),
  };
}

/**
 * Write the signing scaffold into a freshly created project: a release workflow that signs every
 * built `.azp` with the `AZP_PRIVATE_KEY` secret before publishing, a `SIGNING.md` recording the
 * publisher public key + setup steps, the private key as a git-ignored local file, and a `.gitignore`
 * entry so that key is never committed. Signing at creation is what lets a host pin this publisher on
 * first install and reject later updates from anyone else (see spec § Publisher continuity).
 */
function writeSigningScaffold(root: string, key: { privateKey: string; publicKey: string }): void {
  const wfDir = path.join(root, ".github", "workflows");
  fs.mkdirSync(wfDir, { recursive: true });
  fs.writeFileSync(
    path.join(wfDir, "sign-release.yml"),
    `name: sign-release
# Builds the package, signs every produced .azp with the publisher key (repo/org secret
# AZP_PRIVATE_KEY), and publishes on a v* tag. Signing establishes publisher continuity: a host pins
# this key on first install and rejects any later update signed by a different key.
on:
  push:
    tags: ['v*']
  workflow_dispatch:
permissions:
  contents: write
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm install --no-audit --no-fund
      - run: npm run build
      - name: Sign the .azp
        env:
          AZP_PRIVATE_KEY: \${{ secrets.AZP_PRIVATE_KEY }}
        run: |
          test -n "$AZP_PRIVATE_KEY" || { echo "::error::AZP_PRIVATE_KEY secret is not set — see SIGNING.md"; exit 1; }
          node -e '
            const fs=require("fs");
            const { signAzp }=require("@azphalt/azp");
            const pk=process.env.AZP_PRIVATE_KEY;
            for (const f of fs.readdirSync(".").filter(n=>n.endsWith(".azp"))) {
              fs.writeFileSync(f, signAzp(fs.readFileSync(f), { privateKey: pk }));
              console.log("signed "+f);
            }
          '
      - name: Publish release
        uses: softprops/action-gh-release@v2
        with:
          files: '*.azp'
`,
  );

  fs.writeFileSync(
    path.join(root, "SIGNING.md"),
    `# Signing this extension

This project signs its \`.azp\` at release time so hosts can verify **you** — the original publisher —
are the one shipping every update (azphalt spec § Publisher continuity).

## Publisher public key

\`\`\`
${key.publicKey}
\`\`\`

Hosts pin this key the first time a user installs the extension and then reject any update signed by a
different key (a legitimate key rotation needs explicit user approval or a registry counter-signature).

## One-time setup

1. A signing key was generated for you at \`azp-signing-key.pem\` (PKCS8 PEM). **Keep it secret** — it is
   git-ignored. Anyone with it can publish updates as you.
2. Add it as a CI secret named \`AZP_PRIVATE_KEY\` (repo: *Settings → Secrets and variables → Actions*;
   or an org secret shared to all your extension repos):
   \`\`\`sh
   gh secret set AZP_PRIVATE_KEY < azp-signing-key.pem
   \`\`\`
3. Push a \`v*\` tag (or run the **sign-release** workflow) to build, sign, and publish.

Reuse the **same** key across all your extensions so a host recognizes one publisher identity for you.
`,
  );

  const keyFile = path.join(root, "azp-signing-key.pem");
  fs.writeFileSync(keyFile, key.privateKey, { mode: 0o600 });

  const giPath = path.join(root, ".gitignore");
  const gi = fs.existsSync(giPath) ? fs.readFileSync(giPath, "utf-8") : "";
  if (!gi.split(/\r?\n/).includes("azp-signing-key.pem")) {
    fs.writeFileSync(giPath, gi + (gi.endsWith("\n") || gi === "" ? "" : "\n") + "azp-signing-key.pem\n");
  }
}

const TEMPLATES = [
  {
    title: "Code Extension (For Developers)",
    value: "template-code-extension",
    description: "A sandboxed filter + transition you can test locally, build, and submit."
  },
  {
    title: "Companion App (For Developers)",
    value: "template-companion-app",
    description: "A kind:\"app\" header that lets a host launch your Android app or PWA via a handoff."
  },
  {
    title: "MCP Server (For Developers)",
    value: "template-mcp-server",
    description: "A kind:\"mcp\" header that declares how a host reaches your MCP server (local or remote)."
  },
  {
    title: "Extension Pack (For Developers)",
    value: "template-pack",
    description: "A kind:\"pack\" header that bundles a recommended / base set of packages (any author) for your app."
  },
  {
    title: "Asset Pack (For Creators)",
    value: "template-asset-pack",
    description: "Boilerplate workspace for bundling images, audio, or 3D assets."
  },
  {
    title: "Host Application (For Developers)",
    value: "template-host-app",
    description: "Vanilla Vite web app parsing .azp files and hitting repositories."
  },
  {
    title: "Repository Server (For Hubs)",
    value: "template-repository",
    description: "Express.js server implementing the Repository API spec."
  }
];

/**
 * Build a package id from the author's namespace and project name, following the convention
 * `<reversed-domain>.azphalt.<name>`. You give a domain you own (`developer.space`, `acme.io`,
 * `hereliesaz.com`); we reverse it, insert the `azphalt` segment, and append the package name — e.g.
 * `developer.space` + `my-plugin` -> `space.developer.azphalt.my-plugin`. A leading `azphalt-` on the
 * name is dropped so the `azphalt` segment isn't doubled.
 */
export function toPackageId(namespace: string, name: string): string {
  // Lowercase, collapse any run of invalid characters to a single hyphen, and trim hyphens WITHOUT an
  // anchored `+` regex (those backtrack on repetitive input — CodeQL flags them as polynomial ReDoS).
  const trimDashes = (s: string): string => {
    let a = 0;
    let b = s.length;
    while (a < b && s[a] === '-') a++;
    while (b > a && s[b - 1] === '-') b--;
    return s.slice(a, b);
  };
  const clean = (s: string): string => trimDashes(s.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  const reversed = namespace.trim().toLowerCase().split('.').map(clean).filter(Boolean).reverse().join('.');
  let pkg = name.trim().toLowerCase();
  if (pkg.startsWith('azphalt-')) pkg = pkg.slice('azphalt-'.length);
  pkg = clean(pkg);
  return `${reversed || 'com.example'}.azphalt.${pkg || 'my-package'}`;
}

async function init() {
  console.log(`\n${cyan('azphalt')} open extension standard\n`);

  let result: prompts.Answers<"projectName" | "namespace" | "template">;

  try {
    result = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: 'my-azphalt-project'
      },
      {
        type: 'text',
        name: 'namespace',
        message: reset('Your namespace (a domain you own, e.g. developer.space):'),
        initial: 'example.com'
      },
      {
        type: 'select',
        name: 'template',
        message: reset('Select a template:'),
        initial: 0,
        choices: TEMPLATES.map(t => ({
          title: t.title,
          description: t.description,
          value: t.value
        }))
      }
    ], {
      onCancel: () => {
        throw new Error("Operation cancelled");
      }
    });
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { projectName, namespace, template } = result;
  const root = path.join(process.cwd(), projectName);
  
  if (fs.existsSync(root)) {
    console.log(yellow(`\nTarget directory "${projectName}" already exists.`));
    return;
  }

  fs.mkdirSync(root, { recursive: true });

  const templateDir = path.resolve(__dirname, '..', 'templates', template);
  
  const copy = (src: string, dest: string) => {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      for (const file of fs.readdirSync(src)) {
        if (file === 'node_modules') continue;
        copy(path.resolve(src, file), path.resolve(dest, file));
      }
    } else {
      // Handle _gitignore -> .gitignore
      if (path.basename(src) === '_gitignore') {
        dest = path.resolve(path.dirname(dest), '.gitignore');
      }
      fs.copyFileSync(src, dest);
    }
  };

  copy(templateDir, root);

  // Update package.json name
  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  // Set the manifest id from the namespace: <reversed-domain>.azphalt.<name>.
  const manifestPath = path.join(root, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    manifest.id = toPackageId(namespace, projectName);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`  ${green('id')} ${manifest.id}`);
  }

  // Sign at creation: generate a publisher key and a signing release workflow so the very first
  // release a user installs establishes the publisher pin (spec § Publisher continuity).
  const publisherKey = generatePublisherKey();
  writeSigningScaffold(root, publisherKey);
  console.log(`  ${green('publisher key')} ${publisherKey.publicKey}`);
  console.log(`  ${yellow('signing key written to azp-signing-key.pem (git-ignored) — see SIGNING.md')}`);

  console.log(`\n${green('Done.')} Now run:\n`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  ${yellow('# then see readme.md for the build / test / dev steps')}\n`);
}

init().catch((e) => {
  console.error(e);
});
