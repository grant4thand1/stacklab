import { getPosts, formatDate, SITE } from '@/lib/api'
import type { Metadata } from 'next'
import AdUnit from '@/components/AdUnit'

export const metadata: Metadata = {
  title: 'The Bio Stack Lab — Supplement & Biohacking Research',
  alternates: { canonical: SITE },
}

export default async function HomePage() {
  const posts = await getPosts(6)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="mb-14 pb-12 border-b border-zinc-100">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-emerald-600 mb-3">
            Supplement &amp; Biohacking Research
          </p>
          <h1 className="text-4xl font-bold text-zinc-900 leading-tight mb-4">
            Evidence-based biohacking<br />for serious researchers
          </h1>
          <p className="text-[16px] text-zinc-500 leading-relaxed">
            Deep-dive analyses of supplement stacks, nootropics, adaptogens, and longevity
            protocols. No fluff. No hype. Just the science.
          </p>
        </div>
      </section>

      <AdUnit slot="homepage-top" />

      {posts.length > 0 ? (
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-6">
            Latest Research
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map(post => (
              <article key={post.id} className="group">
                <a href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-[16px] font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[13px] text-zinc-500 leading-relaxed mb-3 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-[12px] text-zinc-400">
                    <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                    {post.word_count != null && (
                      <span>{post.word_count.toLocaleString()} words</span>
                    )}
                  </div>
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-zinc-100">
            <a
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              View all research
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>
      ) : (
        <section className="py-20 text-center">
          <p className="text-zinc-400 text-[14px]">Research articles coming soon.</p>
          <p className="text-zinc-300 text-[12px] mt-1">
            Subscribe to the{' '}
            <a href="/rss.xml" className="underline hover:text-zinc-500">
              RSS feed
            </a>{' '}
            for updates.
          </p>
        </section>
      )}
    </div>
  )
}
