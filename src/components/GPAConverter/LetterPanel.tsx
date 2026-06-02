import { useState, useEffect } from 'react'
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
  const [subjects,  setSubjects]  = useState<Subject[]>([])
  const [gradeMode, setGradeMode] = useState<GradeMode>('letter')

  // Recalculate and propagate GPA whenever subjects or mode change
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

  const handleGradeModeChange = (mode: GradeMode) => {
    if (mode === gradeMode) return
    setGradeMode(mode)
    // Reset grades to the default for the new mode
    setSubjects(prev => prev.map(s => ({
      ...s,
      grade: mode === 'letter' ? 'A' : '',
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

      {/* Grade mode toggle */}
      <div className="grade-mode-toggle">
        <button
          type="button"
          className={`grade-mode-toggle__pill${gradeMode === 'letter' ? ' grade-mode-toggle__pill--active' : ''}`}
          onClick={() => handleGradeModeChange('letter')}
        >
          Letter grade
        </button>
        <button
          type="button"
          className={`grade-mode-toggle__pill${gradeMode === 'pct' ? ' grade-mode-toggle__pill--active' : ''}`}
          onClick={() => handleGradeModeChange('pct')}
        >
          Percentage
        </button>
      </div>

      {/* Table header */}
      <div className="subj-table__head">
        <span className="subj-col subj-col--name">Subject name</span>
        <span className="subj-col subj-col--credits">
          Credits <span className="subj-col__optional">(optional)</span>
        </span>
        <span className="subj-col subj-col--grade">Grade</span>
        <span className="subj-col subj-col--remove" />
      </div>

      {/* Table body */}
      {subjects.length === 0 ? (
        <p className="subj-table__empty">
          No subjects yet — add your first subject below.
        </p>
      ) : (
        <div className="subj-table__body">
          {subjects.map(subj => (
            <div key={subj.id} className="subj-row">

              {/* Subject name */}
              <div className="subj-col subj-col--name">
                <input
                  type="text"
                  className="course-input"
                  value={subj.name}
                  placeholder="Subject name"
                  onChange={e => updateSubject(subj.id, 'name', e.target.value)}
                  aria-label="Subject name"
                />
              </div>

              {/* Credits */}
              <div className="subj-col subj-col--credits">
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
              </div>

              {/* Grade — select or number input depending on mode */}
              <div className="subj-col subj-col--grade">
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
              </div>

              {/* Remove */}
              <div className="subj-col subj-col--remove">
                <button
                  type="button"
                  className="course-remove-btn"
                  onClick={() => removeSubject(subj.id)}
                  aria-label={`Remove ${subj.name || 'subject'}`}
                >
                  ×
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      <button type="button" className="add-course-btn" onClick={addSubject}>
        <img src="/assets/gpa-calculator/plus.svg" alt="" width="20" height="20" aria-hidden="true" />
        <span>Add subject</span>
      </button>

    </div>
  )
}
