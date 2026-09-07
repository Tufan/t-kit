'use server'

import { revalidatePath } from 'next/cache'
import { eq, and, inArray } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { db } from '@/lib/db'
import { client, job } from '@/lib/schema'
import { requireUser } from '@/lib/session'

export async function addClient(formData: FormData) {
  const user = await requireUser()
  const name = String(formData.get('name') || '').trim()
  if (!name) return

  await db.insert(client).values({
    id: randomUUID(),
    userId: user.id,
    name: name.slice(0, 120),
    email: String(formData.get('email') || '') || null,
  })
  revalidatePath('/examples/clients')
}

export async function addJob(formData: FormData) {
  const user = await requireUser()
  const clientId = String(formData.get('clientId') || '')
  const title = String(formData.get('title') || '').trim()
  if (!clientId || !title) return

  // Check the client really belongs to this person before adding to it.
  const [owned] = await db
    .select({ id: client.id })
    .from(client)
    .where(and(eq(client.id, clientId), eq(client.userId, user.id)))
  if (!owned) return

  const value = Number(formData.get('value'))

  await db.insert(job).values({
    id: randomUUID(),
    clientId,
    title: title.slice(0, 200),
    valuePence: Number.isFinite(value) && value > 0 ? Math.round(value * 100) : null,
  })
  revalidatePath('/examples/clients')
}

export async function setJobStatus(jobId: string, status: string) {
  const user = await requireUser()

  const mine = await db
    .select({ id: client.id })
    .from(client)
    .where(eq(client.userId, user.id))

  await db
    .update(job)
    .set({ status })
    .where(
      and(
        eq(job.id, jobId),
        inArray(job.clientId, mine.map((c) => c.id))
      )
    )
  revalidatePath('/examples/clients')
}
