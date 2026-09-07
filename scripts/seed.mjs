#!/usr/bin/env node
/**
 * Puts example data into the database so the examples have something to show.
 *
 * Runs against whichever examples still exist. Safe to run more than once:
 * it resets its own rows in place and never touches anything you have made.
 */

import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.error('\n  DATABASE_URL is missing. Run: npx vercel env pull .env.local\n')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

/** Does this table exist? Examples may have been removed. */
async function tableExists(name) {
  const rows = await sql`
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = ${name}
  `
  return rows.length > 0
}

// Who the example rows belong to. Every page filters by the signed-in user,
// so if these rows belong to nobody real the examples look empty. SEED_EMAIL
// is set by `npm run setup`; Better Auth's magic link signs you in as this
// existing user, so the rows are yours from the first login.
const SEED_EMAIL = (process.env.SEED_EMAIL || 'example@t-kit.local').trim().toLowerCase()
const SEED_USER = 'seed-example-user'

async function main() {
  if (!(await tableExists('user'))) {
    console.log('  No tables yet - run `npm run db:push` first.')
    return
  }

  // If someone already signed in with this address, the examples should
  // belong to that real account rather than a second one.
  const existing = await sql`select id from "user" where email = ${SEED_EMAIL}`
  const owner = existing[0]?.id ?? SEED_USER

  if (!existing[0]) {
    await sql`
      insert into "user" (id, name, email, email_verified, created_at, updated_at)
      values (${SEED_USER}, '', ${SEED_EMAIL}, false, now(), now())
      on conflict (id) do update set email = excluded.email
    `
  }

  const today = new Date()
  const daysAgo = (n) =>
    new Date(today.getTime() - n * 86400000).toISOString().slice(0, 10)

  // --- money ---
  if (await tableExists('expense')) {
    const rows = [
      [daysAgo(1), 'Weekly shop', 'Food', 6240],
      [daysAgo(2), 'Train to London', 'Travel', 3150],
      [daysAgo(4), 'Coffee', 'Food', 340],
      [daysAgo(6), 'Broadband', 'Home', 3299],
      [daysAgo(9), 'Notebook', 'Work', 795],
      [daysAgo(12), 'Petrol', 'Travel', 5800],
    ]
    let n = 0
    for (const [spentOn, description, category, amountPence] of rows) {
      await sql`
        insert into expense (id, user_id, spent_on, description, category, amount_pence)
        values (${`seed-expense-${n++}`}, ${owner}, ${spentOn}, ${description}, ${category}, ${amountPence})
        on conflict (id) do update set
          user_id = excluded.user_id, spent_on = excluded.spent_on,
          description = excluded.description, category = excluded.category,
          amount_pence = excluded.amount_pence
      `
    }
    console.log('  seeded expenses')
  }

  // --- meals ---
  if (await tableExists('recipe')) {
    const recipes = [
      ['Roast chicken', 4],
      ['Pasta with pesto', 2],
      ['Thai green curry', 4],
      ['Omelette', 1],
    ]
    const ids = []
    let r = 0
    for (const [name, serves] of recipes) {
      const id = `seed-recipe-${r++}`
      ids.push(id)
      await sql`
        insert into recipe (id, user_id, name, serves)
        values (${id}, ${owner}, ${name}, ${serves})
        on conflict (id) do update set
          user_id = excluded.user_id, name = excluded.name, serves = excluded.serves
      `
    }
    // Plan the next three days.
    for (let i = 0; i < 3; i++) {
      const d = new Date(today.getTime() + i * 86400000).toISOString().slice(0, 10)
      // Skip a date the student has already planned themselves.
      await sql`
        insert into planned_meal (id, user_id, on_date, recipe_id)
        select ${`seed-meal-${i}`}, ${owner}, ${d}, ${ids[i]}
        where not exists (
          select 1 from planned_meal
          where user_id = ${owner} and on_date = ${d} and id not like 'seed-%'
        )
        on conflict (id) do update set
          user_id = excluded.user_id, on_date = excluded.on_date,
          recipe_id = excluded.recipe_id
      `
    }
    console.log('  seeded recipes and meal plan')
  }

  // --- clients ---
  if (await tableExists('client')) {
    const clients = [
      ['Ridgeway Design', 'hello@ridgeway.example'],
      ['Marlow & Co', 'accounts@marlow.example'],
    ]
    const clientIds = []
    let ci = 0
    for (const [name, email] of clients) {
      const id = `seed-client-${ci++}`
      clientIds.push(id)
      await sql`
        insert into client (id, user_id, name, email)
        values (${id}, ${owner}, ${name}, ${email})
        on conflict (id) do update set
          user_id = excluded.user_id, name = excluded.name, email = excluded.email
      `
    }

    const jobs = [
      [clientIds[0], 'Website refresh', 'in_progress', 240000],
      [clientIds[0], 'Brand guidelines', 'quoted', 90000],
      [clientIds[1], 'Quarterly report', 'done', 45000],
      [clientIds[1], 'New enquiry - packaging', 'enquiry', null],
    ]
    let j = 0
    for (const [clientId, title, status, valuePence] of jobs) {
      await sql`
        insert into job (id, client_id, title, status, value_pence)
        values (${`seed-job-${j++}`}, ${clientId}, ${title}, ${status}, ${valuePence})
        on conflict (id) do update set
          client_id = excluded.client_id, title = excluded.title,
          status = excluded.status, value_pence = excluded.value_pence
      `
    }
    console.log('  seeded clients and jobs')
  }
}

main().catch((err) => {
  console.error('\n  Seeding failed:', err.message, '\n')
  process.exit(1)
})
