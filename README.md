# t-kit

Everything you need to turn an idea into a real, working app on the internet.

Next.js and React, a Postgres database, sign-in that works, and hosting. All
wired together and deployed, so you start from a running app rather than an
empty folder.

---

## Picking this back up

Been away for a while? Find the one that describes you.

### In a Codespace (in a browser tab)

1. **Resume it.** [github.com/codespaces](https://github.com/codespaces) and
   open yours. It stops itself when you are not using it and nothing is lost.
   A few seconds to come back.
2. **Start the app.** In the terminal at the bottom: `npm run dev`
3. **Open it.** Click the **PORTS** tab next to the terminal, find port 3000,
   click the globe icon. **`localhost:3000` will not work** - the app is
   running on a machine in a data centre, not on your laptop. This catches
   everyone.
4. **Sign in.** Enter your email on the page, press the button, then in a
   *second* terminal run `npm run signin-link` and paste the link it prints.
5. **Ask for what you want.** The Claude icon in the left-hand bar. Not the
   Copilot chat on the right, if you have one.

### On your own machine

1. **Open the folder** in VS Code.
2. **Start the app.** In the terminal: `npm run dev`
3. **Open it.** [localhost:3000](http://localhost:3000)
4. **Sign in.** Enter your email on the page, press the button, then look in
   the terminal running `npm run dev` - the link is printed there. Or run
   `npm run signin-link` in a second terminal.
5. **Ask for what you want.** The Claude icon in the left-hand bar.

### Either way

`npm run dev` will not come back to a prompt. That is not it hanging - it
keeps running and watches your files. Leave it. If you need to type something
else, open a second terminal with the **+** at the top right of the panel.

Stuck? [docs/when-it-goes-wrong.md](docs/when-it-goes-wrong.md), or paste the
error into Claude and ask what it means.

---

## Setting up for the first time

First, the checklist - accounts to create, and things to install if you are
not using a Codespace:
[browser](docs/before-your-session-browser.md) ·
[Windows](docs/before-your-session.md) ·
[Mac](docs/before-your-session-mac.md)

### In a Codespace

Open this repository on GitHub, click the green **Code** button, then
**Codespaces**, then **Create codespace on main**. Wait a couple of minutes.

Everything is already installed. One command:

```bash
npm run setup
```

### On your own machine

Needs Node.js 20 or newer.

```bash
npx degit tufan/t-kit my-app && cd my-app
npm install
npm run setup
```

### What setup does

Signs you into Vercel, creates your project and your database, and puts it on
the internet. About six minutes, and it asks you three things along the way.
It prints the address at the end.

Everything it creates belongs to your accounts. If you walk away, it is all
still yours.

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
