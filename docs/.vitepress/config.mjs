import { defineConfig } from 'vitepress'

// The site is served from azphalt.org (GitHub Pages; see docs/public/CNAME + the deploy-docs workflow),
// so it lives at the domain root — base stays '/'. azphalt.store is the live storefront/registry the
// docs teach apps to consume.
export default defineConfig({
  title: "azphalt",
  description: "The open standard for portable digital-art, motion-graphics, and video extensions — and the marketplace at azphalt.store.",
  appearance: 'dark',
  lastUpdated: true,
  cleanUrls: true,
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
