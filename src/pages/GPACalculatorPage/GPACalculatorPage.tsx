import { useLocation, useNavigate } from 'react-router-dom'
import CalcNav from './CalcNav'
import IdleState from './IdleState'
import ActiveState from './ActiveState'
import type { CalcSystem } from './ActiveState'
import CalcFAQ from './CalcFAQ'
import CalcFooter from './CalcFooter'
import './GPACalculatorPage.css'

function getSystemFromPath(path: string): CalcSystem | null {
  if (path.includes('ap-gpa-calculator'))    return 'ap'
  if (path.includes('percentage-to-gpa'))    return 'pct'
  if (path.includes('subject-grades-to-gpa')) return 'letter'
  if (path.includes('letter-grade-to-gpa'))  return 'letter'
  return null
}

const SYSTEM_ROUTES: Record<CalcSystem, string> = {
  ap:     '/gpa-converter/ap-gpa-calculator',
  pct:    '/gpa-converter/percentage-to-gpa',
  letter: '/gpa-converter/subject-grades-to-gpa',
}

export default function GPACalculatorPage() {
  const location    = useLocation()
  const navigate    = useNavigate()

  // Source of truth is the URL — no local state needed
  const activeSystem = getSystemFromPath(location.pathname)

  const handleSelect = (system: CalcSystem) => {
    navigate(SYSTEM_ROUTES[system])
  }

  return (
    <div className="gpa-calc-page">
      <CalcNav />

      {activeSystem === null ? (
        <IdleState onSelect={handleSelect} />
      ) : (
        // key ensures a clean remount when the system changes
        <ActiveState key={activeSystem} initialSystem={activeSystem} />
      )}

      <CalcFAQ />
      <CalcFooter />
    </div>
  )
}
