import { Routes, Route } from 'react-router-dom'
import GPACalculatorPage from './pages/GPACalculatorPage/GPACalculatorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/gpa-calculator" element={<GPACalculatorPage />} />
      <Route path="/gpa-converter"  element={<GPACalculatorPage />} />
      <Route path="*"               element={<GPACalculatorPage />} />
    </Routes>
  )
}
