'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

export default function AdUnit({ slot, format = 'auto' }: AdUnitProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const pushed = useRef(false)

  useEffect(() => {
    if (!client || pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [client])

  if (!client) return null

  return (
    <div className="my-6 text-center min-h-[90px]">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
