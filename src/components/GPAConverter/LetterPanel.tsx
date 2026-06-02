import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from '../../pages/GPACalculatorPage/Icons'
import './LetterPanel.css'

// ─── GPA helpers ──────────────────────────────────────────────────────────────

const GP: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0,
}

const LETTER_OPTIONS = ['A+','A','A-','B+','B','B-','C+','C','C-','D+','D','F']
const CREDIT_OPTIONS  = ['0.5', '1.0', '2.0']

function pctToGP(p: number): number {
  const scale: [number, number][] = [
    [93, 4.0], [90, 3.7], [87, 3.3], [83, 3.0], [80, 2.7],
    [77, 2.3], [73, 2.0], [70, 1.7], [67, 1.3], [63, 1.0], [0, 0.0],
  ]
  for (const [min, g] of scale) {
    if (p >= min) return g
  }
  return 0.0
}

// ─── Types ────────────────────────────────────────────────────────────────────

type GradeMode = 'letter' | 'pct'

interface Subject {
  id: number
  name: string
  credits: number
  grade: string   // letter key OR percentage string
}

interface Props {
  onGPAChange: (gpa: number | null) => void
}

let nextSubjectId = 1

// ─── Component ────────────────────────────────────────────────────────────────

export default function LetterPanel({ onGPAChange }: Props) {
  // One empty row on load
  const [subjects, setSubjects] = useState<Subject[]>(() => [
    { id: nextSubjectId++, name: '', credits: 1.0, grade: 'A' },
  ])
  const [gradeMode, setGradeMode] = useState<GradeMode>('letter')

  // Sliding pill — measure active pill after each mode change
  const pillRef  = useRef<HTMLDivElement>(null)
  const [pillLeft, setPillLeft] = useState('3px')

  useEffect(() => {
    if (gradeMode === 'letter') {
      setPillLeft('3px')
    } else if (pillRef.current) {
      // Container clientWidth = 156px (158px − 2px borders)
      setPillLeft(`${156 - pillRef.current.offsetWidth - 3}px`)
    }
  }, [gradeMode])

  // GPA calculation
  useEffect(() => {
    const valid = subjects.filter(s => {
      if (gradeMode === 'letter') return GP[s.grade] !== undefined
      const p = parseFloat(s.grade)
      return !isNaN(p) && p >= 0 && p <= 100
    })

    if (valid.length < 3) {
      onGPAChange(null)
      return
    }

    const totalCredits = valid.reduce((sum, s) => sum + s.credits, 0)
    const totalPoints  = valid.reduce((sum, s) => {
      const gp = gradeMode === 'letter'
        ? GP[s.grade]
        : pctToGP(parseFloat(s.grade))
      return sum + gp * s.credits
    }, 0)

    onGPAChange(totalPoints / totalCredits)
  }, [subjects, gradeMode, onGPAChange])

  // ── Handlers ────────────────────────────────────────────────────────────────

  const toggleGradeMode = () => {
    const next: GradeMode = gradeMode === 'letter' ? 'pct' : 'letter'
    setGradeMode(next)
    setSubjects(prev => prev.map(s => ({
      ...s,
      grade: next === 'letter' ? 'A' : '',
    })))
  }

  const addSubject = () => {
    setSubjects(prev => [
      ...prev,
      { id: nextSubjectId++, name: '', credits: 1.0, grade: 'A' },
    ])
  }

  const removeSubject = (id: number) => {
    setSubjects(prev => prev.filter(s => s.id !== id))
  }

  const updateSubject = (id: number, field: keyof Subject, value: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s
      return { ...s, [field]: field === 'credits' ? parseFloat(value) : value }
    }))
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="letter-panel">

      {/* ── Header: heading + subtitle | switch ─────────────────────────── */}
      <div className="letter-panel__header">
        <div className="letter-panel__header-text">
          <h2 className="letter-panel__heading">Add your subjects</h2>
          <p className="letter-panel__subtitle">
            Enter each class, credit and your grade.{' '}
            We'll calculate your weighted and unweighted GPA.
          </p>
        </div>

        {/* Grade mode switch */}
        <div
          className="grade-switch"
          role="switch"
          aria-checked={gradeMode === 'pct'}
          tabIndex={0}
          onClick={toggleGradeMode}
          onKeyDown={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              toggleGradeMode()
            }
          }}
        >
          <div
            ref={pillRef}
            className="grade-switch__pill"
            style={{ left: pillLeft }}
            aria-hidden="true"
          >
            {gradeMode === 'letter' ? 'Grades' : 'Percentages'}
          </div>
          <span
            className={`grade-switch__inactive grade-switch__inactive--${gradeMode === 'letter' ? 'right' : 'left'}`}
            aria-hidden="true"
          >
            {gradeMode === 'letter' ? 'Percentages' : 'Grades'}
          </span>
        </div>
      </div>

      {/* ── Column headers ──────────────────────────────────────────────── */}
      <div className="letter-row letter-row--head">
        <span className="letter-col__label letter-col__label--muted">Course name</span>
        <span className="letter-col__label">Credits</span>
        <span className="letter-col__label">Grades</span>
        <span />
      </div>

      {/* ── Data rows ───────────────────────────────────────────────────── */}
      {subjects.map(subj => (
        <div key={subj.id} className="letter-row">

          {/* Course name */}
          <input
            type="text"
            className="course-input"
            value={subj.name}
            placeholder="Course"
            onChange={e => updateSubject(subj.id, 'name', e.target.value)}
            aria-label="Course name"
          />

          {/* Credits */}
          <div className="course-select-wrap">
            <select
              className="course-select"
              value={subj.credits.toFixed(1)}
              onChange={e => updateSubject(subj.id, 'credits', e.target.value)}
              aria-label="Credits"
            >
              {CREDIT_OPTIONS.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <ChevronDown size={24} className="course-select__chevron" />
          </div>

          {/* Grade */}
          {gradeMode === 'letter' ? (
            <div className="course-select-wrap">
              <select
                className="course-select"
                value={subj.grade}
                onChange={e => updateSubject(subj.id, 'grade', e.target.value)}
                aria-label="Grade"
              >
                {LETTER_OPTIONS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown size={24} className="course-select__chevron" />
            </div>
          ) : (
            <input
              type="number"
              className="course-input"
              value={subj.grade}
              placeholder="e.g. 91"
              min={0}
              max={100}
              onChange={e => updateSubject(subj.id, 'grade', e.target.value)}
              aria-label="Percentage grade"
            />
          )}

          {/* Remove */}
          <button
            type="button"
            className="course-remove-btn"
            onClick={() => removeSubject(subj.id)}
            aria-label={`Remove ${subj.name || 'course'}`}
          >
            ×
          </button>

        </div>
      ))}

      {/* ── Add course ──────────────────────────────────────────────────── */}
      <button type="button" className="add-course-btn" onClick={addSubject}>
        <img src="/assets/gpa-calculator/plus.svg" alt="" width="20" height="20" aria-hidden="true" />
        <span>Add course</span>
      </button>

    </div>
  )
}
