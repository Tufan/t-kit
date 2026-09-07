/**
 * Example: clients and the jobs you do for them.
 *
 * Shows parent/child records plus a status you move through - the shape
 * behind most business tools (a CRM, a pipeline, a ticket tracker).
 */

import { pgTable, text, integer, date, timestamp } from 'drizzle-orm/pg-core'
import { user } from '../auth'

export const client = pgTable('client', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const job = pgTable('job', {
  id: text('id').primaryKey(),
  clientId: text('client_id')
    .notNull()
    .references(() => client.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  // one of: enquiry, quoted, in_progress, done
  status: text('status').notNull().default('enquiry'),
  valuePence: integer('value_pence'),
  dueOn: date('due_on'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
