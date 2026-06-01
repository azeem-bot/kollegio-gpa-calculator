import './CTABanner.css'

export default function CTABanner() {
  return (
    <div className="cta-banner">
      <div className="cta-banner__content">
        <h2 className="cta-banner__heading">Find the colleges that fit your GPA</h2>
        <p className="cta-banner__sub">Join 300,000+ students on Kollegio — completely free</p>
      </div>
      <a
        href="https://kollegio.ai/join"
        className="cta-banner__btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get started
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  )
}
