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
    label: 'School leaders',
    image: KP_CARD_ASSETS.classroom,
    alt: 'A teacher helping children with a classroom activity',
    position: 'center 40%',
    benefits: [
      [
        'See what needs attention',
        'Get a clear view of your school’s people, progress and operations.',
      ],
      [
        'Keep teams working together',
        'Align staff, streamline communication and reduce admin.',
      ],
      [
        'Manage every campus',
        'Oversee multiple locations with consistent processes and clear visibility.',
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
        'Start the day with a clear plan',
        'Keep lessons, attendance and classroom activities together.',
      ],
      [
        'Make learning progress visible',
        'Record observations and celebrate each child’s milestones.',
      ],
      [
        'Bring families into the conversation',
        'Share classroom moments and practical updates in one place.',
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
        'Follow the activities, discoveries and moments that matter.',
      ],
      [
        'Find every update in one place',
        'Keep messages, reminders and school events easy to find.',
      ],
      [
        'Follow their learning journey',
        'See progress and stay connected with your child’s teachers.',
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
            <span className="kp-people-update-icon"><Sparkles size={19} /></span>
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
              Built around the people
              <br />
              who make school happen.
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
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
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
            <h2>Closer to every school day.</h2>
            <p>
              Keep families informed with messages, moments
              and updates in one app.
            </p>

            <div className="kp-parent-benefits">
              {[
                [ContactRound, 'Daily updates', 'Share classroom moments and important announcements.'],
                [MessageCircle, 'Direct communication', 'Message teachers and school staff securely.'],
                [Heart, 'Shared moments', 'Celebrate learning, achievements and everyday progress.'],
              ].map(([Icon, title, text]) => (
                <div className="kp-parent-benefit" key={title}>
                  <span><Icon size={20} strokeWidth={1.6} /></span>
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
  padding: 42px 0 24px;
  color: #10243e;
  scroll-margin-top: 90px;
  background:
    radial-gradient(ellipse at 77% 26%, #dcf1eb 0%, transparent 58%),
    linear-gradient(110deg, #f2fbf8, #edf9f5 65%, #e4f4ef);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
  width: min(1200px, calc(100% - 80px));
  margin-inline: auto;
}

.kp-people-stage {
  position: relative;
  min-height: 440px;
}

.kp-people-intro {
  position: relative;
  z-index: 3;
  width: 46%;
  padding: 10px 0 0;
}

.kp-people-intro h2 {
  margin: 0;
  color: #10243e;
  font-size: clamp(26px, 2.55vw, 36px);
  line-height: 1.17;
  letter-spacing: -1.15px;
  font-weight: 750;
}

.kp-people-tabs {
  display: flex;
  gap: 35px;
  margin-top: 23px;
  border-bottom: 1px solid #d3e7e2;
}

.kp-people-tabs button {
  position: relative;
  min-height: 48px;
  padding: 10px 0 13px;
  background: transparent;
  border: 0;
  color: #617a88;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
}

.kp-people-tabs button::after {
  content: '';
  position: absolute;
  height: 3px;
  bottom: -1px;
  left: 0;
  right: 0;
  border-radius: 3px;
  background: #ff478e;
  transform: scaleX(0);
  transition: transform .2s ease;
}

.kp-people-tabs button.is-active {
  color: #10243e;
  font-weight: 750;
}

.kp-people-tabs button.is-active::after {
  transform: scaleX(1);
}

.kp-people-tabs button:focus-visible {
  outline: 2px solid #129e98;
  outline-offset: 4px;
  border-radius: 3px;
}

.kp-people-panel {
  margin-top: 28px;
}

.kp-people-panel:focus-visible {
  outline: 2px solid #129e98;
  outline-offset: 5px;
}

.kp-people-benefits {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 23px;
  width: 44%;
  padding-bottom: 38px;
  animation: kp-people-enter .28s ease both;
}

.kp-people-benefit {
  display: grid;
  grid-template-columns: 27px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.kp-people-check {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  margin-top: 1px;
  color: white;
  border-radius: 50%;
  background: linear-gradient(145deg, #62a8aa, #388e96);
  box-shadow: inset 0 1px 0 #ffffff40;
}

.kp-people-benefit h3 {
  margin: 0 0 5px;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 750;
  letter-spacing: -.2px;
}

.kp-people-benefit p {
  margin: 0;
  max-width: 345px;
  color: #627e8c;
  font-size: 12px;
  line-height: 1.6;
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
  border-radius: 0 0 18px 18px;
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
  background: linear-gradient(90deg, #edf9f5, transparent);
}

.kp-people-dashboard-wrap {
  position: absolute;
  z-index: 2;
  width: 88%;
  max-width: 475px;
  left: -8px;
  top: 145px;
  animation: kp-people-enter .3s ease both;
}

.kp-people-dashboard {
  padding: 21px 20px 10px;
  border: 1px solid #ffffffef;
  border-radius: 15px;
  background: rgba(255, 255, 255, .97);
  box-shadow:
    0 15px 35px rgba(35, 108, 107, .14),
    0 3px 8px rgba(35, 108, 107, .04);
}

.kp-people-dashboard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.kp-people-dashboard-top h3 {
  font-size: 13px;
  font-weight: 750;
  margin: 0;
  letter-spacing: -.3px;
}

.kp-people-filter {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  min-width: 108px;
  padding: 6px 8px;
  font-size: 8px;
  color: #597082;
  border: 1px solid #e8eef2;
  border-radius: 5px;
  background: white;
}

.kp-people-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 25px 0 20px;
}

.kp-people-metrics > div {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.kp-people-metrics svg {
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  stroke-width: 1.7;
  color: #079eac;
}

.kp-people-metrics > div:nth-child(2) svg { color: #ff4d98; }
.kp-people-metrics > div:nth-child(3) svg { color: #169fe3; }

.kp-people-metrics strong,
.kp-people-metrics small { display: block; }

.kp-people-metrics strong {
  font-size: 12px;
  line-height: 1.3;
  font-weight: 750;
}

.kp-people-metrics small {
  color: #748898;
  font-size: 8px;
  margin-top: 3px;
}

.kp-people-table-wrap { overflow-x: auto; }

.kp-people-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 8px;
}

.kp-people-table th {
  background: #f5f8fa;
  font-size: 8px;
  color: #687f91;
  font-weight: 600;
  padding: 8px 7px;
}

.kp-people-table td {
  padding: 7px;
  border-bottom: 1px solid #f0f4f5;
  color: #435e74;
  white-space: nowrap;
}

.kp-people-table tr:last-child td { border-bottom: 0; }

.kp-people-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 20px;
  background: #e0f6ed;
  color: #21845f;
  font-size: 7px;
  font-weight: 650;
  white-space: nowrap;
}

.kp-people-status i {
  display: block;
  width: 5px;
  height: 5px;
  background: #22b67c;
  border-radius: 50%;
}

.kp-people-status.is-alert {
  background: #ffe5f0;
  color: #f03b84;
}

.kp-people-status.is-alert i { background: #ff438f; }

.kp-people-status.is-blue {
  color: #1687bb;
  background: #e6f5ff;
}

.kp-people-sample {
  display: block;
  margin-top: 7px;
  text-align: right;
  color: #8499a5;
  font-size: 7px;
}

.kp-people-lesson {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 0;
  border-top: 1px solid #edf3f4;
}

.kp-people-lesson time {
  color: #74909d;
  font-size: 9px;
}

.kp-people-lesson > div { flex: 1; }

.kp-people-lesson strong,
.kp-people-lesson div > span { display: block; }

.kp-people-lesson strong {
  font-size: 10px;
  font-weight: 650;
}

.kp-people-lesson div > span {
  margin-top: 3px;
  font-size: 8px;
  color: #78909e;
}

.kp-people-child {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 22px 0 17px;
}

.kp-people-child > div { flex: 1; }

.kp-people-child strong,
.kp-people-child div > span {
  display: block;
  font-size: 10px;
}

.kp-people-child div > span {
  font-size: 8px;
  color: #718b9a;
  margin-top: 3px;
}

.kp-people-family-update {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  background: #eff9f6;
}

.kp-people-update-icon { color: #11a596; }

.kp-people-family-update strong { font-size: 10px; }

.kp-people-family-update p {
  margin: 5px 0 0;
  font-size: 9px;
  color: #607d8a;
  line-height: 1.65;
}

.kp-people-family-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 19px;
  padding-bottom: 7px;
}

.kp-people-family-bottom > span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  color: #618392;
}

/* ============ Dark teal parent app banner ============ */
.kp-parent-banner {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  min-height: 390px;
  margin-top: 24px;
  border: 1px solid #14757b;
  border-radius: 19px;
  color: #fff;
  background:
    radial-gradient(ellipse at 20% 75%, #117d7d66, transparent 60%),
    linear-gradient(115deg, #005960, #004b53 65%, #005961);
}

.kp-parent-banner::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: .35;
  background-image:
    linear-gradient(#ffffff0c 1px, transparent 1px),
    linear-gradient(90deg, #ffffff0c 1px, transparent 1px);
  background-size: 31px 31px;
  pointer-events: none;
}

.kp-parent-banner-copy {
  position: relative;
  z-index: 2;
  padding: 32px 30px 29px 32px;
}

.kp-parent-banner-copy h2 {
  color: #fff;
  font-size: clamp(25px, 2.4vw, 34px);
  line-height: 1.2;
  letter-spacing: -.8px;
  font-weight: 650;
}

.kp-parent-banner-copy > p {
  color: #d0e6e6;
  font-size: 15px;
  line-height: 1.6;
  max-width: 415px;
  margin: 12px 0 21px;
}

.kp-parent-benefits {
  display: grid;
  gap: 17px;
}

.kp-parent-benefit {
  display: flex;
  align-items: flex-start;
  gap: 13px;
}

.kp-parent-benefit > span {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 11px;
  color: #ddfffa;
  background: linear-gradient(145deg, #12a89e, #087f81);
  box-shadow: inset 0 1px 0 #ffffff24;
}

.kp-parent-benefit h3 {
  font-size: 13px;
  font-weight: 650;
  color: #fff;
  margin: 1px 0 4px;
}

.kp-parent-benefit p {
  color: #bbd9db;
  font-size: 11px;
  line-height: 1.5;
  margin: 0;
}

.kp-parent-banner .kp-parent-cta {
  margin-top: 22px;
  min-height: 43px;
  padding: 11px 18px;
  border: 1px solid #ff5c9c;
  border-radius: 10px;
  background: linear-gradient(120deg, #ff5196, #fa3c87);
  color: #fff;
  font-size: 11px;
  box-shadow: 0 5px 15px #002f3b26, inset 0 1px 0 #ffffff33;
}

.kp-parent-banner .kp-parent-cta:hover {
  background: #eb337d;
  transform: translateY(-2px);
}

/* ============ Phones built in HTML/CSS ============ */
.kp-parent-phones {
  position: relative;
  min-width: 0;
  min-height: 390px;
}

.kp-parent-phone {
  position: absolute;
  top: 20px;
  width: 210px;
  height: 405px;
  padding: 5px;
  border: 2px solid #81969b;
  border-radius: 31px;
  background: #111c26;
  box-shadow:
    0 16px 24px #002d3680,
    inset 0 0 0 1px #dce4e9;
  transform-origin: 50% 80%;
}

.kp-parent-phone.is-updates {
  z-index: 2;
  left: 10%;
  transform: rotate(-5deg);
}

.kp-parent-phone.is-messages {
  z-index: 3;
  left: 48%;
  top: 44px;
  transform: rotate(3deg);
}

.kp-parent-phone-screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 0 11px;
  border-radius: 24px;
  background: linear-gradient(#fff, #f7fafc);
  color: #10243e;
}

.kp-parent-phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 82px;
  height: 15px;
  border-radius: 0 0 10px 10px;
  background: #111c26;
}

.kp-parent-phone-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 1px 0;
  font-size: 7px;
}

.kp-parent-phone-screen > h3 {
  margin: 22px 0 12px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -.7px;
}

.kp-parent-phone-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 13px;
  padding: 3px;
  border-radius: 6px;
  background: #edf3f6;
}

.kp-parent-phone-tabs > span {
  padding: 5px 7px;
  color: #6e8193;
  font-size: 6px;
}

.kp-parent-phone-tabs > .is-current {
  color: white;
  background: #048993;
  border-radius: 5px;
}

.kp-parent-post-author {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.kp-parent-post-author .kp-connected-avatar {
  width: 25px;
  height: 25px;
}

.kp-parent-post-author strong,
.kp-parent-post-author div > span {
  display: block;
  font-size: 8px;
}

.kp-parent-post-author div > span {
  color: #8b9baa;
  font-size: 6px;
  margin-top: 3px;
}

.kp-parent-post-photo {
  width: 100%;
  height: 89px;
  display: block;
  border-radius: 7px;
  object-fit: cover;
}

.kp-parent-post h4 {
  margin: 10px 0 4px;
  font-size: 9px;
  font-weight: 750;
}

.kp-parent-post > p {
  margin: 0;
  font-size: 8px;
  line-height: 1.6;
  color: #61778a;
}

.kp-parent-post-reactions {
  display: flex;
  gap: 15px;
  margin-top: 9px;
}

.kp-parent-post-reactions > span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 7px;
  color: #8da0ad;
}

.kp-parent-post-reactions > span:first-child { color: #ff438f; }

.kp-parent-inbox-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid #edf1f5;
}

.kp-parent-inbox-row > div {
  min-width: 0;
  flex: 1;
}

.kp-parent-inbox-row strong {
  display: block;
  font-size: 7px;
  font-weight: 750;
}

.kp-parent-inbox-row p {
  margin: 4px 0 0;
  font-size: 6px;
  line-height: 1.4;
  color: #7f91a1;
}

.kp-parent-inbox-row time {
  align-self: flex-start;
  font-size: 5px;
  color: #9caab5;
}

.kp-parent-inbox-icon {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #44bee0;
  color: #fff;
  font-size: 7px;
  font-weight: 750;
}

.kp-parent-inbox-icon.tone-2 { background: #53c7bd; }

.kp-parent-phone-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 10px 4px 16px;
  border-top: 1px solid #edf2f5;
  background: #ffffffef;
}

.kp-parent-phone-nav > span {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #7b8ba0;
}

.kp-parent-phone-nav svg {
  width: 12px;
  height: 12px;
}

.kp-parent-phone-nav small { font-size: 5px; }
.kp-parent-phone-nav > .is-current { color: #08a497; }

/* ============ Shared avatar ============ */
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
  .kp-community-container { width: calc(100% - 48px); }

  .kp-people-stage { min-height: 460px; }

  .kp-people-tabs { gap: 24px; }

  .kp-people-dashboard-wrap {
    width: 95%;
    left: -10px;
    top: 165px;
  }

  .kp-people-dashboard { padding: 17px 13px 10px; }

  .kp-parent-banner { gap: 20px; }

  .kp-parent-phone {
    width: 185px;
    height: 395px;
  }

  .kp-parent-phone.is-updates { left: 5%; }
  .kp-parent-phone.is-messages { left: 45%; }

  .kp-parent-banner-copy { padding-right: 23px; }
}

@media (max-width: 850px) {
  .kp-people-section { padding-top: 30px; }

  .kp-people-stage { min-height: 0; }

  .kp-people-intro { width: 100%; }

  .kp-people-intro h2 { font-size: 32px; }

  .kp-people-tabs { max-width: 470px; }

  .kp-people-panel {
    display: grid;
    grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
    gap: 22px;
    align-items: start;
    margin-top: 25px;
  }

  .kp-people-benefits {
    width: 100%;
    gap: 20px;
    padding-top: 14px;
  }

  .kp-people-visual {
    position: relative;
    inset: auto;
    min-height: 390px;
  }

  .kp-people-photo {
    height: 255px;
    border-radius: 15px;
  }

  .kp-people-visual::after { display: none; }

  .kp-people-dashboard-wrap {
    top: 155px;
    left: 0;
    width: 100%;
  }

  .kp-people-metrics { gap: 5px; }

  .kp-people-metrics > div { gap: 5px; }

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

  .kp-parent-banner-copy > p { font-size: 13px; }
}

@media (max-width: 600px) {
  .kp-community-container { width: calc(100% - 36px); }

  .kp-people-intro h2 { font-size: 28px; }

  .kp-people-tabs {
    justify-content: space-between;
    gap: 15px;
    margin-top: 17px;
  }

  .kp-people-tabs button { font-size: 12px; }

  .kp-people-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 7px;
    margin-top: 20px;
  }

  .kp-people-benefits {
    padding: 0 0 17px;
    gap: 20px;
  }

  .kp-people-benefit p { max-width: none; }

  .kp-people-visual { min-height: 430px; }

  .kp-people-photo { height: 280px; }

  .kp-people-dashboard-wrap {
    top: 175px;
    width: 94%;
    left: 3%;
  }

  .kp-people-dashboard { padding: 18px 14px 10px; }

  .kp-people-metrics { margin: 21px 0 15px; }

  .kp-parent-banner {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 10px;
    border-radius: 16px;
  }

  .kp-parent-banner-copy {
    order: 0;
    padding: 27px 23px 20px;
  }

  .kp-parent-banner-copy h2 { font-size: 27px; }
  .kp-parent-banner-copy > p { font-size: 14px; }

  .kp-parent-phones {
    order: 1;
    min-height: 355px;
    width: 100%;
    max-width: 390px;
    align-self: center;
  }

  .kp-parent-phone {
    width: 180px;
    height: 395px;
  }

  .kp-parent-phone.is-updates { top: 12px; left: 7%; }
  .kp-parent-phone.is-messages { top: 35px; left: 45%; }
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