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

/** The local git `user.name`, as the default author — the answer is usually right and always real. */
function gitUserName(): string | undefined {
  try {
    // Import lazily: the scaffolder must still run where git is absent.
    const { execFileSync } = require("node:child_process") as typeof import("node:child_process");
    const name = execFileSync("git", ["config", "user.name"], { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return name || undefined;
  } catch {
    return undefined;
  }
}

/** Marker line in a stub LICENSE. `build.js` refuses to package while it is still present. */
export const LICENSE_STUB_MARKER = "REPLACE THIS FILE WITH THE FULL LICENCE TEXT";

/**
 * The licence choices offered at scaffold time.
 *
 * Nothing here is a default the tooling imposes — the author picks, and the point of asking is that
 * `manifest.license` (an SPDX identifier) and the LICENSE file (the actual terms) then agree. A
 * template that ships MIT text while its manifest declares `CC-BY-4.0` publishes a package whose
 * stated licence is not the one it grants, and that is the failure this prompt exists to prevent.
 *
 * `text` is inlined only where the licence is short enough to reproduce exactly and verbatim. For
 * everything else the scaffolder writes a stub naming the SPDX id and pointing at the canonical
 * text: an approximate licence is worse than an obviously missing one, so it refuses to guess.
 */
const LICENSES: { title: string; spdx: string; url?: string; text?: (year: number, holder: string) => string }[] = [
  {
    title: "MIT — permissive, short",
    spdx: "MIT",
    text: (year, holder) =>
      `MIT License\n\nCopyright (c) ${year} ${holder}\n\n` +
      `Permission is hereby granted, free of charge, to any person obtaining a copy\n` +
      `of this software and associated documentation files (the "Software"), to deal\n` +
      `in the Software without restriction, including without limitation the rights\n` +
      `to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n` +
      `copies of the Software, and to permit persons to whom the Software is\n` +
      `furnished to do so, subject to the following conditions:\n\n` +
      `The above copyright notice and this permission notice shall be included in all\n` +
      `copies or substantial portions of the Software.\n\n` +
      `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n` +
      `IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n` +
      `FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n` +
      `AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n` +
      `LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n` +
      `OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n` +
      `SOFTWARE.\n`,
  },
  {
    title: "Apache-2.0 — permissive, with a patent grant",
    spdx: "Apache-2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.txt",
  },
  {
    title: "CC-BY-4.0 — for asset packs (attribution required)",
    spdx: "CC-BY-4.0",
    url: "https://creativecommons.org/licenses/by/4.0/legalcode.txt",
  },
  {
    title: "CC0-1.0 — public domain dedication",
    spdx: "CC0-1.0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt",
  },
  {
    title: "GPL-3.0-or-later — copyleft",
    spdx: "GPL-3.0-or-later",
    url: "https://www.gnu.org/licenses/gpl-3.0.txt",
  },
  {
    title: "Proprietary — all rights reserved",
    spdx: "LicenseRef-Proprietary",
    text: (year, holder) =>
      `Copyright (c) ${year} ${holder}\n\nAll rights reserved.\n\n` +
      `No permission is granted to use, copy, modify, or distribute this software or\n` +
      `its assets, in whole or in part, except under a separate written agreement with\n` +
      `the copyright holder.\n`,
  },
  {
    title: "Other — I'll supply my own",
    spdx: "",
  },
];

/**
 * Stamp author and licence onto everything that carries them.
 *
 * `manifest.author` is what the store shows next to the package and what a reader uses to decide
 * whether to trust it; the LICENSE copyright line is what actually names the rights holder — a
 * licence reading "Copyright (c) 2026 Your Name" grants nothing to anyone. Both are easy to leave at
 * a template default and expensive to notice later, so they are filled in here rather than left to
 * be replaced by hand.
 */
function applyAuthorAndLicense(
  root: string,
  author: string,
  choice: { spdx: string; url?: string; text?: (year: number, holder: string) => string } | undefined,
): void {
  const year = new Date().getFullYear();
  const holder = author.trim() || "the copyright holder";

  const manifestPath = path.join(root, "manifest.json");
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    if (author.trim()) manifest.author = author;
    if (choice?.spdx) manifest.license = choice.spdx;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  }

  const pkgPath = path.join(root, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    if (author.trim()) pkg.author = author;
    if (choice?.spdx) pkg.license = choice.spdx;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }

  // The templates ship no LICENSE of their own — they are part of this MIT-licensed repo, and a
  // checked-in licence file would both be redundant here and become the scaffolded project's terms
  // by accident. The new project's LICENSE is written here, from the author's answer.
  const licensePath = path.join(root, "LICENSE");
  if (choice?.text) {
    fs.writeFileSync(licensePath, choice.text(year, holder));
  } else if (choice?.url) {
    fs.writeFileSync(
      licensePath,
      `${choice.spdx}\n\nCopyright (c) ${year} ${holder}\n\n` +
        `${LICENSE_STUB_MARKER}\n\n` +
        `Download the canonical text and replace this file with it:\n  ${choice.url}\n\n` +
        `It is not reproduced here because an approximate licence is worse than a missing one.\n` +
        `build.js refuses to package while this marker is still present.\n`,
    );
  } else {
    // "Other" — no terms chosen. Say so plainly rather than inventing any.
    fs.writeFileSync(
      licensePath,
      `Copyright (c) ${year} ${holder}\n\n${LICENSE_STUB_MARKER}\n\n` +
        `Put your licence terms here, and set "license" in manifest.json to the matching SPDX\n` +
        `identifier (https://spdx.org/licenses/) so the declared licence and the granted terms agree.\n` +
        `build.js refuses to package while this marker is still present.\n`,
    );
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
    title: "Skill (For Developers)",
    value: "template-skill",
    description: "A kind:\"skill\" bundle of one or more Agent Skills (SKILL.md) for an AI-agent host."
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

  let result: prompts.Answers<"projectName" | "namespace" | "author" | "license" | "template">;

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
        // Asked, not left to the template. A template's placeholder author survives scaffolding,
        // then survives review, and ends up as the published package's attribution — and the same
        // string lands in the LICENSE copyright line, where "Your Name" grants nothing to anyone.
        type: 'text',
        name: 'author',
        message: reset('Author (name or handle, used for attribution and the licence copyright):'),
        initial: gitUserName() ?? ''
      },
      {
        // Your extension, your terms. This exists so the SPDX id in manifest.json and the text in
        // LICENSE agree — not to steer the answer.
        type: 'select',
        name: 'license',
        message: reset('Licence (your choice — this is your work):'),
        initial: 0,
        choices: LICENSES.map((l) => ({ title: l.title, value: l.spdx }))
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

  const { projectName, namespace, author, license, template } = result;
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

  // Attribution + licence: manifest.author/license, package.json, and the LICENSE file itself.
  const licenseChoice = LICENSES.find((l) => l.spdx === license);
  applyAuthorAndLicense(root, author ?? '', licenseChoice);
  if (author?.trim()) console.log(`  ${green('author')} ${author}`);
  else console.log(`  ${yellow('no author given — set manifest.author and the LICENSE copyright before publishing')}`);
  if (licenseChoice?.text) {
    console.log(`  ${green('licence')} ${licenseChoice.spdx}`);
  } else {
    console.log(`  ${yellow('licence')} ${licenseChoice?.spdx || 'unset'} — LICENSE is a stub; paste the real text before publishing`);
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
