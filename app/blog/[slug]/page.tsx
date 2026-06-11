import { getPost, formatDate, SITE } from '@/lib/api'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AdUnit from '@/components/AdUnit'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE}/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.published_at,
    wordCount: post.word_count,
    author: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'The Bio Stack Lab',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <a
              href="/blog"
              className="inline-flex items-center gap-1 text-[12px] text-zinc-400 hover:text-zinc-700 mb-6 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M12 7H2M6 3L2 7l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Research
            </a>
            <h1 className="text-3xl font-bold text-zinc-900 leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-zinc-400 pb-6 border-b border-zinc-100">
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              {post.word_count != null && (
                <span>{post.word_count.toLocaleString()} words</span>
              )}
              <span>The Bio Stack Lab</span>
            </div>
          </header>

          <AdUnit slot="post-top" />

          {/* Content is Claude-generated HTML from trusted internal source */}
          <article
            className="prose prose-zinc prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <AdUnit slot="post-bottom" />

          <aside className="mt-10 pt-6 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              <strong>Disclaimer:</strong> This article is for educational purposes only. Not
              medical advice. Consult a qualified healthcare professional before starting any
              supplement programme.
            </p>
          </aside>
        </div>
      </div>
    </>
  )
}
