import './CalcFooter.css'

const FOOTER_COLUMNS = [
  {
    heading: 'Platform',
    links: ['For Students', 'For Colleges', 'For Educators'],
  },
  {
    heading: 'Info Centre',
    links: ['Resources', 'Financial Aid', 'Blog'],
  },
  {
    heading: 'Help',
    links: ['Support', 'Privacy Policy', 'Terms'],
  },
  {
    heading: 'Follow Us',
    links: ['Instagram', 'LinkedIn', 'TikTok'],
  },
]

export default function CalcFooter() {
  return (
    <footer className="calc-footer">
      <div className="calc-footer__inner">
        {/* Logo */}
        <div className="calc-footer__logo">
          <svg width="28" height="28" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" fill="#227322"/>
          </svg>
          <span className="calc-footer__wordmark">Kollegio</span>
        </div>

        {/* Columns */}
        <div className="calc-footer__columns">
          {FOOTER_COLUMNS.map(col => (
            <div key={col.heading} className="calc-footer__col">
              <p className="calc-footer__col-heading">{col.heading}</p>
              <div className="calc-footer__col-divider" />
              <ul className="calc-footer__col-links">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="calc-footer__link">
                      <span>{link}</span>
                      <img
                        src="/assets/gpa-calculator/arrow-narrow-right.svg"
                        alt=""
                        width="16"
                        height="16"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
