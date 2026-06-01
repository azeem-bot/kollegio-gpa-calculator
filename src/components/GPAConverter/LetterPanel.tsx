import type { Letter, Modifier } from './types'
import './LetterPanel.css'

const LETTERS: Letter[] = ['A', 'B', 'C', 'D', 'F']
const MODIFIERS: { value: Modifier; label: string }[] = [
  { value: '+', label: '+' },
  { value: 'none', label: 'None' },
  { value: '-', label: '−' },
]

function isModifierAllowed(letter: Letter, modifier: Modifier): boolean {
  if (letter === 'F') return modifier === 'none'
  if (letter === 'D' && modifier === '-') return false
  return true
}

interface Props {
  letter: Letter
  modifier: Modifier
  onLetterChange: (l: Letter) => void
  onModifierChange: (m: Modifier) => void
}

export default function LetterPanel({ letter, modifier, onLetterChange, onModifierChange }: Props) {
  const handleLetterChange = (l: Letter) => {
    onLetterChange(l)
    if (!isModifierAllowed(l, modifier)) {
      onModifierChange('none')
    }
  }

  return (
    <div className="letter-panel">
      <div className="letter-panel__row">
        <span className="letter-panel__row-label">Letter</span>
        <div className="letter-panel__btns">
          {LETTERS.map(l => (
            <button
              key={l}
              type="button"
              className={`letter-panel__btn${letter === l ? ' letter-panel__btn--active' : ''}`}
              onClick={() => handleLetterChange(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="letter-panel__row">
        <span className="letter-panel__row-label">Modifier</span>
        <div className="letter-panel__btns">
          {MODIFIERS.map(m => {
            const allowed = isModifierAllowed(letter, m.value)
            return (
              <button
                key={m.value}
                type="button"
                disabled={!allowed}
                className={`letter-panel__btn${modifier === m.value && allowed ? ' letter-panel__btn--active' : ''}${!allowed ? ' letter-panel__btn--disabled' : ''}`}
                onClick={() => allowed && onModifierChange(m.value)}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
