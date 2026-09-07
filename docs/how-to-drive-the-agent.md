# How to drive the agent

You don't need to know how to code. You do need to know how to *ask*, how to
check, and how to notice when it's gone wrong. That's what this is.

Everything here works with any coding agent. Tool-specific commands are in one
section at the end.

---

## The loop

Every change, however big, is the same five steps:

1. **Say what you want** - in plain English, one change at a time
2. **Let it work** - don't interrupt unless it's clearly off
3. **Look at the result** - in the browser, not the code
4. **Say what's wrong** - specifically
5. **Keep it or throw it away** - commit, or reset and re-ask

Most people go wrong at step 1 (asking for too much) or step 5 (patching
something that should have been thrown away and re-asked). The rest is easy.

---

## Rule 1: One change at a time

The single biggest predictor of a good session.

**Bad:** "Add a recipes page with categories, a search box, the ability to
favourite things, and make it work on mobile."

**Good:** "Add a page that lists recipes." Then: "Add a search box to it."
Then: "Let me favourite a recipe."

Why it matters: when you ask for four things and two are wrong, you can't tell
which change broke what, and neither can the agent. When you ask for one thing
you either like it or you don't, and going back costs you nothing.

It feels slower. It is dramatically faster.

---

## Rule 2: Describe the outcome, not the implementation

You know your problem better than the agent does. You don't know the codebase
better than it does. Say the first, don't guess at the second.

**Bad:** "Add a useState hook to track the filter and pass it down as a prop"
**Good:** "When I pick a category, only show recipes in that category"

If you find yourself guessing at technical words, stop and describe what you'd
see on screen instead. "The total at the bottom should only count this month"
is a perfect instruction.

---

## Rule 3: Check in the browser, not the code

You're not reviewing code. You're checking whether the thing does what you
wanted.

After each change, actually click it. Add a thing. Delete a thing. Put in a
silly value. Reload the page. Look at it on your phone.

The agent will tell you it's done. It is usually right and occasionally
confidently wrong, and the only way to tell the difference is to look.

---

## Rule 4: Be specific about what's wrong

"It's broken" gives the agent nothing. Give it what you'd give a colleague.

**Weak:** "That didn't work"
**Strong:** "I clicked Save and nothing happened. The row didn't appear in the
list. No error on screen."

**Weak:** "It looks wrong"
**Strong:** "The date column shows 2026-09-02T00:00:00.000Z instead of
2 Sep 2026"

Include: what you did, what you expected, what actually happened. Copy any
error text verbatim - don't summarise it.

---

## Rule 5: Know when to throw it away

If two attempts at the same fix haven't worked, the third won't either. The
agent is now patching its own misunderstanding and each patch makes things
worse.

Throw it away and re-ask differently:

```
git checkout .        # undo everything since the last commit
```

Then describe the *goal* again from scratch, in different words. This feels
like losing work. You're actually losing a wrong turn - and a fresh attempt
with a better description usually lands first time.

**Commit whenever something works.** That's what makes throwing away safe.
A commit is a save point, nothing more:

```
git add -A
git commit -m "recipes list works"
```

Do it more often than feels necessary.

---

## Scoping a real idea

Your first idea is always too big. Everyone's is. The skill is cutting it down
to something that works today, then growing it.

Ask three questions:

**1. What's the one screen I'd look at most?**
Build that. Not the settings, not the login flow, not the admin area. The one
screen that would actually change your week.

**2. What's the smallest amount of data that makes it useful?**
Usually 3-4 fields. A meal planner needs: what, which day, who's in. It does
not need cuisines, prep time, nutrition, seasonality, and a rating.

**3. What would I do by hand if the app didn't exist?**
That's your first version. If you'd write it on a whiteboard, build the
whiteboard. Automate it later, once you know it's the right whiteboard.

### Worked example

**"An app that imports our customer list, matches it against a data feed we
buy in, works out which customers to target, sends that list to the platform
we advertise on, and reports back on how each campaign performed."**

That's five systems and at least two external services. Not a first build.
But look at the pieces:

- Import the customer list → *a table and an upload button*
- Match against the bought-in feed → *a second table and a query*
- Work out who to target → *a filtered list you can export*
- Send it to the ad platform → *an API integration - leave it*
- Report on performance → *needs the send to exist first - leave it*

The first three are a day's work and genuinely useful on their own - someone
can use that to build the list by hand and upload it themselves, today. The
last two are the integration project that follows *once the data model is
proven right*.

That's the move, every time: find the slice that's useful without the hard
part, build it, and let it teach you what the hard part actually needs.

---

## When it's going wrong

Signs to stop and reset rather than push on:

- The same error twice after a "fix"
- It's changing files that have nothing to do with what you asked
- It's added a package you didn't ask for to solve something simple
- It says "let me try a different approach" more than twice
- You've stopped understanding what it's doing and started just saying "yes"

That last one is the important one. The moment you're approving changes you
can't describe, stop. Commit if it works, reset if it doesn't, and re-ask.

See [when-it-goes-wrong.md](when-it-goes-wrong.md) for specific errors.

---

## Good instructions, collected

Steal these shapes.

**Starting something new**
> "Add a page at /expenses that lists expenses from the database. Show date,
> description and amount. Newest first."

**Changing something**
> "On the expenses page, format the amount as £ with two decimal places."

**Fixing something**
> "The expenses page shows an error: [paste it exactly]. It happened when I
> clicked Add."

**When you don't know what you want**
> "I want to see how much I've spent this month, but I'm not sure how it
> should look. What are two or three options?"

That last shape is underused. The agent is good at proposing options when you
genuinely don't know - just don't use it as a substitute for deciding.

**Asking it to explain**
> "Explain what this page does in plain English, as if I'm not a developer."

Use this whenever you've lost the thread. It's free and it stops the
"approving things I don't understand" failure.

---

## Things worth telling it once

Say these at the start of a session and they'll hold:

> "I'm not a developer. Explain what you're doing in plain English, and don't
> assume I know the jargon."

> "Make the smallest change that works. Don't refactor things I didn't ask
> about."

> "If you're not sure what I mean, ask before building."

That third one matters more than it looks. Agents default to guessing, and a
guess built out over twenty files is expensive to unwind.

---

## Tool-specific bits

Everything above applies to any coding agent. This is the only part that
changes.

### Claude Code (recommended)

- Start it in your project folder - it reads `AGENTS.md` automatically
- `/clear` starts a fresh conversation when you change topic. Use it between
  unrelated tasks; a long conversation about one thing makes the next thing
  worse
- Shift+Tab cycles permission modes - plan mode is useful for "what would you
  do?" without it doing anything
- `#` at the start of a message saves a note to memory for next time

### Codex / Cursor / Copilot agent mode

- All read `AGENTS.md`, same as Claude Code
- The equivalent of `/clear` is starting a new chat or session
- Everything in the rest of this document applies unchanged

### Not a coding agent

The ChatGPT and Claude *websites* can't run commands in your project. You'll
be copy-pasting between a browser and an editor, which is exactly the loop
this is designed to replace. Use a proper coding agent.
