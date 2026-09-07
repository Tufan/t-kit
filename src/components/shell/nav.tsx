import Link from 'next/link'
import { SignOutButton } from './sign-out-button'

/**
 * The top navigation.
 *
 * To add your own page here, add a line to `links` below.
 */
const links = [
  { href: '/', label: 'Home' },
  // --- examples: these go when you run `npm run examples:remove` ---
  { href: '/examples/meals', label: 'Meals' },
  { href: '/examples/money', label: 'Money' },
  { href: '/examples/clients', label: 'Clients' },
]

export function Nav({ email }: { email?: string }) {
  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-md px-3 py-1.5 text-sm hover:bg-bg"
          >
            {l.label}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-3">
          {email && (
            <span className="hidden text-sm text-muted sm:inline">
              {email}
            </span>
          )}
          <SignOutButton />
        </div>
      </nav>
    </header>
  )
}
