import type { System, ConverterState } from './types'
import type { CalcResult } from './calcGPA'

interface Props {
  system: System
  state: ConverterState
  result: CalcResult
}

function getHintText(system: System, state: ConverterState, result: CalcResult): string {
  if (system === 'intl') return 'International conversion coming soon.'
  if (result.gpa === null) return 'Enter your grade above to see the conversion.'

  switch (system) {
    case 'ap':
      // shortcut mode — single output with approx note
      return 'Approximate — based on proportional scaling of your weighted GPA.'
    case 'pct':
      return state.cutoff === 'standard'
        ? 'Using standard US cutoffs (93%+ = A).'
        : 'Using relaxed cutoffs (90%+ = A) — common in some schools.'
    case 'letter':
      return 'Standard unweighted letter grade conversion.'
  }
}

export default function OutputZone({ system, state, result }: Props) {
  const hasGPA = result.gpa !== null
  const showDual = system === 'ap' && !state.shortcutMode && result.weighted !== null

  // AP course-table mode: two-column weighted / unweighted layout
  if (showDual) {
    return (
      <div className="output-zone output-zone--dual">
        <div className="output-zone__col">
          <span className="output-zone__col-label">Weighted</span>
          <span className="output-zone__col-gpa">{result.weighted!.toFixed(2)}</span>
        </div>
        <div className="output-zone__col-divider" />
        <div className="output-zone__col">
          <span className="output-zone__col-label">Unweighted</span>
          <span className="output-zone__col-gpa">{result.gpa!.toFixed(2)}</span>
          <span className="output-zone__col-note">what colleges use</span>
        </div>
      </div>
    )
  }

  // Shortcut mode / pct / letter: original single layout
  return (
    <div className="output-zone">
      <div className="output-zone__label-row">
        <span className="output-zone__label">Your GPA on</span>
        <span className="output-zone__scale-pill">4.0 scale</span>
      </div>

      <div className="output-zone__gpa-row">
        <span className={`output-zone__gpa${hasGPA ? ' output-zone__gpa--filled' : ''}`}>
          {hasGPA ? result.gpa!.toFixed(2) : '—'}
        </span>
        {result.isApprox && hasGPA && (
          <span className="output-zone__approx">approx.</span>
        )}
      </div>

      <p className="output-zone__hint">{getHintText(system, state, result)}</p>
    </div>
  )
}
