# Before your session

About 20 minutes of setup, best done a few days ahead so there's time to sort
anything that goes wrong.

You don't need to understand any of it. Just get to the end of the checklist.

*(On a Mac? Use [before-your-session-mac.md](before-your-session-mac.md)
instead - the install steps differ.)*

---

## 1. Accounts to create

Three, all free except the first.

### Claude Pro - £15/month
[claude.ai](https://claude.ai) → upgrade to Pro

This is the AI that writes the code. The free tier will stop you within the
first hour, so Pro is the minimum. Cancel after if it's not for you.

### GitHub - free
[github.com](https://github.com) → sign up

Where your code lives. Think of it as Google Drive for code - it keeps every
version, so nothing is ever really broken.

### Vercel - free
[vercel.com](https://vercel.com) → sign up

**Sign up with GitHub** (there's a button). Don't use email - signing up with
GitHub connects the two automatically and saves a fiddly step later.

This is what puts your app on the internet. The free plan is genuinely free
and enough for anything you'll build.

---

## 2. Things to install

### Node.js
[nodejs.org](https://nodejs.org) → download the **LTS** version

The engine your app runs on. Take all the defaults.

### VS Code
[code.visualstudio.com](https://code.visualstudio.com)

The editor. You won't be typing much code in it, but it's where the AI works.

### Claude Code
Open VS Code → Extensions (the squares icon in the left bar) → search
"Claude Code" → Install. Sign in with your Claude account.

### GitHub CLI
[cli.github.com](https://cli.github.com) → download and install, taking all
the defaults.

This is how your computer talks to GitHub. Once it's installed, open a
terminal and run:

```
gh auth login
```

Answer **GitHub.com**, then **HTTPS**, then **Login with a web browser**. It
gives you a code, opens GitHub, and you paste the code in. Setup will not run
until this is done.

---

## 3. The one check that matters

Open a terminal:
- **Windows:** Start menu → type "PowerShell" → open it
- **Mac:** Cmd+Space → type "Terminal" → open it

Type these three lines, pressing Enter after each:

```
node --version
git --version
gh auth status
```

The first two should give version numbers, something like `v22.14.0` and
`git version 2.45.1`. The exact numbers don't matter. The third should say
you're logged in to github.com.

**If any of them says "not recognised", "command not found", or that you're
not logged in, send me a screenshot.** This is the single most common thing
that goes wrong, and it's much easier to fix before the session than during
it.

*(On Windows, Git usually arrives with VS Code. If it didn't, grab it from
[git-scm.com](https://git-scm.com) and take all the defaults.)*

---

## 4. Homework - the important bit

**Write me a paragraph about the one thing you'd most like to have working by
the end of the day.**

Two rules:

**One thing, not three.** We'll build one thing properly rather than three
things badly. You can build the others yourself afterwards - that's rather
the point.

**Describe the problem, not the app.** This matters more than it sounds.

> ❌ "I want a meal planning app with recipes and a shopping list"
>
> ✅ "Every week we end up staring at the fridge at 6pm with no idea what to
> cook, then shopping twice and wasting half of it"

The second one tells me what actually needs solving, and usually leads
somewhere better than the app you'd have specified. The first one is already
a guess at the answer.

Don't worry about whether it's possible or too ambitious. Working that out is
the first thing we'll do together.

---

## What NOT to do

Don't try to prepare by reading about databases, hosting, or how any of this
works. It's wasted anxiety and it's genuinely what the day is for.

If you want to do something useful, spend ten minutes thinking about the
homework question instead.

---

## On the day

Have your laptop set up somewhere you can work comfortably for a few hours,
with the accounts above logged in and ready.

We'll build everything from scratch on your own accounts, so you leave owning
all of it and can carry on without me afterwards.
