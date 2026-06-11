import { NextRequest, NextResponse } from 'next/server'
import { getEntityData } from '@/lib/api'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebiostacklab.com'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const data = await getEntityData(slug)

  if (!data) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Not Found</title></head><body><h1>404 Not Found</h1></body></html>`,
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  }

  const canonicalUrl = `${SITE}/entity/${slug}`
  const jsonLd = { ...data.json_ld }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<meta name="robots" content="index, follow">
<title>${data.title}</title>
<link rel="canonical" href="${canonicalUrl}">
<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
</head>
<body>
${data.body_html}
</body>
</html>`

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
    },
  })
}
