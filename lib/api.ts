const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://web-production-2938d.up.railway.app'
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thebiostacklab.com'
export const DOMAIN = 'thebiostacklab.com'

export interface Post {
  id: string
  title: string
  slug: string
  published_at: string
  excerpt: string
  word_count?: number
}

export interface PostDetail extends Post {
  content: string
  author_name?: string
}

export interface EntityData {
  title: string
  json_ld: Record<string, unknown>
  domain: string
  body_html: string
  published_at?: string
}

export async function getPosts(limit = 20, offset = 0): Promise<Post[]> {
  try {
    const res = await fetch(
      `${API}/public/posts?domain=${DOMAIN}&limit=${limit}&offset=${offset}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.posts ?? []
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(
      `${API}/public/posts/${slug}?domain=${DOMAIN}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getEntityData(slug: string): Promise<EntityData | null> {
  try {
    const res = await fetch(
      `${API}/public/entity/${slug}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
