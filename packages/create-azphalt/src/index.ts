#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";
import { blue, cyan, green, reset, yellow } from "kolorist";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

async function init() {
  console.log(`\n${cyan('azphalt')} open extension standard\n`);

  let result: prompts.Answers<"projectName" | "template">;

  try {
    result = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: 'my-azphalt-project'
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

  const { projectName, template } = result;
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

  console.log(`\n${green('Done.')} Now run:\n`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  ${yellow('# then see readme.md for the build / test / dev steps')}\n`);
}

init().catch((e) => {
  console.error(e);
});
