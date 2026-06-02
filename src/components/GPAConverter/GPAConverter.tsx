import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ConverterState, Course, WeightedScale, Cutoff, System } from './types'
import { SYSTEM_ROUTES } from './types'
import { calcGPA, getSystemFromPath } from './calcGPA'
import SystemPill from './SystemPill'
import SystemDropdown from './SystemDropdown'
import APPanel from './APPanel'
import PercentagePanel from './PercentagePanel'
import LetterPanel from './LetterPanel'
import OutputZone from './OutputZone'
import CTAButton from './CTAButton'
import TrustStrip from './TrustStrip'
import FAQAccordion from './FAQAccordion'
import CTABanner from './CTABanner'
import './GPAConverter.css'

let nextId = 4

const DEFAULT_COURSES: Course[] = [
  { id: 1, name: 'AP Biology',     type: 'AP',      credits: 1.0, grade: 'A'  },
  { id: 2, name: 'Honors English', type: 'Honors',  credits: 0.5, grade: 'B+' },
  { id: 3, name: 'US History',     type: 'Regular', credits: 1.0, grade: 'A-' },
]

const DEFAULT_STATE: ConverterState = {
  courses: DEFAULT_COURSES,
  shortcutMode: false,
  weightedGPA: '',
  weightedScale: '5.0',
  pct: '',
  cutoff: 'standard',
  letter: 'A',
  modifier: 'none',
}

export default function GPAConverter() {
  const location = useLocation()
  const navigate = useNavigate()
  const system = getSystemFromPath(location.pathname)

  const [state, setState] = useState<ConverterState>(DEFAULT_STATE)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const result = calcGPA(system, state)

  const handleSystemSelect = (s: System) => {
    setDropdownOpen(false)
    navigate(SYSTEM_ROUTES[s])
  }

  const addCourse = () => {
    setState(s => ({
      ...s,
      courses: [...s.courses, { id: nextId++, name: '', type: 'Regular', credits: 1.0, grade: '' }],
    }))
  }

  const removeCourse = (id: number) => {
    setState(s => ({ ...s, courses: s.courses.filter(c => c.id !== id) }))
  }

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setState(s => ({
      ...s,
      courses: s.courses.map(c => {
        if (c.id !== id) return c
        return { ...c, [field]: field === 'credits' ? parseFloat(value) : value }
      }),
    }))
  }

  const gradeSummary = (() => {
    switch (system) {
      case 'ap':
        if (state.shortcutMode) {
          return state.weightedGPA ? `${state.weightedGPA} / ${state.weightedScale}` : ''
        }
        const graded = state.courses.filter(c => c.grade !== '').length
        return graded > 0 ? `${graded} course${graded !== 1 ? 's' : ''}` : ''
      case 'pct':
        return state.pct ? `${state.pct}%` : ''
      case 'letter': {
        const mod = state.modifier === 'none' ? '' : state.modifier
        return `${state.letter}${mod}`
      }
      case 'intl':
        return ''
    }
  })()

  return (
    <div className="gpa-page">
      <div className="gpa-page__wrapper">
        <header className="gpa-page__header">
          <h1 className="gpa-page__title">GPA Converter</h1>
          <p className="gpa-page__subtitle">
            Convert any grading system to an unweighted 4.0 GPA — the scale US colleges use.
          </p>
        </header>

        <div className="gpa-card">
          {/* FROM zone */}
          <div className="gpa-card__from">
            <span className="gpa-card__zone-label">Your grading system</span>
            <div className="gpa-card__from-row" ref={pillRef}>
              <div className="gpa-card__pill-wrap">
                <SystemPill
                  system={system}
                  open={dropdownOpen}
                  onToggle={() => setDropdownOpen(o => !o)}
                />
                {dropdownOpen && (
                  <SystemDropdown
                    current={system}
                    onSelect={handleSystemSelect}
                    onClose={() => setDropdownOpen(false)}
                  />
                )}
              </div>
              {gradeSummary && (
                <span className="gpa-card__grade-summary">{gradeSummary}</span>
              )}
            </div>

            {system === 'ap' && (
              <APPanel
                courses={state.courses}
                shortcutMode={state.shortcutMode}
                weightedGPA={state.weightedGPA}
                weightedScale={state.weightedScale}
                onAddCourse={addCourse}
                onRemoveCourse={removeCourse}
                onUpdateCourse={updateCourse}
                onToggleShortcut={() => setState(s => ({ ...s, shortcutMode: !s.shortcutMode }))}
                onWeightedGPAChange={v => setState(s => ({ ...s, weightedGPA: v }))}
                onWeightedScaleChange={v => setState(s => ({ ...s, weightedScale: v as WeightedScale }))}
              />
            )}

            {system === 'pct' && (
              <PercentagePanel
                pct={state.pct}
                cutoff={state.cutoff}
                onPctChange={v => setState(s => ({ ...s, pct: v }))}
                onCutoffChange={v => setState(s => ({ ...s, cutoff: v as Cutoff }))}
              />
            )}

            {system === 'letter' && (
              <LetterPanel onGPAChange={() => {}} />
            )}

            {system === 'intl' && (
              <div className="gpa-card__intl-placeholder">
                International systems (IB, A-levels, Indian CGPA, Pakistani grades) coming soon.
              </div>
            )}
          </div>

          {/* TO zone */}
          <OutputZone system={system} state={state} result={result} />

          {/* CTA */}
          <CTAButton gpa={result.gpa} />

          {/* Trust strip */}
          <TrustStrip />
        </div>

        <FAQAccordion />
        <CTABanner />
      </div>
    </div>
  )
}
