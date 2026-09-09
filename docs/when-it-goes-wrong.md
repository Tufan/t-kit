# When it goes wrong

The common failures, and what to do. If yours isn't here, send me the exact
error text - don't summarise it.

---

## "You need admin or write access to the repository"

Setup stopped while connecting to Vercel, with a message about not having
write access to `t-kit`.

You are working in a copy of the kit that belongs to me, not a copy of your
own - which happens if you chose **Open in a codespace** on the template menu
instead of **Create a new repository**.

The fix is to make your own copy: open
[the kit](https://github.com/tufan/t-kit), press **Use this template** →
**Create a new repository**, then **Code** → **Codespaces** on your new
repository. Run `npm run setup` there. You can delete the old Codespace at
[github.com/codespaces](https://github.com/codespaces).

Anything you had already done in the old Codespace can be copied across -
ask Claude to help if there is any.

---

## "This copy is not connected to a repository of your own"

Setup stopped at the first step, before creating anything.

Your copy of the kit has no repository behind it, which happens if it arrived
some way other than the template - downloaded as a zip, say, or copied from
someone else's folder. Your code would have nowhere to live and your site
nowhere to deploy from, so setup stops rather than building half a project.

The fix is to start from the template: open
[the kit](https://github.com/tufan/t-kit), press **Use this template** →
**Create a new repository**, then either open a Codespace on it or clone it
to your machine.

Already have a repository you want to use? Point your copy at it and run
setup again:

```bash
git remote add origin https://github.com/YOU/YOUR-REPO.git
npm run setup
```

---

## "Invalid origin" when you try to sign in

The page loads, you enter your email, and nothing happens. The terminal
running `npm run dev` shows:

```
ERROR [Better Auth]: Invalid origin: http://localhost:3000
```

Sign-in checks that the address a request came from is one the app expects,
and refuses anything else.

**In a Codespace the message names `localhost:3000` even though your browser
bar says `app.github.dev`.** That is not a clue about where you went wrong:
GitHub's port forwarding rewrites the address on its way to the app, and the
kit knows to allow for that. So if you see this in a Codespace, the cause is
almost always a `BETTER_AUTH_URL` line in `.env.local` - `vercel env pull`
can leave one behind. Delete that line, then stop `npm run dev` with
**Ctrl+C** and start it again. `.env.local` is only read when the server
starts.

On your own machine, the app should already expect `localhost:3000`. If it
does not, the same `BETTER_AUTH_URL` line is the thing to look for.

---

## "Cannot reach [your repository] on GitHub"

Setup stopped at the first step, before creating anything. Either this
computer cannot sign in to GitHub, or the repository is not where your copy
thinks it is.

Check the address first:

```bash
git remote -v
```

If that is not your repository - because you renamed it, say - point it at
the right one:

```bash
git remote set-url origin https://github.com/YOU/YOUR-REPO.git
```

If the address is right, this computer needs to be able to sign in to
GitHub. The simplest way is the GitHub CLI from
[cli.github.com](https://cli.github.com), then:

```bash
gh auth login
```

Answer **GitHub.com**, then **HTTPS**, then **Login with a web browser**, and
paste the code it gives you. Then run `npm run setup` again.

This does not come up in a Codespace, which can already reach your
repositories without being told anything.

---

## My app's address doesn't match my project name

You called the project `carpentry`, but the live site is at something like
`carpentry-4f2b.vercel.app`.

Nothing is wrong. `.vercel.app` addresses are shared by everyone who uses
Vercel, so if the plain one was already taken, Vercel keeps your project name
and gives it a slightly different public address.

Setup prints the real one when it finishes, and you can always see it on your
[Vercel dashboard](https://vercel.com/dashboard). If you would rather have a
tidier address, open your project there, then **Settings** → **Domains**, and
add any free `.vercel.app` name that nobody has taken.

---

## "DATABASE_URL is missing"

Your app can't find your database.

```bash
npx vercel env pull .env.local
```

This is the fix for almost any "missing environment variable" error. It
re-downloads your settings from Vercel.

---

## The sign-in email never arrives

**Expected, until you connect an email service.** The sign-in link is printed
in your terminal - the window where `npm run dev` is running. Copy the link
and paste it into your browser.

To send real emails: [add-ons/sending-email.md](add-ons/sending-email.md)

---

## "relation ... does not exist"

The table your code wants isn't in the database yet.

```bash
npm run db:push
```

Run this every time you (or your AI assistant) add or change a table.

---

## Changes work locally but not on the live site

You haven't deployed them.

```bash
npx vercel deploy --prod
```

Local and live are separate.

---

## The site was working, now it's a wall of red text

Undo everything since your last save point:

```bash
git checkout .
```

You lose changes since the last commit, and nothing else. See rule 5 in
[how-to-drive-the-agent.md](how-to-drive-the-agent.md) on committing often.

---

## Signed in locally, but the live site won't let me in

Your local sign-in doesn't carry over - they're separate. Sign in again on the
live site:

1. On your live site, enter your email and press **Email me a link**.
2. In a terminal, run:

   ```bash
   npm run signin-link
   ```

3. Paste the link it prints into your browser.

You can run that as often as you like. If the link has expired, ask for a new
one in the browser and run it again.

---

## `npm run dev` says localhost:3000 but nothing loads there

You are working in a Codespace, so the app is not running on your own
computer. `localhost` means "this machine", and this machine is in the cloud.

Open the **PORTS** tab next to the terminal, find port 3000, and click the
globe icon. That opens the right address, which looks like
`https://something-3000.app.github.dev`.

---

## The terminal has stopped responding after `npm run dev`

`npm run dev` is meant to keep running. It sits there watching your files and
rebuilding as you change them, so it never returns to a prompt.

Leave it running and open a second terminal for anything else, with the **+**
at the top right of the terminal panel. Ctrl+C stops the dev server, and your
preview goes down with it.

---

## "Need to specify how to reconcile divergent branches"

Your copy and the online copy have both changed, and git wants to know which
to keep. This one is safe to answer:

```bash
git pull --no-rebase
```

That merges the two. If it then reports a conflict, ask your AI assistant to
sort it out rather than editing the files by hand.

---

## I opened it on my other computer and my work is missing

Your code lives in three places: this machine, your other machine, and
GitHub. GitHub is the one they have in common, and nothing moves between them
on its own. (If you never put your project on GitHub, that is the first step
- ask Claude to do it.)

So before you switch machines:

```bash
git push
```

And when you arrive at the other one:

```bash
git pull
```

If you forgot to push and the work is on the other machine, it is not lost -
go back to that machine and push it.

---

## Setting up on a second machine

Your Vercel connection and your settings are deliberately not stored in
GitHub, so a second machine needs setting up once:

```bash
npm run setup
```

It takes its name from your repository, so it sees the project already exists
and reconnects rather than creating a second one. Both machines then share
the same database and the same live site.

---

## "Port 3000 is already in use"

You've got the app running in another window. Either use that one, or close it
and start again.

---

## Everything is broken and I don't know why

In order:

1. Stop the dev server (Ctrl+C) and start it again
2. `npx vercel env pull .env.local`
3. `npm install`
4. `git checkout .` - undo to your last save point
5. Send me the error

Steps 1 - 3 fix most things. Step 4 fixes the rest.
