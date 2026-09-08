# When it goes wrong

The common failures, and what to do. If yours isn't here, send me the exact
error text - don't summarise it.

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

Local and live are separate. Changing your computer doesn't change the
internet until you push it.

---

## The site was working, now it's a wall of red text

Undo everything since your last save point:

```bash
git checkout .
```

You lose changes since the last commit, and nothing else. This is why
committing often matters - see rule 5 in
[how-to-drive-the-agent.md](how-to-drive-the-agent.md).

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

It has not stopped: `npm run dev` is meant to keep running. It sits there
watching your files and rebuilding as you change them, which is why it never
returns to a prompt.

Leave it running and open a second terminal for anything else, with the **+**
at the top right of the terminal panel. Pressing Ctrl+C stops the dev server
and your preview goes down with it.

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
on its own.

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

**Give it the same project name as before.** It will see the project already
exists and reconnect, rather than creating a second one. Both machines then
share the same database and the same live site.

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
