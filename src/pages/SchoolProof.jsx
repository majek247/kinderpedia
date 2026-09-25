import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Users,
} from 'lucide-react'
import CaseStudy from './CaseStudy'

const OFFICIAL = 'https://www.kinderpedia.co'

const KP_CARD_ASSETS = {
  mapleBear: '/images/maple-bear-logo.png',
  helikon: '/images/helikon-logo.png',
  just4kids: '/images/just4kids-logo.png',
  classroom: '/images/classroom-activity.png',
}

function Action({ children = 'Book a free demo', to = '/demo', className = '' }) {
  const classes = `kp-button kp-button-primary ${className}`
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>
  return /^https?:/.test(to)
    ? <a className={classes} href={to}>{content}</a>
    : <Link className={classes} to={to}>{content}</Link>
}

function Onboarding() {
  const steps = [
    ['Discover', 'We review your campuses, roles, workflows and the systems your school already uses today.'],
    ['Customise', 'Set up classes, permissions, academic structures, billing and communication workflows.'],
    ['Connect', 'Bring student, staff and school records into Kinderpedia and prepare your team for launch.'],
    ['Grow', 'Roll Kinderpedia out across your school with onboarding and ongoing guidance for your team.'],
  ]

  return (
    <section
      className="kp-start-path"
      aria-labelledby="kp-start-path-title"
    >
      <div className="kp-proof-container">
        <h2 id="kp-start-path-title">
   Move Your School Onto Kinderpedia With a Clear Rollout Plan.
        </h2>

        <ol className="kp-start-path-grid">
          {steps.map(([title, text], index) => (
            <li className="kp-start-path-step" key={title}>
              <span className="kp-start-path-number">
                {index + 1}
              </span>

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function DataCare() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Role-based access',
      text: 'Control what leaders, teachers, staff and families can see and manage.',
      tone: 'teal',
    },
    {
      icon: LockKeyhole,
      title: 'Secure payments',
      text: 'Handle school payments through secure payment infrastructure.',
      tone: 'blue',
    },
    {
      icon: Users,
      title: 'Private student records',
      text: 'Keep personal, academic and family information accessible only to authorised users.',
      tone: 'green',
    },
  ]

  return (
    <section
      className="kp-privacy-strip"
      aria-labelledby="kp-privacy-strip-title"
    >
      <div className="kp-proof-container kp-privacy-strip-inner">
        <h2 id="kp-privacy-strip-title">
          <span>Privacy</span> built into everyday school <span>life.</span>
        </h2>

        <div className="kp-privacy-items">
          {items.map(({ icon: Icon, title, text, tone }) => (
            <div
              key={title}
              className={`kp-privacy-item is-${tone}`}
            >
              <Icon size={32} strokeWidth={1.7} aria-hidden="true" />

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SchoolProof({ demoTo = '/demo' }) {
  return (
    <div className="kp-school-proof-wrap">
      <style>{styles}</style>
      <CaseStudy />
      <Onboarding demoTo={demoTo} />
      <DataCare />
    </div>
  )
}

const styles = `
/* ============ School proof wrapper ============ */
.kp-school-proof-wrap {
  color: #11233e;
  background: #fff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
}

.kp-school-proof-wrap *,
.kp-school-proof-wrap *::before,
.kp-school-proof-wrap *::after { box-sizing: border-box; }

.kp-school-proof-wrap :where(h2,h3,p,ul,ol) { margin: 0; }
.kp-school-proof-wrap :where(h2,h3) {
  color: inherit;
  font-family: inherit;
}
.kp-school-proof-wrap :where(a) { color: inherit; text-decoration: none; }
.kp-school-proof-wrap :where(svg) { flex-shrink: 0; }

/* MATCHES THE HERO WIDTH EXACTLY */
.kp-proof-container {
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
}

/* ============ Integrations row ============ */
.kp-tools-strip {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(0, 1.35fr);
  align-items: center;
  gap: 40px;
  margin-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e5eeee;
}

.kp-tools-copy h3 {
  margin: 0 0 8px;
  color: #172c44;
  font-size: 18px;
  font-weight: 750;
  line-height: 1.3;
  letter-spacing: -.45px;
}

.kp-tools-copy p {
  margin: 0;
  color: #738796;
  font-size: 14px;
  line-height: 1.6;
}

.kp-tools-brands {
  display: grid;
  grid-template-columns: .9fr .85fr 1.15fr 1fr;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.kp-tools-brands > li {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  padding: 0 15px;
  min-height: 36px;
}

.kp-tools-brands > li + li {
  border-left: 1px solid #dce5eb;
}

.kp-tools-zoom {
  font-family: Arial, sans-serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -1.7px;
  line-height: 1;
  color: #2d8cff;
}

.kp-tools-stripe {
  font-family: Arial, sans-serif;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -1.3px;
  line-height: 1;
  color: #17143b;
}

.kp-tools-openapply,
.kp-tools-wonde {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  line-height: 1;
}

.kp-tools-openapply {
  color: #008b85;
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -.7px;
}

.kp-tools-openapply svg { flex-shrink: 0; }

.kp-tools-wonde {
  color: #1d214a;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -.9px;
}

.kp-tools-wonde-mark {
  display: inline-flex;
  color: #286bff;
}

/* ============ Four-step onboarding ============ */
.kp-start-path {
  padding: 50px 0 60px;
  background: #fcfefe;
  color: #11233e;
}

.kp-start-path h2 {
  margin: 0 0 40px;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: #11233e;
}

.kp-start-path-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.kp-start-path-step {
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: start;
  gap: 16px;
}

.kp-start-path-step:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -26px;
  top: 20px;
  width: 12px;
  height: 3px;
  border-radius: 3px;
  background: #dea8be;
}

.kp-start-path-number {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #ff72ae, #ff428f);
  box-shadow:
    inset 0 1px 2px #ffffff66,
    0 4px 10px #fa498d20;
  font-size: 18px;
  font-weight: 750;
}

.kp-start-path-step h3 {
  margin: 5px 0 8px;
  color: #17304b;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.kp-start-path-step p {
  margin: 0;
  color: #011522;
  font-size: 14px;
  line-height: 1.6;
  max-width: 300px;
}

/* ============ Privacy strip ============ */
.kp-privacy-strip {
  padding: 50px 0 70px;
  background: linear-gradient(180deg, #fcfefe, #f6fcfa);
}

.kp-privacy-strip-inner {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.4fr);
  align-items: center;
  gap: 40px;
}

.kp-privacy-strip h2 {
  margin: 0;
  color: #17424d;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
}


.kp-privacy-strip h2 > span { color: #19a49b; }

.kp-privacy-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kp-privacy-item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 4px 20px;
}

.kp-privacy-item + .kp-privacy-item {
  border-left: 1px solid #d6e3e5;
}

.kp-privacy-item > svg {
  flex-shrink: 0;
  color: #24a5a4;
}

.kp-privacy-item.is-blue > svg { color: #76afbe; }
.kp-privacy-item.is-green > svg { color: #20bd80; }

.kp-privacy-item h3 {
  margin: 0 0 6px;
  color: #354e63;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.3;
}

.kp-privacy-item p {
  margin: 0;
  color: #011522;
  font-size: 12px;
  line-height: 1.5;
}

/* ============ Tablet ============ */
@media (max-width: 1100px) {
  .kp-proof-container { width: calc(100% - 48px); }

  .kp-tools-strip { gap: 20px; }
  .kp-tools-brands > li { padding-inline: 10px; }
  .kp-tools-openapply { font-size: 16px; }
  .kp-tools-wonde { font-size: 22px; }

  .kp-start-path-grid { gap: 25px; }
  .kp-start-path-step { gap: 10px; }

  .kp-start-path-step:not(:last-child)::after {
    right: -17px;
    width: 8px;
  }

  .kp-privacy-strip-inner {
    gap: 20px;
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.3fr);
  }

  .kp-privacy-item {
    gap: 8px;
    padding-inline: 12px;
  }
}

/* ============ Mobile-ish ============ */
@media (max-width: 850px) {
  .kp-tools-strip {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .kp-tools-brands {
    max-width: 630px;
    width: 100%;
  }

  .kp-tools-brands > li:first-child {
    justify-content: flex-start;
    padding-left: 0;
  }

  .kp-start-path-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px 45px;
  }

  .kp-start-path-step::after { display: none; }
  .kp-start-path-step p { max-width: none; }

  .kp-privacy-strip-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .kp-privacy-item:first-child { padding-left: 0; }
}

/* ============ Phone ============ */
@media (max-width: 600px) {
  .kp-proof-container { width: calc(100% - 36px); }

  .kp-start-path { padding-top: 30px; padding-bottom: 40px; }

  .kp-start-path h2 { font-size: 24px; }

  .kp-start-path-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .kp-start-path-step {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 15px;
  }

  .kp-start-path-step h3 { font-family: 'Fredoka', system-ui, sans-serif; font-size: 17px; font-weight: 600; }
  .kp-start-path-step p { max-width: none; font-size: 13px; }

  .kp-privacy-strip { padding-top: 35px; padding-bottom: 45px; }

  .kp-privacy-strip h2 {
    font-family: 'Fredoka', system-ui, sans-serif;
    font-size: 24px;
    font-weight: 600;
    max-width: 340px;
  }

  .kp-privacy-items {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .kp-privacy-item {
    padding: 0;
    gap: 14px;
  }

  .kp-privacy-item + .kp-privacy-item { border-left: 0; }

  .kp-privacy-item h3 {
    font-size: 14px;
    margin-bottom: 3px;
  }

  .kp-privacy-item p { font-size: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .kp-school-proof-wrap *,
  .kp-school-proof-wrap *::before,
  .kp-school-proof-wrap *::after {
    animation: none !important;
    transition: none !important;
  }
}
`