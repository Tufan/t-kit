# t-kit

Everything you need to turn an idea into a real, working app on the internet.

Next.js and React, a Postgres database, sign-in that works, and hosting. All
wired together and deployed, so you start from a running app rather than an
empty folder.

---

## Getting started

Two ways to work. Start with whichever suits you.

| | |
|---|---|
| **In a browser** (a Codespace) | Nothing to install. Works on a locked-down work laptop or an old machine. |
| **On your own machine** | Faster, works offline, needs Node.js 20 or newer. |

**You can use both**, on the same project - a Codespace at work and your own
laptop at home, say. Two rules if you do:

1. **`git push` before you switch, `git pull` when you arrive.** GitHub is
   what the two have in common. Forget, and you will be editing an old copy.
2. **Each machine needs its own setup once.** Your settings and your Vercel
   connection are deliberately not stored in GitHub, so on the second machine
   run `npm run setup` again. It sees the project already exists and just
   reconnects; it will not create a second one.

Both talk to the *same* database and the same live site, so your data follows
you either way.

---

## In a browser (a Codespace)

### First time

1. Work through the checklist:
   [accounts to create](docs/before-your-session-browser.md). Nothing to
   install.
2. Open this repository on GitHub. Green **Code** button, **Codespaces** tab,
   **Create codespace on main**. Wait a couple of minutes.
3. When it asks whether you trust the authors, say yes. Nothing runs until
   you do.
4. In the terminal at the bottom, run:

   ```bash
   npm run setup
   ```

   See [what setup does](#what-setup-does) below.

### Coming back to it

1. **Resume it.** [github.com/codespaces](https://github.com/codespaces) and
   open yours. It stops itself when you are not using it, and nothing is
   lost. A few seconds to come back.
2. **Start the app:** `npm run dev`
3. **Open it.** Click the **PORTS** tab next to the terminal, find port 3000,
   click the globe icon.

   **`localhost:3000` will not work.** The app is running on a machine in a
   data centre, not on your laptop. This catches everyone.
4. **Sign in.** Enter your email on the page and press the button. Then, in a
   *second* terminal, run `npm run signin-link` and paste the link it prints.
5. **Ask for what you want.** The Claude icon in the left-hand bar. Not the
   Copilot chat on the right, if you have one.

---

## On your own machine

### First time

1. Work through the checklist - accounts, and things to install:
   [Windows](docs/before-your-session.md) ·
   [Mac](docs/before-your-session-mac.md)
2. Three commands:

   ```bash
   npx degit tufan/t-kit my-app && cd my-app
   npm install
   npm run setup
   ```

   See [what setup does](#what-setup-does) below.

### Coming back to it

1. **Open the folder** in VS Code.
2. **Start the app:** `npm run dev`
3. **Open it:** [localhost:3000](http://localhost:3000)
4. **Sign in.** Enter your email on the page and press the button. The link
   is printed in the terminal running `npm run dev`.
5. **Ask for what you want.** The Claude icon in the left-hand bar.

---

## What setup does

`npm run setup` signs you into Vercel, creates your project and your
database, and puts it on the internet. About six minutes, and it asks you
three things along the way. It prints the address at the end.

Everything it creates belongs to your accounts. If you walk away, it is all
still yours.

---

## Two things that look broken and are not

**`npm run dev` never finishes.** It sits there instead of coming back to a
prompt. That is what it is meant to do: it keeps running and watches your
files for changes. Leave it. If you need to type something else, open a
second terminal with the **+** at the top right of the panel.

**No sign-in email arrives.** Sending real email is not set up yet, so the
link goes to your logs instead. `npm run signin-link` prints it.

Anything else: [docs/when-it-goes-wrong.md](docs/when-it-goes-wrong.md), or
paste the error into Claude and ask what it means.

---

## Commands

```bash
npm run dev              # work on it locally
npm run signin-link      # print your sign-in link
npm run db:push          # apply changes to your database
npm run db:studio        # browse your data
npm run seed             # put the example data back
npm run examples:remove  # clear out the examples
```

**Your code is connected to your live site.** Committing a change deploys it
automatically a minute or so later. `npx vercel deploy --prod` is only for
when you want it live immediately.

---

## What's in the box

| | |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Neon Postgres via Drizzle |
| Sign-in | Better Auth, emailed link |
| Hosting | Vercel |

Four separate companies, four accounts, all yours: **GitHub** keeps your code
and its history, **Vercel** runs the app, **Neon** is the database, and
**Claude** writes the code with you. Any of them could be swapped for
something else later.

Three example apps come installed - meals, money and clients - so there is
something working to look at and copy. Delete them when you are ready with
`npm run examples:remove`.

Shared buttons, inputs and tables live in `src/components/ui`. Use those
rather than styling things from scratch, and everything stays consistent.

---

## Learning your way around

- [docs/how-to-drive-the-agent.md](docs/how-to-drive-the-agent.md) - **the
  one worth reading.** How to break an idea into steps an AI can build, and
  what to do when it goes wrong.
- [docs/your-first-change.md](docs/your-first-change.md) - a small change,
  start to finish.
- [docs/when-it-goes-wrong.md](docs/when-it-goes-wrong.md) - the failure
  catalogue. Common problems and their fixes.
- [docs/add-ons/](docs/add-ons/) - things the kit does not do out of the box:
  real emails, your own domain, file uploads, payments, better-looking
  components. Do not read these until you need one.

---

## Licence

MIT. See [LICENSE](LICENSE).
