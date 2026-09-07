import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { expense } from '@/lib/schema'
import { requireUser } from '@/lib/session'
import { Nav } from '@/components/shell/nav'
import { PageHeader } from '@/components/shell/page-header'
import { MoneyClient } from './money-client'

/**
 * This is a server component: it runs on the server, fetches from the
 * database, and hands the result to the client component below as props.
 *
 * That split - fetch here, interact there - is the main pattern in this app.
 */
export default async function MoneyPage() {
  const user = await requireUser()

  const rows = await db
    .select()
    .from(expense)
    .where(eq(expense.userId, user.id))
    .orderBy(desc(expense.spentOn), desc(expense.createdAt))
    .limit(200)

  const thisMonth = new Date().toISOString().slice(0, 7)
  const monthTotal = rows
    .filter((r) => r.spentOn.startsWith(thisMonth))
    .reduce((sum, r) => sum + r.amountPence, 0)

  return (
    <>
      <Nav email={user.email} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <PageHeader
          title="Money"
          description="An example: expenses with a running total for this month."
        />
        <MoneyClient rows={rows} monthTotal={monthTotal} />
      </main>
    </>
  )
}
