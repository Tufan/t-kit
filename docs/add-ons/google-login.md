# Sign in with Google

Instead of (or as well as) the emailed link.

## 1. Get credentials from Google

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project (any name)
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
4. Application type: **Web application**
5. Under **Authorised redirect URIs**, add both:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://YOUR-APP.vercel.app/api/auth/callback/google`

   (Replace `YOUR-APP` with your actual address.)
6. Copy the **Client ID** and **Client secret**

This bit is fiddly and takes about ten minutes. It's the worst part.

## 2. Add them to your project

```bash
npx vercel env add GOOGLE_CLIENT_ID
npx vercel env add GOOGLE_CLIENT_SECRET
npx vercel env pull .env.local
```

## 3. Turn it on

In `src/lib/auth.ts`, uncomment the `socialProviders` block near the bottom.

Then ask your AI assistant:

> "Add a 'Sign in with Google' button to the login page."
