'use client'

import { useState } from 'react'
import { addExpense, deleteExpense } from './actions'
import { EmptyState } from '@/components/shell/empty-state'
import { Button, Input, Select, Stat, Table, Th, Td } from '@/components/ui'

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
      <div className="mb-6">
        <Stat label="Spent this month" value={money(monthTotal)} />
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
        <Input
          type="date"
          name="spentOn"
          defaultValue={today}
          required
          className="w-auto"
        />
        <Input
          name="description"
          placeholder="What was it?"
          required
          className="min-w-40 flex-1"
        />
        <Select name="category" className="w-auto">
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          required
          className="w-24"
        />
        <Button type="submit" disabled={adding}>
          {adding ? 'Adding...' : 'Add'}
        </Button>
      </form>

      {rows.length === 0 ? (
        <EmptyState>
          Nothing here yet. Add an expense above.
        </EmptyState>
      ) : (
        <Table>
          <thead className="border-b border-border text-left text-muted">
            <tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th align="right">Amount</Th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <Td className="whitespace-nowrap text-muted">
                  {new Date(r.spentOn).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </Td>
                <Td>{r.description}</Td>
                <Td className="text-muted">{r.category}</Td>
                <Td align="right">{money(r.amountPence)}</Td>
                <Td className="px-2">
                  <button
                    onClick={() => deleteExpense(r.id)}
                    aria-label={`Delete ${r.description}`}
                    className="rounded px-2 py-1 text-muted hover:text-red-600"
                  >
                    ×
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
