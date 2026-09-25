import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Users,
  ContactRound,
  BookOpen,
  MessageCircle,
  Sparkles,
  CalendarDays,
  Heart,
  LayoutDashboard,
  Menu,
  Check,
} from 'lucide-react'

const OFFICIAL = 'https://www.kinderpedia.co'

const KP_CARD_ASSETS = {
  emma: '/images/student-emma.png',
  teacher: '/images/teacher-avatar.png',
  classroom: '/images/classroom-activity.png',
  sofia: '/images/student-sofia.png',
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

const KP_PEOPLE_VIEWS = [
  {
    id: 'leaders',
    label: 'School Leaders',
    image: KP_CARD_ASSETS.classroom,
    alt: 'A teacher helping children with a classroom activity',
    position: 'center 40%',
    benefits: [
      [
        'See what is happening across the school',
        'Track enrolment, attendance, payments, staff activity and student progress from one place.',
      ],
      [
        'Reduce admin across your team',
        'Standardise everyday processes and give staff fewer systems, spreadsheets and manual tasks to manage.',
      ],
      [
        'Manage multiple campuses consistently',
        'Compare activity across locations, monitor key data and keep processes aligned across your education group.',
      ],
    ],
  },
  {
    id: 'teachers',
    label: 'Teachers',
    image: KP_CARD_ASSETS.teacher,
    alt: 'A teacher in a bright classroom',
    position: 'center 30%',
    benefits: [
      [
        'Plan and manage the school day',
        'Keep timetables, attendance, lessons, homework and classroom activity together in one workspace.',
      ],
      [
        'Record student progress as it happens',
        'Track assessments, observations and milestones without moving between separate tools or paper records.',
      ],
      [
        'Keep parents informed without extra admin',
        'Send updates and announcements directly from the same platform you use for classroom management.',
      ],
    ],
  },
  {
    id: 'families',
    label: 'Families',
    image: KP_CARD_ASSETS.emma,
    alt: 'A smiling student at school',
    position: 'center 30%',
    benefits: [
      [
        'Feel closer to their school day',
        'Follow classroom activity, announcements, events and important updates from one parent app.',
      ],
      [
        'Keep school communication in one place',
        'Find messages, documents and conversations without searching across email, WhatsApp and separate apps.',
      ],
      [
        'Follow your child’s progress',
        'See learning updates, assessments and milestones, and stay connected with teachers throughout the school year.',
      ],
    ],
  },
]

function PeopleDashboard({ view }) {
  return (
    <div className="kp-people-dashboard">
      <div className="kp-people-dashboard-top">
        <h3>
          {view === 'leaders'
            ? 'Campus overview'
            : view === 'teachers'
              ? 'Your classroom today'
              : 'Emma’s school day'}
        </h3>

        <span className="kp-people-filter">
          {view === 'leaders'
            ? 'All campuses'
            : view === 'teachers'
              ? 'Oak Class'
              : 'Today'}
          <span aria-hidden="true">⌄</span>
        </span>
      </div>

      {view === 'leaders' && (
        <>
          <div className="kp-people-metrics">
            <div>
              <Users />
              <span><strong>1,192</strong><small>Total students</small></span>
            </div>
            <div>
              <ContactRound />
              <span><strong>98</strong><small>Teaching staff</small></span>
            </div>
            <div>
              <Building2 />
              <span><strong>4</strong><small>Campuses</small></span>
            </div>
          </div>

          <div className="kp-people-table-wrap">
            <table className="kp-people-table">
              <thead>
                <tr>
                  <th>Campus</th>
                  <th>Students</th>
                  <th>Attendance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Main Campus', '482', '94%', 'Online'],
                  ['Riverside Campus', '320', '96%', 'Online'],
                  ['City Campus', '210', '91%', 'Attention'],
                  ['West Campus', '180', '95%', 'Online'],
                ].map(([name, students, attendance, status]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{students}</td>
                    <td>{attendance}</td>
                    <td>
                      <span
                        className={`kp-people-status ${
                          status === 'Attention' ? 'is-alert' : ''
                        }`}
                      >
                        <i />{status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'teachers' && (
        <>
          <div className="kp-people-metrics">
            <div>
              <Users />
              <span><strong>24</strong><small>Students</small></span>
            </div>
            <div>
              <BookOpen />
              <span><strong>5</strong><small>Lessons today</small></span>
            </div>
            <div>
              <MessageCircle />
              <span><strong>3</strong><small>Family updates</small></span>
            </div>
          </div>

          <div className="kp-people-lessons">
            {[
              ['08:30', 'Morning register', '24 students present', 'Complete'],
              ['09:00', 'Exploring our world', 'Science · Oak Class', 'Now'],
              ['10:30', 'Reading together', 'English · Oak Class', 'Next'],
            ].map(([time, title, detail, status]) => (
              <div className="kp-people-lesson" key={time}>
                <time>{time}</time>
                <div><strong>{title}</strong><span>{detail}</span></div>
                <span className={`kp-people-status ${status === 'Now' ? 'is-blue' : ''}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'families' && (
        <>
          <div className="kp-people-child">
            <CardAvatar src={KP_CARD_ASSETS.emma} name="Emma Popescu" />
            <div><strong>Emma Popescu</strong><span>Year 2 · Oak Class</span></div>
            <span className="kp-people-status"><i />At school</span>
          </div>

          <div className="kp-people-family-update">
            <span className="kp-people-update-icon"><Sparkles size={18} /></span>
            <div>
              <strong>A little discovery. A big smile.</strong>
              <p>
                Emma explored how plants grow and shared her
                observations with the class.
              </p>
            </div>
          </div>

          <div className="kp-people-family-bottom">
            <span><MessageCircle size={14} />2 new messages</span>
            <span><CalendarDays size={14} />Sports day · Friday</span>
          </div>
        </>
      )}

      <span className="kp-people-sample">Illustrative school data</span>
    </div>
  )
}

function ParentPhone({ messages = false }) {
  return (
    <div className={`kp-parent-phone ${messages ? 'is-messages' : 'is-updates'}`}>
      <div className="kp-parent-phone-screen">
        <div className="kp-parent-phone-notch" aria-hidden="true" />

        <div className="kp-parent-phone-status" aria-hidden="true">
          <strong>9:41</strong>
          <span>••• ▰</span>
        </div>

        <h3>{messages ? 'Messages' : 'Updates'}</h3>

        <div className="kp-parent-phone-tabs">
          <span className="is-current">{messages ? 'All' : 'All'}</span>
          <span>{messages ? 'Unread' : 'Moments'}</span>
          {!messages && <span>Announcements</span>}
        </div>

        {messages ? (
          <div className="kp-parent-inbox">
            {[
              ['AP', 'Ana Popescu', 'Thank you for the update!', '10:24', KP_CARD_ASSETS.teacher],
              ['MC', 'Math Class', 'Next week’s materials', '10:08', null],
              ['SA', 'School Announcements', 'Spring fair this Friday', '09:41', null],
              ['AI', 'Alexandra Ionescu', 'See you tomorrow!', '08:12', KP_CARD_ASSETS.sofia],
            ].map(([initials, name, text, time, image], index) => (
              <div className="kp-parent-inbox-row" key={name}>
                {image ? (
                  <CardAvatar src={image} name={name} />
                ) : (
                  <span className={`kp-parent-inbox-icon tone-${index}`}>
                    {initials}
                  </span>
                )}

                <div>
                  <strong>{name}</strong>
                  <p>{text}</p>
                </div>

                <time>{time}</time>
              </div>
            ))}
          </div>
        ) : (
          <div className="kp-parent-post">
            <div className="kp-parent-post-author">
              <CardAvatar src={KP_CARD_ASSETS.teacher} name="Emma Wilson" />
              <div><strong>Ms. Emma</strong><span>2 hours ago</span></div>
            </div>

            <img
              className="kp-parent-post-photo"
              src={KP_CARD_ASSETS.classroom}
              alt="Children exploring plants with their teacher"
              loading="lazy"
            />

            <h4>Exploring together</h4>
            <p>
              Today we discovered how plants grow.
              So many questions, ideas and little discoveries!
            </p>

            <div className="kp-parent-post-reactions">
              <span><Heart size={12} fill="currentColor" />12</span>
              <span><MessageCircle size={12} />3</span>
            </div>
          </div>
        )}

        <div className="kp-parent-phone-nav" aria-hidden="true">
          <span><LayoutDashboard /><small>Home</small></span>
          <span className={!messages ? 'is-current' : ''}>
            <Heart /><small>Updates</small>
          </span>
          <span className={messages ? 'is-current' : ''}>
            <MessageCircle /><small>Messages</small>
          </span>
          <span><Menu /><small>More</small></span>
        </div>
      </div>
    </div>
  )
}

export default function Community({ demoTo = '/demo' }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const uid = useId()
  const selected = KP_PEOPLE_VIEWS[active]

  function handleTabKey(event, index) {
    let next

    if (event.key === 'ArrowRight') {
      next = (index + 1) % KP_PEOPLE_VIEWS.length
    } else if (event.key === 'ArrowLeft') {
      next = (index - 1 + KP_PEOPLE_VIEWS.length) % KP_PEOPLE_VIEWS.length
    } else if (event.key === 'Home') {
      next = 0
    } else if (event.key === 'End') {
      next = KP_PEOPLE_VIEWS.length - 1
    } else {
      return
    }

    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      className="kp-people-section"
      id="kp-community"
      aria-labelledby={`${uid}-heading`}
    >
      <style>{styles}</style>

      <div className="kp-community-container">
        <div className="kp-people-stage">
          <div className="kp-people-intro">
                    <h2 id={`${uid}-heading`}>
              Built for School Leaders,
              <br />
              Teachers and Families.
            </h2>



            <div
              className="kp-people-tabs"
              role="tablist"
              aria-label="Explore Kinderpedia by role"
            >
              {KP_PEOPLE_VIEWS.map((role, index) => (
                <button
                  key={role.id}
                  ref={element => { tabRefs.current[index] = element }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${role.id}`}
                  aria-selected={active === index}
                  aria-controls={`${uid}-panel`}
                  tabIndex={active === index ? 0 : -1}
                  className={active === index ? 'is-active' : ''}
                  onClick={() => setActive(index)}
                  onKeyDown={event => handleTabKey(event, index)}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="kp-people-panel"
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${selected.id}`}
            tabIndex={0}
          >
            <div className="kp-people-benefits" key={`${selected.id}-copy`}>
              {selected.benefits.map(([title, text]) => (
                <div className="kp-people-benefit" key={title}>
                  <span className="kp-people-check">
                    <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                  </span>

                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`kp-people-visual is-${selected.id}`}>
              <img
                key={selected.image}
                className="kp-people-photo"
                src={selected.image}
                alt={selected.alt}
                style={{ objectPosition: selected.position }}
                loading="lazy"
              />

              <div
                className="kp-people-dashboard-wrap"
                key={`${selected.id}-dashboard`}
              >
                <PeopleDashboard view={selected.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="kp-parent-banner">
          <div
            className="kp-parent-phones"
            role="img"
            aria-label="Illustrative parent app showing classroom updates and messages"
          >
            <ParentPhone />
            <ParentPhone messages />
          </div>

          <div className="kp-parent-banner-copy">
            <h2>Everything Parents Need to Stay Connected to School.</h2>
            <p>
          Kinderpedia gives parents one place to see school updates, contact teachers and follow their child’s learning.
            </p>

            <div className="kp-parent-benefits">
              {[
                [ContactRound, 'Daily updates', 'Share classroom moments and important announcements.'],
                [MessageCircle, 'Direct communication', 'Message teachers and school staff securely.'],
                [Heart, 'Shared moments', 'Celebrate learning, achievements and everyday progress.'],
              ].map(([Icon, title, text]) => (
                <div className="kp-parent-benefit" key={title}>
                  <span><Icon size={20} strokeWidth={1.7} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>

            <Action to={demoTo} className="kp-parent-cta">
              Explore parent engagement
            </Action>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = `
/* ============ Community / People section ============ */
.kp-people-section {
  padding: 96px 0 112px;
  color: #0B2545;
  scroll-margin-top: 90px;
  background:
    radial-gradient(ellipse at 78% 22%, #E4F5F1 0%, transparent 55%),
    linear-gradient(180deg, #FAFEFD 0%, #F3FBF8 55%, #FFFFFF 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
}

.kp-people-section *,
.kp-people-section *::before,
.kp-people-section *::after { box-sizing: border-box; }

.kp-people-section :where(h2,h3,h4,p) { margin: 0; }
.kp-people-section :where(h2,h3,h4) {
  color: inherit;
  font-family: inherit;
}
.kp-people-section :where(a) { color: inherit; text-decoration: none; }
.kp-people-section :where(button) { font: inherit; cursor: pointer; color: inherit; }
.kp-people-section :where(svg) { flex-shrink: 0; }

.kp-community-container {
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
}

.kp-people-stage {
  position: relative;
  min-height: 460px;
}

.kp-people-intro {
  position: relative;
  z-index: 3;
  width: 46%;
  padding: 0;
}

.kp-people-intro h2 {
  margin: 0;
  color: #0B2545;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(30px, 3vw, 42px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
}

.kp-people-tabs {
  display: flex;
  gap: 32px;
  margin-top: 28px;
  border-bottom: 1px solid #D5E5E0;
}

.kp-people-tabs button {
  position: relative;
  min-height: 44px;
  padding: 10px 0 14px;
  background: transparent;
  border: 0;
  color: #6C8290;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color .2s ease;
}

.kp-people-tabs button::after {
  content: '';
  position: absolute;
  height: 2px;
  bottom: -1px;
  left: 0;
  right: 0;
  border-radius: 3px;
  background: #0FB5A8;
  transform: scaleX(0);
  transition: transform .25s ease;
}

.kp-people-tabs button.is-active {
  color: #0B2545;
  font-weight: 600;
}

.kp-people-tabs button.is-active::after {
  transform: scaleX(1);
}

.kp-people-tabs button:hover {
  color: #0B2545;
}

.kp-people-tabs button:focus-visible {
  outline: 2px solid #0FB5A8;
  outline-offset: 4px;
  border-radius: 3px;
}

.kp-people-panel {
  margin-top: 32px;
}

.kp-people-panel:focus-visible {
  outline: 2px solid #0FB5A8;
  outline-offset: 5px;
}

.kp-people-benefits {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 28px;
  width: 44%;
  padding-bottom: 42px;
  animation: kp-people-enter .28s ease both;
}

.kp-people-benefit {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.kp-people-check {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-top: 2px;
  color: white;
  border-radius: 50%;
  background: #0FB5A8;
  box-shadow: 0 3px 8px rgba(15, 181, 168, .22);
}

.kp-people-benefit h3 {
  margin: 0 0 6px;
  color: #011522;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: -0.005em;
}

.kp-people-benefit p {
  margin: 0;
  max-width: 390px;
  color: #011522;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
}

/* Role-specific photograph and floating dashboard */
.kp-people-visual {
  position: absolute;
  inset: -42px -25px 10px 47%;
  pointer-events: none;
}

.kp-people-photo {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 345px;
  display: block;
  object-fit: cover;
  border-radius: 0 0 20px 20px;
  mask-image:
    linear-gradient(to bottom, #000 65%, transparent 100%);
  animation: kp-people-photo-enter .4s ease both;
}

.kp-people-visual::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 30%;
  height: 345px;
  background: linear-gradient(90deg, #F3FBF8, transparent);
}

.kp-people-dashboard-wrap {
  position: absolute;
  z-index: 2;
  width: 88%;
  max-width: 480px;
  left: -8px;
  top: 148px;
  animation: kp-people-enter .3s ease both;
}

.kp-people-dashboard {
  padding: 24px 22px 14px;
  border: 1px solid #E7F0EE;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow:
    0 24px 48px -20px rgba(11, 37, 69, .14),
    0 2px 6px rgba(11, 37, 69, .03);
}

.kp-people-dashboard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.kp-people-dashboard-top h3 {
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
}

.kp-people-filter {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  min-width: 108px;
  padding: 6px 10px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  color: #55707F;
  border: 1px solid #E7F0EE;
  border-radius: 8px;
  background: #FAFEFD;
}

.kp-people-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 26px 0 22px;
}

.kp-people-metrics > div {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.kp-people-metrics svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  stroke-width: 1.7;
  color: #0FB5A8;
}

.kp-people-metrics > div:nth-child(2) svg { color: #FF6B5B; }
.kp-people-metrics > div:nth-child(3) svg { color: #1597D4; }

.kp-people-metrics strong,
.kp-people-metrics small { display: block; font-family: 'DM Sans', system-ui, sans-serif; }

.kp-people-metrics strong {
  color: #0B2545;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 700;
}

.kp-people-metrics small {
  color: #708697;
  font-size: 10px;
  margin-top: 2px;
  font-weight: 500;
}

.kp-people-table-wrap { overflow-x: auto; }

.kp-people-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
}

.kp-people-table th {
  background: #F6FAF9;
  color: #708697;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 9px 8px;
}

.kp-people-table td {
  padding: 9px 8px;
  border-bottom: 1px solid #EEF4F2;
  color: #35536B;
  font-weight: 500;
  white-space: nowrap;
}

.kp-people-table tr:last-child td { border-bottom: 0; }

.kp-people-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 20px;
  background: #E1F7F1;
  color: #1A8367;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  font-weight: 600;
  white-space: nowrap;
}

.kp-people-status i {
  display: block;
  width: 5px;
  height: 5px;
  background: #19B883;
  border-radius: 50%;
}

.kp-people-status.is-alert {
  background: #FFE9EE;
  color: #D93A6E;
}

.kp-people-status.is-alert i { background: #FF438F; }

.kp-people-status.is-blue {
  color: #1687BB;
  background: #E6F5FF;
}

.kp-people-sample {
  display: block;
  margin-top: 12px;
  text-align: right;
  color: #9AAAB6;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  font-weight: 500;
}

.kp-people-lesson {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 12px 0;
  border-top: 1px solid #EEF4F2;
}

.kp-people-lesson time {
  color: #708697;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 600;
}

.kp-people-lesson > div { flex: 1; }

.kp-people-lesson strong,
.kp-people-lesson div > span { display: block; font-family: 'DM Sans', system-ui, sans-serif; }

.kp-people-lesson strong {
  color: #0B2545;
  font-size: 12px;
  font-weight: 700;
}

.kp-people-lesson div > span {
  margin-top: 3px;
  font-size: 10px;
  color: #708697;
  font-weight: 500;
}

.kp-people-child {
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 24px 0 20px;
}

.kp-people-child > div { flex: 1; }

.kp-people-child strong,
.kp-people-child div > span {
  display: block;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.kp-people-child strong {
  color: #0B2545;
  font-size: 12px;
  font-weight: 700;
}

.kp-people-child div > span {
  font-size: 10px;
  color: #708697;
  margin-top: 2px;
  font-weight: 500;
}

.kp-people-family-update {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: #EFFAF7;
  border: 1px solid #E1F4EE;
}

.kp-people-update-icon { color: #0FB5A8; }

.kp-people-family-update strong {
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
}

.kp-people-family-update p {
  margin: 6px 0 0;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  color: #55707F;
  line-height: 1.6;
}

.kp-people-family-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 20px;
  padding-bottom: 8px;
}

.kp-people-family-bottom > span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  color: #55707F;
  font-weight: 500;
}

/* ============ Dark teal parent app banner ============ */
.kp-parent-banner {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  min-height: 440px;
  margin-top: 56px;
  border: 1px solid #0A6B6B;
  border-radius: 28px;
  color: #fff;
  background:
    radial-gradient(ellipse at 20% 75%, #117d7d66, transparent 60%),
    linear-gradient(120deg, #005B63, #004851 65%, #005961);
  box-shadow: 0 24px 48px -18px rgba(0, 89, 96, .32);
}

.kp-parent-banner::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: .3;
  background-image:
    linear-gradient(#ffffff0a 1px, transparent 1px),
    linear-gradient(90deg, #ffffff0a 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.kp-parent-banner-copy {
  position: relative;
  z-index: 2;
  padding: 56px 40px 48px 52px;
}

.kp-parent-banner-copy h2 {
  color: #fff;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(30px, 3vw, 40px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
}

.kp-parent-banner-copy > p {
  color: #C6E5E4;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  max-width: 440px;
  margin: 16px 0 32px;
  font-weight: 400;
}

.kp-parent-benefits {
  display: grid;
  gap: 22px;
}

.kp-parent-benefit {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.kp-parent-benefit > span {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  color: #EBFFFC;
  background: linear-gradient(145deg, #12A89E, #087F81);
  box-shadow: inset 0 1px 0 #ffffff24;
}

.kp-parent-benefit h3 {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin: 2px 0 5px;
  letter-spacing: -0.005em;
}

.kp-parent-benefit p {
  color: #B7D6D7;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.55;
  margin: 0;
  font-weight: 400;
}

.kp-parent-banner .kp-parent-cta {
  margin-top: 36px;
  min-height: 50px;
  padding: 14px 24px;
  border: 1px solid #FF5C9C;
  border-radius: 12px;
  background: linear-gradient(120deg, #FF5196, #FA3C87);
  color: #fff;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 10px 22px rgba(0, 47, 59, .25), inset 0 1px 0 #ffffff33;
  transition: transform .2s, box-shadow .2s;
}

.kp-parent-banner .kp-parent-cta:hover {
  background: linear-gradient(120deg, #EB337D, #E72A76);
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(0, 47, 59, .32), inset 0 1px 0 #ffffff33;
}

/* ============ Phones built in HTML/CSS ============ */
.kp-parent-phones {
  position: relative;
  min-width: 0;
  min-height: 440px;
}

.kp-parent-phone {
  position: absolute;
  top: 24px;
  width: 215px;
  height: 425px;
  padding: 6px;
  border: 2px solid #6E8489;
  border-radius: 34px;
  background: #0D1721;
  box-shadow:
    0 24px 34px rgba(0, 30, 38, .55),
    inset 0 0 0 1px #DCE4E9;
  transform-origin: 50% 80%;
}

.kp-parent-phone.is-updates {
  z-index: 2;
  left: 9%;
  transform: rotate(-5deg);
}

.kp-parent-phone.is-messages {
  z-index: 3;
  left: 47%;
  top: 54px;
  transform: rotate(3deg);
}

.kp-parent-phone-screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 0 12px;
  border-radius: 26px;
  background: linear-gradient(#fff, #F7FAFC);
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.kp-parent-phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 88px;
  height: 16px;
  border-radius: 0 0 12px 12px;
  background: #0D1721;
}

.kp-parent-phone-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 1px 0;
  font-size: 8px;
  font-weight: 600;
}

.kp-parent-phone-screen > h3 {
  margin: 26px 0 14px;
  color: #0B2545;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.kp-parent-phone-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 14px;
  padding: 3px;
  border-radius: 8px;
  background: #EDF3F6;
}

.kp-parent-phone-tabs > span {
  padding: 6px 8px;
  color: #6E8193;
  font-size: 7px;
  font-weight: 500;
}

.kp-parent-phone-tabs > .is-current {
  color: white;
  background: #0FB5A8;
  border-radius: 6px;
  font-weight: 600;
}

.kp-parent-post-author {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.kp-parent-post-author .kp-connected-avatar {
  width: 28px;
  height: 28px;
}

.kp-parent-post-author strong,
.kp-parent-post-author div > span {
  display: block;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.kp-parent-post-author strong {
  color: #0B2545;
  font-size: 9px;
  font-weight: 700;
}

.kp-parent-post-author div > span {
  color: #8B9BAA;
  font-size: 7px;
  margin-top: 3px;
  font-weight: 500;
}

.kp-parent-post-photo {
  width: 100%;
  height: 95px;
  display: block;
  border-radius: 10px;
  object-fit: cover;
}

.kp-parent-post h4 {
  margin: 12px 0 5px;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
}

.kp-parent-post > p {
  margin: 0;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  line-height: 1.6;
  color: #55707F;
}

.kp-parent-post-reactions {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.kp-parent-post-reactions > span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 8px;
  color: #8DA0AD;
  font-weight: 500;
}

.kp-parent-post-reactions > span:first-child { color: #FF438F; }

.kp-parent-inbox-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 13px 0;
  border-bottom: 1px solid #EDF1F5;
}

.kp-parent-inbox-row > div {
  min-width: 0;
  flex: 1;
}

.kp-parent-inbox-row strong {
  display: block;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 8px;
  font-weight: 700;
}

.kp-parent-inbox-row p {
  margin: 4px 0 0;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 7px;
  line-height: 1.4;
  color: #7F91A1;
}

.kp-parent-inbox-row time {
  align-self: flex-start;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 6px;
  color: #9CAAB5;
}

.kp-parent-inbox-icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #44BEE0;
  color: #fff;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 8px;
  font-weight: 700;
}

.kp-parent-inbox-icon.tone-2 { background: #0FB5A8; }

.kp-parent-phone-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 12px 4px 18px;
  border-top: 1px solid #EDF2F5;
  background: #FFFFFFEF;
}

.kp-parent-phone-nav > span {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #7B8BA0;
}

.kp-parent-phone-nav svg {
  width: 14px;
  height: 14px;
}

.kp-parent-phone-nav small {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 6px;
  font-weight: 500;
}

.kp-parent-phone-nav > .is-current { color: #0FB5A8; }

/* ============ Shared avatar ============ */
.kp-connected-avatar {
  width: 28px;
  height: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid white;
  border-radius: 50%;
  color: #0A6B6B;
  background: #D8F5F2;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(11, 37, 69, .08);
}

.kp-connected-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kp-connected-avatar.is-large {
  width: 58px;
  height: 58px;
  font-size: 16px;
  border-width: 3px;
}

/* ============ Shared button (used by parent CTA) ============ */
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
  background: #0FB5A8;
  color: #fff;
  box-shadow: 0 6px 14px rgba(15, 181, 168, .22), inset 0 1px 0 #ffffff28;
}

.kp-button-primary:hover {
  background: #0A8A80;
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(15, 181, 168, .28);
}

/* ============ Keyframes ============ */
@keyframes kp-people-enter {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes kp-people-photo-enter {
  from { opacity: .3; }
  to { opacity: 1; }
}

/* ============ Responsive ============ */
@media (max-width: 1100px) {
  .kp-community-container { width: min(1200px, calc(100% - 48px)); }

  .kp-people-stage { min-height: 480px; }

  .kp-people-tabs { gap: 22px; }

  .kp-people-dashboard-wrap {
    width: 95%;
    left: -10px;
    top: 168px;
  }

  .kp-people-dashboard { padding: 20px 18px 12px; }

  .kp-parent-banner { gap: 20px; }

  .kp-parent-phone {
    width: 195px;
    height: 410px;
  }

  .kp-parent-phone.is-updates { left: 5%; }
  .kp-parent-phone.is-messages { left: 45%; }

  .kp-parent-banner-copy { padding-right: 32px; }
}

@media (max-width: 850px) {
  .kp-people-section { padding: 72px 0 88px; }

  .kp-people-stage { min-height: 0; }

  .kp-people-intro { width: 100%; }

  .kp-people-intro h2 { font-size: 34px; }

  .kp-people-tabs { max-width: 470px; }

  .kp-people-panel {
    display: grid;
    grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
    gap: 24px;
    align-items: start;
    margin-top: 28px;
  }

  .kp-people-benefits {
    width: 100%;
    gap: 22px;
    padding-top: 16px;
  }

  .kp-people-visual {
    position: relative;
    inset: auto;
    min-height: 400px;
  }

  .kp-people-photo {
    height: 265px;
    border-radius: 16px;
  }

  .kp-people-visual::after { display: none; }

  .kp-people-dashboard-wrap {
    top: 160px;
    left: 0;
    width: 100%;
  }

  .kp-people-metrics { gap: 6px; }

  .kp-people-metrics > div { gap: 6px; }

  .kp-people-metrics svg {
    width: 20px;
    height: 20px;
  }

  .kp-parent-banner {
    grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
    gap: 15px;
  }

  .kp-parent-phone { width: 175px; }

  .kp-parent-phone.is-updates { left: 1%; top: 35px; }
  .kp-parent-phone.is-messages { left: 39%; top: 66px; }

  .kp-parent-banner-copy > p { font-size: 14px; }
}

@media (max-width: 600px) {
  .kp-community-container { width: calc(100% - 36px); }

  .kp-people-intro h2 { font-size: 30px; }

  .kp-people-tabs {
    justify-content: space-between;
    gap: 15px;
    margin-top: 20px;
  }

  .kp-people-tabs button { font-size: 13px; }

  .kp-people-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    margin-top: 22px;
  }

  .kp-people-benefits {
    padding: 0 0 20px;
    gap: 22px;
  }

  .kp-people-benefit p { max-width: none; }

  .kp-people-visual { min-height: 440px; }

  .kp-people-photo { height: 285px; }

  .kp-people-dashboard-wrap {
    top: 180px;
    width: 94%;
    left: 3%;
  }

  .kp-people-dashboard { padding: 18px 16px 10px; }

  .kp-people-metrics { margin: 22px 0 16px; }

  .kp-parent-banner {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 32px;
    border-radius: 22px;
  }

  .kp-parent-banner-copy {
    order: 0;
    padding: 36px 26px 26px;
  }

  .kp-parent-banner-copy h2 { font-size: 28px; }
  .kp-parent-banner-copy > p { font-size: 14px; }

  .kp-parent-phones {
    order: 1;
    min-height: 385px;
    width: 100%;
    max-width: 390px;
    align-self: center;
  }

  .kp-parent-phone {
    width: 180px;
    height: 395px;
  }

  .kp-parent-phone.is-updates { top: 12px; left: 7%; }
  .kp-parent-phone.is-messages { top: 38px; left: 44%; }
}

@media (prefers-reduced-motion: reduce) {
  .kp-people-section *,
  .kp-people-section *::before,
  .kp-people-section *::after {
    animation: none !important;
    transition: none !important;
  }
}
`