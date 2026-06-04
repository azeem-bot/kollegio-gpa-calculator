import type { CalcSystem } from './ActiveState'
import './IdleState.css'

interface CardDef {
  id: CalcSystem
  title: string
  subtitle: string
  illustration: string
  illustrationStyle: React.CSSProperties
}

const CARDS: CardDef[] = [
  {
    id: 'ap',
    title: 'AP/Honors courses',
    subtitle: 'I took a mix of AP, Honors, and regular courses',
    illustration: '/assets/illustrations/ap-courses.svg',
    illustrationStyle: { width: 134, height: 158, left: 245, top: -5 },
  },
  {
    id: 'letter',
    title: 'Standard subjects',
    subtitle: 'I need to convert my subject grades to GPA',
    illustration: '/assets/illustrations/letter-grades.svg',
    illustrationStyle: { width: 154, height: 154, left: 248, top: 4 },
  },
  {
    id: 'pct',
    title: 'Percentage grades',
    subtitle: 'My school gives grades like 75% or 94%',
    illustration: '/assets/illustrations/percentage-grade.svg',
    illustrationStyle: {
      width: 166,
      height: 171,
      left: 238,
      top: 13,
      transform: 'rotate(-28.25deg)',
    },
  },
]

interface Props {
  activeSystem: CalcSystem
  onSelect: (system: CalcSystem) => void
}

export default function IdleState({ activeSystem, onSelect }: Props) {
  return (
    <div className="idle-state">

      {/* ── Two-column hero ─────────────────────────────────────────── */}
      <div className="idle-hero">
        <div className="idle-hero__left">
          <h1 className="idle-hero__h1">
            <span className="idle-hero__h1-dim">High School GPA calculator: </span>
            <span className="idle-hero__h1-dark">See which colleges match your profile</span>
          </h1>
        </div>

        <div className="idle-hero__right">
          <p className="idle-hero__tagline">Calculate your GPA, find your colleges</p>
          <p className="idle-hero__desc">
            Enter your grades below. We'll calculate your GPA the way admissions
            officers do — then show you the schools where you're competitive.
          </p>
        </div>
      </div>

      {/* ── Compact selector strip ──────────────────────────────────── */}
      <div className="idle-selector">
        {CARDS.map(card => (
          <button
            key={card.id}
            type="button"
            className={`idle-selector__card${activeSystem === card.id ? ' idle-selector__card--active' : ''}`}
            onClick={() => onSelect(card.id)}
            aria-pressed={activeSystem === card.id}
          >
            <div className="idle-selector__text">
              <p className="idle-selector__title">{card.title}</p>
              <p className="idle-selector__subtitle">{card.subtitle}</p>
            </div>

            <img
              src={card.illustration}
              alt=""
              className="idle-selector__illustration"
              style={card.illustrationStyle}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

    </div>
  )
}
