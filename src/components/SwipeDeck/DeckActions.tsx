import './DeckActions.css'

interface Props {
  onPass: () => void
  onSave: () => void
  disabled?: boolean
  passLabel?: string
  saveLabel?: string
}

export default function DeckActions({
  onPass,
  onSave,
  disabled = false,
  passLabel = 'Not my vibe',
  saveLabel = 'Save it',
}: Props) {
  return (
    <div className="deck-actions">
      <button type="button" className="deck-actions__btn deck-actions__btn--pass" onClick={onPass} disabled={disabled}>
        <span>✕</span> {passLabel}
      </button>
      <button type="button" className="deck-actions__btn deck-actions__btn--save" onClick={onSave} disabled={disabled}>
        <span>✓</span> {saveLabel}
      </button>
    </div>
  )
}
