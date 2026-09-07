import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from './auth'

/**
 * Get the signed-in person, or send them to the login page.
 *
 * Use this at the top of any page that needs someone signed in:
 *   const user = await requireUser()
 */
export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/login')
  return session.user
}

/** Get the signed-in person, or null. Does not redirect. */
export async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}
