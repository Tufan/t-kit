'use client'

import { useState } from 'react'
import { signIn } from '@/lib/auth-client'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    const { error } = await signIn.magicLink({ email, callbackURL: '/' })
    setState(error ? 'error' : 'sent')
  }

  if (state === 'sent') {
    return (
      <div className="rounded-lg border border-border bg-surface p-4 text-sm">
        <p className="font-medium">Check your email</p>
        <p className="mt-1 text-muted">
          We sent a sign-in link to {email}.
        </p>
        <p className="mt-3 text-xs text-muted">
          Not set up to send email yet? Run <code>npm run signin-link</code> in
          a terminal and it will print the link.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending...' : 'Email me a link'}
      </button>
      {state === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}
