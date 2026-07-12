import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "azphalt",
  description: "The open standard for digital art, motion graphics, and video extensions.",
  appearance: 'dark',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Specs', link: '/specs/extension-manifest' },
      { text: 'Creators', link: '/creators/getting-started' },
      { text: 'Hosts', link: '/hosts/getting-started' }
    ],
    sidebar: {
      '/specs/': [
        {
          text: 'Specifications',
          items: [
            { text: 'Manifest Schema', link: '/specs/extension-manifest' },
            { text: 'Package Format', link: '/specs/package-format' },
            { text: 'UI Schema', link: '/specs/ui-schema' },
            { text: 'Repository API', link: '/specs/repository-api' }
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
            { text: 'Integration Guide', link: '/hosts/getting-started' }
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
