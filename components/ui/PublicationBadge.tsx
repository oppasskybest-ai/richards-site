import ClientImage from '@/components/ui/ClientImage'

// Maps publication display name -> logo filename, ONLY once a real logo file
// actually exists at that path. Left empty for now -- no real logo assets
// exist yet (checked: public/assets/publications/ doesn't exist). Every
// entry here used to point at a nonexistent SVG, which is why these
// rendered as blank boxes instead of falling back to text -- the fallback
// only triggers for names NOT in this map, so a "real-looking but missing"
// entry silently broke instead of degrading gracefully.
// To add a real logo: drop the file at public/assets/publications/<file>.svg
// and add an entry here.
const LOGO_FILE: Record<string, string> = {}

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
