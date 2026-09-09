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
import { productionUrl } from './site-url.mjs'
import { tidyName, ghReady, ghUser, vercelAddressFree } from './pick-name.mjs'

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

const TOTAL = 7

// -------------------------------------------------------------- 1. preflight
//
// Everything that has to be true before anything is created. Each check that
// can fail stops here rather than warning, because the alternative is finding
// out five minutes in with a Vercel project already made and a database
// already provisioned - half-built and confusing to unpick.

step(1, TOTAL, 'Checking everything is ready')

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

// Coming from the template there is always a history. This is only for a
// copy that arrived some other way - everything in the docs about undoing a
// bad change depends on there being a commit to go back to.
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

// Where your work is going to live. Three states matter here:
//
//   - pointing at the kit itself: you opened a Codespace straight from it
//     rather than making your own copy, so you cannot save anything
//   - pointing at your own repository: what we want
//   - no remote at all: this copy arrived some way other than the template
//
// Both bad states are fatal, and Vercel's own error for the first ("You need
// admin or write access") says nothing about the cause, so catch them here
// before anything is created.
const originUrl = tryRun('git remote get-url origin')

if (originUrl && /[:/]tufan\/t-kit(\.git)?$/i.test(originUrl)) {
  stop(
    'This is the kit itself, not your own copy',
    'Your project is pointing at the original t-kit repository, which you\n' +
    '  cannot save your work to. That happens if you opened a Codespace\n' +
    '  straight from the kit instead of making your own copy of it first.',
    'Open https://github.com/tufan/t-kit, press "Use this template" and\n' +
    '  choose "Create a new repository". Then press "Code" on your new\n' +
    '  repository to make a Codespace there, and run `npm run setup`.\n\n' +
    '  Work you have already done here can be copied across afterwards -\n' +
    '  ask Claude to help if there is any.'
  )
}

// No remote at all means they did not come from the template. There is no
// good way to guess what they wanted, and carrying on would build a project
// whose code lives nowhere - so stop while nothing has been created.
if (!originUrl) {
  stop(
    'This copy is not connected to a repository of your own',
    'Your work would only exist on this machine, and setup would have\n' +
    '  nowhere to deploy from.',
    'Start from the template, which makes you a repository as part of\n' +
    '  creating your copy:\n\n' +
    '    https://github.com/tufan/t-kit\n\n' +
    '  Press "Use this template", choose "Create a new repository", then\n' +
    '  either open a Codespace on it or clone it to your machine.\n\n' +
    '  Already have a repository for this? Connect it and run setup again:\n' +
    '    git remote add origin https://github.com/YOU/YOUR-REPO.git'
  )
}

const repoSlug = originUrl.replace(/^.*[:/]([^/]+\/[^/]+?)(\.git)?$/, '$1')
ok(`Saving your work to ${repoSlug}`)

// Pushing is how the site gets deployed, so being unable to push is not
// something to discover at the end.
if (!ghReady()) {
  stop(
    'GitHub is not signed in here',
    'Setup pushes your work to GitHub, and your site deploys from there.',
    'Run:\n    gh auth login\n\n' +
    '  Choose GitHub.com, HTTPS, and authenticate in the browser. Then run\n' +
    '  `npm run setup` again.'
  )
}
ok(`Signed in to GitHub as ${ghUser() ?? 'you'}`)

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

// ---------------------------------------------------------------- 2. name

step(2, TOTAL, 'Naming your project')

let projectName
if (existsSync('.vercel/project.json')) {
  const linked = JSON.parse(readFileSync('.vercel/project.json', 'utf8'))
  // The name is also used to build the site address at the end, so it has to
  // be the real one rather than a friendly placeholder.
  projectName = linked.projectName
  if (!projectName) {
    stop(
      "Couldn't work out your project's name",
      'The .vercel folder is there but does not name a project.',
      'Delete the .vercel folder and run `npm run setup` again.'
    )
  }
  ok(`Already linked to "${projectName}"`)
} else {
  // The repository is already named, and having your code, your project and
  // your address share a name is worth more than another naming decision. So
  // take it rather than asking again.
  projectName = tidyName(repoSlug.split('/').pop())

  if (!projectName) {
    stop(
      "Couldn't work out a project name from your repository",
      `Your repository is "${repoSlug}", which has no letters or numbers in\n` +
      '  the part after the slash.',
      'Rename the repository on GitHub to something plainer, then run\n' +
      '  `npm run setup` again.'
    )
  }

  ok(`Using "${projectName}", the name of your repository`)

  // The one thing still worth checking: .vercel.app addresses are shared by
  // everyone using Vercel. Vercel does not refuse a taken one, it quietly
  // deploys you to a different address - so say so now rather than letting
  // them find a name they did not choose at the end.
  info('Checking the address is free...')
  const addressFree = await vercelAddressFree(projectName)

  if (addressFree === false) {
    say()
    warn(`${projectName}.vercel.app is already taken by someone else`)
    info('Your app will still work. Vercel will give it a different address')
    info(`- something like ${projectName}-nine.vercel.app - which is harder`)
    info('to remember and not one you chose.')
    say()
    info('To get the address you want, rename your repository on GitHub to')
    info('something more specific and run `npm run setup` again. Two or three')
    info('words is usually enough.')
    say()

    const rl = createInterface({ input: process.stdin, output: process.stdout })
    const carryOn = (await rl.question('  Carry on with this name anyway? [y/N]: '))
      .trim().toLowerCase()
    rl.close()

    if (carryOn !== 'y' && carryOn !== 'yes') {
      stop(
        'Stopped so you can rename your repository',
        'Nothing has been created yet.',
        'Rename it on GitHub (Settings, then the name at the top), then in\n' +
        '  your terminal:\n\n' +
        '    git remote set-url origin https://github.com/YOU/NEW-NAME.git\n\n' +
        '  and run `npm run setup` again.'
      )
    }
  } else if (addressFree === true) {
    ok(`${projectName}.vercel.app is free`)
  }

  // Links to the project if it already exists, creates it if not - so this
  // is also how a second machine reconnects to a project you already have.
  const existed = (tryRun('npx vercel project ls') || '').includes(projectName)

  info(
    existed
      ? `Connecting to your existing "${projectName}"...`
      : `Creating "${projectName}" on Vercel...`
  )
  try {
    run('npx', ['vercel', 'link', '--yes', '--project', projectName])
  } catch {
    stop(
      "Couldn't connect to the project on Vercel",
      `The name "${projectName}" may be taken by someone else.`,
      'Run `npm run setup` again and choose a different name.'
    )
  }
  ok(existed ? `Connected to "${projectName}"` : `Created "${projectName}"`)
}

// ---------------------------------------------------------------- 3. db

step(3, TOTAL, 'Creating your database')

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

// ---------------------------------------------------------------- 4. env

step(4, TOTAL, 'Setting up sign-in for your app')

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

// ---------------------------------------------------------------- 5. schema

step(5, TOTAL, 'Creating your tables')

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

// ---------------------------------------------------------------- 6. seed

step(6, TOTAL, 'Adding example data')

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

// ---------------------------------------------------------------- 7. deploy

step(7, TOTAL, 'Putting your app on the internet')

info('This takes a minute or two the first time...')
let url
try {
  run('npx', ['vercel', 'deploy', '--prod', '--yes'])

  // The deploy prints two addresses:
  //
  //   Production: https://my-app-be2awilp5-someone.vercel.app   <- SSO-locked
  //   Aliased:    https://my-app.vercel.app                     <- the public one
  //
  // Opening the Production one bounces you to a Vercel login and your own app
  // looks broken, so the alias is the one to hand over. Both labelled lines go
  // to stderr, so capturing stdout would not find them - and the alias cannot
  // be assumed to match the project name, because `my-app.vercel.app` may
  // already belong to someone else. Vercel keeps your project name either way
  // and quietly aliases it to something else, so ask which one it used.
  url = productionUrl(projectName)
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

// Say where all three things ended up. Someone whose repository was never
// created has no way of noticing on their own until the day they look.
const finalRemote = tryRun('git remote get-url origin')
say()
say(`  ${c.dim}Your code:${c.reset}    ${
  finalRemote
    ? finalRemote.replace(/^.*[:/]([^/]+\/[^/]+?)(\.git)?$/, 'github.com/$1')
    : `${c.yellow}nowhere yet - it only exists on this machine${c.reset}`
}`)
say(`  ${c.dim}Your project:${c.reset} vercel.com/dashboard -> ${projectName}`)

// Record it so `npm run signin-link` builds links against the same address.
// This has to happen after the deploy, because the address does not exist
// until the project has been deployed at least once. `vercel env pull`
// rewrites this file, so anything that pulls again will drop the line - and
// re-running setup puts it back.
try {
  const existing = existsSync(envFile) ? readFileSync(envFile, 'utf8') : ''
  if (!/^BETTER_AUTH_URL=/m.test(existing)) {
    writeFileSync(
      envFile,
      `${existing.replace(/\n*$/, '\n')}\n# The public address of your app.\nBETTER_AUTH_URL=${url}\n`
    )
  }
} catch {
  // Not fatal: signin-link falls back to asking Vercel directly.
}
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
