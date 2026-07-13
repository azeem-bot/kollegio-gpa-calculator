import { useRef, useState } from 'react'
import type { College } from '../../data/colleges'
import type { SwipeDirection } from '../../hooks/useSwipeDeck'
import './CollegeCard.css'

interface Props {
  college: College
  interactive?: boolean
  reinforcing?: boolean
  ghosted?: boolean
  onCommit?: (direction: SwipeDirection) => void
}

const DRAG_THRESHOLD = 100
const TILT_THRESHOLD = 40

const badgeLabel: Record<College['admissionBadge'], string> = {
  target: 'Target',
  reach: 'Reach',
  safety: 'Safety',
}

function shortMatchLabel(overlapCount: string) {
  return overlapCount.replace(/\s*tags\s*$/i, '').toUpperCase()
}

export default function CollegeCard({
  college,
  interactive = false,
  reinforcing = false,
  ghosted = false,
  onCommit,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ startX: 0, startY: 0, dx: 0, dy: 0, dragging: false })
  const [dragging, setDragging] = useState(false)
  const [tilt, setTilt] = useState<'none' | 'left' | 'right'>('none')

  function onPointerMove(e: PointerEvent) {
    const s = drag.current
    if (!s.dragging || !cardRef.current) return
    s.dx = e.clientX - s.startX
    s.dy = e.clientY - s.startY
    const rot = s.dx * 0.06
    cardRef.current.style.transform = `translate3d(${s.dx}px, ${s.dy * 0.3}px, 0) rotate(${rot}deg)`
    if (s.dx > TILT_THRESHOLD) setTilt('right')
    else if (s.dx < -TILT_THRESHOLD) setTilt('left')
    else setTilt('none')
  }

  function onPointerUp() {
    const s = drag.current
    if (!s.dragging) return
    s.dragging = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    setDragging(false)
    setTilt('none')
    const dx = s.dx
    s.dx = 0
    s.dy = 0
    if (cardRef.current) cardRef.current.style.transform = ''
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      onCommit?.(dx > 0 ? 'right' : 'left')
    }
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!interactive) return
    drag.current.dragging = true
    drag.current.startX = e.clientX
    drag.current.startY = e.clientY
    setDragging(true)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  return (
    <div
      ref={cardRef}
      className={[
        'college-card',
        dragging ? 'college-card--dragging' : '',
        ghosted ? 'college-card--ghosted' : '',
        interactive ? 'college-card--interactive' : '',
      ].filter(Boolean).join(' ')}
      onPointerDown={onPointerDown}
    >
      <div className={`verdict-stamp verdict-stamp--save ${tilt === 'right' ? 'is-visible' : ''}`}>SAVED</div>
      <div className={`verdict-stamp verdict-stamp--pass ${tilt === 'left' ? 'is-visible' : ''}`}>PASS</div>

      <div className="college-card__head">
        <div className="college-card__logo" style={{ background: college.logoColor }}>
          {college.logoText}
        </div>
        <div className="college-card__identity">
          <h2 className="college-card__name">{college.name}</h2>
          <div className="college-card__meta-row">
            <p className="college-card__location">{college.location}</p>
            <div className="match-pill">{shortMatchLabel(college.overlapCount)}</div>
          </div>
        </div>
      </div>

      <div className="college-card__divider" />

      <div className="stats-grid">
        <div className="stat">
          <span className="stat__label">Acceptance rate</span>
          <span className="stat__value">{college.acceptance}</span>
          <span className={`admission-badge admission-badge--${college.admissionBadge}`}>
            {badgeLabel[college.admissionBadge]}
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">Cost after aid</span>
          <span className="stat__value stat__value--success">{college.aidCost}</span>
          <span className="stat__note">{college.aidNote}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Sticker price</span>
          <span className="stat__value">{college.totalCost}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Financial fit</span>
          <span className="stat__value">Aid available</span>
        </div>
      </div>

      <div className="college-card__divider" />

      <div className="overlap-section">
        <div className="overlap-section__header">
          <span className="overlap-section__title">Where you overlap</span>
          <span className="overlap-section__count">{shortMatchLabel(college.overlapCount)}</span>
        </div>
        <div className="tag-list">
          {college.tags.map((tag, i) => (
            <span
              key={tag}
              className={`tag ${reinforcing ? 'tag--reinforcing' : ''}`}
              style={reinforcing ? { animationDelay: `${i * 40}ms` } : undefined}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
