import type { MetadataRoute } from 'next'
import { getPosts, SITE } from '@/lib/api'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(200)

  const postUrls: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ]
}
