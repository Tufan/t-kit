import { redirect } from 'next/navigation'
import { getUser } from '@/lib/session'
import { LoginForm } from './login-form'
import { GoogleButton } from './google-button'

export default async function LoginPage() {
  if (await getUser()) redirect('/')

  // Only offer Google if it has been set up - otherwise the button would
  // send people to a broken page. See docs/add-ons/google-login.md.
  const google = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        {google
          ? 'Use your Google account, or we’ll email you a link.'
          : 'We’ll email you a link. No password to remember.'}
      </p>

      {google && (
        <div className="mb-6 flex flex-col gap-3">
          <GoogleButton />
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
        </div>
      )}

      <LoginForm />
    </main>
  )
}
