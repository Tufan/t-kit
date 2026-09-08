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

## 4. Sending from your own domain

Resend will send from a shared address until you verify a domain you own.
That's fine to start. If your emails go to spam, verifying your domain in the
Resend dashboard fixes it.
