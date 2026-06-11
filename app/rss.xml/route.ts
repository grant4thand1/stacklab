import { NextResponse } from 'next/server'
import { getPosts, SITE } from '@/lib/api'

export const revalidate = 3600

export async function GET() {
  const posts = await getPosts(50)

  const items = posts
    .map(post => {
      const url = `${SITE}/blog/${post.slug}`
      const pubDate = new Date(post.published_at).toUTCString()
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>${post.excerpt ? `\n      <description><![CDATA[${post.excerpt}]]></description>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Bio Stack Lab</title>
    <link>${SITE}</link>
    <description>Evidence-based supplement stacks, biohacking protocols, and longevity research.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=3600',
    },
  })
}
