/**
 * The small set of building blocks the app is made of.
 *
 * These exist so every button looks like every other button, and so you can
 * change how something looks in one place. Use them instead of writing the
 * same classes out again.
 *
 *   import { Button, Input, Card, Field } from '@/components/ui'
 *
 * They are deliberately plain and there are deliberately few. Adding your own
 * is fine - copy the shape of these.
 */

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from 'react'

/** Join class names, ignoring anything falsy. */
function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

const controlBase =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-accent'

/* -------------------------------------------------------------- Button */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** `primary` for the main action on a screen, `quiet` for the rest. */
  variant?: 'primary' | 'quiet' | 'danger'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-accent text-white hover:opacity-90',
    quiet: 'border border-border bg-surface hover:bg-bg',
    danger: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950',
  }[variant]

  return (
    <button
      className={cx(
        'rounded-md px-4 py-2 text-sm font-medium transition',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent',
        styles,
        className
      )}
      {...props}
    />
  )
}

/* --------------------------------------------------------------- Input */

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(controlBase, 'w-full', className)} {...props} />
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cx(controlBase, 'w-full', className)} {...props} />
}

/* --------------------------------------------------------------- Field */

/** A label with something under it. Use this rather than a bare Input. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  )
}

/* ---------------------------------------------------------------- Card */

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cx(
        'rounded-lg border border-border bg-surface p-4',
        className
      )}
    >
      {children}
    </div>
  )
}

/** A single big number with a label. Good for totals. */
export function Stat({
  label,
  value,
  hint,
}: {
  label: string
  value: ReactNode
  hint?: string
}) {
  return (
    <Card>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  )
}

/* --------------------------------------------------------------- Table */

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

export function Th({
  children,
  align = 'left',
}: {
  children: ReactNode
  align?: 'left' | 'right'
}) {
  return (
    <th className={cx('px-4 py-2 font-medium', align === 'right' && 'text-right')}>
      {children}
    </th>
  )
}

export function Td({
  children,
  align = 'left',
  className,
}: {
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
}) {
  return (
    <td
      className={cx(
        'px-4 py-2',
        align === 'right' && 'text-right tabular-nums',
        className
      )}
    >
      {children}
    </td>
  )
}

/* --------------------------------------------------------------- Badge */

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'good' | 'warn'
}) {
  const styles = {
    neutral: 'bg-bg text-muted',
    good: 'bg-accent/10 text-accent',
    warn: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  }[tone]

  return (
    <span
      className={cx(
        'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
        styles
      )}
    >
      {children}
    </span>
  )
}
