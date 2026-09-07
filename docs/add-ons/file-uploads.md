# Letting people upload files

Photos, documents, anything.

## 1. Add storage to your project

```bash
npx vercel install blob
npx vercel env pull .env.local
npm install @vercel/blob
```

Free tier is generous - plenty for photos on a personal tool.

## 2. Ask your AI assistant

> "Let me attach a photo when I add a [whatever]. Store it using Vercel Blob
> and show a thumbnail in the list."

## Worth knowing

Store the *address* of the file in your database, not the file itself.
Databases are bad at files. Your AI assistant knows this, but if you see it
adding a column for image data rather than an image URL, stop it.
