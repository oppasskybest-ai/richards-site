interface Props {
  quote: string
  attribution: string
  large?: boolean
}

export default function QuoteDisplay({ quote, attribution, large = false }: Props) {
  return (
    <div style={{
      borderLeft: '3px solid #0f5c73', paddingLeft: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <p style={{
        fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
        fontSize: large ? '1.1rem' : '0.9rem', lineHeight: 1.7,
        color: '#1c1c1c', marginBottom: '0.5rem', fontWeight: 400,
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      <cite style={{ fontSize: '0.72rem', color: '#999', fontStyle: 'normal', display: 'block', fontFamily: '"Inter", sans-serif', letterSpacing: '0.05em' }}>
        — {attribution}
      </cite>
    </div>
  )
}
