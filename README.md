# t-kit

Tufan's AI Starter Kit - everything you need to turn an idea into a real,
working app on the internet.

Next.js and React, a Postgres database, sign-in that works, and hosting. All
wired together and deployed, so you start from a running app rather than an
empty folder.

## Before you start

Work through the pre-session checklist first: accounts to create and, if you
are working locally, things to install.

- **Browser only, nothing to install** (works on a locked-down or old
  machine): [docs/before-your-session-browser.md](docs/before-your-session-browser.md)
- Windows: [docs/before-your-session.md](docs/before-your-session.md)
- Mac: [docs/before-your-session-mac.md](docs/before-your-session-mac.md)

Working locally needs Node.js 20 or newer. The browser route does not: the
machine it runs on already has everything.

## Getting started

Three commands:

```bash
npx degit tufan/t-kit my-app && cd my-app
npm install
npm run setup
```

`npm run setup` will ask you to sign in to Vercel, then create your project,
your database, and put your app on the internet. It prints the address at the
end.

## Then what?

Open the address it gave you and sign in with your email.

Sending real email is not set up yet, so instead of waiting for a message,
run `npm run signin-link` and it prints the link. Paste that into your
browser. Then click around the three example apps.

To make your first change, follow
[docs/your-first-change.md](docs/your-first-change.md).

When you want to build your own thing, ask your AI assistant. Start with
[docs/how-to-drive-the-agent.md](docs/how-to-drive-the-agent.md) - five rules
that make the difference between a good session and a frustrating one.

## What's in the box

| | |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Neon Postgres via Drizzle |
| Sign-in | Better Auth, emailed link |
| Hosting | Vercel |

Three example apps come installed - meals, money and clients - so there is
something working to look at and copy. Delete them when you are ready with
`npm run examples:remove`.

## Commands

```bash
npm run dev              # work on it locally
npm run signin-link      # print your sign-in link
npm run db:push          # apply changes to your database
npm run db:studio        # browse your data
npm run seed             # put the example data back
npm run examples:remove  # clear out the examples
npx vercel deploy --prod # put changes live now
```

**Your code is connected to your live site.** Setup links the two, so
anything you commit deploys automatically a minute or so later. `vercel
deploy --prod` is only for when you want it live immediately.

## If something breaks

[docs/when-it-goes-wrong.md](docs/when-it-goes-wrong.md)

## Licence

MIT. See [LICENSE](LICENSE).
