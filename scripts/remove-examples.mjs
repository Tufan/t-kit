#!/usr/bin/env node
/**
 * Deletes the three example apps.
 *
 * Nothing in the core imports from them, so this is safe: the app still
 * builds and runs afterwards. It does NOT drop their database tables - run
 * `npm run db:push` afterwards if you want those gone too.
 */

import { rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs'

const dirs = [
  'src/app/examples',
  'src/lib/schema/examples',
]

let removed = 0
for (const d of dirs) {
  if (existsSync(d)) {
    rmSync(d, { recursive: true, force: true })
    console.log(`  removed ${d}`)
    removed++
  }
}

// Strip the example lines out of the schema index and the nav.
const edits = [
  {
    file: 'src/lib/schema/index.ts',
    drop: /^\/\/ --- examples:.*$\n(^export \* from '\.\/examples\/.*$\n?)*/m,
  },
  {
    file: 'src/components/shell/nav.tsx',
    drop: /^\s*\/\/ --- examples:.*$\n(^\s*\{ href: '\/examples\/.*$\n?)*/m,
  },
]

for (const { file, drop } of edits) {
  if (!existsSync(file)) continue
  const before = readFileSync(file, 'utf8')
  const after = before.replace(drop, '')
  if (after !== before) {
    writeFileSync(file, after)
    console.log(`  cleaned ${file}`)
  }
}

if (removed === 0) {
  console.log('\n  Examples were already removed.\n')
} else {
  console.log('\n  Done. The examples are gone and your app still works.')
  console.log('  Their database tables are still there - run `npm run db:push`')
  console.log('  if you want to clear those out too.\n')
}
