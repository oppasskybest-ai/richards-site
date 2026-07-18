import ClientImage from '@/components/ui/ClientImage'

// Maps publication display name -> logo filename (if/when a real logo is added)
// To upgrade any publication to its real logo: drop the file at the path below
// and it will automatically be used instead of the text badge. See PROGRESS.md
// for the full list of expected filenames and where to source each one.
const LOGO_FILE: Record<string, string> = {
  'The Stone Chapel Podcast': 'stone-chapel-podcast.svg',
  'The Clarity Podcast': 'clarity-podcast.svg',
  'Moody Radio': 'moody-radio.svg',
  'Christianity Today': 'christianity-today.svg',
  'The Gospel Coalition': 'gospel-coalition.svg',
}

interface Props {
  name: string
}

export default function PublicationBadge({ name }: Props) {
  const logoFile = LOGO_FILE[name]
  const logoPath = logoFile ? `/assets/publications/${logoFile}` : null

  return (
    <span
      className="pub-tag"
      style={{
        padding: logoPath ? '0.5rem 1.2rem' : '0.6rem 1.2rem',
        border: '1px solid rgba(0,0,0,0.14)',
        fontSize: '0.8rem',
        letterSpacing: '0.05em',
        color: '#2a2a2a',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        borderRadius: '2px',
        background: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '36px',
      }}
    >
      {logoPath ? (
        <ClientImage
          src={logoPath}
          alt={name}
          width={90}
          height={20}
          style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
        />
      ) : (
        name
      )}
    </span>
  )
}
