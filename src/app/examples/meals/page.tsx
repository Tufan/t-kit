import { eq, asc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { recipe, plannedMeal } from '@/lib/schema'
import { requireUser } from '@/lib/session'
import { Nav } from '@/components/shell/nav'
import { PageHeader } from '@/components/shell/page-header'
import { MealsClient } from './meals-client'

/** The seven dates starting today. */
function weekFromToday() {
  const out: string[] = []
  const d = new Date()
  for (let i = 0; i < 7; i++) {
    out.push(new Date(d.getTime() + i * 86400000).toISOString().slice(0, 10))
  }
  return out
}

export default async function MealsPage() {
  const user = await requireUser()

  const [recipes, planned] = await Promise.all([
    db.select().from(recipe).where(eq(recipe.userId, user.id)).orderBy(asc(recipe.name)),
    db.select().from(plannedMeal).where(eq(plannedMeal.userId, user.id)),
  ])

  return (
    <>
      <Nav email={user.email} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <PageHeader
          title="Meals"
          description="An example: a list of recipes, and what you're eating this week."
        />
        <MealsClient
          recipes={recipes}
          planned={planned}
          week={weekFromToday()}
        />
      </main>
    </>
  )
}
