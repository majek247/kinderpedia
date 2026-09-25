import { useState } from 'react'
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
      'Kinderpedia is designed for schools, nurseries and education groups that want to manage administration, classroom activity and family communication in one place. It works especially well for teams replacing disconnected systems, spreadsheets and messaging tools, while giving leaders, teachers and families a clearer, more consistent way to work together every day.',
    ],
    [
      'Can we migrate our existing data?',
      'Yes. During onboarding, the Kinderpedia team can review the systems and records you use today, help prepare your data, and plan the move into the platform. The goal is to make migration structured and manageable, so your team can switch without losing important student, staff or school information along the way.',
    ],
    [
      'How does staff training work?',
      'Staff training is built into onboarding so administrators, teachers and other team members understand how Kinderpedia fits into their day-to-day work. Your team gets guided sessions, practical training resources and continued support, helping people learn the workflows they actually use rather than working through a generic software training programme every day.',
    ],
    [
      'Can we manage multiple campuses?',
      'Yes. Kinderpedia can support schools and education groups operating across multiple campuses, with central visibility and role-based access for different teams. Leaders can oversee activity across locations, while each campus continues managing its own students, staff and daily workflows inside the same connected platform without relying on separate systems today.',
    ],
    [
      'How much does Kinderpedia cost?',
      'Pricing depends on your school size, structure and the Kinderpedia modules you need. Plans are built for schools, nurseries and larger education groups, so the best way to get an accurate figure is to discuss your setup, number of users and requirements with the team during a demo or pricing conversation.',
    ],
    [
      'Is our data safe and secure?',
      'Kinderpedia uses role-based access controls, secure infrastructure and protected payment processing to help keep school, student and family information safe. Schools can control who sees and manages different types of data, while payments are handled through secure providers, reducing the need to share sensitive information across disconnected tools or informal channels.',
    ],
    [
      'Do you offer ongoing support?',
      'Yes. Support continues after your school goes live. Teams can access ongoing guidance, help resources and additional training as they become more familiar with the platform or introduce new workflows. This is designed to help staff keep using Kinderpedia confidently over time, rather than leaving schools to manage adoption on their own.',
    ],
    [
      'Can families use Kinderpedia on mobile?',
      'Yes. Families can use the Kinderpedia parent app on iOS and Android to keep up with school life from their phones. They can view updates, messages, announcements and other shared information in one place, making it easier to stay informed without switching between email, messaging apps and separate school communication tools.',
    ],
    [
      'How do reports and analytics work?',
      'Kinderpedia gives school leaders access to dashboards and reports covering areas such as attendance, student progress and day-to-day operations. Teams can use this information to spot patterns, monitor activity and prepare updates for internal reviews, while keeping important school data in one place instead of combining separate spreadsheets and reporting tools.',
    ],
  ]
  

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section
      className="kp-faq-refresh"
      aria-labelledby="kp-faq-refresh-title"
    >
      <div className="kp-faq-container kp-faq-refresh-grid">
        <h2 id="kp-faq-refresh-title">
          Common Questions From Schools Evaluating Kinderpedia
        </h2>

        <div className="kp-faq-refresh-items">
          {questions.map(([question, answer], index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={question}
                className={`kp-faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="kp-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <span>{question}</span>
                  <Plus size={20} aria-hidden="true" />
                </button>

                <div className="kp-faq-answer">
                  <p>{answer}</p>
                </div>
              </div>
            )
          })}
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
             See How Much Your Team Could<span> Manage in Kinderpedia.</span>
            </h2>

            <p>
              Explore how Kinderpedia can support your administrators, teachers and families across everyday school operations, learning and communication.
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
  color: #0B2545;
  background: #fff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

/* MATCHES THE HERO WIDTH EXACTLY */
.kp-faq-container {
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
}

/* ============ FAQ ============ */
.kp-faq-refresh {
  padding: 96px 0 96px;
  background: #fff;
  color: #0B2545;
}

.kp-faq-refresh-grid {
  display: grid;
  grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
  gap: 80px;
  align-items: start;
}

.kp-faq-refresh h2 {
  margin: 0;
  max-width: 420px;
  color: #0B2545;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(30px, 3vw, 40px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.kp-faq-refresh-items {
  border-top: 1px solid #E7EDF0;
}

.kp-faq-item {
  border-bottom: 1px solid #E7EDF0;
}

.kp-faq-trigger {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  min-height: 72px;
  padding: 22px 8px 22px 0;
  background: transparent;
  border: 0;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.005em;
  text-align: left;
  cursor: pointer;
  transition: color .2s ease, padding .25s ease;
}

.kp-faq-trigger svg {
  flex-shrink: 0;
  color: #708697;
  transition: transform .25s ease, color .2s ease;
}

.kp-faq-trigger:hover {
  color: #0A8A80;
}

.kp-faq-item.is-open .kp-faq-trigger {
  color: #0A8A80;
  padding-bottom: 10px;
}

.kp-faq-item.is-open .kp-faq-trigger svg {
  transform: rotate(45deg);
  color: #0A8A80;
}

.kp-faq-answer {
  overflow: hidden;
  max-height: 0;
  transition: max-height .3s ease;
}

.kp-faq-item.is-open .kp-faq-answer {
  max-height: 400px;
}

.kp-faq-answer p {
  margin: 0;
  max-width: 720px;
  padding: 0 48px 24px 0;
  color: #506479;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  font-weight: 400;
}

/* ============ Final CTA ============ */
.kp-final-refresh-wrap {
  padding: 0 0 96px;
  background: #fff;
}

.kp-final-refresh {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 280px;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(
      ellipse at 85% 45%,
      rgba(15, 181, 168, .18),
      transparent 55%
    ),
    linear-gradient(120deg, #F0FBF8, #E4F5F1 100%);
  box-shadow: 0 24px 60px -30px rgba(11, 37, 69, .15);
}

.kp-final-refresh-copy {
  position: relative;
  z-index: 2;
  padding: 56px 48px;
  max-width: 62%;
}

.kp-final-refresh-copy h2 {
  margin: 0 0 14px;
  color: #0B2545;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(30px, 3.2vw, 46px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.kp-final-refresh-copy h2 span {
  color: #0FB5A8;
}

.kp-final-refresh-copy p {
  margin: 0 0 32px;
  color: #011522;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  max-width: 640px;
  font-weight: 400;
}

.kp-final-refresh-copy .kp-button {
  min-height: 52px;
  padding: 15px 28px;
  border-radius: 12px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  gap: 12px;
}

.kp-final-refresh-photo {
  position: absolute;
  top: 0;
  right: 0;
  width: 44%;
  height: 100%;
  overflow: hidden;
  opacity: .96;
  mask-image: linear-gradient(90deg, transparent 0%, #000 34%);
}

.kp-final-refresh-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(240, 251, 248, .96),
    rgba(228, 245, 241, .06)
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
  font-family: 'DM Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.45;
  border: 1px solid transparent;
  transition: transform .2s, background .2s, box-shadow .2s;
  text-decoration: none;
}

.kp-button-primary {
  background: linear-gradient(135deg, #0FB5A8, #0A8A80);
  color: #fff;
  box-shadow: 0 8px 20px rgba(15, 181, 168, .22), inset 0 1px 0 rgba(255, 255, 255, .28);
}

.kp-button-primary:hover {
  background: linear-gradient(135deg, #0A8A80, #076E66);
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(15, 181, 168, .28), inset 0 1px 0 rgba(255, 255, 255, .28);
}

/* ============ Responsive ============ */
@media (max-width: 1100px) {
  .kp-faq-container { width: min(1200px, calc(100% - 48px)); }

  .kp-faq-refresh-grid { gap: 56px; }
}

@media (max-width: 750px) {
  .kp-faq-refresh { padding: 72px 0 72px; }

  .kp-faq-refresh-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .kp-faq-refresh h2 {
    max-width: none;
  }

  .kp-final-refresh-photo {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .kp-faq-container { width: calc(100% - 36px); }

  .kp-faq-refresh {
    padding: 56px 0 56px;
  }

  .kp-faq-refresh h2 {
    font-size: 28px;
  }

  .kp-faq-trigger {
    min-height: 64px;
    font-size: 15px;
    padding: 18px 8px 18px 0;
  }

  .kp-faq-answer p {
    font-size: 14px;
    padding-bottom: 22px;
  }

  .kp-final-refresh-wrap { padding-bottom: 56px; }

  .kp-final-refresh {
    min-height: 340px;
    border-radius: 22px;
  }

  .kp-final-refresh-copy {
    max-width: 100%;
    padding: 36px 26px;
  }

  .kp-final-refresh-copy h2 {
    font-size: 30px;
  }

  .kp-final-refresh-copy p {
    font-size: 15px;
    margin-bottom: 24px;
  }

  .kp-final-refresh-photo {
    width: 100%;
    opacity: .16;
    mask-image: none;
  }

  .kp-final-refresh-photo::after {
    background: linear-gradient(
      180deg,
      rgba(240, 251, 248, .96) 30%,
      rgba(228, 245, 241, .06)
    );
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