import { useState, useRef, useEffect } from 'react'
import type { Course, Cutoff } from '../../components/GPAConverter/types'
import { GRADE_OPTIONS } from '../../components/GPAConverter/types'
import { GP, WEIGHT } from '../../components/GPAConverter/calcGPA'
import PercentagePanel from '../../components/GPAConverter/PercentagePanel'
import LetterPanel from '../../components/GPAConverter/LetterPanel'
import CollegeCards from './CollegeCards'
import { ChevronDown } from './Icons'
import './ActiveState.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalcSystem = 'ap' | 'pct' | 'letter'

const SYSTEM_LABELS: Record<CalcSystem, string> = {
  ap:     'AP/Honors',
  pct:    'Percentage',
  letter: 'Letter grades',
}

const SYSTEM_OPTIONS: { value: CalcSystem; label: string }[] = [
  { value: 'ap',     label: 'AP / Honors' },
  { value: 'pct',    label: 'Percentage grade' },
  { value: 'letter', label: 'Letter grades' },
]

const COURSE_TYPES = ['Regular', 'Honors', 'AP', 'IB', 'College'] as const
const CREDIT_OPTIONS = ['0.5', '1.0', '2.0']
const GRADE_DROPDOWN = GRADE_OPTIONS.filter(g => g !== 'D-')

let nextId = 1

// ─── GPA helpers ──────────────────────────────────────────────────────────────

// AP: requires ≥ 3 valid courses (type + credits + grade filled)
function calcApGPAs(courses: Course[]) {
  const valid = courses.filter(c => c.name.trim() !== '' && c.type && c.credits > 0 && GP[c.grade] !== undefined)
  if (valid.length < 3) return { unweighted: null as null, weighted: null as null }
  const totalCredits = valid.reduce((s, c) => s + c.credits, 0)
  const unweighted = valid.reduce((s, c) => s + GP[c.grade] * c.credits, 0) / totalCredits
  const weighted   = valid.reduce((s, c) => s + (GP[c.grade] + (WEIGHT[c.type] ?? 0)) * c.credits, 0) / totalCredits
  return { unweighted, weighted }
}

const STANDARD_CUTOFFS: [number, number][] = [
  [93, 4.0], [90, 3.7], [87, 3.3], [83, 3.0], [80, 2.7],
  [77, 2.3], [73, 2.0], [70, 1.7], [67, 1.3], [63, 1.0], [0, 0.0],
]
const RELAXED_CUTOFFS: [number, number][] = [
  [90, 4.0], [87, 3.7], [83, 3.3], [80, 3.0], [77, 2.7],
  [73, 2.3], [70, 2.0], [67, 1.7], [63, 1.3], [60, 1.0], [0, 0.0],
]

function calcPctGPA(pct: string, cutoff: Cutoff): number | null {
  const p = parseFloat(pct)
  if (isNaN(p) || p < 0 || p > 100) return null
  const table = cutoff === 'standard' ? STANDARD_CUTOFFS : RELAXED_CUTOFFS
  for (const [min, gpa] of table) {
    if (p >= min) return gpa
  }
  return 0.0
}

// ─── Heading copy per system ───────────────────────────────────────────────────

const HEADING: Record<CalcSystem, string> = {
  ap:     'Add your courses',
  pct:    'Enter your percentage',
  letter: 'Add your subjects',
}

const SUBHEADING: Record<CalcSystem, string> = {
  ap:     "Enter each class, its type, credit and your grade.\nWe'll calculate your weighted and unweighted GPA.",
  pct:    "Enter your percentage score and select your school's cutoff standard.\nWe'll convert it to an unweighted 4.0 GPA.",
  letter: "Enter each subject and your grade.\nWe'll calculate your cumulative GPA.",
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  initialSystem: CalcSystem
}

export default function ActiveState({ initialSystem }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // System + dropdown
  const [system,       setSystem]       = useState<CalcSystem>(initialSystem)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // AP course table
  const [courses, setCourses] = useState<Course[]>([])

  // Percentage panel
  const [pct,    setPct]    = useState('')
  const [cutoff, setCutoff] = useState<Cutoff>('standard')

  // Letter panel — GPA propagated up via callback
  const [letterGPA, setLetterGPA] = useState<number | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ─── GPA values ─────────────────────────────────────────────────────────────

  let gpaUnweighted: number | null = null
  let gpaWeighted:   number | null = null

  if (system === 'ap') {
    const r = calcApGPAs(courses)
    gpaUnweighted = r.unweighted
    gpaWeighted   = r.weighted
  } else if (system === 'pct') {
    gpaUnweighted = calcPctGPA(pct, cutoff)
  } else if (system === 'letter') {
    gpaUnweighted = letterGPA
  }

  // ─── System switching ────────────────────────────────────────────────────────

  const handleSystemSelect = (newSystem: CalcSystem) => {
    setDropdownOpen(false)
    if (newSystem === system) return

    // Confirm if AP courses would be lost
    if (system === 'ap' && courses.length > 0) {
      if (!window.confirm('Switching will clear your courses. Continue?')) return
      setCourses([])
    }

    setSystem(newSystem)
  }

  // ─── AP course management ────────────────────────────────────────────────────

  const addCourse = () => {
    setCourses(prev => [
      ...prev,
      { id: nextId++, name: '', type: 'Regular', credits: 1.0, grade: 'A' },
    ])
  }

  const removeCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== id) return c
      return { ...c, [field]: field === 'credits' ? parseFloat(value) : value }
    }))
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  const showWeighted = system === 'ap'
  const hasGPA = gpaUnweighted !== null

  // Progress counter — count courses with a non-empty grade
  const validCount = courses.filter(c => c.name.trim() !== '' && c.grade !== '').length

  return (
    <div className="active-state">
      <div className="active-state__inner">

        {/* Header row — "Your grading system" + system selector */}
        <div className="grading-system-row">
          <h1 className="grading-system-row__label">Your grading system</h1>

          <div className="system-chip-wrap" ref={dropdownRef}>
            <button
              type="button"
              className="system-selector"
              onClick={() => setDropdownOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className="system-selector__name">{SYSTEM_LABELS[system]}</span>
              <ChevronDown size={24} className="system-selector__chevron" />
            </button>

            {dropdownOpen && (
              <div className="system-dropdown" role="listbox">
                {SYSTEM_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={system === opt.value}
                    className={`system-dropdown__item${system === opt.value ? ' system-dropdown__item--active' : ''}`}
                    onClick={() => handleSystemSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  disabled
                  className="system-dropdown__item system-dropdown__item--disabled"
                >
                  International
                  <span className="system-dropdown__coming-soon">Coming soon</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Two-column grid — input card left, output card right */}
        <div className="active-state__cols">

          {/* Left: white input card */}
          <div className="input-card">
            {/* Letter panel renders its own heading, subtitle, and switch internally */}
            {system !== 'letter' && (
              <div className="input-card__heading-row">
                <div className="input-card__heading-left">
                  <h2 className="input-card__heading">{HEADING[system]}</h2>
                  <p className="input-card__subheading">
                    {SUBHEADING[system].replace(/\n/g, ' ')}
                  </p>
                </div>
                {validCount < 3 && (
                  <span className="input-card__progress">Add 3 courses to start calculating</span>
                )}
              </div>
            )}

            {/* ── AP: course table ── */}
            {system === 'ap' && (
              <>
                {/* Fix 3: updated column widths */}
                <div className="course-table__head">
                  <span className="course-col course-col--name">Course name</span>
                  <span className="course-col course-col--type">Course type</span>
                  <span className="course-col course-col--credits">Credits</span>
                  <span className="course-col course-col--grade">Grades</span>
                  <span className="course-col course-col--remove" />
                </div>

                {courses.length === 0 ? (
                  <p className="course-table__empty">
                    No courses yet — add your first course below.
                  </p>
                ) : (
                  <div className="course-table__body">
                    {courses.map(course => {
                      const nameInputId = `course-name-${course.id}`
                      return (
                      <div key={course.id} className="course-row">
                        {/* Row 1 — Course name */}
                        <div className="course-col course-col--name">
                          <input
                            id={nameInputId}
                            type="text"
                            className="course-input"
                            value={course.name}
                            placeholder="Course name"
                            onChange={e => updateCourse(course.id, 'name', e.target.value)}
                            aria-label="Course name"
                          />
                          <label htmlFor={nameInputId} className="course-col__pencil" aria-label="Edit course name">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </label>
                        </div>

                        {/* Row 2 — Course type */}
                        <div className="course-col course-col--type">
                          <span className="course-col__label">Course type</span>
                          <div className="course-select-wrap">
                            <select
                              className="course-select"
                              value={course.type}
                              onChange={e => updateCourse(course.id, 'type', e.target.value)}
                              aria-label="Course type"
                            >
                              {COURSE_TYPES.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            <ChevronDown size={24} className="course-select__chevron" />
                          </div>
                        </div>

                        {/* Row 3 — Credits */}
                        <div className="course-col course-col--credits">
                          <span className="course-col__label">Credits</span>
                          <div className="course-select-wrap">
                            <select
                              className="course-select"
                              value={course.credits.toFixed(1)}
                              onChange={e => updateCourse(course.id, 'credits', e.target.value)}
                              aria-label="Credits"
                            >
                              {CREDIT_OPTIONS.map(v => (
                                <option key={v} value={v}>{v}</option>
                              ))}
                            </select>
                            <ChevronDown size={24} className="course-select__chevron" />
                          </div>
                        </div>

                        {/* Row 4 — Grade */}
                        <div className="course-col course-col--grade">
                          <span className="course-col__label">Grades</span>
                          <div className="course-select-wrap">
                            <select
                              className="course-select"
                              value={course.grade}
                              onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                              aria-label="Grade"
                            >
                              {GRADE_DROPDOWN.map(g => (
                                <option key={g} value={g}>{g}</option>
                              ))}
                            </select>
                            <ChevronDown size={24} className="course-select__chevron" />
                          </div>
                        </div>

                        {/* Remove button (desktop only) */}
                        <div className="course-col course-col--remove">
                          <button
                            type="button"
                            className="course-remove-btn"
                            onClick={() => removeCourse(course.id)}
                            aria-label={`Remove ${course.name || 'course'}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                )}

                <button type="button" className="add-course-btn" onClick={addCourse}>
                  <img src="/assets/gpa-calculator/plus.svg" alt="" width="20" height="20" aria-hidden="true" />
                  <span>Add course</span>
                </button>
              </>
            )}

            {/* ── Percentage panel ── */}
            {system === 'pct' && (
              <PercentagePanel
                pct={pct}
                cutoff={cutoff}
                onPctChange={setPct}
                onCutoffChange={setCutoff}
              />
            )}

            {/* ── Letter panel ── */}
            {system === 'letter' && (
              <LetterPanel onGPAChange={setLetterGPA} />
            )}
          </div>

          {/* Right: GPA output card — pre/post calculation states */}
          <div className={`output-card${hasGPA ? ' output-card--post' : ''}`}>
            {system === 'letter' ? (
              <>
                <span className="output-card__top-label">Your cumulative GPA</span>
                <div className="output-card__section">
                  <div className="output-card__gpa-row">
                    <span className="output-card__value">
                      {hasGPA ? gpaUnweighted!.toFixed(1) : 'XX'}
                    </span>
                    <span className="output-card__scale">/4.0</span>
                  </div>
                  <p className="output-card__label">Cumulative GPA</p>
                  <div className="output-card__formula-block">
                    <span className="output-card__formula-label">Formula</span>
                    <span className="output-card__formula">Σ(grade pts × credits) ÷ Σ(credits)</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="output-card__top-row">
                  <img
                    src="/assets/gpa-calculator/bank-icon.svg"
                    alt=""
                    width="24"
                    height="24"
                    aria-hidden="true"
                    className="output-card__top-icon"
                  />
                  <span className="output-card__top-label">Colleges use unweighted GPA</span>
                </div>

                <div className="output-card__sections-wrap">
                  <div className="output-card__section">
                    <div className="output-card__gpa-row">
                      <span className="output-card__value">
                        {hasGPA ? gpaUnweighted!.toFixed(1) : 'XX'}
                      </span>
                      <span className="output-card__scale">/4.0</span>
                    </div>
                    <p className="output-card__label">Unweighted GPA</p>
                    <div className="output-card__formula-block">
                      <span className="output-card__formula-label">Formula</span>
                      <span className="output-card__formula">Σ(grade pts × credits) ÷ Σ(credits)</span>
                    </div>
                  </div>

                  <div className="output-card__divider" />

                  <div className="output-card__section">
                    <div className="output-card__gpa-row">
                      <span className="output-card__value">
                        {showWeighted && gpaWeighted !== null ? gpaWeighted.toFixed(1) : 'XX'}
                      </span>
                      <span className="output-card__scale">{showWeighted ? '/5.0' : ''}</span>
                    </div>
                    <p className="output-card__label">Weighted GPA</p>
                    {showWeighted && (
                      <div className="output-card__formula-block">
                        <span className="output-card__formula-label">Formula</span>
                        <span className="output-card__formula">Σ((grade pts + bonus) × credits) ÷ Σ(credits)</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* College matches — visible when 3+ valid courses */}
        {hasGPA && <CollegeCards />}

      </div>
    </div>
  )
}
