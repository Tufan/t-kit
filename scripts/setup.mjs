#!/usr/bin/env node
/**
 * t-kit setup
 *
 * Run by the STUDENT, on their machine, logged in as themselves.
 * Everything it creates belongs to them.
 *
 * Safe to re-run: each step checks whether it's already done.
 */

import { execSync, spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import { createInterface } from 'node:readline/promises'

// ---------------------------------------------------------------- output

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
}
const say = (m = '') => console.log(m)
const step = (n, total, m) => say(`\n${c.cyan}${c.bold}[${n}/${total}]${c.reset} ${c.bold}${m}${c.reset}`)
const ok = (m) => say(`  ${c.green}✓${c.reset} ${m}`)
const info = (m) => say(`  ${c.dim}${m}${c.reset}`)
const warn = (m) => say(`  ${c.yellow}!${c.reset} ${m}`)

/** Stop with a message a non-developer can act on. */
function stop(what, why, fix) {
  say()
  say(`${c.red}${c.bold}✗ ${what}${c.reset}`)
  if (why) say(`\n  ${why}`)
  if (fix) say(`\n  ${c.bold}What to do:${c.reset}\n  ${fix}`)
  say()
  process.exit(1)
}

// ---------------------------------------------------------------- shell

// When an AI agent is driving, the Vercel CLI prints a machine-readable hint
// line into the middle of the output. It is meaningless to a person reading
// along and looks like an error, so hide it from the commands we run.
const childEnv = { ...process.env }
delete childEnv.CLAUDECODE
delete childEnv.CLAUDE_CODE

/**
 * Run a command, capture output. Returns null instead of throwing.
 *
 * stdin is /dev/null and there is a timeout, because a captured command that
 * decides to prompt would otherwise wait forever on input that can never
 * arrive, with its prompt buried in a pipe nobody is reading.
 */
function tryRun(cmd, timeout = 20000) {
  try {
    return execSync(cmd, {
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
      timeout,
      env: childEnv,
    }).trim()
  } catch {
    return null
  }
}

/**
 * Run a command the user can see, but answer any prompt it raises with
 * `answer`. Output still goes to the screen; only stdin is supplied.
 */
function runAnswering(cmd, args, answer, extraEnv = {}) {
  const r = spawnSync(cmd, args, {
    input: answer,
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: process.platform === 'win32',
    env: { ...childEnv, ...extraEnv },
  })
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} exited ${r.status}`)
}

/** Run a command with the user watching. Throws on failure. */
function run(cmd, args, extraEnv = {}) {
  const r = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...childEnv, ...extraEnv },
  })
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} exited ${r.status}`)
}

const TOTAL = 8

// ---------------------------------------------------------------- 1. node

step(1, TOTAL, 'Checking your computer is ready')

const major = Number(process.versions.node.split('.')[0])
if (major < 20) {
  stop(
    `Node.js ${process.versions.node} is too old`,
    'This project needs Node.js 20 or newer.',
    'Download the LTS version from https://nodejs.org, install it,\n  close this window, open a new one, and run `npm run setup` again.'
  )
}
ok(`Node.js ${process.versions.node}`)

if (!tryRun('git --version')) {
  stop(
    'Git is not installed',
    'Git is what keeps a history of your project so nothing is ever lost.',
    'Install it from https://git-scm.com (take all the defaults),\n  then open a new terminal window and run `npm run setup` again.'
  )
}
ok('Git')

// `degit` copies the files without any history, so start one. Everything in
// the docs about undoing a bad change depends on there being a commit to go
// back to.
if (!existsSync('.git')) {
  try {
    execSync('git init -q -b main', { stdio: 'ignore' })
    execSync('git add -A', { stdio: 'ignore' })
    execSync('git -c user.name=You -c user.email=you@example.com ' +
             'commit -q -m "Starting point"', { stdio: 'ignore' })
    ok('Saved a starting point you can always get back to')
  } catch {
    warn('Could not save a starting point (not fatal, carrying on)')
  }
} else {
  ok('Git history')
}

// ---------------------------------------------------------------- 2. vercel

step(2, TOTAL, 'Checking your Vercel account')

const hasVercel = tryRun('npx vercel --version')
if (!hasVercel) {
  info('Installing the Vercel tool (one-off, takes a moment)...')
  try {
    run('npm', ['install', '--global', 'vercel@latest'])
  } catch {
    stop(
      "Couldn't install the Vercel tool",
      'This is usually a permissions problem.',
      'Try running: npm install --global vercel@latest\n  and send me whatever error you get.'
    )
  }
}

// Always run `vercel login` where you can see it. It returns straight away if
// you are already signed in, and if you are not it prints a link and a code.
// Do not try to detect the signed-in state first: the check itself starts a
// login, and with its output captured the link is invisible and the script
// looks frozen.
say()
info('Checking your Vercel sign-in. If a link and a short code appear below,')
info('open the link, check the code matches, and approve it.')
say()

try {
  // After signing in, the CLI offers to install a Vercel plugin into your
  // coding agent. It defaults to yes. Decline it: nothing here needs it, and
  // it is not a decision to make by accident on your first command.
  runAnswering('npx', ['vercel', 'login'], 'n\n')
} catch {
  stop(
    "Vercel sign-in didn't complete",
    'The code may have expired, or the approval was cancelled.',
    'Run `npm run setup` again and approve the link when it appears.'
  )
}

const who = tryRun('npx vercel whoami')
if (!who) {
  stop(
    'Still not signed in to Vercel',
    null,
    'Try `npx vercel login` on its own, then run `npm run setup` again.'
  )
}
ok(`Signed in to Vercel as ${who}`)

// ---------------------------------------------------------------- 3. name

step(3, TOTAL, 'Naming your project')

let projectName
if (existsSync('.vercel/project.json')) {
  const linked = JSON.parse(readFileSync('.vercel/project.json', 'utf8'))
  projectName = linked.projectName || 'your project'
  ok(`Already linked to "${projectName}"`)
} else {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const suggested = process.cwd().split(/[\\/]/).pop()
    .toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').slice(0, 40)
  const answer = (await rl.question(`  Project name [${suggested}]: `)).trim()
  rl.close()
  projectName = (answer || suggested)
    .toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').slice(0, 40)

  info(`Creating "${projectName}" on Vercel...`)
  try {
    run('npx', ['vercel', 'link', '--yes', '--project', projectName])
  } catch {
    stop(
      "Couldn't create the project on Vercel",
      `The name "${projectName}" may already be taken in your account.`,
      'Run `npm run setup` again and choose a different name.'
    )
  }
  ok(`Created "${projectName}"`)
}

// ---------------------------------------------------------------- 4. db

step(4, TOTAL, 'Creating your database')

const envFile = '.env.local'
const envHas = (key) =>
  existsSync(envFile) && new RegExp(`^${key}=`, 'm').test(readFileSync(envFile, 'utf8'))

if (envHas('DATABASE_URL')) {
  ok('Database already connected')
} else {
  info('Provisioning a free Neon Postgres database...')
  info('This creates it, connects it to your project, and saves the details.')
  try {
    // The flags skip the plan/region/auth prompts. `auth=false` matters:
    // Neon Auth is on by default and would sit alongside Better Auth.
    run('npx', ['vercel', 'install', 'neon', '--name', `${projectName}-db`,
                '--plan', 'free_v3', '-m', 'region=lhr1', '-m', 'auth=false'])
  } catch {
    stop(
      "Couldn't create the database",
      'Vercel may have asked something this script could not answer.',
      'Run `npx vercel install neon` on its own, follow the prompts,\n  then run `npm run setup` again.'
    )
  }
  ok('Database created and connected')
}

// ---------------------------------------------------------------- 5. env

step(5, TOTAL, 'Setting up sign-in for your app')

if (!envHas('BETTER_AUTH_SECRET')) {
  const secret = randomBytes(32).toString('base64url')
  const failed = []
  for (const env of ['production', 'preview', 'development']) {
    // One retry: these calls occasionally lose a race with the project
    // having only just been created.
    let okHere = false
    for (let attempt = 0; attempt < 2 && !okHere; attempt++) {
      const r = spawnSync(
        'npx',
        ['vercel', 'env', 'add', 'BETTER_AUTH_SECRET', env, '--force'],
        { input: secret, stdio: ['pipe', 'ignore', 'ignore'], shell: process.platform === 'win32' }
      )
      okHere = r.status === 0
    }
    if (!okHere) failed.push(env)
  }
  if (failed.includes('production')) {
    stop(
      "Couldn't save the sign-in secret",
      'Without it, sign-in will not work on your live site.',
      'Run `npm run setup` again. If it fails twice, send me what you see.'
    )
  }
  if (failed.length) {
    warn(`Sign-in secret not saved for: ${failed.join(', ')}`)
    warn('Your live site is fine. Only preview deployments are affected.')
  }
  ok('Created a sign-in secret')
} else {
  ok('Sign-in secret already set')
}

info('Fetching your settings...')
try {
  run('npx', ['vercel', 'env', 'pull', envFile, '--yes'])
} catch {
  stop(
    "Couldn't fetch your project settings",
    null,
    `Try \`npx vercel env pull ${envFile}\` on its own, then run \`npm run setup\` again.`
  )
}

if (!envHas('DATABASE_URL')) {
  stop(
    'The database connection is missing',
    'The database was created but its details did not come through.',
    'Run `npm run setup` again - this usually resolves itself.'
  )
}
ok('Settings saved')

// ---------------------------------------------------------------- 6. schema

step(6, TOTAL, 'Creating your tables')

try {
  // drizzle-kit does not read .env.local on its own, so load it here.
  run('node', ['--env-file=.env.local',
               'node_modules/drizzle-kit/bin.cjs', 'push', '--force'])
} catch {
  stop(
    "Couldn't create the database tables",
    null,
    'Run `npm run db:push` on its own and send me the error.'
  )
}
ok('Tables created')

// ---------------------------------------------------------------- 7. seed

step(7, TOTAL, 'Adding example data')

// The examples only show up for the person they belong to, so ask who that
// is. Use the address you will sign in with.
const rl2 = createInterface({ input: process.stdin, output: process.stdout })
const seedEmail = (await rl2.question('  Email you will sign in with: ')).trim()
rl2.close()

if (!seedEmail) {
  warn('No email given, the examples will look empty until you add your own rows')
}

try {
  run('npm', ['run', 'seed'], seedEmail ? { SEED_EMAIL: seedEmail } : {})
  ok(seedEmail ? `Example data added for ${seedEmail}` : 'Example data added')
} catch {
  warn('Could not add example data - not fatal, your app will just start empty')
}

// ---------------------------------------------------------------- 8. deploy

step(8, TOTAL, 'Putting your app on the internet')

info('This takes a minute or two the first time...')
let url
try {
  const out = execSync('npx vercel deploy --prod --yes', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  })

  // Do not just take the last line: the CLI now ends with machine-readable
  // output, so the last line is a closing brace. Find a real address.
  const urls = out.match(/https:\/\/[a-z0-9.-]+\.vercel\.app/gi) || []

  // Prefer the short project alias. The long deployment URL is protected by
  // Vercel SSO, so opening it bounces you to a Vercel login and the app looks
  // broken. `vercel deploy` prints both; only the alias is public.
  url = urls.find((u) => !/-[a-z0-9]{9,}-/i.test(u)) || urls[0]

  if (!url) {
    // Nothing usable in the output, so ask Vercel directly.
    const alias = tryRun('npx vercel project ls --json', 30000)
    const m = alias && alias.match(/https:\/\/[a-z0-9.-]+\.vercel\.app/i)
    url = m ? m[0] : `https://${projectName}.vercel.app`
  }
} catch {
  stop(
    "The deploy didn't finish",
    'Your project and database are set up - only the final step failed.',
    'Run `npx vercel deploy --prod` on its own and send me the error.'
  )
}

// ---------------------------------------------------------------- done

say()
say(`${c.green}${c.bold}  Done. Your app is live.${c.reset}`)
say()
say(`  ${c.bold}${url}${c.reset}`)
say()
say(`  ${c.dim}To sign in: open the address above, enter your email, and${c.reset}`)
say(`  ${c.dim}press the button. Sending real email is not set up yet, so${c.reset}`)
say(`  ${c.dim}fetch your link with:${c.reset}`)
say()
say(`  ${c.bold}npm run signin-link${c.reset}`)
say()
say(`  ${c.dim}Run that whenever you like. Paste the link it prints into${c.reset}`)
say(`  ${c.dim}your browser.${c.reset}`)
say()
say(`  ${c.dim}Your code is connected to this site, so anything you commit${c.reset}`)
say(`  ${c.dim}goes live automatically.${c.reset}`)
say()
say(`  ${c.dim}To work on it locally, run:${c.reset} ${c.bold}npm run dev${c.reset}`)
say()
