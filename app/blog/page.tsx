import { getPosts, formatDate, SITE } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Archive',
  description:
    'Browse all supplement and biohacking research articles from The Bio Stack Lab.',
  alternates: { canonical: `${SITE}/blog` },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const limit = 20
  const offset = (page - 1) * limit
  const posts = await getPosts(limit, offset)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-zinc-900 mb-1">Research Archive</h1>
        <p className="text-[14px] text-zinc-500">
          Supplement stacks, biohacking protocols, and longevity research.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-zinc-400 text-[14px]">No articles yet — check back soon.</p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {posts.map(post => (
            <article key={post.id} className="py-6 group">
              <a href={`/blog/${post.slug}`} className="block">
                <h2 className="text-[17px] font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors mb-1.5">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[13px] text-zinc-500 leading-relaxed mb-2 line-clamp-2">
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
      )}

      {(posts.length === limit || page > 1) && (
        <div className="mt-8 flex items-center gap-3">
          {page > 1 && (
            <a
              href={`/blog?page=${page - 1}`}
              className="text-[13px] text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded px-3 py-1.5 transition-colors"
            >
              &larr; Newer
            </a>
          )}
          {posts.length === limit && (
            <a
              href={`/blog?page=${page + 1}`}
              className="text-[13px] text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded px-3 py-1.5 transition-colors"
            >
              Older &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  )
}
