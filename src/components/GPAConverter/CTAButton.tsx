interface Props {
  gpa: number | null
}

export default function CTAButton({ gpa }: Props) {
  const hasGPA = gpa !== null
  const gpaStr = hasGPA ? gpa!.toFixed(1) : null
  const href = hasGPA ? `https://kollegio.ai/signup?gpa=${gpaStr}` : undefined

  return (
    <div className="cta-zone">
      <a
        href={href}
        className={`cta-btn${!hasGPA ? ' cta-btn--disabled' : ''}`}
        aria-disabled={!hasGPA}
        tabIndex={hasGPA ? 0 : -1}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => !hasGPA && e.preventDefault()}
      >
        {hasGPA
          ? `Find schools that match a ${gpaStr} GPA`
          : 'Find schools that match your GPA'}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  )
}
