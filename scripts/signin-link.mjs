#!/usr/bin/env node
/**
 * Prints your most recent sign-in link.
 *
 * Until you connect an email service, the link Better Auth would have emailed
 * is written to the logs. Logs stream live and stop after a few minutes, so
 * catching it there means racing a clock. The token is also stored in the
 * database, so this rebuilds the link from there instead - run it whenever you
 * like, as many times as you like.
 *
 * Usage:  npm run signin-link
 */

import { neon } from '@neondatabase/serverless'
import { existsSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { productionUrl } from './site-url.mjs'

if (!process.env.DATABASE_URL) {
  console.error('\n  DATABASE_URL is missing. Run: npx vercel env pull .env.local\n')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

const DEV_PORT = Number(process.env.PORT) || 3000

/** True if `npm run dev` is up, so we should point at the local copy. */
function devServerRunning() {
  const r = spawnSync(process.execPath, [
    '-e',
    `require('net').connect(${DEV_PORT},'127.0.0.1')` +
      `.on('connect',()=>process.exit(0)).on('error',()=>process.exit(1))`,
  ])
  return r.status === 0
}

/**
 * Where the app lives. Prefer an explicit setting, then Vercel's own, then
 * the project name from `.vercel/project.json` - which gives the short public
 * address rather than the long per-deployment one, which is behind SSO.
 */
function siteUrl() {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL

  // If a dev server is answering, you are working locally and want to see your
  // own changes - not the live site, which does not have them yet.
  if (devServerRunning()) {
    if (process.env.CODESPACE_NAME) {
      const domain =
        process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN ?? 'app.github.dev'
      return `https://${process.env.CODESPACE_NAME}-${DEV_PORT}.${domain}`
    }
    return `http://localhost:${DEV_PORT}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  try {
    if (existsSync('.vercel/project.json')) {
      const { projectName } = JSON.parse(readFileSync('.vercel/project.json', 'utf8'))
      // Not `https://<projectName>.vercel.app`: that address may belong to
      // someone else, in which case Vercel gave your project a different one.
      if (projectName) return productionUrl(projectName)
    }
  } catch {
    // fall through to local
  }
  return 'http://localhost:3000'
}

const site = siteUrl().replace(/\/+$/, '')

// Better Auth stores the token as the row's `identifier`, and the payload
// (the email it was requested for) as `value`.
const rows = await sql`
  select identifier, value, expires_at
  from verification
  order by created_at desc
  limit 1
`

if (!rows.length) {
  console.log('\n  No sign-in link waiting.')
  console.log('  Open your app, enter your email, press "Email me a link",')
  console.log('  then run this again.\n')
  process.exit(0)
}

const { identifier: token, value, expires_at: expiresAt } = rows[0]

let email = ''
try {
  email = JSON.parse(value)?.email || ''
} catch {
  // value is not JSON in every Better Auth version; the link still works.
}

if (expiresAt && new Date(expiresAt) < new Date()) {
  console.log('\n  That link has expired.')
  console.log('  Ask for a new one in the browser, then run this again.\n')
  process.exit(0)
}

const minsLeft = expiresAt
  ? Math.max(0, Math.round((new Date(expiresAt) - Date.now()) / 60000))
  : null

console.log(`\n  Sign-in link${email ? ` for ${email}` : ''}:\n`)
console.log(
  `  ${site}/api/auth/magic-link/verify?token=${token}&callbackURL=%2F\n`
)
if (minsLeft !== null) {
  console.log(`  Valid for about ${minsLeft} more minute${minsLeft === 1 ? '' : 's'}.\n`)
}
