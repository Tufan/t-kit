# Your first change

Ten minutes, to prove the whole loop works before you build anything real.

## 1. Start it up

```bash
npm run dev
```

**In a Codespace:** click the **PORTS** tab next to the terminal, find port
3000, and click the globe icon. `localhost:3000` will not work - the app is
running on a machine in a data centre, not on your laptop.

**On your own machine:** open [localhost:3000](http://localhost:3000).

Sign in with your email. `npm run dev` needs to keep running, so open a
*second* terminal with the **+** at the top right of the terminal panel, run
`npm run signin-link`, and paste the link it prints into your browser.

## 2. Look around

Click into **Money**. Add an expense. Delete it. That's a real database
underneath - reload the page and your data is still there.

## 3. Change something

Ask your AI assistant:

> "On the Money page, add a 'Coffee' option to the category dropdown."

Watch what it does. When it's finished, reload the page and check the dropdown.

That's the whole loop: **ask → it changes → you look**.

## 4. Change something bigger

> "On the Money page, show the total for each category underneath the table."

This one it has to think about. Look at the result, and if it's not what you
wanted, say so specifically - "the totals should be in the same order as the
dropdown", say.

## 5. Save your progress

```bash
git add -A
git commit -m "added coffee category and category totals"
```

That's a save point. You can always get back to here.

## 6. Put it live

```bash
npx vercel deploy --prod
```

A minute or two, then your changes are on the internet.

---

That's everything you need. The rest is just doing it with your own idea
instead of expenses.

Next: [how-to-drive-the-agent.md](how-to-drive-the-agent.md)
