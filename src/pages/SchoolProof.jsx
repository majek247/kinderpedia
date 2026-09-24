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

function SchoolStories() {
  const stories = [
    {
      name: 'Maple Bear',
      logo: KP_CARD_ASSETS.mapleBear,
      image: KP_CARD_ASSETS.classroom,
      position: '35% center',
      title: 'A strong foundation for lifelong learning.',
      href: `${OFFICIAL}/en/case-studies/maple-bear-case-study`,
    },
    {
      name: 'Helikon School',
      logo: KP_CARD_ASSETS.helikon,
      image: KP_CARD_ASSETS.classroom,
      position: '85% center',
      title: 'A more connected school community.',
      href: `${OFFICIAL}/en/case-studies/helikon-school`,
    },
    {
      name: 'Just4Kids',
      logo: KP_CARD_ASSETS.just4kids,
      image: KP_CARD_ASSETS.classroom,
      position: '55% center',
      title: 'Simpler communication. Happier families.',
      href: `${OFFICIAL}/en/case-studies/just4kids-school`,
    },
  ]

  return (
    <section
      className="kp-school-proof"
      id="kp-stories"
      aria-labelledby="kp-school-proof-title"
    >
      <div className="kp-proof-container">
        <h2 id="kp-school-proof-title">
          Real schools. More connected communities.
        </h2>

        <div className="kp-school-proof-grid">
          {stories.map(story => (
            <a
              key={story.name}
              className="kp-school-proof-card"
              href={story.href}
              aria-label={`Read the ${story.name} story`}
            >
              <div className="kp-school-proof-photo">
                <img
                  src={story.image}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: story.position }}
                />
              </div>

              <div className="kp-school-proof-copy">
                <div className="kp-school-proof-brand">
                  <img src={story.logo} alt="" loading="lazy" />
                  <span>{story.name}</span>
                </div>

                <h3>{story.title}</h3>

                <span className="kp-school-proof-link">
                  Read their story
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <CaseStudy />

        <div className="kp-tools-strip">
          <div className="kp-tools-copy">
            <h3>Works with the tools you already use.</h3>
            <p>Seamless integrations to keep your school connected.</p>
          </div>

          <ul className="kp-tools-brands" aria-label="Integrations">
            <li>
              <span className="kp-tools-zoom">zoom</span>
            </li>

            <li>
              <span className="kp-tools-stripe">stripe</span>
            </li>

            <li>
              <span className="kp-tools-openapply">
                <svg
                  width="23"
                  height="25"
                  viewBox="0 0 24 26"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2 3.5 7v11L9 21.5v-7L6.8 13V9L12 6l5.2 3v5L12 17v7l8.5-5V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                OpenApply
              </span>
            </li>

            <li>
              <span className="kp-tools-wonde">
                <span className="kp-tools-wonde-mark" aria-hidden="true">
                  <ShieldCheck size={23} strokeWidth={2.4} />
                </span>
                wonde
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Onboarding() {
  const steps = [
    ['Discover', 'We learn about your school’s needs and goals.'],
    ['Customise', 'We tailor Kinderpedia to your processes.'],
    ['Connect', 'We help you migrate data and onboard your team.'],
    ['Grow', 'You’re ready to go, with ongoing support.'],
  ]

  return (
    <section
      className="kp-start-path"
      aria-labelledby="kp-start-path-title"
    >
      <div className="kp-proof-container">
        <h2 id="kp-start-path-title">
          A clear path from first demo to first school day.
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
      text: 'Keep data in the right hands.',
      tone: 'teal',
    },
    {
      icon: LockKeyhole,
      title: 'Secure payments',
      text: 'Payments processed through Stripe.',
      tone: 'blue',
    },
    {
      icon: Users,
      title: 'Private profiles',
      text: 'Access for the people who need it.',
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
              <Icon size={28} strokeWidth={1.7} aria-hidden="true" />

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
      <SchoolStories />
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
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

.kp-proof-container {
  width: min(1200px, calc(100% - 80px));
  margin-inline: auto;
}

/* ============ School stories ============ */
.kp-school-proof {
  padding: 28px 0 0;
  scroll-margin-top: 95px;
  color: #11233e;
  background: linear-gradient(180deg, #fff, #fcfefe);
}

.kp-school-proof h2 {
  margin: 0 0 20px;
  color: #11233e;
  font-size: clamp(25px, 2.5vw, 35px);
  line-height: 1.2;
  letter-spacing: -.95px;
  font-weight: 750;
}

.kp-school-proof-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.kp-school-proof-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.03fr);
  min-height: 156px;
  overflow: hidden;
  border: 1px solid #e5eeee;
  border-radius: 13px;
  background: linear-gradient(125deg, #fff, #f8fdfc);
  color: #11233e;
  text-decoration: none;
  box-shadow:
    0 3px 8px rgba(32, 86, 83, .06),
    0 1px 2px rgba(32, 86, 83, .025);
  transition:
    transform .2s ease,
    box-shadow .2s ease,
    border-color .2s ease;
}

.kp-school-proof-card:hover {
  transform: translateY(-3px);
  border-color: #bbded7;
  box-shadow: 0 10px 23px rgba(32, 86, 83, .1);
}

.kp-school-proof-card:focus-visible {
  outline: 3px solid #10a49b;
  outline-offset: 4px;
}

.kp-school-proof-photo {
  position: relative;
  min-width: 0;
  min-height: 156px;
  overflow: hidden;
  background: #e6f2ed;
}

.kp-school-proof-photo img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .35s ease;
}

.kp-school-proof-card:hover .kp-school-proof-photo img {
  transform: scale(1.04);
}

.kp-school-proof-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  padding: 15px 13px 12px;
}

.kp-school-proof-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 31px;
  margin-bottom: 10px;
}

.kp-school-proof-brand img {
  display: block;
  width: 29px;
  height: 31px;
  object-fit: contain;
  flex-shrink: 0;
}

.kp-school-proof-brand > span {
  font-size: 10px;
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -.15px;
}

.kp-school-proof-copy h3 {
  margin: 0 0 12px;
  color: #11233e;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.45;
  letter-spacing: -.25px;
}

.kp-school-proof-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  color: #269b96;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
}

.kp-school-proof-link svg {
  flex-shrink: 0;
  transition: transform .2s ease;
}

.kp-school-proof-card:hover .kp-school-proof-link svg {
  transform: translateX(3px);
}

/* ============ Integrations row ============ */
.kp-tools-strip {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(0, 1.35fr);
  align-items: center;
  gap: 30px;
  margin-top: 26px;
  padding-bottom: 23px;
  border-bottom: 1px solid #e5eeee;
}

.kp-tools-copy h3 {
  margin: 0 0 6px;
  color: #172c44;
  font-size: 17px;
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -.45px;
}

.kp-tools-copy p {
  margin: 0;
  color: #738796;
  font-size: 12px;
  line-height: 1.55;
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
  min-height: 30px;
}

.kp-tools-brands > li + li {
  border-left: 1px solid #dce5eb;
}

.kp-tools-zoom {
  font-family: Arial, sans-serif;
  font-size: 29px;
  font-weight: 600;
  letter-spacing: -1.7px;
  line-height: 1;
  color: #2d8cff;
}

.kp-tools-stripe {
  font-family: Arial, sans-serif;
  font-size: 27px;
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
  gap: 5px;
  white-space: nowrap;
  line-height: 1;
}

.kp-tools-openapply {
  color: #008b85;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -.7px;
}

.kp-tools-openapply svg { flex-shrink: 0; }

.kp-tools-wonde {
  color: #1d214a;
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -.9px;
}

.kp-tools-wonde-mark {
  display: inline-flex;
  color: #286bff;
}

/* ============ Four-step onboarding ============ */
.kp-start-path {
  padding: 20px 0 25px;
  background: #fcfefe;
  color: #11233e;
}

.kp-start-path h2 {
  margin: 0 0 23px;
  font-size: 21px;
  font-weight: 750;
  letter-spacing: -.55px;
  line-height: 1.3;
  color: #11233e;
}

.kp-start-path-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 35px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.kp-start-path-step {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
}

.kp-start-path-step:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -22px;
  top: 17px;
  width: 10px;
  height: 2px;
  border-radius: 2px;
  background: #dea8be;
}

.kp-start-path-number {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #ff72ae, #ff428f);
  box-shadow:
    inset 0 1px 1px #ffffff66,
    0 3px 8px #fa498d12;
  font-size: 16px;
  font-weight: 650;
}

.kp-start-path-step h3 {
  margin: 4px 0 7px;
  color: #17304b;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.3;
}

.kp-start-path-step p {
  margin: 0;
  color: #6d8292;
  font-size: 12px;
  line-height: 1.6;
  max-width: 185px;
}

/* ============ Privacy strip ============ */
.kp-privacy-strip {
  padding: 20px 0 29px;
  background: linear-gradient(180deg, #fcfefe, #f6fcfa);
}

.kp-privacy-strip-inner {
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(0, 1.35fr);
  align-items: center;
  gap: 28px;
}

.kp-privacy-strip h2 {
  margin: 0;
  color: #17424d;
  font-size: 19px;
  font-weight: 550;
  line-height: 1.4;
  letter-spacing: -.5px;
}

.kp-privacy-strip h2 > span { color: #19a49b; }

.kp-privacy-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kp-privacy-item {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 3px 15px;
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
  margin: 0 0 5px;
  color: #354e63;
  font-size: 10px;
  font-weight: 750;
  line-height: 1.3;
}

.kp-privacy-item p {
  margin: 0;
  color: #78909d;
  font-size: 8px;
  line-height: 1.5;
}

/* ============ Tablet ============ */
@media (max-width: 1100px) {
  .kp-proof-container { width: calc(100% - 48px); }

  .kp-school-proof-grid { gap: 14px; }

  .kp-school-proof-card {
    grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  }

  .kp-school-proof-copy { padding: 12px 10px; }
  .kp-school-proof-copy h3 { font-size: 12px; }

  .kp-school-proof-brand { gap: 5px; }

  .kp-school-proof-brand img {
    width: 25px;
    height: 28px;
  }

  .kp-tools-strip { gap: 20px; }
  .kp-tools-brands > li { padding-inline: 10px; }
  .kp-tools-openapply { font-size: 14px; }
  .kp-tools-wonde { font-size: 20px; }

  .kp-start-path-grid { gap: 25px; }
  .kp-start-path-step { gap: 9px; }

  .kp-start-path-step:not(:last-child)::after {
    right: -17px;
    width: 8px;
  }

  .kp-privacy-strip-inner {
    gap: 18px;
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.3fr);
  }

  .kp-privacy-item {
    gap: 7px;
    padding-inline: 10px;
  }
}

/* ============ Mobile-ish ============ */
@media (max-width: 850px) {
  .kp-school-proof-card {
    grid-template-columns: minmax(0, 1fr);
  }

  .kp-school-proof-photo { min-height: 140px; }

  .kp-school-proof-copy { padding: 15px; }
  .kp-school-proof-copy h3 { font-size: 13px; }

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
    gap: 24px 40px;
  }

  .kp-start-path-step::after { display: none; }
  .kp-start-path-step p { max-width: 240px; }

  .kp-privacy-strip-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .kp-privacy-item:first-child { padding-left: 0; }
  .kp-privacy-item h3 { font-size: 11px; }
  .kp-privacy-item p { font-size: 9px; }
}

/* ============ Phone ============ */
@media (max-width: 600px) {
  .kp-proof-container { width: calc(100% - 36px); }

  .kp-school-proof { padding-top: 24px; }

  .kp-school-proof h2 {
    font-size: 27px;
    line-height: 1.2;
  }

  .kp-school-proof-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .kp-school-proof-card {
    grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
    min-height: 155px;
  }

  .kp-school-proof-photo { min-height: 155px; }
  .kp-school-proof-brand > span { font-size: 11px; }
  .kp-school-proof-copy h3 { font-size: 14px; }
  .kp-school-proof-link { font-size: 11px; }

  .kp-tools-copy h3 { font-size: 17px; }

  .kp-tools-brands {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 22px;
  }

  .kp-tools-brands > li {
    justify-content: center;
    min-height: 32px;
  }

  .kp-tools-brands > li:first-child {
    justify-content: center;
    padding-left: 10px;
  }

  .kp-tools-brands > li:nth-child(3) { border-left: 0; }
  .kp-tools-openapply { font-size: 17px; }
  .kp-tools-wonde { font-size: 23px; }

  .kp-start-path {
    padding-top: 23px;
    padding-bottom: 17px;
  }

  .kp-start-path h2 {
    font-size: 21px;
    line-height: 1.35;
  }

  .kp-start-path-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .kp-start-path-step {
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 13px;
  }

  .kp-start-path-step h3 { font-size: 14px; }
  .kp-start-path-step p {
    max-width: none;
    font-size: 12px;
  }

  .kp-privacy-strip { padding-top: 19px; }

  .kp-privacy-strip h2 {
    font-size: 21px;
    max-width: 320px;
  }

  .kp-privacy-items {
    grid-template-columns: minmax(0, 1fr);
    gap: 15px;
  }

  .kp-privacy-item {
    padding: 0;
    gap: 13px;
  }

  .kp-privacy-item + .kp-privacy-item { border-left: 0; }

  .kp-privacy-item h3 {
    font-size: 12px;
    margin-bottom: 3px;
  }

  .kp-privacy-item p { font-size: 10px; }
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