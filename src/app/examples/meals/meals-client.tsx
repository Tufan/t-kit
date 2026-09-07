'use client'

import { useState } from 'react'
import { addRecipe, planMeal, deleteRecipe } from './actions'
import { EmptyState } from '@/components/shell/empty-state'

type Recipe = { id: string; name: string; serves: number }
type Planned = { id: string; onDate: string; recipeId: string | null }

export function MealsClient({
  recipes,
  planned,
  week,
}: {
  recipes: Recipe[]
  planned: Planned[]
  week: string[]
}) {
  const [adding, setAdding] = useState(false)

  const plannedFor = (date: string) =>
    planned.find((p) => p.onDate === date)?.recipeId ?? ''

  return (
    <>
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium text-muted">
          This week
        </h2>
        {recipes.length === 0 ? (
          <EmptyState>Add a recipe below, then plan it in here.</EmptyState>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-surface">
            {week.map((date) => (
              <div key={date} className="flex items-center gap-3 px-4 py-2.5">
                <span className="w-28 shrink-0 text-sm">
                  {new Date(date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
                <select
                  value={plannedFor(date)}
                  onChange={(e) => planMeal(date, e.target.value || null)}
                  className="flex-1 rounded-md border border-border bg-bg px-2 py-1.5 text-sm"
                >
                  <option value="">Nothing planned</option>
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-muted">
          Recipes
        </h2>

        <form
          action={async (formData) => {
            setAdding(true)
            await addRecipe(formData)
            setAdding(false)
            ;(document.getElementById('recipe-form') as HTMLFormElement)?.reset()
          }}
          id="recipe-form"
          className="mb-4 flex gap-2"
        >
          <input
            name="name"
            placeholder="Recipe name"
            required
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
          <input
            name="serves"
            type="number"
            min="1"
            defaultValue={2}
            aria-label="Serves how many"
            className="w-20 rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={adding}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
        </form>

        {recipes.length === 0 ? (
          <EmptyState>No recipes yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {recipes.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="flex-1 text-sm">{r.name}</span>
                <span className="text-xs text-muted">
                  serves {r.serves}
                </span>
                <button
                  onClick={() => deleteRecipe(r.id)}
                  aria-label={`Delete ${r.name}`}
                  className="rounded px-2 py-1 text-muted hover:text-red-600"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
