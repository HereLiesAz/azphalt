import { defineConfig } from 'vitepress'

// Served at azphalt.org, at the domain root — base stays '/'. Primary hosting is the storefront's own
// Vercel deployment (azphalt.org and azphalt.store share it; the storefront maps the org host onto the
// docs it embeds — see apps/storefront/middleware.ts + scripts/embed-docs.mjs). GitHub Pages
// (docs/public/CNAME + the deploy-docs workflow) is the standalone alternative. azphalt.store is the
// live storefront/registry the docs teach apps to consume.
export default defineConfig({
  title: "azphalt",
  description: "The open standard for portable digital-art, motion-graphics, and video extensions — and the marketplace at azphalt.store.",
  appearance: 'dark',
  lastUpdated: true,
  // Extensionless URLs when served by a host that maps `/x` → `/x.html` (GitHub Pages). For the
  // storefront-embedded build (AZPHALT_DOCS_EMBED — served at azphalt.org via next.config host rewrites
  // onto static files under /_docs), disable it so page links are `.html` and map 1:1 to files.
  cleanUrls: !process.env.AZPHALT_DOCS_EMBED,
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
            { text: 'Companion Apps (RFC)', link: '/specs/companion-app' }
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
            { text: 'MCP Servers', link: '/specs/mcp-server' }
          ]
        }
      ],
      '/hosts/': [
        {
          text: 'Use the Store (Host Apps)',
          items: [
            { text: 'Consume a Repository', link: '/hosts/getting-started' },
            { text: 'Repository API', link: '/specs/repository-api' },
            { text: 'Adopting the Standard (code host)', link: '/ADOPTION' },
            { text: 'Adopting as an Asset Host', link: '/ADOPTION_ASSET_HOST' },
            { text: 'Adopting as a Companion Host', link: '/ADOPTION_COMPANION_HOST' }
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
            { text: 'Governance', link: '/GOVERNANCE' }
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
