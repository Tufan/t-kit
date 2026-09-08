# Better looking components

The kit ships a small set of building blocks in `src/components/ui` - buttons,
inputs, cards, tables. Deliberately plain, and enough that everything looks
consistent.

When you want more - a proper date picker, a dialog, a dropdown, charts - the
usual answer is **shadcn/ui**. It is free, MIT licensed, and the components
are the same Tailwind you already have.

## See what is available first

Browse before you install anything:

- **[ui.shadcn.com/blocks](https://ui.shadcn.com/blocks)** - whole sections.
  Dashboards, sign-in screens, sidebars, settings pages. Click through the
  live previews.
- **[ui.shadcn.com/components](https://ui.shadcn.com/components)** - the
  individual pieces.
- **[ui.shadcn.com/charts](https://ui.shadcn.com/charts)** - graphs.

This is a good way to decide what you want: find something that looks right,
and point your AI assistant at it.

## The unusual thing about it

It is not a library you install and import from. The command **copies the
source into your project**. So there is nothing to keep up to date, and you
can open any component and change it. It is yours.

The cost of that: it adds files, and a few packages behind the scenes. Worth
it when you want the components, not worth it on day one.

## Adding it

```bash
npx shadcn@latest init
```

Take the defaults; it will detect your setup. Then add only what you need:

```bash
npx shadcn@latest add button dialog
```

Or ask your AI assistant:

> "Add the shadcn dialog component and use it for the 'add a quote' form
> instead of the inline one."

## Which to use

Keep using the kit's own components for the ordinary things. Reach for shadcn
when you want something the kit does not have, or when you want a block from
the gallery.

Mixing them is fine. They use the same colours and the same Tailwind, so they
sit together without looking odd.

## A caution

Adding shadcn adds files your AI assistant can also edit. That is normally
fine, but if something looks broken after a change, `src/components/ui` is
worth checking. `git checkout .` undoes it like anything else.
