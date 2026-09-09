# Changelog

What has changed in the kit, and what it means for an app already built from
it.

**Your app does not update itself, and there is no update command.** Once you
create an app it is yours - it has no connection back here, and nothing in
this file is applied to it automatically. See
[docs/updating.md](docs/updating.md).

The version your app started from is the `version` in its `package.json`.
Entries below that number are things you already have.

---

## How to read an entry

Each one is written for an AI assistant deciding whether a change is worth
applying to an app that has since moved on. Every entry says:

- **What changed**, and why it might matter to an existing app.
- **Files** it touches.
- **Applying it** - whether it can be copied across as-is, or needs adapting
  to whatever the app has become.

Where an entry touches something the person may well have deleted - the
examples, the docs - it says so. Deleting those is a normal thing to do and
they should never be restored uninvited.

---

## 0.2.0 - 2026-09-09

### Sign-in works in a Codespace

**What changed.** Signing in from a Codespace failed with `Invalid origin` in
the dev server's output, and nothing happening in the browser. The app worked
out its own address in `next.config.ts` using Next's `env` option, which only
inlines values into the browser bundle - so the server, which is what checks
the origin, never saw it and fell back to `localhost:3000` or the deployed
address instead.

Working out the address now lives in `src/lib/base-url.ts` and is read at
runtime. It also puts a Codespace ahead of the Vercel variables, which
matters because `vercel env pull` writes those into your `.env.local` - so a
Codespace has both, and the Codespace one is the address you are looking at.

**Files.** `src/lib/base-url.ts` (new), `src/lib/auth.ts`, `next.config.ts`,
`docs/when-it-goes-wrong.md`.

**Applying it.** Worth taking if you ever work in a Codespace; harmless
otherwise, since it resolves to the same address it did before on a laptop or
once deployed.

Copies across as-is unless you have changed how `baseURL` is worked out in
`auth.ts`, in which case take the ordering - `BETTER_AUTH_URL`, then
Codespace, then Vercel, then localhost - rather than the file.

### One way in, and setup checks everything before it builds anything

**What changed.** There were two ways to start - the template, or `npx degit`
- and only one of them left you with a repository. The `degit` route made
setup invent a project name and offer to create a repository, which is where
people ended up with a live app whose code was saved nowhere.

Now the template is the only documented route, so a repository always exists.
Setup's first step checks everything it needs - Node, Git, a repository of
your own, GitHub signed in, Vercel signed in, and whether your `.vercel.app`
address is free - and stops on any of them rather than warning and carrying
on. Nothing is created until they all pass, so a failure costs you nothing.

Your project also takes its name from your repository now, instead of asking
for one separately. Your code, your project and your address stay in step
without your having to keep them that way.

**Files.** `scripts/setup.mjs`, `README.md`, `docs/when-it-goes-wrong.md`,
`docs/before-your-session*.md`.

**Applying it.** Nothing to do if your app is already set up - it only
changes how a *new* app is created, and your project, repository and address
already exist. Setup stays safe to re-run.

Worth taking if you re-run setup on a second machine, since the version you
have will ask for a project name that this one derives. Otherwise ignore it.

If you have deleted `docs/`, ignore the documentation half. Do not put it
back.

**One thing to know either way:** setup now stops if it cannot reach your
repository on GitHub, where before it warned and carried on. It tests that by
asking git, so however your machine already authenticates is fine. If you
re-run setup somewhere that has never been signed in to GitHub, `gh auth
login` is the usual fix.

### Google sign-in turns itself on when its credentials are set

**What changed.** Setting up Google sign-in used to take two steps: put the
credentials in `.env.local`, *and* uncomment a `socialProviders` block in
`src/lib/auth.ts`. Doing one without the other left it half-working with no
obvious sign of why. Now `socialProviders` reads the two environment
variables directly, and the login page grows a **Continue with Google**
button when it finds them. An app with no Google credentials is unaffected
and still shows the emailed-link form alone.

**Files.** `src/lib/auth.ts`, `src/app/login/page.tsx`,
`src/app/login/google-button.tsx` (new), `docs/add-ons/google-login.md`.

**Applying it.** Worth having if you use Google sign-in, or might later.
About twenty lines in total.

`src/lib/auth.ts` is infrastructure most apps never touch, so the change
usually copies across unchanged - but check first, because an app that has
added its own auth plugins or providers will have a different `betterAuth`
call. Keep what is there and add the Google branch to it rather than
replacing the file.

The login page is more likely to have been restyled. Take the *behaviour* -
render the button only when both `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` are set - and fit it to the page as it now looks,
rather than overwriting it.

If the app has deleted `docs/`, ignore the documentation part of this entry.
Do not put the file back.

---

## 0.1.0

The starting point: Next.js 16, Drizzle and Neon Postgres, Better Auth with
emailed sign-in links, Tailwind 4, the three example apps, and `npm run
setup` to deploy it all to Vercel.
