'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await signOut()
        router.push('/login')
        router.refresh()
      }}
      className="rounded-md px-3 py-1.5 text-sm text-muted hover:bg-bg"
    >
      Sign out
    </button>
  )
}
