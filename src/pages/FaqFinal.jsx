import { Link } from 'react-router-dom'
import { ArrowRight, Plus } from 'lucide-react'

const KP_CARD_ASSETS = {
  emma: '/images/student-emma.png',
}

function Action({ children = 'Book a free demo', to = '/demo', className = '' }) {
  const classes = `kp-button kp-button-primary ${className}`
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>
  return /^https?:/.test(to)
    ? <a className={classes} href={to}>{content}</a>
    : <Link className={classes} to={to}>{content}</Link>
}

function FAQs() {
  const questions = [
    [
      'Is Kinderpedia right for our school?',
      'Kinderpedia brings school administration, classroom activity and family communication together for schools, nurseries and education groups.',
    ],
    [
      'Can we migrate our existing data?',
      'Yes. The Kinderpedia team can help review your current systems, prepare your records and plan a structured migration during onboarding.',
    ],
    [
      'How does staff training work?',
      'Your team receives guided onboarding, training resources and ongoing support so staff can confidently use the platform from day one.',
    ],
    [
      'Can we manage multiple campuses?',
      'Yes. School groups can oversee multiple campuses, teams and student communities from one connected platform with clear access controls.',
    ],
  ]

  return (
    <section
      className="kp-faq-refresh"
      aria-labelledby="kp-faq-refresh-title"
    >
      <div className="kp-faq-container kp-faq-refresh-grid">
        <h2 id="kp-faq-refresh-title">
          A few things you might be wondering.
        </h2>

        <div className="kp-faq-refresh-items">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                <span>{question}</span>
                <Plus size={16} aria-hidden="true" />
              </summary>

              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA({ demoTo }) {
  return (
    <section className="kp-final-refresh-wrap">
      <div className="kp-faq-container">
        <div className="kp-final-refresh">
          <div className="kp-final-refresh-copy">
            <h2>
              Make more room for <span>education.</span>
            </h2>

            <p>
              Less admin. More connection. A brighter school day for everyone.
            </p>

            <Action to={demoTo}>
              Book a free demo
            </Action>
          </div>

          <div className="kp-final-refresh-photo">
            <img
              src={KP_CARD_ASSETS.emma}
              alt="Student smiling at school"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FaqFinal({ demoTo = '/demo' }) {
  return (
    <div className="kp-faq-final-wrap">
      <style>{styles}</style>
      <FAQs />
      <FinalCTA demoTo={demoTo} />
    </div>
  )
}

const styles = `
/* ============ FAQ + Final CTA wrapper ============ */
.kp-faq-final-wrap {
  color: #10223c;
  background: #fff;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
}

.kp-faq-final-wrap *,
.kp-faq-final-wrap *::before,
.kp-faq-final-wrap *::after { box-sizing: border-box; }

.kp-faq-final-wrap :where(h2,h3,p,ul) { margin: 0; }
.kp-faq-final-wrap :where(h2,h3) {
  color: inherit;
  font-family: inherit;
}
.kp-faq-final-wrap :where(a) { color: inherit; text-decoration: none; }
.kp-faq-final-wrap :where(button) { font: inherit; cursor: pointer; color: inherit; }
.kp-faq-final-wrap :where(svg) { flex-shrink: 0; }

.kp-faq-container {
  width: min(1200px, calc(100% - 80px));
  margin-inline: auto;
}

/* ============ FAQ ============ */
.kp-faq-refresh {
  padding: 28px 0 20px;
  background: #fff;
  color: #10223c;
}

.kp-faq-refresh-grid {
  display: grid;
  grid-template-columns: minmax(0, .75fr) minmax(0, 1.25fr);
  gap: 42px;
  align-items: start;
}

.kp-faq-refresh h2 {
  margin: 0;
  max-width: 355px;
  color: #10223c;
  font-size: clamp(22px, 2.2vw, 31px);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -.8px;
}

.kp-faq-refresh-items {
  border-top: 1px solid #e6edef;
}

.kp-faq-refresh-items details {
  border-bottom: 1px solid #e6edef;
}

.kp-faq-refresh-items summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 43px;
  padding: 9px 4px 9px 12px;
  color: #304b63;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  list-style: none;
  cursor: pointer;
}

.kp-faq-refresh-items summary::-webkit-details-marker {
  display: none;
}

.kp-faq-refresh-items summary svg {
  flex-shrink: 0;
  color: #6d8292;
  transition: transform .2s ease;
}

.kp-faq-refresh-items details[open] summary {
  color: #0a9b94;
}

.kp-faq-refresh-items details[open] summary svg {
  transform: rotate(45deg);
}

.kp-faq-refresh-items details p {
  margin: 0;
  max-width: 650px;
  padding: 0 42px 14px 12px;
  color: #6e8492;
  font-size: 10px;
  line-height: 1.7;
}

/* ============ Final CTA ============ */
.kp-final-refresh-wrap {
  padding: 0 0 0;
  background: #fff;
}

.kp-final-refresh {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 112px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  background:
    radial-gradient(
      ellipse at 85% 45%,
      rgba(255, 169, 200, .52),
      transparent 47%
    ),
    linear-gradient(105deg, #e8faf7, #fff3f6 100%);
}

.kp-final-refresh-copy {
  position: relative;
  z-index: 2;
  padding: 19px 32px;
}

.kp-final-refresh-copy h2 {
  margin: 0 0 5px;
  color: #10243d;
  font-size: clamp(22px, 2.3vw, 31px);
  font-weight: 750;
  line-height: 1.15;
  letter-spacing: -.8px;
}

.kp-final-refresh-copy h2 span {
  color: #0c9992;
}

.kp-final-refresh-copy p {
  margin: 0 0 13px;
  color: #5d7482;
  font-size: 10px;
  line-height: 1.5;
}

.kp-final-refresh-copy .kp-button {
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 9px;
  gap: 8px;
}

.kp-final-refresh-photo {
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  overflow: hidden;
  opacity: .96;
  mask-image: linear-gradient(90deg, transparent 0%, #000 32%);
}

.kp-final-refresh-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 242, 246, .95),
    rgba(255, 205, 220, .08)
  );
}

.kp-final-refresh-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

/* ============ Shared button ============ */
.kp-button {
  min-height: 48px;
  padding: 13px 21px;
  border-radius: 9px;
  display: inline-flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  font-weight: 650;
  font-size: 13px;
  line-height: 1.45;
  border: 1px solid transparent;
  transition: transform .2s, background .2s, box-shadow .2s;
  text-decoration: none;
}

.kp-button-primary {
  background: #087d35;
  color: #fff;
  box-shadow: 0 5px 12px #087d3514, inset 0 1px 0 #ffffff22;
}

.kp-button-primary:hover {
  background: #05652a;
  transform: translateY(-2px);
  box-shadow: 0 8px 18px #087d3529;
}

/* ============ Responsive ============ */
@media (max-width: 1100px) {
  .kp-faq-container { width: calc(100% - 48px); }
}

@media (max-width: 750px) {
  .kp-faq-refresh-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .kp-faq-refresh h2 {
    max-width: none;
  }

  .kp-final-refresh-photo {
    width: 38%;
  }
}

@media (max-width: 600px) {
  .kp-faq-container { width: calc(100% - 36px); }
}

@media (max-width: 520px) {
  .kp-faq-refresh {
    padding-top: 23px;
  }

  .kp-faq-refresh h2 {
    font-size: 25px;
  }

  .kp-faq-refresh-items summary {
    min-height: 46px;
    font-size: 11px;
  }

  .kp-final-refresh {
    min-height: 145px;
  }

  .kp-final-refresh-copy {
    max-width: 76%;
    padding: 21px 18px;
  }

  .kp-final-refresh-copy h2 {
    font-size: 24px;
  }

  .kp-final-refresh-photo {
    width: 47%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .kp-faq-final-wrap *,
  .kp-faq-final-wrap *::before,
  .kp-faq-final-wrap *::after {
    animation: none !important;
    transition: none !important;
  }
}
`