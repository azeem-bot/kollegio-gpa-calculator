import { useId } from 'react'
import type { Cutoff } from './types'
import './PercentagePanel.css'

interface Props {
  pct: string
  cutoff: Cutoff
  onPctChange: (v: string) => void
  onCutoffChange: (v: Cutoff) => void
}

export default function PercentagePanel({ pct, cutoff, onPctChange, onCutoffChange }: Props) {
  const inputId = useId()

  return (
    <div className="pct-panel">
      <div className="pct-panel__input-row">
        <label htmlFor={inputId} className="pct-panel__label">Your percentage</label>
        <div className="pct-panel__input-wrap">
          <input
            id={inputId}
            type="number"
            className="pct-panel__input"
            placeholder="e.g. 87"
            min="0"
            max="100"
            step="0.1"
            value={pct}
            onChange={e => onPctChange(e.target.value)}
          />
          <span className="pct-panel__unit">%</span>
        </div>
      </div>

      <div className="pct-panel__cutoff">
        <span className="pct-panel__cutoff-label">Cutoff standard</span>
        <div className="pct-panel__cutoff-pills">
          <button
            type="button"
            className={`pct-panel__cutoff-btn${cutoff === 'standard' ? ' pct-panel__cutoff-btn--active' : ''}`}
            onClick={() => onCutoffChange('standard')}
          >
            Standard <span className="pct-panel__cutoff-sub">(93% = A)</span>
          </button>
          <button
            type="button"
            className={`pct-panel__cutoff-btn${cutoff === 'relaxed' ? ' pct-panel__cutoff-btn--active' : ''}`}
            onClick={() => onCutoffChange('relaxed')}
          >
            Relaxed <span className="pct-panel__cutoff-sub">(90% = A)</span>
          </button>
        </div>
      </div>
    </div>
  )
}
