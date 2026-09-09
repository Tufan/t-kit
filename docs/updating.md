# Getting later improvements

The kit keeps being worked on. Your app does not change when it does, and
there is no update command.

That is deliberate. By the time you have used your app for a week it is not
the kit any more - you have changed pages, added tables, deleted the bits you
did not want. Anything that automatically copied new files in would sooner or
later land on top of something you had made yours, and the first you would
know about it is a thing that used to work and now does not.

So the kit tells you what has changed, and you decide.

## Asking

Ask your assistant:

> This app was built from t-kit. Check the kit's changelog and tell me if
> there's anything new worth pulling in.

It will look up which version you started from, read what has changed since,
and tell you in plain terms - what each change is, whether it is worth having
for your app specifically, and what applying it would involve. Then you pick.
It only touches your files for the things you say yes to.

Nothing arrives without you agreeing to it, so this is a safe thing to ask
whenever you think of it. Every few months is plenty.

## What it will not do

**It will not put back things you deleted.** If you have removed the example
apps, or the documentation, that is a normal thing to have done and they stay
gone. A changelog entry that only touches deleted files is skipped.

**It will not overwrite your own work.** Where a change affects a file you
have since altered, the assistant adapts the idea to fit what your file has
become, rather than replacing it. If it cannot do that safely it will tell
you rather than guess.

**It will not update anything you did not ask for.** Two changes in the
changelog, you want one of them, you get one of them.

## If you would rather not

Perfectly reasonable. A working app that you understand is worth more than
the newest version of anything. Most changes here are conveniences, and your
app will carry on working exactly as it does now whether you take them or
not.

The one category worth not ignoring is anything the changelog flags as a
**security** fix. Those are worth applying even when you are otherwise happy
where you are.

## Where the version lives

In `package.json`, at the top:

```json
"version": "0.2.0",
```

That is the version of the kit your app was created from, and it stays put
until you change it. If you apply changes from the changelog, ask your
assistant to update it to match - that is what makes the next check accurate.

The changelog itself is [CHANGELOG.md](../CHANGELOG.md), and the current
version of it is always in the kit's own repository.
