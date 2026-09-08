'use client'

import { useState } from 'react'
import { addClient, addJob, setJobStatus } from './actions'
import { EmptyState } from '@/components/shell/empty-state'
import { Input } from '@/components/ui'

type Client = { id: string; name: string; email: string | null }
type Job = {
  id: string
  clientId: string
  title: string
  status: string
  valuePence: number | null
}

const STATUSES = [
  { key: 'enquiry', label: 'Enquiry' },
  { key: 'quoted', label: 'Quoted' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'done', label: 'Done' },
]

function money(pence: number | null) {
  return pence == null ? '' : `£${(pence / 100).toFixed(2)}`
}

export function ClientsClient({
  clients,
  jobs,
}: {
  clients: Client[]
  jobs: Job[]
}) {
  const [busy, setBusy] = useState(false)
  const [openId, setOpenId] = useState<string | null>(clients[0]?.id ?? null)

  const jobsFor = (clientId: string) => jobs.filter((j) => j.clientId === clientId)

  return (
    <>
      <form
        action={async (formData) => {
          setBusy(true)
          await addClient(formData)
          setBusy(false)
          ;(document.getElementById('client-form') as HTMLFormElement)?.reset()
        }}
        id="client-form"
        className="mb-6 flex flex-wrap gap-2"
      >
        <Input
          name="name"
          placeholder="Client name"
          required
           className="min-w-40 flex-1"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email (optional)"
           className="min-w-40 flex-1"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          Add client
        </button>
      </form>

      {clients.length === 0 ? (
        <EmptyState>No clients yet. Add one above.</EmptyState>
      ) : (
        <div className="space-y-3">
          {clients.map((c) => {
            const theirJobs = jobsFor(c.id)
            const open = openId === c.id
            return (
              <div
                key={c.id}
                className="rounded-lg border border-border bg-surface"
              >
                <button
                  onClick={() => setOpenId(open ? null : c.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="font-medium">{c.name}</span>
                  {c.email && (
                    <span className="text-sm text-muted">{c.email}</span>
                  )}
                  <span className="ml-auto text-xs text-muted">
                    {theirJobs.length} job{theirJobs.length === 1 ? '' : 's'}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-border px-4 py-3">
                    {theirJobs.length > 0 && (
                      <ul className="mb-3 space-y-2">
                        {theirJobs.map((j) => (
                          <li key={j.id} className="flex items-center gap-3">
                            <span className="flex-1 text-sm">{j.title}</span>
                            {j.valuePence != null && (
                              <span className="text-sm tabular-nums text-muted">
                                {money(j.valuePence)}
                              </span>
                            )}
                            <select
                              value={j.status}
                              onChange={(e) => setJobStatus(j.id, e.target.value)}
                              className="rounded-md border border-border bg-bg px-2 py-1 text-xs"
                            >
                              {STATUSES.map((s) => (
                                <option key={s.key} value={s.key}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          </li>
                        ))}
                      </ul>
                    )}

                    <form
                      action={async (formData) => {
                        await addJob(formData)
                      }}
                      className="flex flex-wrap gap-2"
                    >
                      <input type="hidden" name="clientId" value={c.id} />
                      <input
                        name="title"
                        placeholder="Add a job..."
                        required
                        className="min-w-40 flex-1 rounded-md border border-border bg-bg px-3 py-1.5 text-sm"
                      />
                      <input
                        name="value"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Value"
                        className="w-24 rounded-md border border-border bg-bg px-3 py-1.5 text-sm"
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-bg"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
