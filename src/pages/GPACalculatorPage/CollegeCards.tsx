import './CollegeCards.css'

interface CollegeCard {
  name: string
  location: string
  avatar: string
  badge: { label: string; icon: string; bg: string }
  cost: string
  admission: string
  matchPct: number
  matchColor: string
}

const COLLEGES: CollegeCard[] = [
  {
    name: 'California Polytechnic State University -- Humboldt',
    location: 'Arcata, CA',
    avatar: '/assets/college-cards/cal-poly-avatar.png',
    badge: {
      label: 'Safety',
      icon: '/assets/college-cards/shield-tick.svg',
      bg: 'rgba(34,115,34,0.1)',
    },
    cost: '43K/year after aid',
    admission: '65% Admission rate',
    matchPct: 65,
    matchColor: '#4588e5',
  },
  {
    name: 'Stanford University',
    location: 'Stanford, CA',
    avatar: '/assets/college-cards/stanford-avatar.png',
    badge: {
      label: 'Reach',
      icon: '/assets/college-cards/image-05.svg',
      bg: 'rgba(229,77,0,0.1)',
    },
    cost: '43K/year after aid',
    admission: '65% Admission rate',
    matchPct: 54,
    matchColor: '#ffbb33',
  },
]

export default function CollegeCards() {
  return (
    <div className="college-cards">
      {COLLEGES.map(college => (
        <div key={college.name} className="college-card">
          {/* Header */}
          <div className="college-card__header">
            <img
              src={college.avatar}
              alt=""
              width="60"
              height="60"
              className="college-card__avatar"
            />
            <div className="college-card__info">
              <p className="college-card__name">{college.name}</p>
              <p className="college-card__location">{college.location}</p>
            </div>
            <img
              src="/assets/college-cards/heart.svg"
              alt="Save"
              width="24"
              height="24"
              className="college-card__heart"
            />
          </div>

          {/* Stats */}
          <div className="college-card__stats">
            <span
              className="college-card__badge"
              style={{ background: college.badge.bg }}
            >
              <img src={college.badge.icon} alt="" width="16" height="16" />
              {college.badge.label}
            </span>
            <span className="college-card__stat">
              <img src="/assets/college-cards/bank-note.svg" alt="" width="16" height="16" />
              {college.cost}
            </span>
            <span className="college-card__stat">
              <img src="/assets/college-cards/award.svg" alt="" width="16" height="16" />
              {college.admission}
            </span>
          </div>

          {/* Footer */}
          <div className="college-card__footer">
            <span
              className="college-card__match"
              style={{ color: college.matchColor }}
            >
              {college.matchPct}% Match
            </span>
          </div>
        </div>
      ))}

      {/* CTA card */}
      <div className="college-cta-card">
        <h3 className="college-cta-card__heading">
          Get your college list in minutes
        </h3>
        <p className="college-cta-card__sub">
          Answer a few quick questions and we'll recommend colleges
        </p>
        <a href="/colleges/quiz" className="college-cta-card__btn">
          Find my fit
        </a>
      </div>
    </div>
  )
}
