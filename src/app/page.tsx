import Link from 'next/link'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { requireUser } from '@/lib/session'
import { Nav } from '@/components/shell/nav'
import { PageHeader } from '@/components/shell/page-header'

const examples = [
  {
    href: '/examples/meals',
    name: 'Meals',
    what: 'Recipes and a weekly plan.',
    shape: 'Things on a calendar - a rota, a schedule, a booking sheet.',
    dir: 'meals',
  },
  {
    href: '/examples/money',
    name: 'Money',
    what: 'Expenses with categories and a monthly total.',
    shape: 'Anything with amounts and dates - a budget, invoices, mileage.',
    dir: 'money',
  },
  {
    href: '/examples/clients',
    name: 'Clients',
    what: 'Clients, the jobs you do for them, and their status.',
    shape: 'Records that belong to other records - a CRM, a pipeline.',
    dir: 'clients',
  },
]

export default async function HomePage() {
  const user = await requireUser()

  const installed = examples.filter((e) =>
    existsSync(join(process.cwd(), 'src/app/examples', e.dir))
  )

  return (
    <>
      <Nav email={user.email} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <PageHeader
          title={`Hello${user.name ? `, ${user.name.split(' ')[0]}` : ''}`}
          description="Your app is live. Here's what's in it."
        />

        {installed.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted">
              Three example apps to click around and copy from. Each one is a
              different <em>shape</em> of data - whatever you want to build,
              one of these is probably close.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {installed.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-accent"
                >
                  <h2 className="font-medium">{e.name}</h2>
                  <p className="mt-1 text-sm text-muted">{e.what}</p>
                  <p className="mt-3 text-xs text-muted">
                    Good for: {e.shape}
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted">
              Done exploring? Run <code>npm run examples:remove</code> to clear
              them out and start on your own thing.
            </p>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm text-muted">
              This is your app. Ask your AI assistant to build the first page.
            </p>
          </div>
        )}
      </main>
    </>
  )
}
