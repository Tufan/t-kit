# Sending real emails

By default, sign-in links are printed in your terminal instead of emailed.
That's fine while you're the only user. To email them properly:

## 1. Sign up for Resend

[resend.com](https://resend.com) - free for 3,000 emails a month, which is
plenty. Create an API key.

## 2. Add the key to your project

```bash
npx vercel env add RESEND_API_KEY
```

Paste the key when it asks. Then:

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
