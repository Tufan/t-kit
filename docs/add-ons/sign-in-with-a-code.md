# Sign in with a code

Instead of a link, email a six-digit code and have people type it in. The
thing your bank does.

Worth doing when people will use your app on their phone. A link emailed to a
phone opens in whichever browser the mail app prefers, which is often not the
one they were already signed in to. A code has no such problem: you read it
and type it wherever you already are.

**You need email working first.** See
[sending-email.md](sending-email.md) - one command.

## 1. Turn it on

In `src/lib/auth.ts`, add the plugin next to `magicLink`:

```ts
import { emailOTP } from 'better-auth/plugins'

// inside plugins: [ ... ]
emailOTP({
  async sendVerificationOTP({ email, otp }) {
    // Same place your magic link goes. Swap for Resend when you have it.
    console.log(`\n  Sign-in code for ${email}: ${otp}\n`)
  },
}),
```

Keep `magicLink` alongside it if you like. They work together, and offering
both is normal.

## 2. Ask your AI assistant

> "Add a 'send me a code instead' option to the login page, using the emailOTP
> plugin that's already configured. Someone enters their email, gets a
> six-digit code, and types it in to sign in."

## 3. Things worth knowing

- **Codes expire quickly**, around five minutes by default. That is
  deliberate: a short code is easier to guess than a long token, so it gets
  less time to be guessed in.
- **Rate limiting matters more here.** Six digits is a million combinations,
  which is not many if someone can try them quickly. Better Auth limits
  attempts by default. Do not raise that limit without a reason.
- Until email is connected, the code appears in your logs like the link does.
  `npm run signin-link` shows magic links, not codes, so use the terminal
  running `npm run dev`, or your live site's logs.

## Which should you use?

| | Good for | Watch out for |
|---|---|---|
| **Emailed link** (default) | Desktop, fewest steps, nothing to type | Opens in the wrong browser on phones |
| **Emailed code** | Phones, feels familiar | An extra screen, expires fast |
| **Google** | People who have a Google account, no email round trip | Ten fiddly minutes of setup at Google |

You can offer all three. Most apps end up with a social button and one email
method, and that is a reasonable place to land.

Whichever you pick, the app still queries its own `user` table. Adding or
removing a sign-in method never changes the rest of your code.
