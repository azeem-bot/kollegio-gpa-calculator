import type { System } from './types'
import './SEOContent.css'

interface Props {
  system: System
}

const FAQ = [
  {
    q: 'Does Harvard recalculate my GPA?',
    a: 'Yes — most highly selective colleges recalculate your GPA on their own unweighted 4.0 scale, stripping AP/Honors bonuses and sometimes excluding non-core electives. This is why Kollegio always shows unweighted GPA: it\'s the most accurate basis for comparison across schools.',
  },
  {
    q: 'Weighted vs unweighted — which should I use?',
    a: 'Use unweighted when comparing yourself to college admission benchmarks. Weighted GPA (4.5, 5.0, etc.) is useful for your school\'s internal ranking, but colleges standardize it before making decisions. This tool outputs unweighted 4.0 only.',
  },
  {
    q: 'What GPA do I need for a good college?',
    a: 'It depends heavily on the school. Highly selective colleges (top 20) typically admit students with unweighted GPAs of 3.7–4.0. Strong state flagships often accept 3.3–3.8. There are excellent colleges at every GPA range. Kollegio\'s matching shows which schools are realistic for your specific GPA.',
  },
]

const SYSTEM_METHOD: Record<System, string> = {
  ap: 'For AP/Honors courses, we calculate unweighted GPA by averaging the grade points for each course — ignoring any weighted bonus. A in an AP class earns the same 4.0 as an A in a Regular class. If you use the weighted GPA shortcut, we proportionally scale your weighted GPA back to 4.0 (an approximation).',
  pct: 'We map your percentage to letter grades using common US cutoffs. Standard cutoffs treat 93% as the A threshold; relaxed cutoffs (used by many international and some US schools) treat 90% as the A threshold. Choose whichever matches your school\'s grading policy.',
  letter: 'We use the standard College Board / NACAC letter-to-GPA conversion: A = 4.0, A− = 3.7, B+ = 3.3, and so on. Note: A+ = 4.0 (not 4.33) — most colleges cap at 4.0 unweighted.',
  intl: 'International grading systems vary widely. Kollegio will support IB point scores, UK A-levels, Indian CGPA (10-point scale), and Pakistani grading in an upcoming update.',
}

export default function SEOContent({ system }: Props) {
  return (
    <div className="seo-content">
      <section className="seo-content__section">
        <h2 className="seo-content__h2">How we calculate your GPA</h2>
        <p className="seo-content__p">{SYSTEM_METHOD[system]}</p>
      </section>

      <section className="seo-content__section">
        <h2 className="seo-content__h2">What is a 4.0 GPA scale?</h2>
        <p className="seo-content__p">
          The 4.0 scale is the standard unweighted GPA scale used by US colleges and universities for admissions comparison. Each letter grade maps to a fixed point value — A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0 — and your GPA is the average across all courses. It strips out extra weight from advanced courses so institutions can compare applicants fairly.
        </p>
      </section>

      <section className="seo-content__section">
        <h2 className="seo-content__h2">Frequently asked questions</h2>
        <div className="seo-content__faq">
          {FAQ.map(item => (
            <details key={item.q} className="seo-content__faq-item">
              <summary className="seo-content__faq-q">{item.q}</summary>
              <p className="seo-content__faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
