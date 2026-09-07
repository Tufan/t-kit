'use client'

import { useState } from 'react'
import { addExpense, deleteExpense } from './actions'
import { EmptyState } from '@/components/shell/empty-state'

type Expense = {
  id: string
  spentOn: string
  description: string
  category: string
  amountPence: number
}

const CATEGORIES = ['Food', 'Travel', 'Home', 'Work', 'Other']

/** Turn 1234 into "£12.34" */
function money(pence: number) {
  return `£${(pence / 100).toFixed(2)}`
}

export function MoneyClient({
  rows,
  monthTotal,
}: {
  rows: Expense[]
  monthTotal: number
}) {
  const [adding, setAdding] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <div className="mb-6 rounded-lg border border-border bg-surface p-4">
        <p className="text-sm text-muted">Spent this month</p>
        <p className="mt-1 text-3xl font-semibold tabular-nums">
          {money(monthTotal)}
        </p>
      </div>

      <form
        action={async (formData) => {
          setAdding(true)
          await addExpense(formData)
          setAdding(false)
          ;(document.getElementById('expense-form') as HTMLFormElement)?.reset()
        }}
        id="expense-form"
        className="mb-6 flex flex-wrap gap-2"
      >
        <input
          type="date"
          name="spentOn"
          defaultValue={today}
          required
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
        <input
          name="description"
          placeholder="What was it?"
          required
          className="min-w-40 flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
        <select
          name="category"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          required
          className="w-24 rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={adding}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {adding ? 'Adding...' : 'Add'}
        </button>
      </form>

      {rows.length === 0 ? (
        <EmptyState>
          Nothing here yet. Add an expense above.
        </EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-4 py-2 text-muted">
                    {new Date(r.spentOn).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </td>
                  <td className="px-4 py-2">{r.description}</td>
                  <td className="px-4 py-2 text-muted">{r.category}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {money(r.amountPence)}
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => deleteExpense(r.id)}
                      aria-label={`Delete ${r.description}`}
                      className="rounded px-2 py-1 text-muted hover:text-red-600"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
