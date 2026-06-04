import { useState } from 'react'
import CalcNav from './CalcNav'
import IdleState from './IdleState'
import ActiveState from './ActiveState'
import type { CalcSystem } from './ActiveState'
import CalcFAQ from './CalcFAQ'
import CalcFooter from './CalcFooter'
import './GPACalculatorPage.css'

export default function GPACalculatorPage() {
  const [system, setSystem] = useState<CalcSystem>('ap')

  return (
    <div className="gpa-calc-page">
      <CalcNav />
      <IdleState activeSystem={system} onSelect={setSystem} />
      <ActiveState key={system} initialSystem={system} />
      <CalcFAQ />
      <CalcFooter />
    </div>
  )
}
