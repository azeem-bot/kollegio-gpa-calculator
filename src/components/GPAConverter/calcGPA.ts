import type { ConverterState, System } from './types'

export const GP: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F':  0.0,
}

export const WEIGHT: Record<string, number> = {
  'Regular': 0,
  'Honors':  0.5,
  'AP':      1.0,
  'IB':      1.0,
  'College': 1.0,
}

const STANDARD_CUTOFFS: [number, number][] = [
  [93, 4.0], [90, 3.7], [87, 3.3], [83, 3.0], [80, 2.7],
  [77, 2.3], [73, 2.0], [70, 1.7], [67, 1.3], [63, 1.0], [0, 0.0],
]

const RELAXED_CUTOFFS: [number, number][] = [
  [90, 4.0], [87, 3.7], [83, 3.3], [80, 3.0], [77, 2.7],
  [73, 2.3], [70, 2.0], [67, 1.7], [63, 1.3], [60, 1.0], [0, 0.0],
]

export interface CalcResult {
  gpa: number | null      // unweighted — used for CTA, pct, letter
  weighted: number | null // weighted — AP course-table mode only
  isApprox: boolean
}

export function calcGPA(system: System, state: ConverterState): CalcResult {
  switch (system) {
    case 'ap': {
      if (state.shortcutMode) {
        const w = parseFloat(state.weightedGPA)
        const s = parseFloat(state.weightedScale)
        if (isNaN(w) || w <= 0) return { gpa: null, weighted: null, isApprox: true }
        return { gpa: Math.min(4.0, (w / s) * 4.0), weighted: null, isApprox: true }
      }
      const valid = state.courses.filter(c => GP[c.grade] !== undefined && c.credits > 0)
      if (valid.length === 0) return { gpa: null, weighted: null, isApprox: false }
      const totalCredits = valid.reduce((acc, c) => acc + c.credits, 0)
      const unweightedPts = valid.reduce((acc, c) => acc + GP[c.grade] * c.credits, 0)
      const weightedPts = valid.reduce((acc, c) => acc + (GP[c.grade] + (WEIGHT[c.type] ?? 0)) * c.credits, 0)
      return {
        gpa: unweightedPts / totalCredits,
        weighted: weightedPts / totalCredits,
        isApprox: false,
      }
    }
    case 'pct': {
      const p = parseFloat(state.pct)
      if (isNaN(p) || p < 0 || p > 100) return { gpa: null, weighted: null, isApprox: false }
      const cutoffs = state.cutoff === 'standard' ? STANDARD_CUTOFFS : RELAXED_CUTOFFS
      for (const [min, gpa] of cutoffs) {
        if (p >= min) return { gpa, weighted: null, isApprox: false }
      }
      return { gpa: 0.0, weighted: null, isApprox: false }
    }
    case 'letter': {
      const key = state.modifier === 'none' ? state.letter : state.letter + state.modifier
      const gpa = GP[key]
      if (gpa === undefined) return { gpa: null, weighted: null, isApprox: false }
      return { gpa, weighted: null, isApprox: false }
    }
    case 'intl':
      return { gpa: null, weighted: null, isApprox: false }
  }
}

export function getSystemFromPath(path: string): System {
  if (path.includes('percentage-to-gpa')) return 'pct'
  if (path.includes('letter-grade-to-gpa')) return 'letter'
  if (path.includes('ap-gpa-calculator')) return 'ap'
  return 'ap'
}
