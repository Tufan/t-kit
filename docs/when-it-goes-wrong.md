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
