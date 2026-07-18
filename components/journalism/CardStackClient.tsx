'use client'
import dynamic from 'next/dynamic'
import type { CardItem } from '@/types/journalism'

const CardStack = dynamic(() => import('@/components/journalism/CardStack'), { ssr: false })

interface CardStackClientProps {
  cards: CardItem[]
  label: string
}

export default function CardStackClient({ cards, label }: CardStackClientProps) {
  return <CardStack cards={cards} label={label} />
}
