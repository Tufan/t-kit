import { eq, asc, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import { client, job } from '@/lib/schema'
import { requireUser } from '@/lib/session'
import { Nav } from '@/components/shell/nav'
import { PageHeader } from '@/components/shell/page-header'
import { ClientsClient } from './clients-client'

export default async function ClientsPage() {
  const user = await requireUser()

  const clients = await db
    .select()
    .from(client)
    .where(eq(client.userId, user.id))
    .orderBy(asc(client.name))

  // Only fetch jobs belonging to this person's clients.
  const jobs = clients.length
    ? await db
        .select()
        .from(job)
        .where(inArray(job.clientId, clients.map((c) => c.id)))
        .orderBy(asc(job.createdAt))
    : []

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
