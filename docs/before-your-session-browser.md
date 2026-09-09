# Before your session - browser only

Nothing to install. Everything runs in a browser tab, on a machine in the
cloud, so this works on a locked-down work laptop or a Mac too old for
current software.

About 10 minutes of setup. Do it a few days before, so there is time to fix
anything.

---

## 1. Three accounts

All free except the last.

### GitHub (free)
[github.com](https://github.com) - where your code lives, with every version
kept. Note the username, top right.

### Vercel (free)
[vercel.com](https://vercel.com) - this puts your app on the internet.

**Sign up with the Continue with GitHub button, not an email address.**
Signing up with email leaves the two accounts unconnected, which is fiddly to
unpick later. Check at [vercel.com/account](https://vercel.com/account): it
should show GitHub as the login method, with the username from above.

### Claude Pro (£18/month)
[claude.ai](https://claude.ai) - the only paid one. Take a month of Pro, not
the annual plan, and cancel it after if this turns out not to be for you. The
free tier will run out within the first hour.

---

## 2. The one check that matters

This is the whole point of doing it early. Some workplace networks block the
service we will be working in, and it is much easier to find out now.

On the machine you will use on the day, open:

1. [github.com/codespaces/new](https://github.com/codespaces/new) - pick any
   repository, create a codespace, and wait for the editor to appear.
2. [claude.ai](https://claude.ai) - check it loads and you can sign in.

**If the editor loads and you can type in the terminal at the bottom, you are
ready.** Delete the test codespace afterwards at
[github.com/codespaces](https://github.com/codespaces).

If either is blocked, or the editor never finishes loading, send me a
screenshot. Your phone's hotspot is the usual way round it.

---

## 3. Project for the day

Write a paragraph on the thing you would most like to get working by the end
of the session, and send it over.

**Try to describe the problem, rather than the app.**

> Not this: "I want a meal planning app with recipes and a shopping list"
>
> This: "Every week we end up staring at the fridge at 6pm with no idea what
> to cook, then shopping twice and wasting half of it"

Both end up as a meal planner. But the second one tells us what "working"
means, so we know what to build first and what to leave out.

Be as ambitious as you like. We will start with the simplest version that is
genuinely useful, then build on it.

---

## On the day

We will do this together, but so you know what is coming:

1. Open the kit's repository, choose **Use this template** → **Create a new
   repository** to get your own copy, then **Code** → **Codespaces** on that
   new repository to get your own cloud machine.

   Two separate steps, and the copy has to come first - there is a tempting
   **Open in a codespace** on the same menu that skips it and leaves you with
   nowhere to save your work.
2. Wait a minute while it sets itself up.
3. In the terminal, run `npm run setup`. It will ask you to approve a link
   for Vercel, name your project, and give the email you will sign in with.
4. It prints the address of your live app at the end.

Everything is created on your own accounts, so you own all of it and can
carry on afterwards.
