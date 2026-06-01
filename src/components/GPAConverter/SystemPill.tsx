import type { System } from './types'
import { SYSTEM_LABELS } from './types'

interface Props {
  system: System
  open: boolean
  onToggle: () => void
}

export default function SystemPill({ system, open, onToggle }: Props) {
  return (
    <button
      className={`system-pill${open ? ' system-pill--open' : ''}`}
      onClick={onToggle}
      aria-haspopup="listbox"
      aria-expanded={open}
      type="button"
    >
      <span className="system-pill__label">{SYSTEM_LABELS[system]}</span>
      <svg className="system-pill__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
