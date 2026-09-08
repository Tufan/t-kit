# Sending real emails

By default, sign-in links are printed in your terminal instead of emailed.
That's fine while you're the only user. To email them properly:

## 1. Add Resend

One command, the same way your database was set up:

```bash
npx vercel integration add resend
```

It creates the account, and puts the API key into your project for you. The
first time you install anything from Vercel's marketplace it opens a browser
to accept the terms, so do that and run the command again.

Free for 3,000 emails a month, capped at 100 a day. Plenty for signing
yourself in, and enough for a small number of real users.

*(Prefer to do it by hand? Sign up at [resend.com](https://resend.com), create
an API key, and run `npx vercel env add RESEND_API_KEY`.)*

## 2. Fetch the key and install the library

```bash
npx vercel env pull .env.local
npm install resend
```

## 3. Ask your AI assistant

> "Use Resend to send the magic link email in src/lib/auth.ts instead of
> logging it to the console. The API key is in RESEND_API_KEY."

## 4. The bit that catches everyone out

You can send straight away, from Resend's own address
(`onboarding@resend.dev`). Nothing to buy, nothing to set up.

**But it will only deliver to the email address on your Resend account.**
Send to anyone else and you get a 403 error. Resend does this on purpose, so
that nobody ruins the shared address's reputation for everyone else.

So the first time you show someone your app, their sign-in email will not
arrive. It is not broken - it is this.

### Sending to other people

Verify a domain you own:

1. Add it in the Resend dashboard
2. Copy the two or three DNS records it gives you to wherever your domain is
   registered
3. Wait a few minutes

Then change the `from` address in `src/lib/auth.ts` to use it. Now you can
send to anyone, and your emails are far less likely to land in spam. The free
plan allows three domains.

**No domain?** That is the moment to buy one. About £10 a year, and you will
want it for your app's address anyway.

**A shortcut while you are still building:** you can keep using
`onboarding@resend.dev` and just sign in as yourself. `npm run signin-link`
also still works and skips email entirely. Neither helps once someone else
needs to get in.
