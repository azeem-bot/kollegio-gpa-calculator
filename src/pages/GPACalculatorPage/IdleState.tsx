import { ArrowRight } from './Icons'
import './IdleState.css'

interface CardDef {
  id: string
  title: string
  subtitle: string
  illustration: string
  illustrationAlt: string
  bgColor: string
  illustrationStyle: React.CSSProperties
}

const CARDS: CardDef[] = [
  {
    id: 'ap',
    title: 'AP/Honors courses',
    subtitle: 'I took a mix of AP, Honors, and regular courses',
    illustration: '/assets/gpa-calculator/ap-card-illustration.png',
    illustrationAlt: 'AP and Honors course grades illustration',
    bgColor: 'rgba(119, 204, 91, 0.1)',
    illustrationStyle: { width: 237, height: 279, left: 154, top: 173 },
  },
  {
    id: 'pct',
    title: 'Percentage grade',
    subtitle: 'My school gives grades like 75% or 94%',
    illustration: '/assets/gpa-calculator/percentage-card-illustration.png',
    illustrationAlt: 'Percentage grade illustration',
    bgColor: 'rgba(255, 187, 51, 0.1)',
    illustrationStyle: { width: 244, height: 244, left: 165, top: 192 },
  },
  {
    id: 'letter',
    title: 'Letter grades',
    subtitle: 'My transcript shows A, B+, C, etc.',
    illustration: '/assets/gpa-calculator/letter-grades-illustration.png',
    illustrationAlt: 'Letter grades illustration',
    bgColor: 'rgba(69, 136, 229, 0.1)',
    illustrationStyle: { width: 251, height: 251, left: 136, top: 160 },
  },
]

interface Props {
  onSelect: (system: 'ap' | 'pct' | 'letter') => void
}

export default function IdleState({ onSelect }: Props) {
  return (
    <div className="idle-state">
      <div className="idle-state__inner">
        {/* Hero heading */}
        <h1 className="idle-state__h1">
          <span className="idle-state__h1-dim">High School GPA calculator: </span>
          <span className="idle-state__h1-dark">See which colleges match your profile</span>
        </h1>

        {/* Selection cards */}
        <div className="idle-state__cards">
          {CARDS.map(card => (
            <button
              key={card.id}
              type="button"
              className="idle-card"
              style={{ background: card.bgColor }}
              onClick={() => onSelect(card.id as 'ap' | 'pct' | 'letter')}
              aria-label={`Select ${card.title}`}
            >
              <div className="idle-card__content">
                <p className="idle-card__title">{card.title}</p>
                <p className="idle-card__subtitle">{card.subtitle}</p>
              </div>

              <img
                src={card.illustration}
                alt={card.illustrationAlt}
                className="idle-card__illustration"
                style={{
                  width: card.illustrationStyle.width,
                  height: card.illustrationStyle.height,
                  left: card.illustrationStyle.left,
                  top: card.illustrationStyle.top,
                }}
              />

              <span className="idle-card__btn">
                Convert
                <ArrowRight size={18} />
              </span>
            </button>
          ))}
        </div>

        {/* Subtitle below cards */}
        <p className="idle-state__sub">
          Enter your courses and grades. We calculate your GPA the way admissions officers do.
        </p>
      </div>
    </div>
  )
}
