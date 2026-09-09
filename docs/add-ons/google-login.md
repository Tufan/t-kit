# Sign in with Google

Instead of (or as well as) the emailed link.

This is the fiddliest add-on, and almost all of it is Google's paperwork
rather than your app. Twenty minutes the first time. The good news is that
most of it is one-off: see [Reusing this for your next
app](#reusing-this-for-your-next-app) at the end.

## 1. Set up the consent screen

The screen people see when they click your Google button - your app's name,
and what it is asking for. Google will not let you create credentials until
this exists, so it comes first.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and sign
   in. A personal Gmail account is fine.
2. Create a project. Name it after **you**, not this app - `ross-apps` rather
   than `meal-planner`. You can use the same one for everything you build.
3. Find **Google Auth Platform** in the left-hand menu (older guides call it
   *OAuth consent screen* - same thing) and start the setup.
4. **Audience: External.** If you are on a personal Gmail account this is the
   only option, and it is the right one. *Internal* appears only for paid
   Google Workspace accounts.
5. Fill in the app name and your email address. The app name is what people
   will see on the sign-in screen, so use something they will recognise.

Once the app exists, its settings are split across several pages in the
left-hand menu - **Branding**, **Audience**, **Data access**, **Verification**.
Two of them need attention.

### Branding: the URLs it insists on

Branding asks for an **application home page** and a **privacy policy** link,
and it will not let you save without them. This stops people who have not
launched anything yet, because the honest answer is "I don't have a website".

**Use your app's own address for both.** The one Vercel gave you:

```
https://your-project.vercel.app
```

That is a real, reachable page that you own, which is all Google is checking
for. It has to be `https://` and publicly loadable - a Codespace address will
not do, because it disappears when the Codespace stops.

This is fine for an app used by you and people you know. If you ever open it
up to strangers, write a real privacy page and point this at it instead.
Google does not check the content now, but the commitment is real, and any
app store or payment provider you deal with later will check.

### Data access: leave the scopes alone

Scopes are on their own **Data access** page, not in the setup wizard.

You do not need to add anything there. The kit asks Google for the three
basic ones - `email`, `profile` and `openid` - every time someone signs in,
and those need no permission from you in advance.

Adding anything else here - Gmail, Drive, Calendar - puts your app into
Google's review queue, which takes weeks. If you find yourself being asked to
justify your use of sensitive data, you have added a scope you did not need.
Remove it.

### Audience: publish it

Your app starts in **Testing** mode. On the **Audience** page, find
**Publish app** and press it.

This matters more than it looks:

- In Testing, **only email addresses you have explicitly listed can sign in**.
  Everyone else gets "app has not completed the verification process", which
  reads like a security warning and will put people off.
- In Testing, **sign-ins expire after seven days**. Users get silently logged
  out and you spend an afternoon looking for a bug in your code that is not
  there.

Because you only asked for the three basic scopes, publishing takes effect
immediately. There is no review and nothing to wait for. If Google asks you
to submit for verification, you have asked for a scope you did not need - go
back and remove it.

## 2. Get credentials

1. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
2. Application type: **Web application**
3. Under **Authorised redirect URIs**, add the addresses your app runs at,
   with `/api/auth/callback/google` on the end of each. Which ones you need
   depends on where you work - see the next section.
4. Copy the **Client ID** and **Client secret**.

You can come back and add more URIs later. Changes take effect within a
minute or two.

### Which addresses to add

**Your live app** - always. The stable one, so
`https://your-project.vercel.app/api/auth/callback/google`.

Vercel also generates a fresh URL for every single deployment. Do not use one
of those: it changes on every push and will stop working immediately.

**Working in a Codespace** - your app is not on `localhost`, it is on a
machine in a data centre. Click the **PORTS** tab next to the terminal, find
port 3000, and click the globe icon to see the real address. It looks like
`https://something-3000.app.github.dev`. Add that with the callback path on
the end.

While you are in the PORTS tab, right-click port 3000 and set **Port
Visibility** to **Public**. It is private by default, which means Google's
redirect back into your app hits a GitHub login page instead.

**Working on your own machine** - add
`http://localhost:3000/api/auth/callback/google`.

## 3. Add them to your project

```bash
npx vercel env add GOOGLE_CLIENT_ID
npx vercel env add GOOGLE_CLIENT_SECRET
npx vercel env pull .env.local
```

### In a Codespace, one more line

The kit assumes it is running at `localhost:3000` unless told otherwise, so
in a Codespace it will send people to an address that does not exist. Add
your Codespace's address to `.env.local`:

```bash
BETTER_AUTH_URL=https://something-3000.app.github.dev
```

No trailing slash, and no `/api/auth/...` on the end - just the address
itself. It has to match what you gave Google, exactly.

Your Codespace's name changes if you ever delete it and make a new one. When
that happens, update both this line and the URI in Google.

## 4. Turn it on

Nothing to edit. Google sign-in switches itself on when it finds those two
values, and the login page grows a **Continue with Google** button to match.

Restart `npm run dev` afterwards - changes to `.env.local` are only read when
the server starts.

If the button does not appear, the app cannot see the two values: check they
are in `.env.local` and that you restarted the server.

## When it does not work

**`redirect_uri_mismatch`** - the commonest one by far, and it means exactly
what it says. The address your app sent does not match anything you gave
Google. It is compared character by character: `http` vs `https`, a trailing
slash, the wrong port, `.app.github.dev` from a Codespace you have since
replaced. Read the error page carefully - Google prints the address it was
given, so compare that against your list rather than guessing.

**It will not save without a privacy policy URL** - use your app's own
address, `https://your-project.vercel.app`, for both that and the home page.
See [Branding](#branding-the-urls-it-insists-on) above.

**You cannot find the Scopes setting** - it is on the **Data access** page in
the left-hand menu, not in the setup wizard. You do not need to change
anything there.

**"App has not completed the verification process"** - you are still in
Testing. Go back to **Audience** and publish it.

**Signed in fine last week, now it will not** - also Testing. Seven days.
Publish it.

**It sends you to `localhost` from a Codespace** - `BETTER_AUTH_URL` is
missing from `.env.local`, or the server has not been restarted since you
added it.

## Reusing this for your next app

You never have to do part 1 again. One Google Cloud project can serve
everything you build.

For each new app: **Credentials → Create Credentials → OAuth client ID**,
add that app's redirect URIs, copy the new ID and secret. About a minute,
because the consent screen is already done and published.

Give each app its own client ID rather than adding every app's URIs to one
shared client. They then have separate secrets, so leaking one does not
affect the others, and you can delete an app's credentials when you retire it
without touching anything else.
