import type { NextConfig } from 'next'

/**
 * In a GitHub Codespace the app is not reachable at localhost:3000 - your
 * browser reaches it at a forwarded https address instead. Sign-in links and
 * redirects are built from this, so without it you get sent to a page that
 * does not exist. Vercel does not set CODESPACE_NAME, so this only ever
 * applies while you are working in a Codespace.
 */
const codespaceUrl =
  !process.env.BETTER_AUTH_URL && process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-3000.` +
      `${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN ?? 'app.github.dev'}`
    : undefined

const nextConfig: NextConfig = {
  // Next.js otherwise rewrites AGENTS.md - the instructions for this project -
  // every time the dev server starts.
  agentRules: false,
  ...(codespaceUrl ? { env: { BETTER_AUTH_URL: codespaceUrl } } : {}),
}

export default nextConfig
