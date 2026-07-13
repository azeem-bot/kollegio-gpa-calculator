import type { SwipeDirection } from '../../hooks/useSwipeDeck'
import './CardStateOverlay.css'

interface Props {
  direction: SwipeDirection
  tagCount: number
  onUndo: () => void
}

export default function CardStateOverlay({ direction, tagCount, onUndo }: Props) {
  const isSave = direction === 'right'

  return (
    <div className={`state-overlay ${isSave ? 'state-overlay--save' : 'state-overlay--pass'}`}>
      {isSave ? (
        <div className="state-overlay__icon state-overlay__icon--save">♥</div>
      ) : (
        <div className="state-overlay__dash">—</div>
      )}
      <p className="state-overlay__primary">
        {isSave ? 'Added to your shortlist' : 'Not for you'}
      </p>
      <p className="state-overlay__secondary">
        {isSave ? `${tagCount} tags reinforced` : "We'll steer away from schools like this"}
      </p>
      <button type="button" className="state-overlay__action" onClick={onUndo}>
        {isSave ? 'Undo ↺' : 'Bring it back ↺'}
      </button>
    </div>
  )
}
