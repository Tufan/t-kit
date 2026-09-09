# Working in this project

The person you are working with is **not a developer**. They are building a
tool to solve a real problem in their life or business. Read this before
writing any code.

## How to talk to them

- **Plain English, no jargon.** Not "I'll add a `useState` hook" - "I'll make
  the page remember which filter you picked."
- **Say what you're about to do, briefly, then do it.** They want to follow
  along, not read an essay.
- **Never assume they know a term.** If you must use one, define it in half a
  sentence the first time.
- **If the request is ambiguous, ask.** One short question beats building the
  wrong thing across twenty files.

## How to work

- **Smallest change that works.** Do not refactor, reorganise, rename, or
  "tidy up" things you were not asked about. A surprise diff in an unrelated
  file is confusing and erodes their trust in the whole process.
- **Do not add dependencies** without saying so and why. Most things they ask
  for do not need a new package.
- **Follow the patterns already here.** Look at an existing example folder
  and copy its shape. Consistency matters more than elegance.
- **Never touch these unless explicitly asked**: `src/lib/auth.ts`,
  `src/lib/db.ts`, `src/proxy.ts`, `scripts/setup.mjs`. They are working
  infrastructure and breaking them ends the session.

## The stack

| Part | What it is |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme inline` in `globals.css` - **not** a `tailwind.config.js`) |
| Database | Neon Postgres via Drizzle ORM |
| Auth | Better Auth (magic link by default) |
| Hosting | Vercel |

## Conventions

- **Data fetching in `page.tsx`** (a server component). Interactive UI goes in
  a `*-client.tsx` (a client component) that receives data as props.
- **Writes go through server actions** in the feature's own folder, not API
  routes. API routes are only for things outside the app calling in.
- **Every user-owned table has a `userId` column** referencing `user.id`.
  Every query filters by the signed-in user. No exceptions - this is what
  stops one person seeing another's data.
- **Schema lives in `src/lib/schema/`.** Add a table there, then run
  `npm run db:push` to apply it. Never write raw `CREATE TABLE`.
- **Money is stored in pence/cents as an integer**, never a float.
- **Dates are stored as `date` or `timestamp`**, never as a string.
- **Use the components in `src/components/ui`** - `Button`, `Input`, `Select`,
  `Field`, `Card`, `Stat`, `Table`, `Badge` - rather than writing the same
  Tailwind classes again. If you need something that is not there, add it to
  that file rather than inlining it in a page.

## Adding a feature - the shape to copy

A feature is a self-contained folder. To add one:

1. `src/lib/schema/<name>.ts` - the tables, exported
2. Register it in `src/lib/schema/index.ts`
3. `src/app/<name>/page.tsx` - fetch data, render
4. `src/app/<name>/<name>-client.tsx` - the interactive bits
5. `src/app/<name>/actions.ts` - server actions for writes
6. Add it to the nav in `src/components/shell/nav.tsx`
7. `npm run db:push`

Look at `src/app/examples/money/` for a complete, small worked example.

## The examples

`src/app/examples/` contains three demo apps (meals, money, clients). They
exist so the person can see working code and click around a real thing.

- **They are deletable.** Nothing in the core imports from them.
- If the person says they're done exploring, run `npm run examples:remove`.
- **Do not build their real feature inside an example folder.** Copy the
  pattern into a new top-level folder instead, so removing the examples
  doesn't take their work with it.

## If they ask about updates from the kit

This project was created from t-kit. It has no connection back to it - no
upstream remote, no shared history - and there is deliberately no update
command. If they ask whether there is anything new worth having:

1. Read the `version` in `package.json`. That is the kit version they started
   from.
2. Fetch the kit's changelog:
   `https://raw.githubusercontent.com/tufan/t-kit/main/CHANGELOG.md`
3. Tell them what has landed since their version, in plain terms - what each
   change is and whether it is worth it *for this app*. A change to something
   they do not use is not worth their time.
4. Apply only what they pick.

**Never copy a file across wholesale.** Take what the change is *doing* and
fit it to what the file has become here. This app has moved on from the kit;
that is the entire point of it.

**Never restore something they deleted.** No examples, no docs, no add-ons
they removed. If a changelog entry only touches files that are not here any
more, skip it and say so.

**If a change collides with something they have customised**, say so and
describe the choice, rather than picking for them.

When they have applied everything they want, update `version` in
`package.json` to match, so the next check starts from the right place.

## Commands

```bash
npm run dev              # local dev server
npm run db:push          # apply schema changes to the database
npm run db:studio        # browse the database in a UI
npm run seed             # re-seed example data
npm run examples:remove  # delete the example apps
npx vercel deploy --prod # put changes live
```

## When something breaks

Check `docs/when-it-goes-wrong.md` first - the common failures are listed
there with fixes. If the error mentions a missing environment variable, the
fix is almost always `npx vercel env pull .env.local`.
