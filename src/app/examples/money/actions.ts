'use server'

import { revalidatePath } from 'next/cache'
import { eq, and } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { db } from '@/lib/db'
import { expense } from '@/lib/schema'
import { requireUser } from '@/lib/session'

/**
 * Server actions: functions that run on the server when someone submits a
 * form. Every one starts by checking who's signed in, and every query is
 * filtered to that person - that's what stops people seeing each other's data.
 */

export async function addExpense(formData: FormData) {
  const user = await requireUser()

  const pounds = Number(formData.get('amount'))
  if (!Number.isFinite(pounds) || pounds <= 0) return

  await db.insert(expense).values({
    id: randomUUID(),
    userId: user.id,
    spentOn: String(formData.get('spentOn')),
    description: String(formData.get('description')).slice(0, 200),
    category: String(formData.get('category') || 'Other'),
    amountPence: Math.round(pounds * 100),
  })

  revalidatePath('/examples/money')
}

export async function deleteExpense(id: string) {
  const user = await requireUser()

  await db
    .delete(expense)
    .where(and(eq(expense.id, id), eq(expense.userId, user.id)))

  revalidatePath('/examples/money')
}
