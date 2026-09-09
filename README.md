# t-kit

A starting point for building a real app on the internet.

Next.js and React, a Postgres database, sign-in, and hosting. Wired together
and deployed.

---

## Getting started

**Everyone starts the same way: make your own copy from this template.** That
gives you a repository of your own, which is where your code lives and where
your site deploys from. Setup will not run without one.

After that, choose where you work:

- **In a browser (a Codespace).** Nothing to install. Works on a locked-down
  work laptop or an old machine. The easier start, and what these
  instructions assume.
- **On your own machine.** Faster and works offline, but you install the
  tools yourself.

---

## First time

### 1. Accounts

Work through the checklist:
[in a browser](docs/before-your-session-browser.md) ·
[Windows](docs/before-your-session.md) ·
[Mac](docs/before-your-session-mac.md)

### 2. Make your copy

Open this repository on GitHub, press **Use this template** and choose
**Create a new repository**. Give it a name, set it to **Private**, and
create it under your own account.

Not **Open in a codespace**, which is the other option on that menu. That
gives you a machine but no copy of your own, so there is nowhere to save your
work and setup will stop and tell you so.

Three things on that form are worth a moment:

**Leave "Include all branches" off.** It is off by default and should stay
that way. On, you get every branch of the kit that happened to exist the day
you pressed the button - unfinished work in the middle of being written,
which is nothing to do with your app and only confusing to find later. You
want `main`, which is what off gives you.

**Set visibility to Private.** It starts on *Public*, so this is one you have
to change. It costs you nothing: Codespaces, the database and the free
hosting are identical either way, and the app you put on the internet is
public regardless. Private only decides who can read your *code* - and sooner
or later a real password ends up in there by accident. You can make it public
later in two clicks; unsaying a secret is harder.

**The name matters more than it looks** - it becomes your project's name and
its address too. See [picking a name](#picking-a-name).

### 3. Open it

**In a browser:** on your new repository press **Code**, then **Codespaces**,
then **Create codespace on main**. Wait a couple of minutes, and say yes when
it asks whether you trust the authors.

**On your own machine:** press **Code**, copy the HTTPS address, and in a
terminal:

```bash
git clone https://github.com/YOU/YOUR-REPO.git
cd YOUR-REPO
npm install
```

### 4. Run setup

In the terminal:

```bash
npm run setup
```

See [what setup does](#what-setup-does) below.

---

## Coming back to it

**In a browser.** [github.com/codespaces](https://github.com/codespaces) and
open yours. It stops itself when you are not using it; your work is still
there. A few seconds to come back.

*Not listed any more?* GitHub deletes Codespaces left unused for 30 days.
Anything you pushed is safe: open your repository and create a new Codespace.
Your project is already set up, so there is nothing to run again.

**On your own machine.** Open your project folder in VS Code - **File**,
**Open Folder** - and `git pull` if you have worked elsewhere since.

Then, either way:

1. **Start the app:** `npm run dev`
2. **Open it.** In a browser, click the **PORTS** tab next to the terminal,
   find port 3000 and click the globe icon - `localhost:3000` will not work,
   because the app is running on a machine in a data centre. On your own
   machine it is [localhost:3000](http://localhost:3000).
3. **Sign in.** Enter your email and press **Email me a link**. Then, in a
   *second* terminal, run `npm run signin-link` and paste the link it prints
   into your browser.
4. **Ask for what you want.** The Claude icon in the left-hand bar. Not the
   Copilot chat on the right, if you have one. A good first question after a
   break: *what does this app do so far, and what was the last thing
   changed?*

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
database, and puts it on the internet. About six minutes. It asks you two
things: approve a sign-in link for Vercel, and the email address you will
sign in with. It prints the address of your live app at the end, along with
where your code and your project ended up.

**It checks everything before it creates anything.** Node, Git, that you are
signed in to GitHub and Vercel, and that your app's address is free. If
something is missing it stops and tells you what to do, with nothing
half-made to unpick. So a failure at that first step costs you nothing but
the time to fix it and run setup again.

**Your project takes its name from your repository**, so your code, your
project and your address all match without your having to keep them in step.
See [picking a name](#picking-a-name).

---

## Picking a name

Your project ends up in three places, and life is easier if they share a
name:

- your code: `github.com/you/club-rota`
- your project on Vercel: `club-rota`
- the address you give people: `club-rota.vercel.app`

**All three come from the name you give your repository**, so they stay in
step on their own. That is also why it is worth a moment's thought: it is the
only naming decision you make.

**The address is the part that catches people out.** `.vercel.app` names are
shared by everyone using Vercel, so an ordinary word like `rota` is very
likely gone. Vercel does not refuse a taken name - it quietly gives your
project a different address like `rota-nine.vercel.app`, which is not one
you chose and hard to remember.

Setup checks before it creates anything, and if the address is taken it stops
and offers to let you rename. That is easy at that point and fiddly later, so
take the offer.

**So: two or three words, not one.** `club-rota` rather than `rota`.
Something specific to you is both likelier to be free and easier to say out
loud.

Changed your mind afterwards? Rename the repository on GitHub, then point
your copy at the new name and run setup again:

```bash
git remote set-url origin https://github.com/YOU/NEW-NAME.git
npm run setup
```

Lost the address? It is on your dashboard at
[vercel.com](https://vercel.com), under the project name you chose.

Everything it creates is on your own accounts.

---

## Working on two machines

Your project is already on GitHub, so this is just a clone. On the second
machine:

```bash
git clone https://github.com/YOU/YOUR-REPO.git
cd YOUR-REPO
npm install
npm run setup
```

Setup reconnects to the project you already have rather than making a second
one - it recognises it by your repository's name - so both machines share the
same database and the same live site.

A Codespace counts as a machine, so this is also how you work in the browser
sometimes and locally at others.

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
- [docs/updating.md](docs/updating.md) - the kit keeps improving; your app
  does not change when it does. How to see what is new and take only the bits
  you want.

---

## Licence

MIT. See [LICENSE](LICENSE).
