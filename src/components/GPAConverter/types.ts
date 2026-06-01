export type System = 'ap' | 'pct' | 'letter' | 'intl'
export type CourseType = 'Regular' | 'Honors' | 'AP' | 'IB'
export type Letter = 'A' | 'B' | 'C' | 'D' | 'F'
export type Modifier = '+' | 'none' | '-'
export type WeightedScale = '5.0' | '6.0'
export type Cutoff = 'standard' | 'relaxed'

export interface Course {
  id: number
  name: string
  type: CourseType
  credits: number
  grade: string
}

export interface ConverterState {
  courses: Course[]
  shortcutMode: boolean
  weightedGPA: string
  weightedScale: WeightedScale
  pct: string
  cutoff: Cutoff
  letter: Letter
  modifier: Modifier
}

export const SYSTEM_ROUTES: Record<System, string> = {
  ap: '/gpa-converter/ap-gpa-calculator',
  pct: '/gpa-converter/percentage-to-gpa',
  letter: '/gpa-converter/letter-grade-to-gpa',
  intl: '/gpa-converter',
}

export const SYSTEM_LABELS: Record<System, string> = {
  ap: 'AP / Honors',
  pct: 'Percentage',
  letter: 'Letter Grade',
  intl: 'International',
}

export const GRADE_OPTIONS = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D', 'D-',
  'F',
]

export const COURSE_TYPES: CourseType[] = ['Regular', 'Honors', 'AP', 'IB']
