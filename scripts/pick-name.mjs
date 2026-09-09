/**
 * Choosing one name that works everywhere.
 *
 * Your project ends up in three places, and it is much easier to live with if
 * they all share a name:
 *
 *   github.com/you/club-rota       your code
 *   the Vercel project "club-rota"
 *   https://club-rota.vercel.app   the address you give people
 *
 * The awkward one is the address. `.vercel.app` names are shared by everyone
 * using Vercel, so an ordinary word like "rota" is very likely gone
 * already - and Vercel does not refuse it, it just quietly gives your project
 * a different address like rota-nine.vercel.app. That is how you end up
 * with a name you did not choose and cannot remember.
 *
 * The name itself comes from the repository, so the only thing to check is
 * the address - early, while renaming is still cheap.
 */

import { execSync } from 'node:child_process'

/** Run a command, capture output, return null instead of throwing. */
function tryRun(cmd, timeout = 15000) {
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

/** Turn anything a person types into a name all three services accept. */
export function tidyName(raw) {
  return String(raw)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

/**
 * Is `<name>.vercel.app` still free?
 *
 * There is no "is this available" API, so ask the address itself. A name
 * nobody has taken does not resolve to a site and answers 404. A taken one
 * answers something else - 200 if the site is public, a redirect if it is
 * behind a login, and so on. So only a 404 counts as free, and anything we
 * cannot reach at all counts as unknown rather than free: being wrong in that
 * direction just means Vercel picks the address, which is today's problem.
 *
 * Returns true (free), false (taken), or null (could not tell).
 */
export async function vercelAddressFree(name) {
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), 10000)
  try {
    const res = await fetch(`https://${name}.vercel.app`, {
      method: 'HEAD',
      // A site behind a login answers with a redirect, and following it would
      // land somewhere unrelated. The status is all we need.
      redirect: 'manual',
      signal: ac.signal,
    })
    return res.status === 404
  } catch {
    // Offline, blocked by a corporate network, or timed out. Say "don't know"
    // rather than guessing, so the caller can carry on without a false alarm.
    return null
  } finally {
    clearTimeout(timer)
  }
}
