import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebiostacklab.com'
const ADSENSE = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'The Bio Stack Lab',
  url: SITE,
  description: 'Evidence-based supplement stacks, biohacking protocols, and longevity research.',
  sameAs: [],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'The Bio Stack Lab — Supplement & Biohacking Research',
    template: '%s | The Bio Stack Lab',
  },
  description:
    'Evidence-based supplement stacks, biohacking protocols, and longevity research. No hype — just the science.',
  openGraph: {
    type: 'website',
    siteName: 'The Bio Stack Lab',
    locale: 'en_US',
  },
  alternates: {
    types: {
      'application/rss+xml': `${SITE}/rss.xml`,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {ADSENSE && (
          // @ts-expect-error — Next.js JSX doesn't type async script props
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[11px] font-black tracking-tighter">BSL</span>
              </div>
              <span className="font-semibold text-zinc-900 text-[15px] group-hover:text-emerald-700 transition-colors">
                The Bio Stack Lab
              </span>
            </a>
            <nav className="flex items-center gap-6 text-[13px]">
              <a href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                Research
              </a>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="border-t border-zinc-100 mt-20">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold text-zinc-800">The Bio Stack Lab</p>
                <p className="text-[12px] text-zinc-500 mt-0.5">
                  &copy; {new Date().getFullYear()} thebiostacklab.com
                </p>
              </div>
              <nav className="flex items-center gap-4 text-[12px] text-zinc-500">
                <a href="/rss.xml" className="hover:text-zinc-800 transition-colors">
                  RSS
                </a>
                <a href="/sitemap.xml" className="hover:text-zinc-800 transition-colors">
                  Sitemap
                </a>
              </nav>
            </div>
            <p className="mt-6 text-[11px] text-zinc-400 leading-relaxed max-w-2xl">
              <strong>Affiliate disclosure:</strong> Some links on this site are affiliate links.
              We may earn a commission at no extra cost to you. This does not influence our
              research or recommendations.{' '}
              <strong>Disclaimer:</strong> Content is for educational purposes only. Not medical
              advice. Consult a qualified healthcare professional before starting any supplement
              programme.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
