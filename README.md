# t-kit

A starting point for building a real app on the internet.

Next.js and React, a Postgres database, sign-in, and hosting. Wired together
and deployed.

---

## Getting started

Two ways to work.

- **In a browser (a Codespace).** Nothing to install. Works on a locked-down
  work laptop or an old machine.
- **On your own machine.** Faster, works offline, needs Node.js 20 or newer.

Not sure which you did? If there is a project folder on your computer, you
are on the own-machine path. If not, it is a Codespace.

---

## In a browser (a Codespace)

### First time

1. Work through the checklist:
   [accounts to create](docs/before-your-session-browser.md).
2. Open this repository on GitHub, press **Use this template** and choose
   **Create a new repository**. Give it a name and create it under your own
   account.

   Not **Open in a codespace**, which is the other option on that menu. That
   gives you a machine but no copy of your own, so there is nowhere to save
   your work and setup will stop and tell you so.
3. On your new repository, press **Code**, then **Codespaces**, then
   **Create codespace on main**. Wait a couple of minutes.
4. When it asks whether you trust the authors, say yes.
5. In the terminal at the bottom, run:

   ```bash
   npm run setup
   ```

   See [what setup does](#what-setup-does) below.

### Coming back to it

1. **Resume it.** [github.com/codespaces](https://github.com/codespaces) and
   open yours. It stops itself when you are not using it; your work is still
   there. A few seconds to come back.

   **Not listed any more?** GitHub deletes Codespaces left unused for 30
   days. Anything you pushed is safe on GitHub: open your repository, create
   a new Codespace, and run `npm run setup` again with the same project name.
2. **Start the app:** `npm run dev`
3. **Open it.** Click the **PORTS** tab next to the terminal, find port 3000,
   click the globe icon.

   **`localhost:3000` will not work.** The app is running on a machine in a
   data centre, not on your laptop.
4. **Sign in.** Enter your email and press **Email me a link**. Then, in a
   *second* terminal, run `npm run signin-link` and paste the link it prints
   into your browser.
5. **Ask for what you want.** The Claude icon in the left-hand bar. Not the
   Copilot chat on the right, if you have one. A good first question after a
   break: *what does this app do so far, and what was the last thing
   changed?*

---

## On your own machine

### First time

1. Work through the checklist - accounts, and things to install:
   [Windows](docs/before-your-session.md) ·
   [Mac](docs/before-your-session-mac.md)
2. Open VS Code, then **Terminal** menu, **New Terminal**. Three commands,
   where `my-app` is whatever you want your project folder called:

   ```bash
   npx degit tufan/t-kit my-app && cd my-app
   npm install
   npm run setup
   ```

   See [what setup does](#what-setup-does) below.

### Coming back to it

1. **Open your project folder** in VS Code - **File**, **Open Folder**. It is
   the one you named when you set up.
2. **Start the app.** **Terminal** menu, **New Terminal**, then:
   `npm run dev`
3. **Open it:** [localhost:3000](http://localhost:3000)
4. **Sign in.** Enter your email and press **Email me a link**. Then, in a
   *second* terminal, run `npm run signin-link` and paste the link it prints
   into your browser.
5. **Ask for what you want.** The Claude icon in the left-hand bar. A good
   first question after a break: *what does this app do so far, and what was
   the last thing changed?*

---

## Two things that look broken and are not

**`npm run dev` never finishes.** It sits there instead of coming back to a
prompt. It is meant to: it keeps running and watches your files for changes.
If you need to type something else, open a second terminal with the **+** at
the top right of the panel.

**No sign-in email arrives.** Sending real email is not set up yet, so the
link goes to your logs instead. `npm run signin-link` prints it.

Anything else: [docs/when-it-goes-wrong.md](docs/when-it-goes-wrong.md), or
paste the error into Claude and ask what it means.

---

## What setup does

`npm run setup` signs you into Vercel, creates your project and your
database, and puts it on the internet. About six minutes. It asks you three
things: approve a sign-in link for Vercel, name your project, and give the
email address you will sign in with. It prints the address of your live app
at the end, along with where your code and your project ended up.

**About the name.** It is used in three places - your code on GitHub, your
project on Vercel, and the address people visit - so setup checks it is free
in all of them before going ahead. The one that catches people out is the
address: `.vercel.app` names are shared by everyone using Vercel, so an
ordinary word is often gone already. Vercel does not refuse it, it just
quietly gives your project a different address like `carpentry-nine`. Setup
tells you and offers you another go, which is much easier than changing it
afterwards.

If you do not have a repository yet, setup offers to make you one, so your
work is not left sitting on one machine.

Lost the address? It is on your dashboard at
[vercel.com](https://vercel.com), under the project name you chose.

Everything it creates is on your own accounts.

---

## Working on two machines

Only if your project is on GitHub. Setup tells you at the end whether it is -
look for the "Your code" line. If it says your work only exists on this
machine, ask Claude to put your project on GitHub first.

Then, on the second machine, ask Claude to fetch your project from GitHub,
and run:

```bash
npm run setup
```

**Give it the same project name as the first time.** It reconnects to your
existing project rather than creating a second one, so both machines share
the same database and the same live site.

After that: `git push` before you switch, `git pull` when you arrive.

---

## Commands

```bash
npm run dev              # work on it locally
npm run signin-link      # print your sign-in link
npm run db:push          # after adding or changing a table
npm run db:studio        # browse your data
npm run seed             # restore the example data
npm run examples:remove  # delete the three example apps
```

The last two touch the examples only, never your own tables or your own
screens. `db:push` is the one to remember: run it whenever you or Claude add
or change a table, or the app will look for something the database has not
got.

---

## Putting a change live

Changing your own copy does not change the live site until you say so.

```bash
npx vercel deploy --prod
```

Ask Claude to commit your work first, so you have a point to get back to.

If your Vercel project is connected to GitHub, `git push` also deploys on its
own a minute or so later. The command above works either way.

---

## What's in the box

| Part | What it is |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Neon Postgres via Drizzle |
| Sign-in | Better Auth, emailed link |
| Hosting | Vercel |

Four separate companies, four accounts, all in your name: **GitHub** keeps
your code and its history, **Vercel** runs the app, **Neon** is the database,
and **Claude** writes the code with you.

Three example apps come installed - meals, money and clients - as working
code to look at and copy. Remove them with `npm run examples:remove`.

If a screen looks inconsistent with the rest, tell Claude to use the shared
components in `src/components/ui`.

---

## Learning your way around

- [docs/how-to-drive-the-agent.md](docs/how-to-drive-the-agent.md) - **the
  one worth reading.** How to break an idea into steps an AI can build, and
  what to do when it goes wrong.
- [docs/your-first-change.md](docs/your-first-change.md) - a small change,
  start to finish.
- [docs/when-it-goes-wrong.md](docs/when-it-goes-wrong.md) - the failure
  catalogue. Common problems and their fixes.
- [docs/add-ons/](docs/add-ons/) - what the kit does not do out of the box:
  real emails, your own domain, file uploads, payments, better-looking
  components.

---

## Licence

MIT. See [LICENSE](LICENSE).
