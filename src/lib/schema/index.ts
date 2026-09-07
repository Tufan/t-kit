/**
 * Every table in the app is registered here.
 *
 * When you add a new table file, add a line for it below, then run:
 *   npm run db:push
 */

export * from './auth'

// --- examples: these three lines go when you run `npm run examples:remove` ---
export * from './examples/meals'
export * from './examples/money'
export * from './examples/clients'
