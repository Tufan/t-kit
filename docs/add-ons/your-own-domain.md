# Your own domain

Your app currently lives at `something.vercel.app`. A domain of your own gets
you `myapp.yourname.com`, and - more usefully - it is what lets you send email
to anyone but yourself.

**Buy one domain, not one per app.** Use a subdomain for each thing you build:

```
meals.yourname.com
money.yourname.com
```

Subdomains are free and unlimited. Ten apps, one domain, about £10 a year.

## The short version

If you buy the domain through Vercel, there is no DNS to configure. Vercel is
both the registrar and the DNS host, so it wires everything up itself.

```bash
npx vercel domains price yourname.com     # check it's available and the cost
npx vercel domains buy yourname.com       # buy it
```

Then point your app at a subdomain:

```bash
npx vercel domains add meals.yourname.com your-project-name
```

That is the whole thing. HTTPS certificates are issued automatically and
renew on their own.

## Why buy it through Vercel

DNS is the fiddly, easy-to-break part of all this, and buying elsewhere means
copying records between two dashboards and waiting to find out whether you got
them right.

Buying through Vercel skips that entirely. It costs a pound or two more than
the cheapest registrar, which is a fair price for never touching a DNS record.

**If you already own a domain somewhere else**, you have two options:

- `npx vercel domains transfer-in yourname.com` - move it to Vercel, then as
  above.
- Keep it where it is and add the records by hand:
  `npx vercel domains add meals.yourname.com your-project` will tell you
  exactly what to add. Usually one `CNAME`. Ask your AI assistant if the
  registrar's interface is confusing - they all differ and none are good.

## Sending email from it

Once you own a domain, add it in the Resend dashboard and copy the DNS records
it gives you. If Vercel hosts your DNS, `npx vercel dns add` will do it, or
your AI assistant can.

The subdomain your app already answers on is fine to send from - the records
Resend asks for sit at names underneath it, so they do not disturb the one
pointing at your app.

This is the step that lets you email anyone rather than only yourself. See
[sending-email.md](sending-email.md).

## Things worth knowing

- **Renewals are automatic.** Diarise it anyway; a lapsed domain takes your
  app and your email with it.
- **Registration is public** unless you use WHOIS privacy. Vercel includes it.
- **Do not buy a domain per project.** It is a tempting mistake and gets
  expensive and unmanageable.
- **`.com` is not compulsory.** `.app` and `.dev` force HTTPS everywhere,
  which is a small security win, and are often cheaper.
