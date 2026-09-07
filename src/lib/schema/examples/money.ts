/**
 * Example: expenses.
 *
 * This is the smallest complete example in the project - a good one to copy
 * when you're adding your own thing.
 *
 * Note `amountPence`: money is always stored as a whole number of pence,
 * never as 12.34, because decimals lose accuracy when you add them up.
 */

import { pgTable, text, integer, date, timestamp } from 'drizzle-orm/pg-core'
import { user } from '../auth'

export const expense = pgTable('expense', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  spentOn: date('spent_on').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull().default('Other'),
  amountPence: integer('amount_pence').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
