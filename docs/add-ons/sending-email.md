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

## 4. Before anyone else can sign in: verify a domain

**Test this before you invite anyone.** Send a sign-in email to someone who
is not you, on a different email provider, and check it arrives.

Until you verify a domain you own, Resend limits what you can send. In
practice that means it works when you try it on yourself and then does not
work for the first person you show it to, which is a confusing way to find
out.

Verifying is not hard: add your domain in the Resend dashboard, copy two or
three DNS records to wherever your domain is registered, wait a few minutes.
The free plan allows three domains.

**If you do not own a domain**, that is the moment to buy one. About £10 a
year, and you will want it for the app's address anyway.

**If your emails arrive but land in spam**, that is the same fix. A verified
domain is what tells the receiving mail server you are not a stranger.
