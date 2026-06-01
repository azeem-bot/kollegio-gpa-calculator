import { ChevronDown, ArrowRight } from './Icons'
import './CalcNav.css'

export default function CalcNav() {
  return (
    <nav className="calc-nav">
      <div className="calc-nav__inner">
        {/* Logo */}
        <a href="/" className="calc-nav__logo" aria-label="Kollegio home">
          <svg width="28" height="28" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" fill="#227322"/>
          </svg>
          <span className="calc-nav__wordmark">Kollegio</span>
        </a>

        {/* Center links */}
        <div className="calc-nav__links">
          <a href="#" className="calc-nav__link calc-nav__link--active">
            For Students
            <ChevronDown size={16} className="calc-nav__chevron" />
          </a>
          <a href="#" className="calc-nav__link">For Colleges</a>
          <a href="#" className="calc-nav__link">For Educators</a>
        </div>

        {/* Right actions */}
        <div className="calc-nav__actions">
          <a href="/login" className="calc-nav__login">Login</a>
          <a href="/signup" className="calc-nav__signup">
            Sign Up
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  )
}
