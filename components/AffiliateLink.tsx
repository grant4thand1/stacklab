import type { ReactNode } from 'react'

interface AffiliateLinkProps {
  href: string
  children: ReactNode
  /** Tracking label — appears as data-affiliate attribute */
  label?: string
  className?: string
}

export default function AffiliateLink({ href, children, label, className }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      rel="nofollow sponsored"
      target="_blank"
      data-affiliate={label}
      className={className ?? 'inline-flex items-center gap-1 font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900'}
    >
      {children}
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden="true"
        className="inline-block opacity-50"
      >
        <path
          d="M1.5 1.5h8v8M9.5 1.5l-8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </a>
  )
}
