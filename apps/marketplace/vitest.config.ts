import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Tests render components to markup, so they need the same automatic JSX runtime the app builds with.
// Stated here because the app's tsconfig is a solution file (`files: []` plus references), which the
// JSX transform does not follow to find `"jsx": "react-jsx"`.
export default defineConfig({
  plugins: [react()],
  // Resolve the workspace package from source, so the suite runs on a fresh install without
  // `@azphalt/web-handoff` having been built first (its `main` points at `dist/`).
  resolve: { alias: { '@azphalt/web-handoff': new URL('../../packages/web-handoff/src/index.ts', import.meta.url).pathname } },
  oxc: { jsx: { runtime: 'automatic' } },
  test: { include: ['test/**/*.test.{ts,tsx}'] },
})
