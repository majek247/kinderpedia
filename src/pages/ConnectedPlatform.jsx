import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ContactRound,
  CalendarDays,
  MessageCircle,
  CreditCard,
  BarChart3,
  MapPin,
} from 'lucide-react'

const KP_CARD_ASSETS = {
  emma: '/images/student-emma.png',
  lucas: '/images/student-lucas.png',
  sofia: '/images/student-sofia.png',
  teacher: '/images/teacher-avatar.png',
  classroom: '/images/classroom-activity.png',
}

function Action({ children = 'Book a free demo', to = '/demo', className = '' }) {
  const classes = `kp-button kp-button-primary ${className}`
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>
  return /^https?:/.test(to)
    ? <a className={classes} href={to}>{content}</a>
    : <Link className={classes} to={to}>{content}</Link>
}

function CardAvatar({ src, name, large = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className={`kp-connected-avatar${large ? ' is-large' : ''}`}
      aria-label={name}
      role="img"
    >
      {failed ? (
        name.split(' ').map(word => word[0]).slice(0, 2).join('')
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}

function ConnectedCard({
  title,
  description,
  icon: Icon,
  tone = 'pink',
  tinted = false,
  demoTo,
  children,
}) {
  return (
    <article
      className={`kp-connected-card is-${tone}${tinted ? ' is-tinted' : ''}`}
    >
      <div className="kp-connected-card-head">
        <span className="kp-connected-icon">
          <Icon size={25} strokeWidth={1.65} aria-hidden="true" />
        </span>

        <div className="kp-connected-card-copy">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <Action
          to={demoTo}
          className="kp-connected-card-link"
        >
          <span className="kp-connected-sr">
            Explore {title.toLowerCase()}
          </span>
        </Action>
      </div>

      <div
        className="kp-connected-preview"
        role="img"
        aria-label={`${title}: illustrative interface with sample data`}
      >
        {children}
      </div>
    </article>
  )
}

export default function ConnectedPlatform({ demoTo = '/demo' }) {
  const students = [
    { name: 'Emma Popescu', year: 'Year 2', image: KP_CARD_ASSETS.emma },
    { name: 'Lucas Martin', year: 'Year 1', image: KP_CARD_ASSETS.lucas },
    { name: 'Sofia Ionescu', year: 'Reception', image: KP_CARD_ASSETS.sofia },
  ]

  const campuses = [
    ['Main Campus', '482 students', 'Online'],
    ['Riverside Campus', '320 students', 'Online'],
    ['City Campus', '210 students', 'Attention'],
    ['West Campus', '180 students', 'Online'],
  ]

  return (
    <section
      className="kp-connected-platform"
      id="kp-platform"
      aria-labelledby="kp-platform-title"
    >
      <style>{styles}</style>

      <div className="kp-connected-container">
        <div className="kp-connected-heading">
          <h2 id="kp-platform-title">
            Every part of your school. <span>Connected.</span>
          </h2>
          <p>
            One shared platform for school operations, learning and
            family communication.
          </p>
        </div>

        <div className="kp-connected-grid">
          <ConnectedCard
            title="School administration"
            description="Keep student records, enrolments and daily operations in one place."
            icon={ContactRound}
            tone="teal"
            demoTo={demoTo}
          >
            <div className="kp-connected-student-tabs">
              <span className="is-selected">Students</span>
              <span>Enrolments</span>
              <span>Staff</span>
            </div>

            <div className="kp-connected-students">
              {students.map(student => (
                <div className="kp-connected-student" key={student.name}>
                  <CardAvatar src={student.image} name={student.name} />
                  <span className="kp-connected-student-name">{student.name}</span>
                  <span className="kp-connected-year">{student.year}</span>
                  <span className="kp-connected-badge">Active</span>
                </div>
              ))}
            </div>
          </ConnectedCard>

          <ConnectedCard
            title="Classroom management"
            description="Plan lessons, track attendance and keep learning on track."
            icon={CalendarDays}
            tinted
            demoTo={demoTo}
          >
            <div className="kp-connected-timetable">
              <div className="kp-connected-timetable-row is-days">
                <span />
                <span>Mon 12</span>
                <span>Tue 13</span>
                <span>Wed 14</span>
              </div>

              <div className="kp-connected-timetable-row">
                <span className="kp-connected-time">08:30</span>
                <div><strong>English</strong><span>Year 2</span></div>
                <div><strong>Mathematics</strong><span>Year 4</span></div>
                <div><strong>Science</strong><span>Year 5</span></div>
              </div>

              <div className="kp-connected-timetable-row">
                <span className="kp-connected-time">10:00</span>
                <div><strong>Art</strong><span>Year 1</span></div>
                <div><strong>PE</strong><span>Year 3</span></div>
                <div><strong>English</strong><span>Year 2</span></div>
              </div>
            </div>
          </ConnectedCard>

          <ConnectedCard
            title="Family communication"
            description="Share updates, messages and moments with families."
            icon={MessageCircle}
            demoTo={demoTo}
          >
            <div className="kp-connected-message">
              <CardAvatar src={KP_CARD_ASSETS.teacher} name="Emma Wilson" />

              <div className="kp-connected-message-body">
                <div className="kp-connected-bubble">
                  <p>
                    Today’s class was amazing! The children loved
                    the science experiment. <span>♥</span>
                  </p>
                  <time>10:24</time>
                </div>

                <div className="kp-connected-gallery">
                  <div
                    className="kp-connected-photo"
                    style={{ backgroundImage: `url("${KP_CARD_ASSETS.classroom}")` }}
                  />
                  <div
                    className="kp-connected-photo is-more"
                    style={{ backgroundImage: `url("${KP_CARD_ASSETS.classroom}")` }}
                  >
                    <span>+3</span>
                  </div>
                </div>
              </div>
            </div>
          </ConnectedCard>

          <ConnectedCard
            title="Tuition & payments"
            description="Automate invoicing, payments and financial reporting."
            icon={CreditCard}
            demoTo={demoTo}
          >
            <div className="kp-connected-invoice">
              <div className="kp-connected-invoice-heading">
                <strong>Invoice #INV-2027-089</strong>
                <span className="kp-connected-badge"><i /> Paid</span>
              </div>

              <div className="kp-connected-invoice-line">
                <span>After school program</span>
                <span>€120.00</span>
              </div>

              <div className="kp-connected-invoice-line">
                <span>April tuition</span>
                <span>€420.00</span>
              </div>

              <div className="kp-connected-invoice-line is-total">
                <strong>Total</strong>
                <strong>€540.00</strong>
              </div>
            </div>
          </ConnectedCard>

          <ConnectedCard
            title="Progress monitoring"
            description="Track learning, milestones and development."
            icon={BarChart3}
            tone="blue"
            demoTo={demoTo}
          >
            <div className="kp-connected-progress">
              <CardAvatar src={KP_CARD_ASSETS.emma} name="Emma Popescu" large />

              <div className="kp-connected-progress-body">
                <strong className="kp-connected-progress-name">Emma Popescu</strong>
                <span className="kp-connected-progress-year">Year 2</span>

                {[
                  ['Reading', 'On track'],
                  ['Mathematics', 'On track'],
                  ['Social skills', 'Excellent'],
                  ['Creativity', 'On track'],
                ].map(([skill, status]) => (
                  <div className="kp-connected-skill" key={skill}>
                    <span className="kp-connected-skill-dot"><span /></span>
                    <span>{skill}</span>
                    <span
                      className={`kp-connected-badge${
                        status === 'Excellent' ? ' is-excellent' : ''
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ConnectedCard>

          <ConnectedCard
            title="Multi-campus oversight"
            description="Manage multiple campuses with a clear, real-time view."
            icon={MapPin}
            demoTo={demoTo}
          >
            <div className="kp-connected-campuses">
              {campuses.map(([name, count, status]) => (
                <div className="kp-connected-campus" key={name}>
                  <span>{name}</span>
                  <span>{count}</span>
                  <span
                    className={`kp-connected-badge${
                      status === 'Attention' ? ' is-attention' : ''
                    }`}
                  >
                    <i /> {status}
                  </span>
                </div>
              ))}
            </div>
          </ConnectedCard>
        </div>
      </div>
    </section>
  )
}

const styles = `
.kp-connected-platform {
  --connected-ink: #10213d;
  --connected-muted: #52677d;
  --connected-teal: #009e95;
  --connected-pink: #ff438f;
  --connected-blue: #0793be;
  color: var(--connected-ink);
  padding: 27px 0 38px;
  scroll-margin-top: 100px;
  background:
    radial-gradient(
      ellipse at 48% 100%,
      rgba(227, 248, 245, .38),
      transparent 65%
    ),
    #fff;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
}

.kp-connected-platform *,
.kp-connected-platform *::before,
.kp-connected-platform *::after { box-sizing: border-box; }

.kp-connected-platform :where(h2,h3,p,ul) { margin: 0; }
.kp-connected-platform :where(h2,h3) {
  color: var(--connected-ink);
  font-family: inherit;
}
.kp-connected-platform :where(a) { color: inherit; text-decoration: none; }
.kp-connected-platform :where(svg) { flex-shrink: 0; }

.kp-connected-container {
  width: min(1200px, calc(100% - 80px));
  margin-inline: auto;
}

.kp-connected-heading { margin-bottom: 27px; }

.kp-connected-heading h2 {
  color: var(--connected-ink);
  font-size: clamp(26px, 2.65vw, 37px);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -1.15px;
}

.kp-connected-heading h2 > span { color: #078b8b; }

.kp-connected-heading > p {
  margin-top: 10px;
  color: var(--connected-muted);
  font-size: 14px;
  line-height: 1.65;
}

.kp-connected-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

/* Cards */
.kp-connected-card {
  --card-accent: var(--connected-pink);
  --card-icon-bg: #fff0f6;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 19px 15px 15px;
  border: 1px solid #e5efef;
  border-radius: 15px;
  background: linear-gradient(145deg, #fff, #fcfefe);
  box-shadow:
    0 2px 5px rgba(25, 79, 80, .018),
    inset 0 1px 0 #fff;
}

.kp-connected-card.is-teal {
  --card-accent: var(--connected-teal);
  --card-icon-bg: #e6f8f4;
}

.kp-connected-card.is-blue {
  --card-accent: var(--connected-blue);
  --card-icon-bg: #e9f6fc;
}

.kp-connected-card.is-tinted {
  background:
    radial-gradient(
      ellipse at 80% 20%,
      rgba(255, 255, 255, .75),
      transparent 65%
    ),
    linear-gradient(135deg, #eaf8f5, #f0fbfa);
}

.kp-connected-card-head {
  display: grid;
  grid-template-columns: 43px minmax(0, 1fr) 25px;
  align-items: start;
  gap: 10px;
}

.kp-connected-icon {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border-radius: 12px;
  color: var(--card-accent);
  background: var(--card-icon-bg);
}

.kp-connected-card-copy h3 {
  margin: 6px 0 8px;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 750;
  letter-spacing: -.35px;
  color: var(--connected-ink);
}

.kp-connected-card-copy p {
  margin: 0;
  color: var(--connected-muted);
  font-size: 12px;
  line-height: 1.65;
}

.kp-connected-card .kp-connected-card-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  min-height: 38px;
  padding: 0;
  margin: 0;
  gap: 0;
  border: 0;
  background: transparent;
  color: var(--card-accent);
  box-shadow: none;
  border-radius: 7px;
  transition: background .2s, transform .2s;
}

.kp-connected-card .kp-connected-card-link:hover {
  background: var(--card-icon-bg);
  transform: translateX(2px);
}

.kp-connected-card .kp-connected-card-link:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 3px;
}

.kp-connected-card-link svg {
  width: 17px;
  height: 17px;
  stroke-width: 1.8;
}

.kp-connected-card.is-teal .kp-connected-card-link { color: #8e78ad; }

.kp-connected-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.kp-connected-preview {
  margin-top: auto;
  padding-top: 20px;
  min-width: 0;
  font-size: 10px;
  line-height: 1.4;
  color: #344b65;
}

/* Student records */
.kp-connected-student-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #f4f7f8;
  border-radius: 7px;
  margin-bottom: 9px;
}

.kp-connected-student-tabs > span {
  position: relative;
  padding: 10px 4px;
  text-align: center;
  font-size: 10px;
  color: #8290a0;
}

.kp-connected-student-tabs > .is-selected {
  color: #20394f;
  background: #fff;
  font-weight: 700;
  border-radius: 7px 7px 0 0;
}

.kp-connected-student-tabs > .is-selected::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 2px;
  border-radius: 2px;
  background: #169eb4;
}

.kp-connected-student {
  display: grid;
  grid-template-columns: 27px minmax(0, 1fr) 56px auto;
  gap: 7px;
  align-items: center;
  padding: 7px 5px;
}

.kp-connected-avatar {
  width: 27px;
  height: 27px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid white;
  border-radius: 50%;
  color: #437069;
  background: #e0f1ec;
  font-size: 9px;
  font-weight: 700;
  box-shadow: 0 1px 3px #173b3b12;
}

.kp-connected-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kp-connected-student-name { font-size: 10px; font-weight: 500; }
.kp-connected-year { font-size: 9px; }

.kp-connected-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  gap: 4px;
  white-space: nowrap;
  padding: 3px 6px;
  border-radius: 20px;
  background: #e0f7ed;
  color: #248768;
  font-size: 8px;
  font-weight: 600;
  line-height: 1.2;
}

.kp-connected-badge i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #23b875;
}

/* Timetable */
.kp-connected-timetable {
  padding: 7px 7px 10px;
  background: rgba(255, 255, 255, .86);
  border-radius: 10px;
}

.kp-connected-timetable-row {
  display: grid;
  grid-template-columns: 36px repeat(3, minmax(0, 1fr));
  gap: 7px;
  align-items: stretch;
  margin-top: 8px;
}

.kp-connected-timetable-row.is-days {
  margin: 0 0 12px;
  align-items: center;
  text-align: center;
  font-size: 9px;
  font-weight: 600;
}

.kp-connected-time { align-self: center; font-size: 9px; }

.kp-connected-timetable-row > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  min-height: 49px;
  padding: 7px;
  border-radius: 7px;
  background: linear-gradient(130deg, #e9f7ff, #e3f1fd);
}

.kp-connected-timetable-row strong {
  font-size: 8px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.kp-connected-timetable-row div > span {
  font-size: 8px;
  color: #66839b;
}

/* Message + gallery */
.kp-connected-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.kp-connected-message > .kp-connected-avatar {
  width: 33px;
  height: 33px;
}

.kp-connected-message-body { flex: 1; min-width: 0; }

.kp-connected-bubble {
  padding: 11px 12px 7px;
  border-radius: 0 10px 10px 10px;
  background: #f4f6f9;
}

.kp-connected-bubble p {
  margin: 0;
  font-size: 10px;
  line-height: 1.55;
}

.kp-connected-bubble p > span { color: #f45194; }

.kp-connected-bubble time {
  display: block;
  text-align: right;
  font-size: 8px;
  color: #9aa6b2;
  margin-top: 4px;
}

.kp-connected-gallery {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 7px;
  margin-top: 8px;
}

.kp-connected-photo {
  min-height: 75px;
  border-radius: 8px;
  background-color: #e6f1ee;
  background-size: cover;
  background-position: center;
}

.kp-connected-photo.is-more {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-position: 80% center;
}

.kp-connected-photo.is-more::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(27, 47, 56, .43);
}

.kp-connected-photo.is-more > span {
  position: relative;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}

/* Invoice */
.kp-connected-invoice {
  padding: 15px;
  border: 1px solid #eef3f4;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 4px 11px rgba(28, 65, 78, .055);
}

.kp-connected-invoice-heading,
.kp-connected-invoice-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.kp-connected-invoice-heading { margin-bottom: 16px; }

.kp-connected-invoice-heading > strong {
  font-size: 10px;
  font-weight: 750;
}

.kp-connected-invoice-line {
  margin-top: 13px;
  font-size: 11px;
}

.kp-connected-invoice-line.is-total {
  border-top: 1px solid #edf1f5;
  padding-top: 12px;
  color: #1b314e;
}

/* Progress */
.kp-connected-progress {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0 4px;
}

.kp-connected-avatar.is-large {
  width: 58px;
  height: 58px;
  font-size: 16px;
  border-width: 3px;
}

.kp-connected-progress-body { min-width: 0; flex: 1; }

.kp-connected-progress-name {
  display: block;
  font-size: 10px;
  color: #20344f;
  font-weight: 750;
}

.kp-connected-progress-year {
  display: block;
  font-size: 8px;
  color: #7d8da0;
  margin-top: 2px;
  margin-bottom: 8px;
}

.kp-connected-skill {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto;
  gap: 7px;
  align-items: center;
  padding: 7px 0;
  font-size: 10px;
}

.kp-connected-skill-dot {
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff2de;
}

.kp-connected-skill-dot > span {
  display: block;
  width: 6px;
  height: 8px;
  border-radius: 50% 50% 45% 45%;
  background: #f8b651;
  box-shadow: inset -2px -1px 0 #ed962b;
}

.kp-connected-badge.is-excellent {
  color: #1788b7;
  background: #e3f4ff;
}

/* Campuses */
.kp-connected-campuses {
  padding: 8px 12px;
  border: 1px solid #edf3f3;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 4px 11px rgba(28, 65, 78, .04);
}

.kp-connected-campus {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  font-size: 10px;
}

.kp-connected-campus > span:nth-child(2) {
  font-size: 9px;
  color: #687b90;
}

.kp-connected-badge.is-attention {
  color: #ed3f88;
  background: #ffe4f0;
}

.kp-connected-badge.is-attention i { background: #ff4591; }

/* Tablet */
@media (max-width: 1100px) {
  .kp-connected-container { width: calc(100% - 48px); }

  .kp-connected-grid { gap: 13px; }

  .kp-connected-card { padding: 16px 11px 12px; }

  .kp-connected-card-head {
    grid-template-columns: 35px minmax(0, 1fr) 22px;
    gap: 7px;
  }

  .kp-connected-icon {
    width: 35px;
    height: 35px;
    border-radius: 9px;
  }

  .kp-connected-card-copy h3 { font-size: 12px; }
  .kp-connected-card-copy p { font-size: 11px; }

  .kp-connected-student {
    gap: 5px;
    grid-template-columns: 24px minmax(0, 1fr) 45px auto;
  }

  .kp-connected-student-name,
  .kp-connected-year { font-size: 8px; }

  .kp-connected-campus { gap: 6px; font-size: 9px; }

  .kp-connected-progress { gap: 8px; }

  .kp-connected-avatar.is-large {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 850px) {
  .kp-connected-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .kp-connected-card { padding: 18px 14px 15px; }
  .kp-connected-card-copy h3 { font-size: 14px; }
  .kp-connected-preview { padding-top: 22px; }
}

/* Mobile */
@media (max-width: 600px) {
  .kp-connected-container { width: calc(100% - 36px); }

  .kp-connected-platform { padding-top: 15px; }

  .kp-connected-heading h2 {
    font-size: 29px;
    letter-spacing: -.9px;
  }

  .kp-connected-heading > p { font-size: 13px; }

  .kp-connected-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 15px;
  }

  .kp-connected-card { padding: 19px 17px 17px; }

  .kp-connected-card-head {
    grid-template-columns: 43px minmax(0, 1fr) 32px;
    gap: 10px;
  }

  .kp-connected-icon { width: 43px; height: 43px; }

  .kp-connected-card .kp-connected-card-link {
    width: 32px;
    min-height: 44px;
  }

  .kp-connected-card-copy h3 { font-size: 15px; }
  .kp-connected-card-copy p { font-size: 12px; }

  .kp-connected-student-name { font-size: 10px; }
  .kp-connected-year { font-size: 9px; }

  .kp-connected-student {
    grid-template-columns: 27px minmax(0, 1fr) 58px auto;
    gap: 8px;
  }

  .kp-connected-avatar.is-large {
    width: 58px;
    height: 58px;
  }

  .kp-connected-campus { font-size: 10px; gap: 9px; }
}

@media (prefers-reduced-motion: reduce) {
  .kp-connected-platform *,
  .kp-connected-platform *::before,
  .kp-connected-platform *::after {
    animation: none !important;
    transition: none !important;
  }
}
`