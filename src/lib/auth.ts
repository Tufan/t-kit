import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { db } from './db'
import * as schema from './schema/auth'

/**
 * Where the app is running. Vercel sets VERCEL_PROJECT_PRODUCTION_URL for
 * you, so this works locally and once deployed without you changing anything.
 */
const baseURL = process.env.BETTER_AUTH_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const auth = betterAuth({
  baseURL,
  database: drizzleAdapter(db, { provider: 'pg', schema }),

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // Until you connect an email service, the sign-in link is printed
        // here in the terminal (and in your Vercel logs). Copy and paste it
        // into your browser to sign in.
        //
        // To send real emails, see docs/add-ons/sending-email.md
        console.log(`\n  Sign-in link for ${email}:\n  ${url}\n`)
      },
    }),
  ],

  // Google sign-in: see docs/add-ons/google-login.md
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },
})
