import { eq, asc, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import { client, job } from '@/lib/schema'
import { requireUser } from '@/lib/session'
import { Nav } from '@/components/shell/nav'
import { PageHeader } from '@/components/shell/page-header'
import { ClientsClient } from './clients-client'

export default async function ClientsPage() {
  const user = await requireUser()

  // Both at once. The jobs query finds this person's clients itself, rather
  // than waiting for the list above, so it is one trip to the database
  // instead of two.
  const [clients, jobs] = await Promise.all([
    db
      .select()
      .from(client)
      .where(eq(client.userId, user.id))
      .orderBy(asc(client.name)),
    db
      .select()
      .from(job)
      .where(
        inArray(
          job.clientId,
          db.select({ id: client.id }).from(client).where(eq(client.userId, user.id))
        )
      )
      .orderBy(asc(job.createdAt)),
  ])

  return (
    <>
      <Nav email={user.email} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <PageHeader
          title="Clients"
          description="An example: clients, the jobs you do for them, and where each one is up to."
        />
        <ClientsClient clients={clients} jobs={jobs} />
      </main>
    </>
  )
}
