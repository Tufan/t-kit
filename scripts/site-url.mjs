/**
 * Where your app lives on the internet.
 *
 * You would think this is `<project name>.vercel.app`, and usually it is. But
 * `.vercel.app` names are shared by everyone using Vercel, so if you call your
 * project something ordinary - "rota", "meals", "money" - that address may
 * already belong to a stranger. Vercel still creates your project under the
 * name you chose and quietly gives it a different public address instead.
 *
 * So ask Vercel which address it used, rather than assuming.
 */

import { execSync } from 'node:child_process'

/** Run a command, capture output, return null instead of throwing. */
function tryRun(cmd, timeout = 20000) {
  try {
    return execSync(cmd, {
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
      timeout,
    }).trim()
  } catch {
    return null
  }
}

/**
 * The public address of a project, e.g. https://rota-4f2b.vercel.app
 *
 * `vercel alias ls` lists every address pointing at every deployment. The one
 * we want is the shortest that is not tied to a branch or a single deployment:
 *
 *   my-app-be2awilp5-someone.vercel.app          <- one deployment, SSO-locked
 *   my-app-git-main-someone.vercel.app           <- a branch
 *   my-app-someone.vercel.app                    <- production, but long
 *   my-app.vercel.app                            <- the one to hand over
 *
 * Falls back to the project name if anything about that fails, which is both
 * the old behaviour and right most of the time.
 */
export function productionUrl(projectName) {
  const guess = `https://${projectName}.vercel.app`

  const out = tryRun('npx vercel alias ls')
  if (!out) return guess

  const hosts = out
    .split('\n')
    // The second column is the alias; the first is the deployment it points at.
    .map((line) => line.trim().split(/\s+/)[1])
    .filter((host) => host?.endsWith('.vercel.app'))
    .filter((host) => host.startsWith(projectName))
    // A branch deployment, not the live site.
    .filter((host) => !/-git-/.test(host))

  if (!hosts.length) return guess

  // Shortest wins: `my-app.vercel.app` over `my-app-someone.vercel.app`.
  hosts.sort((a, b) => a.length - b.length)
  return `https://${hosts[0]}`
}
