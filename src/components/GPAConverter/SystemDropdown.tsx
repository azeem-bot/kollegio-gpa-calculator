import type { System } from './types'
import { SYSTEM_LABELS } from './types'
import './SystemDropdown.css'

const SYSTEMS: System[] = ['ap', 'pct', 'letter', 'intl']

const SYSTEM_DESCRIPTIONS: Record<System, string> = {
  ap: 'Course table or weighted GPA shortcut',
  pct: 'Enter your percentage score (0–100)',
  letter: 'A, B, C, D, or F with modifiers',
  intl: 'IB, A-levels, CGPA — coming soon',
}

interface Props {
  current: System
  onSelect: (system: System) => void
  onClose: () => void
}

export default function SystemDropdown({ current, onSelect, onClose }: Props) {
  return (
    <>
      <div className="system-dropdown-backdrop" onClick={onClose} />
      <ul className="system-dropdown" role="listbox" aria-label="Grading system">
        {SYSTEMS.map(s => (
          <li
            key={s}
            role="option"
            aria-selected={s === current}
            className={`system-dropdown__item${s === current ? ' system-dropdown__item--active' : ''}${s === 'intl' ? ' system-dropdown__item--disabled' : ''}`}
            onClick={() => {
              if (s !== 'intl') onSelect(s)
            }}
          >
            <span className="system-dropdown__name">{SYSTEM_LABELS[s]}</span>
            <span className="system-dropdown__desc">{SYSTEM_DESCRIPTIONS[s]}</span>
            {s === current && (
              <svg className="system-dropdown__check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {s === 'intl' && (
              <span className="system-dropdown__badge">Soon</span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
