import { redirect } from 'next/navigation'
import { getUser } from '@/lib/session'
import { LoginForm } from './login-form'

export default async function LoginPage() {
  if (await getUser()) redirect('/')

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        We&apos;ll email you a link. No password to remember.
      </p>
      <LoginForm />
    </main>
  )
}
