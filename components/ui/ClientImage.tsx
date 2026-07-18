'use client'
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export default function ClientImage(props: ImageProps) {
  return (
    <Image
      {...props}
      onError={(e) => {
        const el = e.target as HTMLImageElement
        el.style.display = 'none'
      }}
    />
  )
}
