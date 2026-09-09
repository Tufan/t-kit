import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { db } from './db'
import * as schema from './schema/auth'
import { resolveBaseURL } from './base-url'

// Where the app is reachable - localhost, a Codespace, or your live site.
// Sign-in is rejected if this does not match the address in the browser.
const baseURL = resolveBaseURL()

const googleCredentials =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    : null

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

  // Google sign-in turns itself on once GOOGLE_CLIENT_ID and
  // GOOGLE_CLIENT_SECRET are set, and the login page grows a Google button to
  // match. Until then this is empty and the emailed link is the only way in.
  // See docs/add-ons/google-login.md.
  socialProviders: googleCredentials ? { google: googleCredentials } : {},
})
