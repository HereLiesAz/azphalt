import { defineConfig } from 'vitepress'

// Served at azphalt.org, at the domain root — base stays '/'. azphalt.org and azphalt.store are one
// deployment: the Cloudflare Worker (apps/storefront-worker) bundles this build under /_docs and routes
// the azphalt.org host onto it. GitHub Pages (.github/workflows/deploy-docs.yml) is the standalone
// alternative and does not serve the domain.
export default defineConfig({
  title: "azphalt",
  description: "The open standard for portable digital-art, motion-graphics, and video extensions — and the marketplace at azphalt.store.",
  appearance: 'dark',
  lastUpdated: true,
  // Extensionless URLs: both hosts (Cloudflare static assets, GitHub Pages) map `/x` → `/x.html`.
  cleanUrls: true,
  // Not VitePress's default `assets/`: in the Worker's bundle the storefront owns `/assets/*`, and those
  // requests skip the Worker (apps/storefront-worker/wrangler.jsonc § run_worker_first), so a docs page
  // asking for `/assets/…` on azphalt.org would be served the storefront's file.
  assetsDir: 'docs-assets',
  sitemap: { hostname: 'https://azphalt.org' },
  head: [
    ['meta', { name: 'og:title', content: 'azphalt — the open extension standard' }],
    ['meta', { name: 'og:description', content: 'Build portable .azp extensions, consume the azphalt.store marketplace from your own app, and publish your own.' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Use the Store', link: '/hosts/getting-started' },
      { text: 'Build Extensions', link: '/creators/getting-started' },
      { text: 'Specs', link: '/specs/repository-api' },
      { text: 'Design', link: '/ARCHITECTURE' },
      { text: 'Operations', link: '/OPERATIONS' },
      { text: 'Store ↗', link: 'https://azphalt.store' }
    ],
    sidebar: {
      '/specs/': [
        {
          text: 'Specifications',
          items: [
            { text: 'Repository API', link: '/specs/repository-api' },
            { text: 'Package Format', link: '/specs/package-format' },
            { text: 'Manifest Schema', link: '/specs/extension-manifest' },
            { text: 'Capability Model', link: '/specs/capability-model' },
            { text: 'UI Schema', link: '/specs/ui-schema' },
            { text: 'Marketplace Integrity', link: '/specs/marketplace-integrity' },
            { text: 'MCP Server', link: '/specs/mcp-server' },
            { text: 'Extension Packs', link: '/specs/pack' },
            { text: 'Skill Packages', link: '/specs/skill' },
            { text: 'Script Packages', link: '/specs/script' },
            { text: 'Composable Packages', link: '/specs/composable' },
            { text: 'Companion Apps (RFC)', link: '/specs/companion-app' },
            { text: 'Store App (RFC)', link: '/specs/store-app' },
            { text: 'Web Handoff (RFC)', link: '/specs/web-handoff' },
            { text: 'Off-device LLMs (RFC)', link: '/specs/llm' },
            { text: 'State Reporting', link: '/specs/state-reporting' },
            { text: 'Workflow Packages', link: '/specs/workflow' },
            { text: 'Role Packages', link: '/specs/role' }
          ]
        }
      ],
      '/creators/': [
        {
          text: 'For Creators',
          items: [
            { text: 'Getting Started', link: '/creators/getting-started' },
            { text: 'Manifest Schema', link: '/specs/extension-manifest' },
            { text: 'Package Format', link: '/specs/package-format' },
            { text: 'Extension Packs', link: '/specs/pack' },
            { text: 'MCP Servers', link: '/specs/mcp-server' },
            { text: 'Skill Packages', link: '/specs/skill' },
            { text: 'Script Packages', link: '/specs/script' },
            { text: 'Composable Packages', link: '/specs/composable' },
            { text: 'Workflow Packages', link: '/specs/workflow' },
            { text: 'Role Packages', link: '/specs/role' }
          ]
        }
      ],
      '/hosts/': [
        {
          text: 'Use the Store (Host Apps)',
          items: [
            { text: 'Consume a Repository', link: '/hosts/getting-started' },
            { text: 'Repository API', link: '/specs/repository-api' },
            { text: 'Receiving a Web Handoff', link: '/specs/web-handoff' },
            { text: 'Adopting the Standard (code host)', link: '/ADOPTION' },
            { text: 'Adopting as an Asset Host', link: '/ADOPTION_ASSET_HOST' },
            { text: 'Adopting as a Companion Host', link: '/ADOPTION_COMPANION_HOST' },
            { text: 'Workflow Packages', link: '/specs/workflow' },
            { text: 'Role Packages', link: '/specs/role' }
          ]
        }
      ],
      // Root-level design & governance pages (longest-prefix match falls through to here).
      '/': [
        {
          text: 'Design & Governance',
          items: [
            { text: 'Architecture', link: '/ARCHITECTURE' },
            { text: 'Rationale', link: '/RATIONALE' },
            { text: 'Governance', link: '/GOVERNANCE' },
            { text: 'Production Operations', link: '/OPERATIONS' }
          ]
        },
        {
          text: 'Adoption',
          items: [
            { text: 'Code Host', link: '/ADOPTION' },
            { text: 'Asset Host', link: '/ADOPTION_ASSET_HOST' },
            { text: 'Companion Host', link: '/ADOPTION_COMPANION_HOST' }
          ]
        }
      ]
    },
    editLink: {
      pattern: 'https://github.com/HereLiesAz/azphalt/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HereLiesAz/azphalt' }
    ],
    search: {
      provider: 'local'
    }
  }
})
