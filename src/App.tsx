import { Routes, Route } from 'react-router-dom'
import GPACalculatorPage from './pages/GPACalculatorPage/GPACalculatorPage'
import SwipeDeckScreen from './components/SwipeDeck/SwipeDeckScreen'
import { colleges } from './data/colleges'

export default function App() {
  return (
    <Routes>
      <Route path="/gpa-calculator" element={<GPACalculatorPage />} />
      <Route path="/gpa-converter"  element={<GPACalculatorPage />} />
      <Route path="/discover-swipe" element={<SwipeDeckScreen colleges={colleges} />} />
      <Route path="*"               element={<GPACalculatorPage />} />
    </Routes>
  )
}
