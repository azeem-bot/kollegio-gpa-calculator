const SIGNALS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5L2 7.8 7.5 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Weighted and unweighted',
    body: 'We calculate both — colleges standardize on unweighted.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Estimate, not official',
    body: 'For official evaluation, use WES or your institution\'s transcript service.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Always free',
    body: 'No account needed to convert your GPA.',
  },
]

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      {SIGNALS.map(s => (
        <div key={s.title} className="trust-strip__item">
          <div className="trust-strip__icon">{s.icon}</div>
          <div>
            <div className="trust-strip__title">{s.title}</div>
            <div className="trust-strip__body">{s.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
