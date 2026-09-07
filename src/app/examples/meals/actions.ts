'use server'

import { revalidatePath } from 'next/cache'
import { eq, and } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { db } from '@/lib/db'
import { recipe, plannedMeal } from '@/lib/schema'
import { requireUser } from '@/lib/session'

export async function addRecipe(formData: FormData) {
  const user = await requireUser()
  const name = String(formData.get('name') || '').trim()
  if (!name) return

  await db.insert(recipe).values({
    id: randomUUID(),
    userId: user.id,
    name: name.slice(0, 120),
    serves: Number(formData.get('serves')) || 2,
  })
  revalidatePath('/examples/meals')
}

export async function planMeal(onDate: string, recipeId: string | null) {
  const user = await requireUser()

  await db
    .delete(plannedMeal)
    .where(and(eq(plannedMeal.userId, user.id), eq(plannedMeal.onDate, onDate)))

  if (recipeId) {
    await db.insert(plannedMeal).values({
      id: randomUUID(),
      userId: user.id,
      onDate,
      recipeId,
    })
  }
  revalidatePath('/examples/meals')
}

export async function deleteRecipe(id: string) {
  const user = await requireUser()
  await db.delete(recipe).where(and(eq(recipe.id, id), eq(recipe.userId, user.id)))
  revalidatePath('/examples/meals')
}
