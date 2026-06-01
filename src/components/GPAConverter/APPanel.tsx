import { useId } from 'react'
import type { Course, CourseType, WeightedScale } from './types'
import { GRADE_OPTIONS, COURSE_TYPES } from './types'
import './APPanel.css'

interface Props {
  courses: Course[]
  shortcutMode: boolean
  weightedGPA: string
  weightedScale: WeightedScale
  onAddCourse: () => void
  onRemoveCourse: (id: number) => void
  onUpdateCourse: (id: number, field: keyof Course, value: string) => void
  onToggleShortcut: () => void
  onWeightedGPAChange: (v: string) => void
  onWeightedScaleChange: (v: WeightedScale) => void
}

export default function APPanel({
  courses,
  shortcutMode,
  weightedGPA,
  weightedScale,
  onAddCourse,
  onRemoveCourse,
  onUpdateCourse,
  onToggleShortcut,
  onWeightedGPAChange,
  onWeightedScaleChange,
}: Props) {
  const shortcutId = useId()

  return (
    <div className="ap-panel">
      <div className="ap-panel__mode-toggle">
        <button
          type="button"
          className={`ap-panel__mode-btn${!shortcutMode ? ' ap-panel__mode-btn--active' : ''}`}
          onClick={() => shortcutMode && onToggleShortcut()}
        >
          Enter courses
        </button>
        <button
          type="button"
          className={`ap-panel__mode-btn${shortcutMode ? ' ap-panel__mode-btn--active' : ''}`}
          onClick={() => !shortcutMode && onToggleShortcut()}
        >
          I have my weighted GPA
        </button>
      </div>

      {shortcutMode ? (
        <div className="ap-panel__shortcut">
          <label htmlFor={shortcutId} className="ap-panel__shortcut-label">
            Your weighted GPA
          </label>
          <div className="ap-panel__shortcut-row">
            <input
              id={shortcutId}
              type="number"
              className="ap-panel__shortcut-input"
              placeholder="e.g. 4.2"
              min="0"
              max="6"
              step="0.01"
              value={weightedGPA}
              onChange={e => onWeightedGPAChange(e.target.value)}
            />
            <span className="ap-panel__shortcut-sep">out of</span>
            <select
              className="ap-panel__shortcut-scale"
              value={weightedScale}
              onChange={e => onWeightedScaleChange(e.target.value as WeightedScale)}
            >
              <option value="5.0">5.0 scale</option>
              <option value="6.0">6.0 scale</option>
            </select>
          </div>
          <p className="ap-panel__shortcut-note">
            Approximate — exact value depends on individual course grades.
          </p>
        </div>
      ) : (
        <div className="ap-panel__table-wrap">
          <table className="ap-panel__table">
            <thead>
              <tr>
                <th className="ap-panel__th ap-panel__th--name">Course name</th>
                <th className="ap-panel__th ap-panel__th--type">Type</th>
                <th className="ap-panel__th ap-panel__th--credits">Credits</th>
                <th className="ap-panel__th ap-panel__th--grade">Grade</th>
                <th className="ap-panel__th ap-panel__th--remove" aria-label="Remove" />
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="ap-panel__row">
                  <td className="ap-panel__td">
                    <input
                      type="text"
                      className="ap-panel__name-input"
                      placeholder="e.g. English"
                      value={course.name}
                      onChange={e => onUpdateCourse(course.id, 'name', e.target.value)}
                    />
                  </td>
                  <td className="ap-panel__td">
                    <select
                      className="ap-panel__select"
                      value={course.type}
                      onChange={e => onUpdateCourse(course.id, 'type', e.target.value as CourseType)}
                    >
                      {COURSE_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </td>
                  <td className="ap-panel__td">
                    <select
                      className="ap-panel__select"
                      value={course.credits.toFixed(1)}
                      onChange={e => onUpdateCourse(course.id, 'credits', e.target.value)}
                    >
                      <option value="0.5">0.5</option>
                      <option value="1.0">1.0</option>
                      <option value="2.0">2.0</option>
                    </select>
                  </td>
                  <td className="ap-panel__td">
                    <select
                      className="ap-panel__select"
                      value={course.grade}
                      onChange={e => onUpdateCourse(course.id, 'grade', e.target.value)}
                    >
                      <option value="">—</option>
                      {GRADE_OPTIONS.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                  <td className="ap-panel__td ap-panel__td--remove">
                    <button
                      type="button"
                      className="ap-panel__remove-btn"
                      onClick={() => onRemoveCourse(course.id)}
                      aria-label={`Remove ${course.name || 'course'}`}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="ap-panel__add-btn" onClick={onAddCourse}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Add course
          </button>
        </div>
      )}
    </div>
  )
}
