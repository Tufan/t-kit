# Taking payments

Only worth doing if you're actually charging people. It adds real complexity
and a compliance burden.

## Add Stripe

```bash
npx vercel install stripe
npx vercel env pull .env.local
npm install stripe
```

## Ask your AI assistant

> "Add a Stripe checkout so people can pay for [whatever]. Use Stripe Checkout
> rather than building a payment form."

**Use Stripe Checkout, not your own card form.** Stripe hosts the page, so
card details never touch your app - which keeps you out of the compliance
requirements that come with handling them yourself.

## Before you take real money

- Test with Stripe's test cards first (card number 4242 4242 4242 4242)
- You'll need to verify your identity with Stripe before going live
- Think about refunds, failed payments, and what happens when someone cancels
  - this is where the real work is, not the checkout button
