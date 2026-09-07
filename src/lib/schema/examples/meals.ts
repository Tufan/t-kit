/**
 * Example: a weekly meal plan.
 *
 * Shows a one-to-many relationship: one recipe has many ingredients, and a
 * planned meal points at a recipe.
 */

import { pgTable, text, integer, date, timestamp } from 'drizzle-orm/pg-core'
import { user } from '../auth'

export const recipe = pgTable('recipe', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  serves: integer('serves').notNull().default(2),
  method: text('method'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const ingredient = pgTable('ingredient', {
  id: text('id').primaryKey(),
  recipeId: text('recipe_id')
    .notNull()
    .references(() => recipe.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  quantity: text('quantity'),
})

export const plannedMeal = pgTable('planned_meal', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  onDate: date('on_date').notNull(),
  recipeId: text('recipe_id').references(() => recipe.id, { onDelete: 'set null' }),
  note: text('note'),
})
