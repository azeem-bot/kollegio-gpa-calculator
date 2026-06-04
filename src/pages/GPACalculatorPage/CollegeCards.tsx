import './CollegeCards.css'

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#132619" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function BankNoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#132619" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CollegeCards() {
  return (
    <div className="college-matches">

      {/* Pink pill divider */}
      <div className="college-matches__divider">
        <div className="college-matches__line" />
        <span className="college-matches__pill">YOUR COLLEGE MATCHES</span>
      </div>

      {/* Cards row */}
      <div className="college-matches__cards">

        {/* Card 1 — Cal Poly Humboldt */}
        <div className="college-card">
          <div className="college-card__header">
            <img src="/assets/college-cards/cal-poly.png" alt="" width="60" height="60" className="college-card__avatar" />
            <div className="college-card__info">
              <p className="college-card__name">California Polytechnic State University -- Humboldt</p>
              <p className="college-card__location">Arcata, CA</p>
            </div>
            <span className="college-card__heart"><HeartIcon /></span>
          </div>

          <div className="college-card__stats">
            <span className="college-card__badge college-card__badge--safety">
              <ShieldCheckIcon /> Safety
            </span>
            <span className="college-card__stat">
              <BankNoteIcon /> 43K/yr after aid
            </span>
            <span className="college-card__stat">
              <AwardIcon /> 65% Admission rate
            </span>
          </div>

          <div className="college-card__footer">
            <span className="college-card__match" style={{ color: '#4588e5' }}>65% Match</span>
          </div>
        </div>

        {/* Card 2 — Stanford University */}
        <div className="college-card">
          <div className="college-card__header">
            <img src="/assets/college-cards/stanford.png" alt="" width="60" height="60" className="college-card__avatar" />
            <div className="college-card__info">
              <p className="college-card__name">Stanford University</p>
              <p className="college-card__location">Stanford, CA</p>
            </div>
            <span className="college-card__heart"><HeartIcon /></span>
          </div>

          <div className="college-card__stats">
            <span className="college-card__badge college-card__badge--reach">
              <FlameIcon /> Reach
            </span>
            <span className="college-card__stat">
              <BankNoteIcon /> 43K/yr after aid
            </span>
            <span className="college-card__stat">
              <AwardIcon /> 65% Admission rate
            </span>
          </div>

          <div className="college-card__footer">
            <span className="college-card__match" style={{ color: '#e54d00' }}>54% Match</span>
          </div>
        </div>

        {/* Card 3 — CTA */}
        <div className="college-cta-card">
          <h3 className="college-cta-card__heading">Get your college list in minutes</h3>
          <p className="college-cta-card__sub">Answer a few quick questions and we'll recommend colleges</p>
          <a href="/colleges/quiz" className="college-cta-card__btn">Find my fit</a>
          <img
            src="/assets/college-cards/cta-illustration.svg"
            alt=""
            className="college-cta-card__illustration"
            aria-hidden="true"
          />
        </div>

      </div>
    </div>
  )
}
