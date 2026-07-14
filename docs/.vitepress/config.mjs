import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "azphalt",
  description: "The open standard for digital art, motion graphics, and video extensions.",
  appearance: 'dark',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Specs', link: '/specs/capability-model' },
      { text: 'Creators', link: '/creators/getting-started' },
      { text: 'Hosts', link: '/hosts/getting-started' },
      { text: 'Design', link: '/ARCHITECTURE' }
    ],
    sidebar: {
      '/specs/': [
        {
          text: 'Specifications',
          items: [
            { text: 'Capability Model', link: '/specs/capability-model' },
            { text: 'Manifest Schema', link: '/specs/extension-manifest' },
            { text: 'Package Format', link: '/specs/package-format' },
            { text: 'UI Schema', link: '/specs/ui-schema' },
            { text: 'Repository API', link: '/specs/repository-api' },
            { text: 'Companion Apps (RFC)', link: '/specs/companion-app' }
          ]
        }
      ],
      '/creators/': [
        {
          text: 'For Creators',
          items: [
            { text: 'Getting Started', link: '/creators/getting-started' }
          ]
        }
      ],
      '/hosts/': [
        {
          text: 'For Host Apps',
          items: [
            { text: 'Integration Guide', link: '/hosts/getting-started' },
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HereLiesAz/azphalt' }
    ],
    search: {
      provider: 'local'
    }
  }
})
