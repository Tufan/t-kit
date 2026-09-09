/**
 * Where this app is reachable right now.
 *
 * Sign-in depends on getting this right. Better Auth compares the address in
 * your browser against this one and refuses anything that does not match, so
 * a wrong answer here is not a broken link - it is "Invalid origin" and no
 * way to sign in at all.
 *
 * The order matters:
 *
 *   1. BETTER_AUTH_URL, if you set it. Always wins, so there is a way out.
 *   2. A Codespace's forwarded address. Checked BEFORE the Vercel variables
 *      because `vercel env pull` puts those in your .env.local, so a
 *      Codespace has both and the Codespace one is the one you are looking
 *      at.
 *   3. The deployed address, once it is on Vercel.
 *   4. localhost, for working on your own machine.
 */
export function resolveBaseURL(env: NodeJS.ProcessEnv = process.env): string {
  if (env.BETTER_AUTH_URL) return env.BETTER_AUTH_URL

  // Vercel does not set CODESPACE_NAME, so this only ever matches while you
  // are actually working in a Codespace.
  if (env.CODESPACE_NAME) {
    const domain =
      env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN ?? 'app.github.dev'
    return `https://${env.CODESPACE_NAME}-3000.${domain}`
  }

  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return 'http://localhost:3000'
}
