import { useState } from 'react'
import { ChevronDown, ChevronUp } from './Icons'
import './CalcFAQ.css'

const FAQ_ITEMS = [
  {
    q: "What's the difference between weighted and unweighted GPA?",
    a: "Unweighted GPA uses a standard 4.0 scale and treats all classes equally. Weighted GPA accounts for course difficulty, giving extra points for AP, Honors, and IB classes, often resulting in a scale above 4.0. Colleges use both when evaluating your transcript. Kollegio calculates and explains both so you understand how admissions officers will read your academic record.",
  },
  {
    q: "What GPA do I need to get into a top college?",
    a: "Ivy League and top-tier schools typically admit students with unweighted GPAs between 3.8 and 4.0, often with weighted GPAs above 4.5. Course rigor, essays, and extracurriculars also play major roles. Kollegio's college match tool gives you personalized GPA ranges for specific schools based on your full profile, not just generic averages.",
  },
  {
    q: "Will my GPA go up if I get better grades next semester?",
    a: "Yes. Your cumulative GPA is recalculated each semester by averaging all your course grades weighted by credit hours. One strong semester can meaningfully improve your overall GPA. Kollegio lets you model different grade scenarios to see exactly how your GPA and college matches would change with improved performance.",
  },
  {
    q: "Do colleges look at weighted or unweighted GPA?",
    a: "Most colleges recalculate GPA from your transcript using their own formula, focusing on core academic classes. They consider both the unweighted number and the rigor of your course load. Kollegio's matching algorithm follows this process, factoring in both your GPA and the difficulty of your classes to show realistic college options.",
  },
  {
    q: "Is a 3.5 GPA good for college admissions?",
    a: "A 3.5 unweighted GPA is competitive for most four-year colleges and many selective state universities. It may be below the threshold for Ivy League schools but opens doors to hundreds of quality institutions. Use Kollegio's college match tool to see which specific schools align with a 3.5 GPA based on your full profile and preferences.",
  },
  {
    q: "How do I calculate my cumulative GPA?",
    a: "Cumulative GPA is calculated by dividing the total grade points earned (grade value times credit hours for each course) by the total credit hours attempted. Weighted courses earn extra grade points. Kollegio's calculator handles this math automatically. Just enter your courses and grades, and we'll show you both weighted and unweighted cumulative results.",
  },
  {
    q: "Can I retake a class to improve my GPA?",
    a: "Some high schools allow you to retake a class and replace the original grade on your transcript. Policies vary by school, so check with your counselor. If retaking is an option, use Kollegio's calculator to model how a higher grade in that class would affect your cumulative GPA and college matches.",
  },
  {
    q: "Do electives and PE count toward my GPA?",
    a: "Electives and PE typically count toward your high school GPA, but many colleges recalculate GPA using only core academic classes — English, math, science, social studies, and foreign language. Kollegio's matching algorithm focuses on the GPA components that admissions officers prioritize, giving you a realistic view of your competitiveness.",
  },
]

export default function CalcFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(2)

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section className="calc-faq">
      <div className="calc-faq__inner">
        {/* Left column */}
        <div className="calc-faq__left">
          <p className="calc-faq__eyebrow">GPA CALCULATOR</p>
          <h2 className="calc-faq__heading">Frequently Asked Questions</h2>
          <p className="calc-faq__sub">
            We've got answers. Explore our FAQs.<br />
            Or reach out at <a href="mailto:support@kollegio.ai" className="calc-faq__email">support@kollegio.ai</a>
          </p>
        </div>

        {/* Right column: accordion */}
        <div className="calc-faq__right">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`calc-faq__item${isOpen ? ' calc-faq__item--open' : ''}`}>
                <button
                  type="button"
                  className="calc-faq__trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="calc-faq__question">{item.q}</span>
                  {isOpen
                    ? <ChevronUp size={24} className="calc-faq__chevron" />
                    : <ChevronDown size={24} className="calc-faq__chevron" />
                  }
                </button>
                <div className="calc-faq__body">
                  <div className="calc-faq__body-inner">
                    <p className="calc-faq__answer">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
