export type AdmissionBadge = 'target' | 'reach' | 'safety'

export interface College {
  id: string
  name: string
  location: string
  logoText: string
  logoColor: string
  acceptance: string
  admissionBadge: AdmissionBadge
  admissionLabel: string
  totalCost: string
  aidCost: string
  aidNote: string
  overlapCount: string
  tags: string[]
}

export const colleges: College[] = [
  {
    id: 'brown',
    name: 'Brown University',
    location: 'Providence, RI',
    logoText: 'BU',
    logoColor: '#8B0000',
    acceptance: '65%',
    admissionBadge: 'target',
    admissionLabel: 'Target',
    totalCost: '$75,528',
    aidCost: '$13,872',
    aidNote: 'under your $30K',
    overlapCount: '8 of 12 tags',
    tags: ['Art & Design', 'Under $30K', 'Public school', 'Hands-on learning', 'Leadership', 'Debate', 'Urban campus', 'Football'],
  },
  {
    id: 'calpoly',
    name: 'Cal Poly, SLO',
    location: 'San Luis Obispo, CA',
    logoText: 'CP',
    logoColor: '#004225',
    acceptance: '30%',
    admissionBadge: 'target',
    admissionLabel: 'Target',
    totalCost: '$45,200',
    aidCost: '$21,400',
    aidNote: 'under your $30K',
    overlapCount: '10 of 12 tags',
    tags: ['California', 'West Coast', 'Under $30K', 'Public school', 'Hands-on learning', 'Leadership', 'Football', 'Urban campus'],
  },
  {
    id: 'reed',
    name: 'Reed College',
    location: 'Portland, OR',
    logoText: 'RC',
    logoColor: '#8E1E1E',
    acceptance: '35%',
    admissionBadge: 'target',
    admissionLabel: 'Target',
    totalCost: '$66,700',
    aidCost: '$18,200',
    aidNote: 'under your $30K',
    overlapCount: '7 of 12 tags',
    tags: ['West Coast', 'Under $30K', 'Art & Design', 'Hands-on learning', 'Debate', 'Urban campus'],
  },
  {
    id: 'risd',
    name: 'Rhode Island School of Design',
    location: 'Providence, RI',
    logoText: 'RI',
    logoColor: '#C4541D',
    acceptance: '18%',
    admissionBadge: 'reach',
    admissionLabel: 'Reach',
    totalCost: '$82,400',
    aidCost: '$32,800',
    aidNote: 'above your $30K',
    overlapCount: '5 of 12 tags',
    tags: ['Art & Design', 'Hands-on learning', 'Public school', 'Leadership', 'Urban campus'],
  },
  {
    id: 'hmc',
    name: 'Harvey Mudd College',
    location: 'Claremont, CA',
    logoText: 'HM',
    logoColor: '#000000',
    acceptance: '14%',
    admissionBadge: 'reach',
    admissionLabel: 'Reach',
    totalCost: '$85,000',
    aidCost: '$26,500',
    aidNote: 'under your $30K',
    overlapCount: '9 of 12 tags',
    tags: ['California', 'West Coast', 'Under $30K', 'Hands-on learning', 'Leadership', 'Debate', 'Football'],
  },
]
