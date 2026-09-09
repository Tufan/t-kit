import type { NextConfig } from 'next'

// Working out the app's address lives in src/lib/base-url.ts, and the server
// reads it at runtime. It used to be set here through `env`, which only
// inlines values into the browser bundle - so the server never saw it and
// sign-in in a Codespace failed with "Invalid origin".

const nextConfig: NextConfig = {
  // Next.js otherwise rewrites AGENTS.md - the instructions for this project -
  // every time the dev server starts.
  agentRules: false,
}

export default nextConfig
