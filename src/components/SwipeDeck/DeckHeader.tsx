import './DeckHeader.css'

interface Props {
  title: string
}

export default function DeckHeader({ title }: Props) {
  return (
    <header className="deck-header">
      <button type="button" className="deck-header__circle-btn" aria-label="Back">
        ←
      </button>
      <div className="deck-header__pill">
        <span className="deck-header__icon">
          🏛
          <span className="deck-header__icon-dot">✦</span>
        </span>
        <span className="deck-header__title">{title}</span>
      </div>
      <button type="button" className="deck-header__circle-btn" aria-label="Your Algorithm">
        ☰
      </button>
    </header>
  )
}
