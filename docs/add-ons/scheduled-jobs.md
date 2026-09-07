# Making something happen automatically

A weekly summary email, a nightly tidy-up, a daily reminder.

## How it works

Vercel can call a page in your app on a schedule. You write the page; Vercel
calls it.

## Ask your AI assistant

> "Add a scheduled job that runs every Monday at 8am and emails me a summary
> of last week's [whatever]."

It'll create an API route and add a `crons` entry to `vercel.json`.

## Worth knowing

- The free plan allows one scheduled job per day. That's enough for a daily
  digest, not enough for something hourly.
- Schedules only run on the live site, never locally.
- Protect the route so only Vercel can call it - your assistant should add a
  `CRON_SECRET` check. If it doesn't, ask for it.
