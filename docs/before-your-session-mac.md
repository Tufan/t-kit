# Before your session - Mac

About 20 minutes of setup, best done a few days ahead so there's time to sort
anything that goes wrong.

You don't need to understand any of it. Just get to the end of the checklist.

*(On Windows? Use [before-your-session.md](before-your-session.md) instead.)*

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

### Git - do this one first

macOS looks like it already has Git, but it ships a placeholder that has to
fetch the real thing on first use. Get it out of the way now, because it's a
large download and you don't want it eating into the session.

Open Terminal - press **Cmd+Space**, type "Terminal", press Enter - and type:

```
git --version
```

One of two things happens:

- **A box pops up offering to install the command line developer tools.**
  Click **Install** and agree. It's around a gigabyte and can take 20 minutes
  on a slow connection. Let it finish.
- **You get a version number** like `git version 2.39.5`. Nothing to do.

If the box never appears and the command isn't found, run
`xcode-select --install` to trigger it manually.

### Node.js
[nodejs.org](https://nodejs.org) → download the **LTS** version

The engine your app runs on. The site should offer you the right build
automatically. If it asks, pick **Apple Silicon** (any Mac from late 2020
onwards) or **Intel** (older). Take all the defaults.

### VS Code
[code.visualstudio.com](https://code.visualstudio.com)

The editor. You won't be typing much code in it, but it's where the AI works.

It downloads as a zip. Open it, then **drag the app into your Applications
folder** - don't run it from Downloads, or it'll behave oddly later.

Then one extra step that Windows doesn't need:

1. Open VS Code
2. Press **Cmd+Shift+P**
3. Type "shell command" and pick
   **Shell Command: Install 'code' command in PATH**

This lets the terminal and the editor talk to each other. It takes five
seconds and is annoying to diagnose later if you skip it.

### Claude Code
Open VS Code → Extensions (the squares icon in the left bar) → search
"Claude Code" → Install. Sign in with your Claude account.

---

## 3. The one check that matters

Open Terminal (**Cmd+Space** → "Terminal") and type these two lines, pressing
Enter after each:

```
node --version
git --version
```

You should get two version numbers, something like `v22.14.0` and
`git version 2.39.5`. The exact numbers don't matter.

**If either one says "command not found", send me a screenshot.** This is the
single most common thing that goes wrong, and it's much easier to fix before
the session than during it.

---

## A note on borrowed Macs

If the Mac isn't yours, check two things before the day:

- **You can install software.** Some accounts can't. Try installing VS Code -
  if macOS asks for a password you don't have, you need the owner's, or your
  own account on the machine.
- **You're signed into your own accounts**, not theirs - GitHub, Vercel and
  Claude. Everything we build lands in whichever account is signed in, and
  untangling that afterwards is tedious. A separate macOS user account is the
  cleanest way if you have the option.

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
