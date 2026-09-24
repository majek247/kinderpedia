import React, { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Bell, BookOpen, Building2, CalendarDays,
  Check, CheckCircle2, CircleHelp, Clock3, CreditCard,
  GraduationCap, Heart, LayoutDashboard, LockKeyhole, Menu,
  MessageCircle, Plus, ShieldCheck, Sparkles, Users, X, Globe,
  Box,
  MapPin,
  BarChart3,
  ContactRound,
} from 'lucide-react'


/*
 * KINDERPEDIA / HOMEPAGE REDESIGN
 * Replace your current Home.jsx with this file.
 * Dependencies: react, react-router-dom, lucide-react.
 * CSS is scoped to .kp-home; no Tailwind configuration or ../data required.
 * Default: content only, so your existing layout can keep its header/footer.
 * For the complete page use <Home showChrome />.
 * demoTo preserves the /demo route supplied in your original component.
 * Pass demoTo="https://www.kinderpedia.co/en/get-a-demo" for the official demo.
 * Interface samples below are fictional concept data, not a live school system.
 */
const OFFICIAL = 'https://www.kinderpedia.co'
const LOGO = `${OFFICIAL}/images/kp/logo_kp_mobile.svg`


const FEATURES = [
  {
    id: 'attendance', label: 'Classroom', icon: GraduationCap,
    eyebrow: 'CLASSROOM MANAGEMENT', title: 'Start with your class. Keep the day moving.',
    text: 'Record attendance, organise lessons and keep classroom information together. Give teachers one place to start, without another spreadsheet to update.',
    points: ['Attendance and daily schedules', 'Homework and learning resources', 'Class updates for families'],
    action: 'Explore classroom management',
  },
  {
    id: 'messages', label: 'Families', icon: MessageCircle,
    eyebrow: 'FAMILY COMMUNICATION', title: 'Keep families close to the school day.',
    text: 'Share the moments, messages and practical updates that parents need. Keep school communication organised around each child and class.',
    points: ['Class and individual communication', 'Photos, updates and school events', 'A familiar mobile experience'],
    action: 'Explore family communication',
  },
  {
    id: 'tuition', label: 'Tuition', icon: CreditCard,
    eyebrow: 'TUITION & PAYMENTS', title: 'A clearer picture of school finances.',
    text: 'Bring invoicing and payment tracking into the same platform as your school records. Help your finance team follow up with the right context.',
    points: ['Automated invoice generation', 'Payment tracking and reporting', 'Less disconnected financial admin'],
    action: 'Explore tuition & payments',
  },
  {
    id: 'progress', label: 'Progress', icon: BookOpen,
    eyebrow: 'PROGRESS MONITORING', title: 'Make every child’s progress easier to follow.',
    text: 'Keep observations, assessments and learning records connected. Give teachers and families a more useful view of how each child is developing.',
    points: ['Curriculum and assessment tools', 'Individual learning records', 'Progress shared with families'],
    action: 'Explore progress monitoring',
  },
]



const PEOPLE = [
  { name: 'Amelia Parker', initials: 'AP', tone: 'rose', status: 'Present' },
  { name: 'Oliver Wilson', initials: 'OW', tone: 'mint', status: 'Present' },
  { name: 'Sofia Ahmed', initials: 'SA', tone: 'lavender', status: 'Present' },
  { name: 'Noah Williams', initials: 'NW', tone: 'peach', status: 'Absent' },
]

const ROLES = [
  {
    id: 'director', label: 'School leaders', icon: Building2, tone: 'rose',
    title: 'See how your school is doing, without chasing updates.',
    text: 'Bring school operations, academic activity and family communication into a shared view. Spend less time gathering information and more time acting on it.',
    points: ['School and student information', 'Operational reporting', 'Visibility across your team'],
    visualTitle: 'Your school, at a glance', visualSub: 'An example leadership overview',
    metrics: [['Students', '248'], ['Classes', '12'], ['Team members', '28']],
    tasks: ['Review attendance by class', 'Follow school-wide activity', 'Keep upcoming events visible'],
  },
  {
    id: 'teacher', label: 'Teachers', icon: GraduationCap, tone: 'mint',
    title: 'More time with children. Less time switching tools.',
    text: 'Keep your timetable, attendance, learning resources and parent updates together. Make everyday classroom work easier to organise and share.',
    points: ['Daily classroom organisation', 'Homework and assessment', 'Direct family communication'],
    visualTitle: 'A little more room to teach', visualSub: 'An example teacher’s day',
    metrics: [['My students', '24'], ['Lessons today', '5'], ['New messages', '3']],
    tasks: ['Take the morning register', 'Share a classroom moment', 'Record a learning observation'],
  },
  {
    id: 'parent', label: 'Families', icon: Heart, tone: 'lavender',
    title: 'Feel part of the school day, wherever you are.',
    text: 'Find school messages, daily updates and learning information in one place. Stay connected with your child’s teachers without searching through scattered conversations.',
    points: ['Updates about your child', 'Messages from the school', 'School events and practical information'],
    visualTitle: 'The moments that matter', visualSub: 'An example family overview',
    metrics: [['Class updates', '4'], ['Next event', 'Fri'], ['New message', '1']],
    tasks: ['Read today’s classroom update', 'Check the upcoming school event', 'Catch up on learning progress'],
  },
]


const EXTRA_MODULES = [
  { icon: CalendarDays, title: 'Timetables', text: 'Keep classes and schedules organised.' },
  { icon: Users, title: 'Admissions CRM', text: 'Bring admissions activity into view.' },
  { icon: Sparkles, title: 'Kinderpedia AI', text: 'Explore AI support for everyday work.' },
  { icon: Building2, title: 'School management', text: 'Connect records, people and operations.' },
]

const FAQS = [
  ['Who is Kinderpedia designed for?', 'Kinderpedia supports schools, nurseries, childcare centres and education franchises. The right setup depends on your institution, the age groups you serve and the workflows your team needs.'],
  ['Can teachers and parents use it on mobile?', 'Kinderpedia offers web and mobile access. Teachers and families can use the platform to stay connected with relevant school information and communication. Ask for a role-specific walkthrough in your demo.'],
  ['Can we bring our existing data across?', 'Use your demo to review your current systems, the records you need to migrate and any integration requirements. Agree the scope and data preparation with the Kinderpedia team before setting a launch date.'],
  ['What does getting started involve?', 'Start with your school’s priorities, then plan the setup, data and team training needed for your rollout. Confirm the onboarding schedule and support included in your proposal.'],
  ['How much does Kinderpedia cost?', 'Visit Kinderpedia’s pricing page or request a proposal based on your school’s needs. A demo is a useful place to confirm which features, services and onboarding support are included.'],
]

function IconTile({ icon: Icon, tone = 'rose', className = '' }) {
  return <span className={`kp-icon kp-${tone} ${className}`}><Icon size={22} aria-hidden="true" /></span>
}

function Action({ children = 'Book a free demo', to = '/demo', secondary = false, className = '' }) {
  const classes = `kp-button ${secondary ? 'kp-button-secondary' : 'kp-button-primary'} ${className}`
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>
  return /^https?:/.test(to)
    ? <a className={classes} href={to}>{content}</a>
    : <Link className={classes} to={to}>{content}</Link>
}

function Logo() {
  const [failed, setFailed] = useState(false)
  return <a className="kp-logo" href={OFFICIAL} aria-label="Kinderpedia homepage">
    {failed ? <span>kinder<em>pedia</em></span> : <img src={LOGO} width="172" height="40" alt="Kinderpedia" onError={() => setFailed(true)} />}
  </a>
}

function Header({ demoTo }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef(null)
  const close = () => setOpen(false)
  return <header className="kp-header" onKeyDown={e => {
    if (e.key === 'Escape' && open) { close(); toggleRef.current?.focus() }
  }}>
    <div className="kp-container kp-header-inner">
      <Logo />
      <button ref={toggleRef} type="button" className="kp-menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}>
        {open ? <X size={23} /> : <Menu size={23} />}
      </button>
      <nav id={menuId} className={`kp-nav ${open ? 'kp-nav-open' : ''}`} aria-label="Main navigation">
        <a href="#kp-platform" onClick={close}>Platform</a>
        <a href="#kp-community" onClick={close}>Who it’s for</a>
        <a href="#kp-stories" onClick={close}>School stories</a>
        <a href={`${OFFICIAL}/en`} onClick={close}>Kinderpedia website <ArrowUpRight size={13} /></a>
        <Action to={demoTo} className="kp-nav-cta">Book a demo</Action>
      </nav>
    </div>
  </header>
}

function MiniAvatar({ person }) {
  return <span className={`kp-avatar kp-${person.tone}`} aria-hidden="true">{person.initials}</span>
}

function AttendancePanel({ compact = false }) {
  const [statuses, setStatuses] = useState(PEOPLE.map(p => p.status))
  const present = statuses.filter(s => s === 'Present').length
  return <div className="kp-register">
    <div className="kp-preview-heading">
      <div><span className="kp-micro">YEAR 2 · OAK CLASS</span><h4>Morning attendance</h4></div>
      <span className="kp-pill kp-pill-green"><span />{present} of 4 present</span>
    </div>
    {!compact && <div className="kp-register-note"><CalendarDays size={15} /><span>Monday · Morning session</span><span className="kp-auto-save">Interactive sample</span></div>}
    <div className="kp-table-head"><span>Student</span><span>Attendance</span></div>
    {PEOPLE.map((person, index) => <div className="kp-student-row" key={person.name}>
      <div className="kp-person"><MiniAvatar person={person} /><div><strong>{person.name}</strong><small>Oak Class</small></div></div>
      <button type="button" className={`kp-status ${statuses[index] === 'Present' ? 'kp-present' : 'kp-absent'}`} aria-label={`${person.name}: ${statuses[index]}. Click to change attendance.`}
        onClick={() => setStatuses(previous => previous.map((s, i) => i === index ? (s === 'Present' ? 'Absent' : 'Present') : s))}>
        {statuses[index] === 'Present' ? <Check size={13} /> : <Clock3 size={13} />}{statuses[index]}
      </button>
    </div>)}
    <div className="kp-register-bottom" role="status"><CheckCircle2 size={15} /><span>{present} students marked present in this sample.</span></div>
  </div>
}

function FamilyPanel() {
  return <div className="kp-family-panel">
    <div className="kp-preview-heading"><div><span className="kp-micro">OAK CLASS · FAMILY UPDATES</span><h4>A window into their day</h4></div><IconTile icon={Heart} /></div>
    <div className="kp-post">
      <div className="kp-person"><span className="kp-avatar kp-mint">EW</span><div><strong>Emma Wilson</strong><small>Class teacher · 10:30</small></div></div>
      <div className="kp-art" aria-label="Decorative illustration of a class art project" role="img">
        <div className="kp-art-sun" /><div className="kp-art-hill kp-art-hill-one" /><div className="kp-art-hill kp-art-hill-two" />
        <span className="kp-art-tag"><Sparkles size={14} />Little discoveries, every day</span>
      </div>
      <h5>Today, we explored the world around us.</h5>
      <p>Oak Class turned leaves, shapes and a little imagination into their own mini landscapes.</p>
      <div className="kp-post-footer"><Heart size={15} /><span>Shared with Oak Class families</span></div>
    </div>
  </div>
}

function TuitionPanel() {
  return <div>
    <div className="kp-preview-heading"><div><span className="kp-micro">TUITION OVERVIEW</span><h4>Keep payments in perspective</h4></div><IconTile icon={CreditCard} tone="mint" /></div>
    <div className="kp-finance-total"><span>Example invoiced total</span><strong>£24,000<span>.00</span></strong><div className="kp-payment-bar"><span /></div><div className="kp-finance-legend"><span><i />Paid · £19,200</span><span>Outstanding · £4,800</span></div></div>
    <div className="kp-invoice"><div><strong>Autumn term tuition</strong><small>Invoice INV-0241</small></div><span className="kp-pill kp-pill-green">Paid</span></div>
    <div className="kp-invoice"><div><strong>After-school activities</strong><small>Invoice INV-0242</small></div><span className="kp-pill kp-pill-amber">Awaiting payment</span></div>
    <div className="kp-register-bottom"><CreditCard size={15} />Sample figures for illustration</div>
  </div>
}

function ProgressPanel() {
  const skills = [['Communication', 80, 'Confident'], ['Creative expression', 68, 'Developing'], ['Working together', 88, 'Confident']]
  return <div>
    <div className="kp-preview-heading"><div><span className="kp-micro">LEARNING JOURNEY</span><h4>Small steps. Visible progress.</h4></div><IconTile icon={BookOpen} tone="lavender" /></div>
    <div className="kp-progress-person"><MiniAvatar person={PEOPLE[0]} /><div><strong>Amelia’s learning record</strong><small>Oak Class · Example assessment</small></div></div>
    <div className="kp-skills">{skills.map(([name, value, label]) => <div className="kp-skill" key={name}><div><strong>{name}</strong><span>{label}</span></div><div className="kp-skill-track"><span style={{ width: `${value}%` }} /></div></div>)}</div>
    <div className="kp-observation"><span className="kp-micro">TEACHER OBSERVATION</span><p>“Amelia shared her ideas with the group and helped a classmate explain their project.”</p><small>Illustrative observation</small></div>
  </div>
}

function PreviewContent({ active, compact }) {
  if (active === 'messages') return <FamilyPanel />
  if (active === 'tuition') return <TuitionPanel />
  if (active === 'progress') return <ProgressPanel />
  return <AttendancePanel compact={compact} />
}

function ProductPreview() {
  const [active, setActive] = useState('attendance')
  return <div className="kp-hero-visual">
    <div className="kp-orbit kp-orbit-one" aria-hidden="true" /><div className="kp-orbit kp-orbit-two" aria-hidden="true" />
    <div className="kp-product-window">
      <div className="kp-window-bar"><div className="kp-window-dots" aria-hidden="true"><i /><i /><i /></div><span>One connected school day</span><LockKeyhole size={12} aria-hidden="true" /></div>
      <div className="kp-product-layout">
        <div className="kp-product-sidebar" aria-label="Preview modules">
          <span className="kp-app-mark" aria-hidden="true">k<span>p</span></span>
          {FEATURES.map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-label={`Show ${label.toLowerCase()} preview`} aria-pressed={active === id} className={active === id ? 'is-active' : ''} onClick={() => setActive(id)}><Icon size={20} /></button>)}
          <span className="kp-sidebar-help" aria-hidden="true"><CircleHelp size={19} /></span>
        </div>
        <div className="kp-product-main">
          <div className="kp-product-topline"><div><span>Good morning, Emma</span><h3>A good day starts here.</h3></div><span className="kp-topline-bell" aria-hidden="true"><Bell size={17} /><i /></span></div>
          <div className="kp-mini-stats"><div><span>My class</span><strong>Oak Class</strong></div><div><span>Today’s lessons</span><strong>5 <small>planned</small></strong></div><div><span>Family updates</span><strong>3 <small>new</small></strong></div></div>
          <div className="kp-screen-card"><PreviewContent active={active} compact /></div>
          <p className="kp-sample-label">Interactive concept preview · fictional school data</p>
        </div>
      </div>
    </div>
    <div className="kp-floating-note"><span className="kp-notification-icon"><CheckCircle2 size={21} /></span><div><strong>Everyone on the same page.</strong><span>Teachers. Families. Your whole school.</span></div></div>
    <div className="kp-visual-caption"><span /><span /> Try the module icons to explore</div>
  </div>
}

function Hero({ demoTo }) {
  return (
    <section
      className="kp-hero kp-hero-refresh"
      aria-labelledby="kp-hero-title"
    >
      <div className="kp-hero-ribbon" aria-hidden="true" />

      <div className="kp-container kp-hero-grid">
        <div className="kp-hero-copy">
          <span className="kp-eyebrow">
            CONNECTED SCHOOL MANAGEMENT
          </span>

          <h1 id="kp-hero-title">
            A better school day.
            <br />
            <span>For everyone.</span>
          </h1>

          <p className="kp-hero-description">
            Bring school operations, learning and family communication
            together in one intuitive platform.
          </p>

          <div className="kp-actions">
            <Action to={demoTo}>Book a free demo</Action>

            <a
              className="kp-button kp-button-secondary"
              href="#kp-platform"
            >
              Explore the platform
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <p className="kp-hero-audience">
            For schools, preschools and education groups.
          </p>
        </div>

        <div className="kp-hero-artwork">
          <img
            src="/images/kinderpediaheroimage.png"
            alt="Kinderpedia school dashboard alongside the parent mobile app."
            className="kp-hero-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}



const KP_CARD_ASSETS = {
  mapleBear: '/images/maple-bear-logo.png',
  cambridge: '/images/cambridge-school-logo.png',
  helikon: '/images/helikon-logo.png',
  just4kids: '/images/just4kids-logo.png',
  emma: '/images/student-emma.png',
  lucas: '/images/student-lucas.png',
  sofia: '/images/student-sofia.png',
  teacher: '/images/teacher-avatar.png',
  classroom: '/images/classroom-activity.png',
}

function SchoolLogo({ src, name }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="kp-connected-school">
      {failed ? (
        <strong>{name}</strong>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
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

function TrustStrip() {
  return (
    <section
      className="kp-connected-trust"
      aria-label="Kinderpedia customers and community"
    >
      <div className="kp-container kp-connected-trust-inner">
        <div className="kp-connected-stat">
          <Users aria-hidden="true" />
          <div>
            <strong>2,000+</strong>
            <span>customers</span>
          </div>
        </div>

        <div className="kp-connected-stat is-blue">
          <Globe aria-hidden="true" />
          <div>
            <strong>40+</strong>
            <span>countries</span>
          </div>
        </div>

        <div className="kp-connected-stat is-blue">
          <Box aria-hidden="true" />
          <div>
            <strong>27+</strong>
            <span>modules</span>
          </div>
        </div>

        <SchoolLogo
          src={KP_CARD_ASSETS.mapleBear}
          name="Maple Bear"
        />
        <SchoolLogo
          src={KP_CARD_ASSETS.cambridge}
          name="Cambridge School of Constanța"
        />
        <SchoolLogo
          src={KP_CARD_ASSETS.helikon}
          name="Helikon"
        />
        <SchoolLogo
          src={KP_CARD_ASSETS.just4kids}
          name="Just4Kids"
        />
      </div>
    </section>
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

function Platform({ demoTo }) {
  const students = [
    {
      name: 'Emma Popescu',
      year: 'Year 2',
      image: KP_CARD_ASSETS.emma,
    },
    {
      name: 'Lucas Martin',
      year: 'Year 1',
      image: KP_CARD_ASSETS.lucas,
    },
    {
      name: 'Sofia Ionescu',
      year: 'Reception',
      image: KP_CARD_ASSETS.sofia,
    },
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
      <div className="kp-container">
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
                <div
                  className="kp-connected-student"
                  key={student.name}
                >
                  <CardAvatar
                    src={student.image}
                    name={student.name}
                  />
                  <span className="kp-connected-student-name">
                    {student.name}
                  </span>
                  <span className="kp-connected-year">
                    {student.year}
                  </span>
                  <span className="kp-connected-badge">
                    Active
                  </span>
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
              <CardAvatar
                src={KP_CARD_ASSETS.teacher}
                name="Emma Wilson"
              />

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
                    style={{
                      backgroundImage:
                        `url("${KP_CARD_ASSETS.classroom}")`,
                    }}
                  />
                  <div
                    className="kp-connected-photo is-more"
                    style={{
                      backgroundImage:
                        `url("${KP_CARD_ASSETS.classroom}")`,
                    }}
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
                <span className="kp-connected-badge">
                  <i /> Paid
                </span>
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
              <CardAvatar
                src={KP_CARD_ASSETS.emma}
                name="Emma Popescu"
                large
              />

              <div className="kp-connected-progress-body">
                <strong className="kp-connected-progress-name">
                  Emma Popescu
                </strong>
                <span className="kp-connected-progress-year">
                  Year 2
                </span>

                {[
                  ['Reading', 'On track'],
                  ['Mathematics', 'On track'],
                  ['Social skills', 'Excellent'],
                  ['Creativity', 'On track'],
                ].map(([skill, status]) => (
                  <div className="kp-connected-skill" key={skill}>
                    <span className="kp-connected-skill-dot">
                      <span />
                    </span>
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

function Community({ demoTo }) {
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
      <div className="kp-container">
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
      <div className="kp-container">
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
                  <img
                    src={story.logo}
                    alt=""
                    loading="lazy"
                  />
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
    [
      'Discover',
      'We learn about your school’s needs and goals.',
    ],
    [
      'Customise',
      'We tailor Kinderpedia to your processes.',
    ],
    [
      'Connect',
      'We help you migrate data and onboard your team.',
    ],
    [
      'Grow',
      'You’re ready to go, with ongoing support.',
    ],
  ]

  return (
    <section
      className="kp-start-path"
      aria-labelledby="kp-start-path-title"
    >
      <div className="kp-container">
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
      <div className="kp-container kp-privacy-strip-inner">
        <h2 id="kp-privacy-strip-title">
          <span>Privacy</span> built into everyday school <span>life.</span>
        </h2>

        <div className="kp-privacy-items">
          {items.map(({ icon: Icon, title, text, tone }) => (
            <div
              key={title}
              className={`kp-privacy-item is-${tone}`}
            >
              <Icon
                size={28}
                strokeWidth={1.7}
                aria-hidden="true"
              />

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
      <div className="kp-container kp-faq-refresh-grid">
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
      <div className="kp-container">
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


function Footer() {
  return (
    <footer className="kp-footer-refresh">
      <div className="kp-container">
        <div className="kp-footer-refresh-grid">
          <div className="kp-footer-refresh-brand">
            <Logo />

            <p>
              School management software
              <br />
              for a brighter tomorrow.
            </p>
          </div>

          <div className="kp-footer-refresh-column">
            <h3>Platform</h3>
            <a href="#kp-platform">Overview</a>
            <a href="#kp-platform">All modules</a>
            <a href={`${OFFICIAL}/en/integrations`}>Integrations</a>
            <a href={`${OFFICIAL}/en/security`}>Security</a>
          </div>

          <div className="kp-footer-refresh-column">
            <h3>Solutions</h3>
            <a href={`${OFFICIAL}/en/solutions/schools`}>
              For schools
            </a>
            <a href={`${OFFICIAL}/en/solutions/preschool`}>
              For preschools
            </a>
            <a href={`${OFFICIAL}/en/solutions/education-franchises`}>
              For education groups
            </a>
            <a href={`${OFFICIAL}/en/features/multi-location-management`}>
              Multi-campus
            </a>
          </div>

          <div className="kp-footer-refresh-column">
            <h3>Resources</h3>
            <a href={`${OFFICIAL}/en/blog`}>Blog</a>
            <a href={`${OFFICIAL}/en/resources/guides`}>Guides</a>
            <a href={`${OFFICIAL}/en/webinars`}>Webinars</a>
            <a href={`${OFFICIAL}/en/contact`}>Help centre</a>
          </div>

          <div className="kp-footer-refresh-column">
            <h3>Company</h3>
            <a href={`${OFFICIAL}/en/company/about`}>
              About us
            </a>
            <a href={`${OFFICIAL}/en/company/careers`}>
              Careers
            </a>
            <a href={`${OFFICIAL}/en/contact`}>Contact</a>
            <a href={`${OFFICIAL}/en/pricing`}>Pricing</a>
          </div>

          <div className="kp-footer-refresh-social">
            <div>
              <a href="https://www.linkedin.com" aria-label="LinkedIn">
                in
              </a>

              <a href="https://www.instagram.com" aria-label="Instagram">
                ◎
              </a>

              <a href="https://www.youtube.com" aria-label="YouTube">
                ▶
              </a>
            </div>

            <p>
              Homepage design concept
              <br />
              for Kinderpedia © 2027
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home({ showChrome = false, demoTo = '/demo' }) {
  return <div className="kp-home">
    <style>{styles}</style>
    {showChrome && <><a href="#kp-main" className="kp-skip-link">Skip to content</a><Header demoTo={demoTo} /></>}
    <div id="kp-main">
      <Hero demoTo={demoTo} /><TrustStrip /><Platform demoTo={demoTo} />
      <Community demoTo={demoTo} /><SchoolStories /><Onboarding demoTo={demoTo} />
      <DataCare demoTo={demoTo} /><FAQs /><FinalCTA demoTo={demoTo} />
    </div>
    <Footer />
  </div>
}

const styles = `
/* BRAND TOKENS: sampled from the live Kinderpedia website.
   Darker green supports readable button text; light tints are design extensions. */
.kp-home {
  --kp-berry: #b93360;
  --kp-berry-dark: #952347;
  --kp-slate: #4a4d5f;
  --kp-ink: #2c3043;
  --kp-muted: #656a7c;
  --kp-green: #00a533;
  --kp-green-dark: #087d35;
  --kp-line: #e8e8ee;
  --kp-canvas: #f7f8fc;
  --kp-rose: #faedf2;
  --kp-shadow: 0 24px 65px -30px rgba(50, 37, 63, .24);
  color: var(--kp-slate);
  background: #fff;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  isolation: isolate;
  overflow: clip;
  -webkit-font-smoothing: antialiased;
}
.kp-home *, .kp-home *::before, .kp-home *::after { box-sizing: border-box; }
.kp-home :where(h1,h2,h3,h4,h5,p,ul) { margin: 0; }
.kp-home :where(h1,h2,h3,h4,h5) { color: var(--kp-ink); font-family: inherit; }
.kp-home :where(a) { color: inherit; text-decoration: none; }
.kp-home :where(button) { font: inherit; cursor: pointer; }
.kp-home :where(button,a,summary) { -webkit-tap-highlight-color: transparent; }
.kp-home :where(button,a,summary,[tabindex]):focus-visible { outline: 3px solid var(--kp-berry); outline-offset: 5px; }
.kp-home :where(button) { color: inherit; }
.kp-home :where(svg) { flex-shrink: 0; }
.kp-home ::selection { color: #762440; background: #f6dce6; }
.kp-home .kp-container { width: min(1200px, calc(100% - 80px)); margin-inline: auto; }
.kp-home .kp-section { padding-block: 106px; }
.kp-home :where(section[id],#kp-main) { scroll-margin-top: 95px; }
.kp-home .kp-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: 10px; font-weight: 750; letter-spacing: .15em; color: var(--kp-berry); line-height: 1.5; }
.kp-home .kp-eyebrow-dot { width: 7px; height: 7px; background: var(--kp-berry); border-radius: 50%; box-shadow: 0 0 0 5px #b933600c; }
.kp-home h2 { font-size: clamp(30px, 3.2vw, 43px); line-height: 1.16; font-weight: 650; letter-spacing: -.045em; }
.kp-home h2 > span { color: var(--kp-muted); }
.kp-home .kp-actions { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
.kp-home .kp-button { min-height: 48px; padding: 13px 21px; border-radius: 9px; display: inline-flex; gap: 14px; align-items: center; justify-content: center; font-weight: 650; font-size: 13px; line-height: 1.45; border: 1px solid transparent; transition: transform .2s, background .2s, box-shadow .2s; }
.kp-home .kp-button-primary { background: var(--kp-green-dark); color: #fff; box-shadow: 0 5px 12px #087d3514, inset 0 1px 0 #ffffff22; }
.kp-home .kp-button-primary:hover { background: #05652a; transform: translateY(-2px); box-shadow: 0 8px 18px #087d3529; }
.kp-home .kp-button-secondary { border-color: #dbdce4; background: #fff; color: var(--kp-slate); }
.kp-home .kp-button-secondary:hover { border-color: #c48197; background: #fff9fb; transform: translateY(-2px); }
.kp-home .kp-text-button { display: inline-flex; gap: 9px; align-items: center; font-size: 13px; font-weight: 650; padding-block: 10px; }
.kp-home .kp-text-button:hover { color: var(--kp-berry); }
.kp-home .kp-icon { width: 48px; height: 48px; display: inline-flex; align-items: center; justify-content: center; border-radius: 14px; flex-shrink: 0; }
.kp-home .kp-rose { background: #faeaf0; color: #a82d56; }
.kp-home .kp-mint { background: #eaf5ee; color: #267447; }
.kp-home .kp-lavender { background: #eeecf8; color: #6652a3; }
.kp-home .kp-peach { background: #fff0df; color: #9c652d; }
.kp-home .kp-neutral { background: #f3f3f7; color: #5b6074; }
.kp-home .kp-micro { font-size: 8px; font-weight: 750; letter-spacing: .1em; color: #717589; }
.kp-home .kp-pill { display: inline-flex; align-items: center; gap: 5px; background: #f1f1f6; color: #676b7b; font-size: 9px; font-weight: 600; border-radius: 50px; padding: 5px 9px; line-height: 1.4; white-space: nowrap; }
.kp-home .kp-pill-green { color: #277347; background: #edf7f0; }
.kp-home .kp-pill-green > span { height: 5px; width: 5px; background: #42865b; border-radius: 50%; }
.kp-home .kp-pill-amber { color: #8c651e; background: #fff5e1; }
/* Optional site navigation */
.kp-home .kp-header { background: #fffffff5; border-bottom: 1px solid #eeedf2; position: sticky; top: 0; z-index: 30; backdrop-filter: blur(16px); }
.kp-home .kp-header-inner { display: flex; align-items: center; justify-content: space-between; min-height: 86px; gap: 28px; }
.kp-home .kp-logo { display: inline-flex; align-items: center; flex-shrink: 0; }
.kp-home .kp-logo img { width: 166px; height: 40px; object-fit: contain; }
.kp-home .kp-logo > span { font-size: 29px; font-weight: 800; font-style: italic; letter-spacing: -1.6px; }
.kp-home .kp-logo em { color: var(--kp-berry); font-weight: 500; }
.kp-home .kp-nav { display: flex; gap: 27px; align-items: center; }
.kp-home .kp-nav > a:not(.kp-button) { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; }
.kp-home .kp-nav > a:not(.kp-button):hover { color: var(--kp-berry); }
.kp-home .kp-nav-cta { min-height: 42px; padding: 11px 16px; font-size: 12px; }
.kp-home .kp-menu-toggle { display: none; background: transparent; border: 1px solid var(--kp-line); width: 44px; height: 44px; border-radius: 8px; align-items: center; justify-content: center; }
.kp-home .kp-skip-link { position: absolute; z-index: 100; left: 12px; top: -80px; padding: 12px 20px; background: white; border: 2px solid var(--kp-berry); }
.kp-home .kp-skip-link:focus { top: 12px; }
/* Hero: a soft paper canvas, fine grid, warm edge light */
.kp-home .kp-hero { position: relative; background: linear-gradient(120deg,#fcfbfd 15%,#f7f8fc 68%,#fcf2f6); padding: 100px 0 94px; }
.kp-home .kp-hero::before { content: ''; position: absolute; inset: 0; opacity: .35; background-image: radial-gradient(#85819c33 .7px, transparent .7px); background-size: 9px 9px; mask-image: linear-gradient(90deg, transparent 20%,#000); pointer-events: none; }
.kp-home .kp-hero-glow { position: absolute; width: 600px; height: 600px; right: -190px; top: -160px; border-radius: 50%; background: radial-gradient(circle,#f5dbe777,transparent 67%); pointer-events: none; }
.kp-home .kp-hero-grid { display: grid; grid-template-columns: .94fr 1.06fr; gap: 50px; align-items: center; position: relative; }
.kp-home .kp-hero h1 { margin: 22px 0 23px; font-size: clamp(38px,4.1vw,56px); line-height: 1.12; letter-spacing: -.055em; font-weight: 650; }
.kp-home .kp-hero h1 > span { color: var(--kp-berry); }
.kp-home .kp-hero-description { color: var(--kp-muted); max-width: 435px; font-size: 16px; line-height: 1.8; }
.kp-home .kp-hero .kp-actions { margin-top: 29px; gap: 21px; }
.kp-home .kp-hero-checks { display: flex; gap: 18px; margin-top: 17px; color: #767a8a; font-size: 11px; }
.kp-home .kp-hero-checks > span { display: flex; align-items: center; gap: 5px; }
.kp-home .kp-hero-checks svg { color: var(--kp-green-dark); }
.kp-home .kp-hero-proof { margin-top: 30px; padding-top: 22px; border-top: 1px solid #dfdfe8; display: flex; align-items: flex-start; gap: 12px; max-width: 410px; }
.kp-home .kp-rating-stars { color: var(--kp-berry); font-size: 16px; letter-spacing: 1px; padding-top: 1px; }
.kp-home .kp-hero-proof strong { font-size: 12px; color: var(--kp-slate); }
.kp-home .kp-hero-proof div > span { display: block; font-size: 9px; color: #787b8a; margin-top: 2px; }
/* Product UI: all content is real DOM, including editable sample attendance */
.kp-home .kp-hero-visual { position: relative; padding: 24px 0 30px; min-width: 0; }
.kp-home .kp-orbit { position: absolute; border: 1px solid #b9336015; border-radius: 50%; pointer-events: none; }
.kp-home .kp-orbit-one { width: 590px; height: 590px; left: -15px; top: -20px; }
.kp-home .kp-orbit-two { width: 490px; height: 490px; left: 35px; top: 30px; }
.kp-home .kp-product-window { border: 1px solid #e4dfe9; border-radius: 14px; background: #fff; position: relative; overflow: hidden; box-shadow: 0 35px 65px -23px #4a3b6340, 0 0 0 7px #ffffff88; transform: perspective(1800px) rotateY(-3deg) rotateX(1deg); }
.kp-home .kp-window-bar { background: #fafafd; height: 33px; border-bottom: 1px solid #e9e8ef; display: flex; justify-content: space-between; align-items: center; padding: 0 13px; font-size: 8px; color: #8b8c9b; }
.kp-home .kp-window-dots { display: flex; gap: 4px; }
.kp-home .kp-window-dots i { width: 5px; height: 5px; background: #d7d6e1; border-radius: 50%; }
.kp-home .kp-window-dots i:first-child { background: #de9bb0; }
.kp-home .kp-product-layout { display: grid; grid-template-columns: 54px 1fr; min-height: 446px; }
.kp-home .kp-product-sidebar { display: flex; align-items: center; flex-direction: column; gap: 13px; padding-block: 17px; border-right: 1px solid #eeeeF3; }
.kp-home .kp-app-mark { font-weight: 850; font-size: 24px; font-style: italic; letter-spacing: -4px; padding-right: 4px; margin-bottom: 11px; line-height: 1; }
.kp-home .kp-app-mark > span { color: var(--kp-berry); }
.kp-home .kp-product-sidebar > button { display: grid; place-items: center; border: 0; background: transparent; color: #a1a0af; width: 36px; height: 36px; border-radius: 9px; transition: background .2s,color .2s; }
.kp-home .kp-product-sidebar > button:hover { background: #f8f1f5; color: var(--kp-berry); }
.kp-home .kp-product-sidebar > button.is-active { color: var(--kp-berry); background: #faedf2; }
.kp-home .kp-sidebar-help { margin-top: auto; color: #a1a0af; }
.kp-home .kp-product-main { background: #f6f7fb; padding: 22px 18px 10px; min-width: 0; }
.kp-home .kp-product-topline { display: flex; align-items: center; justify-content: space-between; }
.kp-home .kp-product-topline > div > span { font-size: 9px; color: #868797; }
.kp-home .kp-product-topline h3 { font-size: 17px; font-weight: 650; letter-spacing: -.4px; margin-top: 2px; }
.kp-home .kp-topline-bell { display: grid; place-items: center; position: relative; width: 30px; height: 30px; background: white; border: 1px solid #e9e8ee; border-radius: 8px; color: #767386; }
.kp-home .kp-topline-bell i { position: absolute; background: var(--kp-berry); width: 5px; height: 5px; border-radius: 50%; top: 5px; right: 6px; }
.kp-home .kp-mini-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin: 17px 0 14px; }
.kp-home .kp-mini-stats > div { border: 1px solid #eeedf2; background: white; border-radius: 8px; padding: 10px; }
.kp-home .kp-mini-stats span { display: block; font-size: 8px; color: #8a8798; }
.kp-home .kp-mini-stats strong { display: block; margin-top: 3px; font-size: 12px; font-weight: 650; }
.kp-home .kp-mini-stats small { font-size: 8px; font-weight: 400; color: #8b8797; }
.kp-home .kp-screen-card { padding: 15px; background: #fff; border: 1px solid #eae9f0; border-radius: 10px; min-height: 292px; }
.kp-home .kp-preview-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.kp-home .kp-preview-heading h4 { font-size: 13px; font-weight: 650; margin-top: 3px; line-height: 1.4; letter-spacing: -.2px; }
.kp-home .kp-preview-heading .kp-icon { width: 36px; height: 36px; border-radius: 10px; }
.kp-home .kp-table-head { display: flex; justify-content: space-between; background: #f8f8fb; font-size: 8px; font-weight: 550; padding: 7px 8px; color: #81818f; border-radius: 4px; }
.kp-home .kp-student-row { display: flex; gap: 8px; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f0f5; padding: 10px 0; }
.kp-home .kp-person { display: flex; align-items: center; gap: 9px; min-width: 0; }
.kp-home .kp-avatar { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; font-size: 9px; font-weight: 650; flex-shrink: 0; }
.kp-home .kp-person strong { display: block; font-size: 10px; line-height: 1.4; font-weight: 600; }
.kp-home .kp-person small { display: block; font-size: 8px; color: #92909d; margin-top: 2px; }
.kp-home .kp-status { display: inline-flex; align-items: center; gap: 4px; padding: 6px 8px; border-radius: 5px; font-size: 9px; font-weight: 500; border: 1px solid transparent; min-height: 32px; }
.kp-home .kp-status:hover { border-color: currentColor; }
.kp-home .kp-present { color: #2c7a4b; background: #edf8f0; }
.kp-home .kp-absent { color: #9b6b29; background: #fff7e8; }
.kp-home .kp-register-bottom { display: flex; align-items: center; gap: 6px; margin-top: 13px; font-size: 8px; color: #777f84; }
.kp-home .kp-register-bottom svg { color: #5f9476; }
.kp-home .kp-sample-label { color: #8d889a; font-size: 8px; text-align: center; margin-top: 10px; }
.kp-home .kp-floating-note { position: absolute; display: flex; gap: 12px; align-items: center; background: #fffffff5; border: 1px solid #ede6ef; padding: 15px 20px; border-radius: 12px; bottom: 4px; left: -24px; box-shadow: 0 12px 35px -14px #44314d45; backdrop-filter: blur(12px); }
.kp-home .kp-notification-icon { color: #25804a; width: 37px; height: 37px; border-radius: 50%; background: #edf7ef; display: grid; place-items: center; }
.kp-home .kp-floating-note strong { display: block; font-size: 12px; font-weight: 650; }
.kp-home .kp-floating-note div > span { display: block; font-size: 9px; color: #838092; margin-top: 2px; }
.kp-home .kp-visual-caption { display: flex; gap: 4px; align-items: center; font-size: 8px; color: #8c8094; justify-content: flex-end; padding: 14px 7px 0; }
.kp-home .kp-visual-caption > span { width: 4px; height: 4px; border-radius: 50%; background: #b93360; }
.kp-home .kp-visual-caption > span + span { opacity: .3; margin-right: 4px; }
/* Trust: deliberately quiet, with no invented client logos */
.kp-home .kp-trust { border-block: 1px solid var(--kp-line); padding: 34px 0; }
.kp-home .kp-trust-grid { display: grid; grid-template-columns: 1.35fr .85fr .85fr 1fr; align-items: center; }
.kp-home .kp-trust h2 { font-size: 21px; line-height: 1.3; margin-top: 9px; letter-spacing: -.5px; }
.kp-home .kp-trust .kp-eyebrow { font-size: 8px; }
.kp-home .kp-trust-stat { border-left: 1px solid var(--kp-line); padding-left: 34px; }
.kp-home .kp-trust-stat strong { font-size: 36px; line-height: 1.2; color: var(--kp-slate); font-weight: 650; letter-spacing: -1.5px; }
.kp-home .kp-trust-stat > span { display: block; font-size: 11px; color: #7c7d8c; margin-top: 4px; }
.kp-home .kp-trust-note { display: flex; gap: 15px; border-left: 1px solid var(--kp-line); padding-left: 28px; align-items: center; }
.kp-home .kp-trust-note svg { color: var(--kp-berry); }
.kp-home .kp-trust-note p { color: var(--kp-muted); font-size: 12px; line-height: 1.7; }

/* Interactive feature explorer */
.kp-home .kp-section-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 45px; margin-bottom: 38px; }
.kp-home .kp-section-heading h2 { margin-top: 13px; font-size: clamp(32px, 3.5vw, 46px); line-height: 1.15; font-weight: 650; letter-spacing: -.045em; }
.kp-home .kp-section-heading h2 > span { color: var(--kp-muted); }
.kp-home .kp-section-heading > p { max-width: 380px; color: var(--kp-muted); font-size: 15px; line-height: 1.8; }
.kp-home .kp-feature-tabs { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; padding: 8px; border: 1px solid var(--kp-line); background: #f8f8fb; border-radius: 14px; margin-bottom: 24px; }
.kp-home .kp-feature-tabs button { border: 1px solid transparent; background: transparent; display: flex; align-items: center; gap: 12px; padding: 16px 22px; font-size: 14px; font-weight: 600; border-radius: 10px; transition: background .2s,color .2s; }
.kp-home .kp-feature-tabs button > svg:last-child { margin-left: auto; opacity: .5; }
.kp-home .kp-feature-tabs button.is-active { background: white; border-color: #e7d9e0; box-shadow: 0 4px 10px #3525430f; color: var(--kp-berry); }
.kp-home .kp-feature-tabs button:hover { color: var(--kp-berry); background: #fff; }
.kp-home .kp-feature-panel { border: 1px solid #e8e5ed; border-radius: 18px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; min-height: 520px; }
.kp-home .kp-feature-copy { padding: 60px 55px; align-self: center; }
.kp-home .kp-feature-copy h3, .kp-home .kp-role-copy h3 { font-size: clamp(28px, 3vw, 38px); letter-spacing: -1.2px; font-weight: 620; line-height: 1.2; margin: 18px 0; }
.kp-home .kp-feature-copy > p, .kp-home .kp-role-copy > p { font-size: 14px; line-height: 1.85; color: var(--kp-muted); }
.kp-home .kp-check-list { list-style: none; padding: 0; display: grid; gap: 14px; margin: 28px 0 34px; }
.kp-home .kp-check-list li { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.kp-home .kp-check-list svg { color: var(--kp-berry); }
.kp-home .kp-feature-visual { position: relative; background: #f7f0f5; background-image: radial-gradient(#bea5b12e .8px,transparent .8px); background-size: 12px 12px; display: grid; align-items: center; padding: 50px; overflow: hidden; }
.kp-home .kp-feature-tuition { background-color: #eff6f1; }
.kp-home .kp-feature-progress { background-color: #f0eef9; }
.kp-home .kp-feature-screen { background: white; border-radius: 14px; border: 1px solid #e7dee9; box-shadow: var(--kp-shadow); padding: 28px; position: relative; z-index: 1; width: 100%; }
.kp-home .kp-feature-screen .kp-preview-heading h4 { font-size: 16px; }
.kp-home .kp-feature-screen .kp-person strong { font-size: 12px; }
.kp-home .kp-feature-screen .kp-student-row { padding-block: 14px; }
.kp-home .kp-feature-screen .kp-avatar { width: 36px; height: 36px; }
.kp-home .kp-visual-decoration { position: absolute; right: -20px; bottom: -43px; font-size: 200px; line-height: 1; color: #b9336015; transform: rotate(15deg); }
.kp-home .kp-register-note { display: flex; align-items: center; gap: 8px; padding: 12px 0 18px; color: #838293; font-size: 10px; }
.kp-home .kp-auto-save { margin-left: auto; color: #528164; font-size: 9px; }
.kp-home .kp-module-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 28px; }
.kp-home .kp-module-card { padding: 28px; border: 1px solid var(--kp-line); border-radius: 14px; transition: border-color .2s,transform .2s,box-shadow .2s; }
.kp-home .kp-module-card:hover { transform: translateY(-4px); border-color: #dfb8c6; box-shadow: 0 12px 22px -15px #74496038; }
.kp-home .kp-module-card .kp-icon { width: 42px; height: 42px; border-radius: 12px; }
.kp-home .kp-module-card h3 { margin: 20px 0 8px; font-size: 15px; font-weight: 650; }
.kp-home .kp-module-card p { color: var(--kp-muted); font-size: 13px; line-height: 1.75; }
.kp-home .kp-module-card > span:last-child { display: flex; gap: 6px; align-items: center; font-size: 11px; font-weight: 600; color: var(--kp-berry); margin-top: 22px; }


/* Alternate product screens */
.kp-home .kp-post { border: 1px solid #efebf2; border-radius: 8px; padding: 12px; }
.kp-home .kp-art { position: relative; overflow: hidden; height: 118px; border-radius: 7px; background: #eee7f7; margin: 12px 0; }
.kp-home .kp-art-sun { position: absolute; width: 42px; height: 42px; background: #e8b867; border-radius: 50%; top: 16px; right: 48px; }
.kp-home .kp-art-hill { position: absolute; width: 240px; height: 150px; border-radius: 50%; bottom: -95px; }
.kp-home .kp-art-hill-one { background: #88aaa0; left: -45px; transform: rotate(20deg); }
.kp-home .kp-art-hill-two { background: #688f7d; right: -70px; bottom: -80px; }
.kp-home .kp-art-tag { position: absolute; left: 10px; bottom: 10px; background: #ffffffed; border-radius: 5px; padding: 5px 8px; font-size: 8px; display: flex; align-items: center; gap: 5px; color: #666177; }
.kp-home .kp-post h5 { font-size: 11px; line-height: 1.5; }
.kp-home .kp-post p { font-size: 10px; color: #827d91; line-height: 1.7; margin-top: 6px; }
.kp-home .kp-post-footer { display: flex; align-items: center; gap: 7px; color: var(--kp-berry); font-size: 8px; padding-top: 12px; }
.kp-home .kp-finance-total { padding: 23px 0; }
.kp-home .kp-finance-total > span { font-size: 10px; color: #82818f; }
.kp-home .kp-finance-total > strong { display: block; font-size: 35px; font-weight: 600; color: #45485c; letter-spacing: -1.3px; }
.kp-home .kp-finance-total > strong > span { font-size: 23px; color: #aaa9b4; }
.kp-home .kp-payment-bar { margin: 19px 0 10px; border-radius: 8px; height: 9px; background: #f8ebcf; overflow: hidden; }
.kp-home .kp-payment-bar > span { display: block; height: 100%; width: 80%; background: #538d69; border-radius: inherit; }
.kp-home .kp-finance-legend { display: flex; justify-content: space-between; gap: 8px; font-size: 8px; color: #787b89; }
.kp-home .kp-invoice { display: flex; align-items: center; justify-content: space-between; gap: 10px; border-top: 1px solid #efedf3; padding: 15px 0; }
.kp-home .kp-invoice strong { font-size: 10px; display: block; }
.kp-home .kp-invoice small { font-size: 8px; display: block; color: #8e889b; margin-top: 2px; }
.kp-home .kp-progress-person { display: flex; align-items: center; gap: 10px; background: #f8f6fc; border-radius: 8px; padding: 13px; }
.kp-home .kp-progress-person strong { font-size: 11px; display: block; }
.kp-home .kp-progress-person small { font-size: 8px; color: #8c869b; display: block; }
.kp-home .kp-skills { margin: 23px 0; display: grid; gap: 17px; }
.kp-home .kp-skill > div:first-child { display: flex; justify-content: space-between; align-items: center; font-size: 9px; margin-bottom: 7px; }
.kp-home .kp-skill strong { font-weight: 550; }
.kp-home .kp-skill > div > span { font-size: 8px; color: #968aab; }
.kp-home .kp-skill-track { height: 6px; background: #f0edf7; border-radius: 4px; }
.kp-home .kp-skill-track > span { display: block; height: 100%; background: #9b89b9; border-radius: inherit; }
.kp-home .kp-observation { border-left: 2px solid #d5c4e8; padding-left: 12px; }
.kp-home .kp-observation p { font-size: 10px; line-height: 1.8; margin-top: 4px; }
.kp-home .kp-observation small { font-size: 8px; color: #97909e; }
/* Role explorer */
.kp-home .kp-community { background: #f9f8fb; border-block: 1px solid #f0edf3; }
.kp-home .kp-centered-heading { text-align: center; max-width: 700px; margin: 0 auto; }
.kp-home .kp-centered-heading h2 { margin-top: 15px; }
.kp-home .kp-centered-heading > p { color: var(--kp-muted); font-size: 14px; margin-top: 18px; }
.kp-home .kp-role-picker { display: flex; justify-content: center; gap: 7px; margin: 30px auto 54px; }
.kp-home .kp-role-picker button { background: transparent; border: 1px solid #dedbe5; border-radius: 50px; display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 11px 21px; }
.kp-home .kp-role-picker button.is-active { color: white; background: var(--kp-slate); border-color: var(--kp-slate); box-shadow: 0 6px 12px #4a4d5f1a; }
.kp-home .kp-role-content { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; max-width: 1050px; margin-inline: auto; }
.kp-home .kp-role-visual { position: relative; padding: 12px; }
.kp-home .kp-role-board { background: white; border: 1px solid #e5e0eb; border-radius: 16px; box-shadow: 0 20px 50px -25px #47365733; padding: 30px; position: relative; z-index: 1; transform: rotate(-2deg); }
.kp-home .kp-board-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 21px; }
.kp-home .kp-role-board h3 { font-size: 21px; font-weight: 620; letter-spacing: -.65px; }
.kp-home .kp-role-board > p { font-size: 10px; color: #898296; margin-top: 5px; }
.kp-home .kp-role-metrics { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin: 25px 0; }
.kp-home .kp-role-metrics > div { border: 1px solid #ede9f1; border-radius: 8px; padding: 12px 10px; background: #fdfcfe; }
.kp-home .kp-role-metrics strong { font-size: 23px; letter-spacing: -.8px; display: block; font-weight: 650; }
.kp-home .kp-role-metrics span { font-size: 8px; color: #87828f; display: block; margin-top: 4px; }
.kp-home .kp-role-tasks { list-style: none; padding: 0; margin: 9px 0 19px; }
.kp-home .kp-role-tasks li { display: flex; align-items: center; gap: 9px; font-size: 10px; border-bottom: 1px solid #f0edf3; padding: 12px 0; }
.kp-home .kp-role-tasks svg { color: #9983ac; }
.kp-home .kp-board-bottom { display: flex; align-items: center; gap: 6px; font-size: 8px; color: #8a8797; }
.kp-home .kp-small-dot { width: 5px; height: 5px; border-radius: 50%; background: #82958c; }
.kp-home .kp-role-orbit { position: absolute; border: 1px solid #dfd4e6; inset: -14px 15px; border-radius: 45%; transform: rotate(20deg); }
/* School story: typographic artwork instead of an invented logo */
.kp-home .kp-story { border: 1px solid var(--kp-line); border-radius: 18px; overflow: hidden; display: grid; grid-template-columns: .8fr 1.2fr; }
.kp-home .kp-story-art { position: relative; padding: 33px 37px; background: #f5eaf0; overflow: hidden; display: flex; flex-direction: column; min-height: 390px; }
.kp-home .kp-story-kicker { font-size: 9px; letter-spacing: .14em; font-weight: 650; color: #9b6478; position: relative; z-index: 1; }
.kp-home .kp-story-monogram { font-family: Georgia,serif; font-size: 165px; line-height: 1.35; color: #ad526f; letter-spacing: -27px; position: relative; z-index: 1; }
.kp-home .kp-story-monogram span { font-style: italic; opacity: .48; }
.kp-home .kp-story-school { font-size: 23px; font-weight: 600; letter-spacing: -.8px; margin-top: auto; position: relative; z-index: 1; }
.kp-home .kp-story-school > span { color: #937080; font-size: 11px; letter-spacing: 0; font-weight: 400; }
.kp-home .kp-story-line { position: absolute; height: 360px; width: 360px; right: -170px; top: 80px; border: 1px solid #d9b9c8; border-radius: 50%; box-shadow: 0 0 0 32px #e5ced933,0 0 0 65px #e5ced922; }
.kp-home .kp-story-copy { padding: 48px; align-self: center; }
.kp-home .kp-story-copy h3 { font-size: 30px; font-weight: 620; line-height: 1.2; letter-spacing: -1px; max-width: 430px; margin: 17px 0; }
.kp-home .kp-story-copy > p { font-size: 13px; line-height: 1.85; color: var(--kp-muted); }
.kp-home .kp-story-outcomes { display: grid; gap: 10px; border-block: 1px solid var(--kp-line); margin: 23px 0 17px; padding: 19px 0; }
.kp-home .kp-story-outcomes > span { display: flex; align-items: center; gap: 10px; font-size: 11px; }
.kp-home .kp-story-outcomes svg { color: var(--kp-berry); }
/* Onboarding and data */
.kp-home .kp-onboarding { background: linear-gradient(#fbfafc,#fff); border-top: 1px solid #f0eef4; }
.kp-home .kp-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 35px; }
.kp-home .kp-steps article { border-top: 1px solid #e0dce7; padding-top: 25px; }
.kp-home .kp-step-number { display: flex; width: 37px; height: 37px; align-items: center; justify-content: center; border: 1px solid #ead3dc; border-radius: 50%; background: #fff8fb; color: var(--kp-berry); font-size: 11px; font-weight: 650; }
.kp-home .kp-steps h3 { font-size: 18px; font-weight: 620; margin: 21px 0 10px; letter-spacing: -.5px; }
.kp-home .kp-steps p { font-size: 13px; color: var(--kp-muted); line-height: 1.8; }
.kp-home .kp-onboarding-bottom { margin-top: 37px; padding-top: 26px; border-top: 1px solid var(--kp-line); display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.kp-home .kp-onboarding-bottom > span { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--kp-muted); }
.kp-home .kp-data-care { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 25px; padding: 34px; border: 1px solid #e4e6eb; background: #f7f8fa; border-radius: 13px; }
.kp-home .kp-data-icon { width: 67px; height: 76px; background: #fff; border: 1px solid #e1e5e9; display: grid; place-items: center; border-radius: 17px; color: var(--kp-slate); }
.kp-home .kp-data-care .kp-eyebrow { font-size: 8px; color: #7b758b; }
.kp-home .kp-data-care h2 { font-size: 21px; line-height: 1.3; letter-spacing: -.5px; margin: 8px 0; }
.kp-home .kp-data-care p { color: var(--kp-muted); font-size: 11px; max-width: 585px; line-height: 1.8; }
.kp-home .kp-data-care .kp-button { font-size: 11px; }
/* FAQ */
.kp-home .kp-faq-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 100px; }
.kp-home .kp-faq h2 { margin: 17px 0; }
.kp-home .kp-faq-grid > div:first-child > p { font-size: 13px; color: var(--kp-muted); max-width: 290px; line-height: 1.8; }
.kp-home .kp-faq-items details { border-bottom: 1px solid var(--kp-line); }
.kp-home .kp-faq-items details:first-child { border-top: 1px solid var(--kp-line); }
.kp-home .kp-faq-items summary { display: flex; align-items: center; justify-content: space-between; gap: 18px; list-style: none; cursor: pointer; padding: 21px 0; font-size: 13px; font-weight: 600; }
.kp-home .kp-faq-items summary::-webkit-details-marker { display: none; }
.kp-home .kp-faq-items summary svg { color: #8a8196; transition: transform .2s; }
.kp-home .kp-faq-items details[open] summary { color: var(--kp-berry); }
.kp-home .kp-faq-items details[open] summary svg { transform: rotate(45deg); }
.kp-home .kp-faq-items details p { font-size: 12px; line-height: 1.85; padding: 0 25px 22px 0; color: var(--kp-muted); }
/* Final conversion panel */
.kp-home .kp-final-wrap { padding-bottom: 90px; }
.kp-home .kp-final { position: relative; overflow: hidden; background: #383c50; border-radius: 22px; padding: 64px 30px; text-align: center; color: white; background-image: radial-gradient(ellipse at 80% 15%,#86405b55,transparent 60%); }
.kp-home .kp-final > :not(.kp-final-orbit) { position: relative; }
.kp-home .kp-final .kp-eyebrow { color: #eab7ca; font-size: 9px; }
.kp-home .kp-final h2 { color: white; margin: 19px auto; font-size: clamp(29px,3.5vw,45px); }
.kp-home .kp-final h2 > span { color: #e4b8ca; }
.kp-home .kp-final > p { color: #c6c3d2; font-size: 13px; margin-bottom: 28px; }
.kp-home .kp-final .kp-button { background: white; color: #3f4655; border-color: white; }
.kp-home .kp-final .kp-button:hover { background: #f3e9ef; }
.kp-home .kp-final-note { display: block; font-size: 9px; color: #b9b4c7; margin-top: 17px; }
.kp-home .kp-final-orbit { position: absolute; width: 570px; height: 570px; border: 1px solid #ffffff0d; border-radius: 50%; top: -115px; right: -160px; box-shadow: 0 0 0 50px #ffffff03,0 0 0 100px #ffffff03; }
.kp-home .kp-footer { border-top: 1px solid var(--kp-line); padding: 36px 0; }
.kp-home .kp-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.kp-home .kp-footer p { color: #838091; font-size: 10px; margin-top: 6px; }
.kp-home .kp-footer nav { display: flex; flex-wrap: wrap; gap: 22px; }
.kp-home .kp-footer nav > a { font-size: 11px; display: inline-flex; gap: 4px; align-items: center; }
.kp-home .kp-footer small { color: #8d8898; font-size: 9px; }
/* Tablet */
@media (max-width: 1100px) {
  .kp-home .kp-container { width: calc(100% - 48px); }
  .kp-home .kp-nav { gap: 16px; }
  .kp-home .kp-nav > a:not(.kp-button) { font-size: 11px; }
  .kp-home .kp-hero-grid { gap: 30px; }
  .kp-home .kp-hero h1 { font-size: 43px; }
  .kp-home .kp-hero-description { font-size: 14px; }
  .kp-home .kp-hero .kp-actions { gap: 8px 18px; }
  .kp-home .kp-product-main { padding: 16px 12px 8px; }
  .kp-home .kp-preview-heading { flex-wrap: wrap; }
  .kp-home .kp-mini-stats { gap: 5px; }
  .kp-home .kp-mini-stats > div { padding: 8px; }
  .kp-home .kp-screen-card { padding: 12px; }
  .kp-home .kp-feature-copy { padding: 33px; }
  .kp-home .kp-feature-visual { padding: 27px; }
  .kp-home .kp-role-content { gap: 50px; }
  .kp-home .kp-story-copy { padding: 34px; }
  .kp-home .kp-data-care { grid-template-columns: auto 1fr; }
  .kp-home .kp-data-care > .kp-button { grid-column: 2; justify-self: start; }
  .kp-home .kp-faq-grid { gap: 50px; }
  .kp-home .kp-footer-inner { flex-wrap: wrap; }
}
@media (max-width: 850px) {
  .kp-home .kp-section { padding-block: 74px; }
  .kp-home .kp-header-inner { min-height: 74px; }
  .kp-home .kp-menu-toggle { display: flex; }
  .kp-home .kp-nav { display: none; position: absolute; left: 0; right: 0; top: 100%; padding: 22px 24px; background: #fff; border-bottom: 1px solid var(--kp-line); box-shadow: 0 18px 20px #4736570d; }
  .kp-home .kp-nav-open { display: flex; flex-direction: column; align-items: stretch; }
  .kp-home .kp-nav > a:not(.kp-button) { padding: 10px 0; font-size: 14px; }
  .kp-home .kp-hero { padding: 62px 0 65px; }
  .kp-home .kp-hero-grid { grid-template-columns: 1fr; gap: 30px; }
  .kp-home .kp-hero-copy { max-width: 620px; }
  .kp-home .kp-hero h1 { font-size: clamp(43px,7vw,61px); }
  .kp-home .kp-hero-description { max-width: 510px; font-size: 16px; }
  .kp-home .kp-hero-visual { max-width: 590px; width: 100%; margin: 0 auto; }
  .kp-home .kp-product-main { padding: 22px 18px 10px; }
  .kp-home .kp-screen-card { padding: 18px; }
  .kp-home .kp-product-window { transform: none; }
  .kp-home .kp-floating-note { left: 12px; }
  .kp-home .kp-trust-grid { grid-template-columns: 1.2fr 1fr 1fr; }
  .kp-home .kp-trust-note { display: none; }
  .kp-home .kp-trust-stat { padding-left: 25px; }
  .kp-home .kp-trust-stat strong { font-size: 30px; }
  .kp-home .kp-section-heading { gap: 25px; }
  .kp-home .kp-section-heading > p { max-width: 280px; font-size: 12px; }
  .kp-home .kp-feature-copy { padding: 28px; }
  .kp-home .kp-feature-visual { padding: 20px; }
  .kp-home .kp-feature-screen { padding: 17px; }
  .kp-home .kp-feature-tabs button { padding: 13px 12px; font-size: 12px; }
  .kp-home .kp-feature-tabs button > svg:last-child { display: none; }
  .kp-home .kp-module-grid { grid-template-columns: repeat(2,1fr); }
  .kp-home .kp-role-content { gap: 28px; }
  .kp-home .kp-role-board { padding: 22px; }
  .kp-home .kp-role-board h3 { font-size: 18px; }
  .kp-home .kp-role-metrics { gap: 5px; }
  .kp-home .kp-role-metrics > div { padding: 10px 6px; }
  .kp-home .kp-story { grid-template-columns: .75fr 1fr; }
  .kp-home .kp-story-copy { padding: 26px; }
  .kp-home .kp-story-copy h3 { font-size: 25px; }
  .kp-home .kp-story-art { padding: 27px; }
  .kp-home .kp-story-monogram { font-size: 135px; letter-spacing: -20px; }
  .kp-home .kp-steps { gap: 22px; }
  .kp-home .kp-steps h3 { font-size: 16px; }
  .kp-home .kp-steps p { font-size: 12px; }
}
/* Phone: stack stories, keep product previews legible, increase touch targets */
@media (max-width: 600px) {
  .kp-home .kp-container { width: calc(100% - 36px); }
  .kp-home .kp-section { padding-block: 58px; }
  .kp-home .kp-hero { padding: 46px 0 45px; }
  .kp-home .kp-hero h1 { font-size: clamp(36px,9.2vw,52px); letter-spacing: -.05em; }
  .kp-home .kp-eyebrow { font-size: 9px; }
  .kp-home .kp-hero-description { font-size: 14px; }
  .kp-home .kp-hero .kp-actions { gap: 10px 18px; }
  .kp-home .kp-hero-proof { margin-top: 24px; }
  .kp-home .kp-hero-visual { padding-top: 8px; }
  .kp-home .kp-product-window { border-radius: 10px; box-shadow: 0 20px 35px -15px #48365529; }
  .kp-home .kp-product-layout { grid-template-columns: 44px 1fr; }
  .kp-home .kp-product-sidebar { gap: 12px; }
  .kp-home .kp-product-sidebar > button { width: 40px; height: 44px; border-radius: 6px; }
  .kp-home .kp-product-main { padding: 16px 10px 8px; }
  .kp-home .kp-product-topline h3 { font-size: 15px; }
  .kp-home .kp-mini-stats { grid-template-columns: repeat(2,1fr); gap: 6px; }
  .kp-home .kp-mini-stats > div:last-child { display: none; }
  .kp-home .kp-screen-card { padding: 11px; }
  .kp-home .kp-preview-heading h4 { font-size: 12px; }
  .kp-home .kp-person { gap: 6px; }
  .kp-home .kp-person strong { font-size: 9px; }
  .kp-home .kp-person .kp-avatar { width: 25px; height: 25px; font-size: 8px; }
  .kp-home .kp-status { min-height: 44px; padding: 7px 6px; font-size: 8px; gap: 3px; }
  .kp-home .kp-student-row { padding: 7px 0; }
  .kp-home .kp-preview-heading .kp-pill { font-size: 8px; }
  .kp-home .kp-floating-note { padding: 11px 13px; gap: 8px; bottom: -1px; }
  .kp-home .kp-floating-note strong { font-size: 10px; }
  .kp-home .kp-floating-note div > span { font-size: 8px; }
  .kp-home .kp-visual-caption { margin-top: 16px; padding-bottom: 8px; }
  .kp-home .kp-trust { padding-block: 27px; }
  .kp-home .kp-trust-grid { grid-template-columns: repeat(2,1fr); gap: 24px; }
  .kp-home .kp-trust-intro { grid-column: 1/-1; }
  .kp-home .kp-trust h2 br { display: none; }
  .kp-home .kp-trust h2 { font-size: 20px; }
  .kp-home .kp-trust-stat { padding-left: 17px; }
  .kp-home .kp-trust-stat strong { font-size: 33px; }
  .kp-home .kp-section-heading { flex-direction: column; align-items: flex-start; gap: 18px; margin-bottom: 28px; }
  .kp-home .kp-section-heading > p { max-width: 100%; font-size: 13px; }
  .kp-home .kp-feature-tabs { gap: 3px; padding: 5px; }
  .kp-home .kp-feature-tabs button { flex-direction: column; gap: 5px; padding: 11px 3px; font-size: 10px; }
  .kp-home .kp-feature-tabs button > svg { width: 17px; }
  .kp-home .kp-feature-panel { grid-template-columns: 1fr; }
  .kp-home .kp-feature-copy { padding: 28px 24px; }
  .kp-home .kp-feature-copy h3, .kp-home .kp-role-copy h3 { font-size: 28px; }
  .kp-home .kp-feature-visual { padding: 27px 20px; min-height: 370px; }
  .kp-home .kp-feature-screen .kp-person strong { font-size: 10px; }
  .kp-home .kp-feature-screen .kp-student-row { padding-block: 8px; }
  .kp-home .kp-module-grid { gap: 10px; margin-top: 15px; }
  .kp-home .kp-module-card { padding: 19px 16px; }
  .kp-home .kp-module-card h3 { font-size: 13px; }
  .kp-home .kp-module-card p { font-size: 11px; }
  .kp-home .kp-module-card > span:last-child { font-size: 9px; }
  .kp-home .kp-centered-heading h2 { font-size: 31px; }
  .kp-home .kp-centered-heading > p { font-size: 13px; }
  .kp-home .kp-role-picker { gap: 5px; margin: 25px 0 31px; }
  .kp-home .kp-role-picker button { flex: 1; justify-content: center; gap: 5px; padding: 11px 7px; font-size: 10px; min-height: 44px; }
  .kp-home .kp-role-picker svg { width: 15px; }
  .kp-home .kp-role-content { grid-template-columns: 1fr; gap: 38px; }
  .kp-home .kp-role-visual { max-width: 400px; width: 100%; margin: auto; padding: 12px 18px; }
  .kp-home .kp-role-board { padding: 26px; }
  .kp-home .kp-role-board h3 { font-size: 21px; }
  .kp-home .kp-role-copy { padding-inline: 6px; }
  .kp-home .kp-story { grid-template-columns: 1fr; }
  .kp-home .kp-story-art { min-height: 245px; padding: 25px; }
  .kp-home .kp-story-monogram { position: absolute; right: 37px; top: 25px; font-size: 155px; }
  .kp-home .kp-story-school { margin-top: 95px; }
  .kp-home .kp-story-copy { padding: 29px 25px; }
  .kp-home .kp-story-copy h3 { font-size: 28px; }
  .kp-home .kp-steps { grid-template-columns: 1fr; gap: 26px; }
  .kp-home .kp-steps article { display: grid; grid-template-columns: 38px 1fr; gap: 0 18px; padding-top: 22px; }
  .kp-home .kp-step-number { grid-row: span 2; }
  .kp-home .kp-steps h3 { margin: 2px 0 8px; font-size: 18px; }
  .kp-home .kp-steps p { grid-column: 2; font-size: 13px; }
  .kp-home .kp-onboarding-bottom { flex-direction: column; align-items: flex-start; }
  .kp-home .kp-onboarding-bottom > span { font-size: 11px; }
  .kp-home .kp-data-care { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; padding: 25px; }
  .kp-home .kp-data-icon { height: 55px; width: 55px; border-radius: 13px; }
  .kp-home .kp-data-care h2 { font-size: 24px; }
  .kp-home .kp-data-care p { font-size: 12px; }
  .kp-home .kp-faq-grid { grid-template-columns: 1fr; gap: 30px; }
  .kp-home .kp-faq-grid > div:first-child > p { max-width: 100%; }
  .kp-home .kp-faq-items summary { font-size: 13px; }
  .kp-home .kp-final-wrap { padding-bottom: 52px; }
  .kp-home .kp-final { padding: 43px 23px; border-radius: 16px; }
  .kp-home .kp-final h2 { font-size: 31px; }
  .kp-home .kp-final-note { font-size: 8px; }
  .kp-home .kp-footer-inner { align-items: flex-start; flex-direction: column; gap: 22px; }
  .kp-home .kp-footer nav { gap: 14px 20px; }
}
/* Updated image-led hero */
.kp-home .kp-hero.kp-hero-refresh {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 64px 0 52px;
  background:
    radial-gradient(
      ellipse at 76% 38%,
      rgba(124, 215, 202, 0.22),
      transparent 58%
    ),
    radial-gradient(
      ellipse at 5% 10%,
      rgba(255, 255, 255, 0.98),
      transparent 52%
    ),
    linear-gradient(118deg, #effaf8 0%, #f8fdfc 46%, #e4f5f1 100%);
}

.kp-home .kp-hero-refresh::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  background-image: radial-gradient(
    rgba(32, 127, 120, 0.16) 0.6px,
    transparent 0.6px
  );
  background-size: 7px 7px;
  mask-image: linear-gradient(to bottom, #000, transparent 90%);
}

.kp-home .kp-hero-refresh::after {
  content: '';
  position: absolute;
  z-index: 0;
  width: 115%;
  height: 380px;
  left: -24%;
  bottom: -300px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transform: rotate(8deg);
  background: rgba(255, 255, 255, 0.24);
  box-shadow:
    0 -20px 0 rgba(255, 255, 255, 0.2),
    0 -42px 0 rgba(120, 196, 184, 0.07),
    0 -65px 0 rgba(255, 255, 255, 0.17);
  pointer-events: none;
}

.kp-home .kp-hero-refresh .kp-hero-ribbon {
  position: absolute;
  z-index: 0;
  width: 1000px;
  height: 370px;
  top: -270px;
  right: -280px;
  border: 26px solid rgba(255, 255, 255, 0.34);
  border-radius: 50%;
  transform: rotate(-22deg);
  box-shadow:
    0 16px 32px rgba(31, 133, 119, 0.04),
    inset 0 -10px 22px rgba(31, 133, 119, 0.04);
  pointer-events: none;
}

.kp-home .kp-hero-refresh .kp-hero-grid {
  position: relative;
  z-index: 1;
  width: min(1200px, calc(100% - 80px));
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.32fr);
  align-items: stretch;
  gap: 24px;
}

.kp-home .kp-hero-refresh .kp-hero-copy {
  position: relative;
  z-index: 2;
  min-width: 0;
  max-width: 560px;
  padding-block: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}

.kp-home .kp-hero-refresh .kp-eyebrow {
  color: #218f8a;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.12em;
  line-height: 1.6;
}

.kp-home .kp-hero-refresh h1 {
  margin: 20px 0 24px;
  color: #10223c;
  font-size: clamp(36px, 3.65vw, 57px);
  font-weight: 750;
  line-height: 1.09;
  letter-spacing: -0.055em;
}

.kp-home .kp-hero-refresh h1 > span {
  color: #119c92;
}

.kp-home .kp-hero-refresh .kp-hero-description {
  max-width: 425px;
  color: #526578;
  font-size: 16px;
  line-height: 1.7;
}

.kp-home .kp-hero-refresh .kp-actions {
  gap: 12px;
  margin-top: 27px;
}

.kp-home .kp-hero-refresh .kp-button {
  min-height: 48px;
  padding: 13px 19px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  gap: 10px;
}

.kp-home .kp-hero-refresh .kp-button-primary {
  color: #fff;
  border-color: #159e98;
  background: linear-gradient(135deg, #23aaa5, #09978f);
  box-shadow:
    0 7px 16px rgba(15, 150, 142, 0.19),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.kp-home .kp-hero-refresh .kp-button-primary:hover {
  background: linear-gradient(135deg, #199c96, #07857e);
  transform: translateY(-2px);
}

.kp-home .kp-hero-refresh .kp-button-secondary {
  color: #172a40;
  border-color: rgba(217, 231, 228, 0.95);
  background: rgba(255, 255, 255, 0.94);
  box-shadow:
    0 5px 12px rgba(36, 78, 72, 0.07),
    inset 0 1px 0 #fff;
}

.kp-home .kp-hero-refresh .kp-button-secondary:hover {
  color: #087f78;
  border-color: #a8d9d1;
  background: #fff;
}

.kp-home .kp-hero-refresh .kp-hero-audience {
  margin-top: 17px;
  color: #677c86;
  font-size: 11px;
  line-height: 1.6;
}

.kp-home .kp-hero-refresh .kp-hero-artwork {
  position: relative;
  z-index: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.kp-home .kp-hero-refresh .kp-hero-image {
  display: block;
  width: 100%;
  max-width: none;
  height: 100%;
  min-height: 480px;
  object-fit: contain;
  object-position: right center;
  align-self: stretch;
}

/* Tablet */
@media (max-width: 1100px) {
  .kp-home .kp-hero.kp-hero-refresh {
    padding: 48px 0;
  }

.kp-home .kp-hero-refresh .kp-hero-grid {
  width: min(1200px, calc(100% - 48px));
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 20px;
}

  .kp-home .kp-hero-refresh h1 {
    font-size: clamp(34px, 4vw, 44px);
  }

  .kp-home .kp-hero-refresh .kp-hero-description {
    font-size: 15px;
  }
}

/* Stacked layout */
@media (max-width: 850px) {
  .kp-home .kp-hero.kp-hero-refresh {
    padding: 48px 0 30px;
  }

  .kp-home .kp-hero-refresh .kp-hero-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .kp-home .kp-hero-refresh .kp-hero-copy {
    max-width: 620px;
    padding: 0;
  }

  .kp-home .kp-hero-refresh h1 {
    font-size: clamp(39px, 6.6vw, 56px);
  }

  .kp-home .kp-hero-refresh .kp-hero-description {
    max-width: 470px;
    font-size: 16px;
  }

  .kp-home .kp-hero-refresh .kp-hero-artwork {
    max-width: 720px;
    margin-inline: auto;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .kp-home .kp-hero.kp-hero-refresh {
    padding: 38px 0 24px;
  }

.kp-home .kp-hero-refresh .kp-hero-grid {
  width: min(1200px, calc(100% - 36px));
  gap: 24px;
}
  .kp-home .kp-hero-refresh .kp-eyebrow {
    font-size: 9px;
    letter-spacing: 0.1em;
  }

  .kp-home .kp-hero-refresh h1 {
    margin: 17px 0 20px;
    font-size: clamp(30px, 8.5vw, 48px);
    line-height: 1.12;
  }

  .kp-home .kp-hero-refresh .kp-hero-description {
    font-size: 14px;
    line-height: 1.75;
  }

  .kp-home .kp-hero-refresh .kp-actions {
    margin-top: 23px;
    gap: 10px;
  }

  .kp-home .kp-hero-refresh .kp-button {
    padding: 12px 15px;
    font-size: 11px;
  }

  .kp-home .kp-hero-refresh .kp-hero-audience {
    font-size: 10px;
    margin-top: 15px;
  }
}

/* Connected platform: stats strip and six preview cards */
.kp-home .kp-connected-trust,
.kp-home .kp-connected-platform {
  --connected-ink: #10213d;
  --connected-muted: #52677d;
  --connected-teal: #009e95;
  --connected-pink: #ff438f;
  --connected-blue: #0793be;
  color: var(--connected-ink);
}

.kp-home .kp-connected-trust {
  padding: 27px 0 24px;
  background: linear-gradient(180deg, #f8fdfc 0%, #fff 100%);
}

.kp-home .kp-connected-trust-inner {
  display: grid;
  grid-template-columns: 1.2fr 1.15fr 1.15fr .85fr 1fr .8fr .8fr;
  align-items: center;
}

.kp-home .kp-connected-trust-inner > * {
  min-width: 0;
  min-height: 58px;
}

.kp-home .kp-connected-trust-inner > * + * {
  border-left: 1px solid #d9e3e9;
}

.kp-home .kp-connected-stat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 15px;
}

.kp-home .kp-connected-stat > svg {
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  stroke-width: 1.6;
  color: #12b87b;
}

.kp-home .kp-connected-stat.is-blue > svg {
  color: #058fbb;
}

.kp-home .kp-connected-stat strong {
  display: block;
  color: var(--connected-ink);
  font-size: 23px;
  font-weight: 750;
  letter-spacing: -.7px;
  line-height: 1.2;
}

.kp-home .kp-connected-stat div > span {
  display: block;
  color: var(--connected-muted);
  font-size: 12px;
  margin-top: 4px;
}

.kp-home .kp-connected-school {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 17px;
  text-align: center;
}

.kp-home .kp-connected-school img {
  display: block;
  width: 100%;
  max-width: 116px;
  height: 57px;
  object-fit: contain;
}

.kp-home .kp-connected-school > strong {
  font-size: 13px;
  line-height: 1.3;
  color: var(--connected-ink);
}

.kp-home .kp-connected-platform {
  padding: 27px 0 38px;
  scroll-margin-top: 100px;
  background:
    radial-gradient(
      ellipse at 48% 100%,
      rgba(227, 248, 245, .38),
      transparent 65%
    ),
    #fff;
}

.kp-home .kp-connected-heading {
  margin-bottom: 27px;
}

.kp-home .kp-connected-heading h2 {
  color: var(--connected-ink);
  font-size: clamp(26px, 2.65vw, 37px);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -1.15px;
}

.kp-home .kp-connected-heading h2 > span {
  color: #078b8b;
}

.kp-home .kp-connected-heading > p {
  margin-top: 10px;
  color: var(--connected-muted);
  font-size: 14px;
  line-height: 1.65;
}

.kp-home .kp-connected-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.kp-home .kp-connected-card {
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

.kp-home .kp-connected-card.is-teal {
  --card-accent: var(--connected-teal);
  --card-icon-bg: #e6f8f4;
}

.kp-home .kp-connected-card.is-blue {
  --card-accent: var(--connected-blue);
  --card-icon-bg: #e9f6fc;
}

.kp-home .kp-connected-card.is-tinted {
  background:
    radial-gradient(
      ellipse at 80% 20%,
      rgba(255, 255, 255, .75),
      transparent 65%
    ),
    linear-gradient(135deg, #eaf8f5, #f0fbfa);
}

.kp-home .kp-connected-card-head {
  display: grid;
  grid-template-columns: 43px minmax(0, 1fr) 25px;
  align-items: start;
  gap: 10px;
}

.kp-home .kp-connected-icon {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border-radius: 12px;
  color: var(--card-accent);
  background: var(--card-icon-bg);
}

.kp-home .kp-connected-card-copy h3 {
  margin: 6px 0 8px;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 750;
  letter-spacing: -.35px;
  color: var(--connected-ink);
}

.kp-home .kp-connected-card-copy p {
  margin: 0;
  color: var(--connected-muted);
  font-size: 12px;
  line-height: 1.65;
}

.kp-home .kp-connected-card .kp-connected-card-link {
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
}

.kp-home .kp-connected-card .kp-connected-card-link:hover {
  background: var(--card-icon-bg);
  transform: translateX(2px);
}

.kp-home .kp-connected-card .kp-connected-card-link:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 3px;
}

.kp-home .kp-connected-card-link svg {
  width: 17px;
  height: 17px;
  stroke-width: 1.8;
}

.kp-home .kp-connected-card.is-teal .kp-connected-card-link {
  color: #8e78ad;
}

.kp-home .kp-connected-sr {
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

.kp-home .kp-connected-preview {
  margin-top: auto;
  padding-top: 20px;
  min-width: 0;
  font-size: 10px;
  line-height: 1.4;
  color: #344b65;
}

/* Student records */
.kp-home .kp-connected-student-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #f4f7f8;
  border-radius: 7px;
  margin-bottom: 9px;
}

.kp-home .kp-connected-student-tabs > span {
  position: relative;
  padding: 10px 4px;
  text-align: center;
  font-size: 10px;
  color: #8290a0;
}

.kp-home .kp-connected-student-tabs > .is-selected {
  color: #20394f;
  background: #fff;
  font-weight: 700;
  border-radius: 7px 7px 0 0;
}

.kp-home .kp-connected-student-tabs > .is-selected::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 2px;
  border-radius: 2px;
  background: #169eb4;
}

.kp-home .kp-connected-student {
  display: grid;
  grid-template-columns: 27px minmax(0, 1fr) 56px auto;
  gap: 7px;
  align-items: center;
  padding: 7px 5px;
}

.kp-home .kp-connected-avatar {
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

.kp-home .kp-connected-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kp-home .kp-connected-student-name {
  font-size: 10px;
  font-weight: 500;
}

.kp-home .kp-connected-year {
  font-size: 9px;
}

.kp-home .kp-connected-badge {
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

.kp-home .kp-connected-badge i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #23b875;
}

/* Timetable */
.kp-home .kp-connected-timetable {
  padding: 7px 7px 10px;
  background: rgba(255, 255, 255, .86);
  border-radius: 10px;
}

.kp-home .kp-connected-timetable-row {
  display: grid;
  grid-template-columns: 36px repeat(3, minmax(0, 1fr));
  gap: 7px;
  align-items: stretch;
  margin-top: 8px;
}

.kp-home .kp-connected-timetable-row.is-days {
  margin: 0 0 12px;
  align-items: center;
  text-align: center;
  font-size: 9px;
  font-weight: 600;
}

.kp-home .kp-connected-time {
  align-self: center;
  font-size: 9px;
}

.kp-home .kp-connected-timetable-row > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  min-height: 49px;
  padding: 7px;
  border-radius: 7px;
  background: linear-gradient(130deg, #e9f7ff, #e3f1fd);
}

.kp-home .kp-connected-timetable-row strong {
  font-size: 8px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.kp-home .kp-connected-timetable-row div > span {
  font-size: 8px;
  color: #66839b;
}

/* Parent message and shared photos */
.kp-home .kp-connected-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.kp-home .kp-connected-message > .kp-connected-avatar {
  width: 33px;
  height: 33px;
}

.kp-home .kp-connected-message-body {
  flex: 1;
  min-width: 0;
}

.kp-home .kp-connected-bubble {
  padding: 11px 12px 7px;
  border-radius: 0 10px 10px 10px;
  background: #f4f6f9;
}

.kp-home .kp-connected-bubble p {
  margin: 0;
  font-size: 10px;
  line-height: 1.55;
}

.kp-home .kp-connected-bubble p > span {
  color: #f45194;
}

.kp-home .kp-connected-bubble time {
  display: block;
  text-align: right;
  font-size: 8px;
  color: #9aa6b2;
  margin-top: 4px;
}

.kp-home .kp-connected-gallery {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 7px;
  margin-top: 8px;
}

.kp-home .kp-connected-photo {
  min-height: 75px;
  border-radius: 8px;
  background-color: #e6f1ee;
  background-size: cover;
  background-position: center;
}

.kp-home .kp-connected-photo.is-more {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-position: 80% center;
}

.kp-home .kp-connected-photo.is-more::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(27, 47, 56, .43);
}

.kp-home .kp-connected-photo.is-more > span {
  position: relative;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}

/* Invoice */
.kp-home .kp-connected-invoice {
  padding: 15px;
  border: 1px solid #eef3f4;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 4px 11px rgba(28, 65, 78, .055);
}

.kp-home .kp-connected-invoice-heading,
.kp-home .kp-connected-invoice-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.kp-home .kp-connected-invoice-heading {
  margin-bottom: 16px;
}

.kp-home .kp-connected-invoice-heading > strong {
  font-size: 10px;
  font-weight: 750;
}

.kp-home .kp-connected-invoice-line {
  margin-top: 13px;
  font-size: 11px;
}

.kp-home .kp-connected-invoice-line.is-total {
  border-top: 1px solid #edf1f5;
  padding-top: 12px;
  color: #1b314e;
}

/* Learning progress */
.kp-home .kp-connected-progress {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 0 4px;
}

.kp-home .kp-connected-avatar.is-large {
  width: 58px;
  height: 58px;
  font-size: 16px;
  border-width: 3px;
}

.kp-home .kp-connected-progress-body {
  min-width: 0;
  flex: 1;
}

.kp-home .kp-connected-progress-name {
  display: block;
  font-size: 10px;
  color: #20344f;
  font-weight: 750;
}

.kp-home .kp-connected-progress-year {
  display: block;
  font-size: 8px;
  color: #7d8da0;
  margin-top: 2px;
  margin-bottom: 8px;
}

.kp-home .kp-connected-skill {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto;
  gap: 7px;
  align-items: center;
  padding: 7px 0;
  font-size: 10px;
}

.kp-home .kp-connected-skill-dot {
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff2de;
}

.kp-home .kp-connected-skill-dot > span {
  display: block;
  width: 6px;
  height: 8px;
  border-radius: 50% 50% 45% 45%;
  background: #f8b651;
  box-shadow: inset -2px -1px 0 #ed962b;
}

.kp-home .kp-connected-badge.is-excellent {
  color: #1788b7;
  background: #e3f4ff;
}

/* Campus overview */
.kp-home .kp-connected-campuses {
  padding: 8px 12px;
  border: 1px solid #edf3f3;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 4px 11px rgba(28, 65, 78, .04);
}

.kp-home .kp-connected-campus {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  font-size: 10px;
}

.kp-home .kp-connected-campus > span:nth-child(2) {
  font-size: 9px;
  color: #687b90;
}

.kp-home .kp-connected-badge.is-attention {
  color: #ed3f88;
  background: #ffe4f0;
}

.kp-home .kp-connected-badge.is-attention i {
  background: #ff4591;
}

/* Responsive layout */
@media (max-width: 1100px) {
  .kp-home .kp-connected-stat {
    gap: 10px;
    padding-inline: 10px;
  }

  .kp-home .kp-connected-stat > svg {
    width: 28px;
    height: 28px;
  }

  .kp-home .kp-connected-stat strong {
    font-size: 20px;
  }

  .kp-home .kp-connected-school {
    padding-inline: 10px;
  }

  .kp-home .kp-connected-grid {
    gap: 13px;
  }

  .kp-home .kp-connected-card {
    padding: 16px 11px 12px;
  }

  .kp-home .kp-connected-card-head {
    grid-template-columns: 35px minmax(0, 1fr) 22px;
    gap: 7px;
  }

  .kp-home .kp-connected-icon {
    width: 35px;
    height: 35px;
    border-radius: 9px;
  }

  .kp-home .kp-connected-card-copy h3 {
    font-size: 12px;
  }

  .kp-home .kp-connected-card-copy p {
    font-size: 11px;
  }

  .kp-home .kp-connected-student {
    gap: 5px;
    grid-template-columns: 24px minmax(0, 1fr) 45px auto;
  }

  .kp-home .kp-connected-student-name,
  .kp-home .kp-connected-year {
    font-size: 8px;
  }

  .kp-home .kp-connected-campus {
    gap: 6px;
    font-size: 9px;
  }

  .kp-home .kp-connected-progress {
    gap: 8px;
  }

  .kp-home .kp-connected-avatar.is-large {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 850px) {
  .kp-home .kp-connected-trust-inner {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 22px;
  }

  .kp-home .kp-connected-stat {
    grid-column: span 4;
  }

  .kp-home .kp-connected-school {
    grid-column: span 3;
  }

  .kp-home .kp-connected-trust-inner > :nth-child(4) {
    border-left: 0;
  }

  .kp-home .kp-connected-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .kp-home .kp-connected-card {
    padding: 18px 14px 15px;
  }

  .kp-home .kp-connected-card-copy h3 {
    font-size: 14px;
  }

  .kp-home .kp-connected-preview {
    padding-top: 22px;
  }
}

@media (max-width: 600px) {
  .kp-home .kp-connected-trust {
    padding-top: 23px;
  }

  .kp-home .kp-connected-stat {
    gap: 7px;
    padding-inline: 5px;
  }

  .kp-home .kp-connected-stat > svg {
    width: 24px;
    height: 24px;
  }

  .kp-home .kp-connected-stat strong {
    font-size: 17px;
  }

  .kp-home .kp-connected-stat div > span {
    font-size: 9px;
  }

  .kp-home .kp-connected-school {
    padding-inline: 7px;
  }

  .kp-home .kp-connected-school img {
    height: 45px;
  }

  .kp-home .kp-connected-school > strong {
    font-size: 10px;
  }

  .kp-home .kp-connected-platform {
    padding-top: 15px;
  }

  .kp-home .kp-connected-heading h2 {
    font-size: 29px;
    letter-spacing: -.9px;
  }

  .kp-home .kp-connected-heading > p {
    font-size: 13px;
  }

  .kp-home .kp-connected-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 15px;
  }

  .kp-home .kp-connected-card {
    padding: 19px 17px 17px;
  }

  .kp-home .kp-connected-card-head {
    grid-template-columns: 43px minmax(0, 1fr) 32px;
    gap: 10px;
  }

  .kp-home .kp-connected-icon {
    width: 43px;
    height: 43px;
  }

  .kp-home .kp-connected-card .kp-connected-card-link {
    width: 32px;
    min-height: 44px;
  }

  .kp-home .kp-connected-card-copy h3 {
    font-size: 15px;
  }

  .kp-home .kp-connected-card-copy p {
    font-size: 12px;
  }

  .kp-home .kp-connected-student-name {
    font-size: 10px;
  }

  .kp-home .kp-connected-year {
    font-size: 9px;
  }

  .kp-home .kp-connected-student {
    grid-template-columns: 27px minmax(0, 1fr) 58px auto;
    gap: 8px;
  }

  .kp-home .kp-connected-avatar.is-large {
    width: 58px;
    height: 58px;
  }

  .kp-home .kp-connected-campus {
    font-size: 10px;
    gap: 9px;
  }
}

/* People section */
.kp-home .kp-people-section {
  padding: 42px 0 24px;
  color: #10243e;
  scroll-margin-top: 90px;
  background:
    radial-gradient(ellipse at 77% 26%, #dcf1eb 0%, transparent 58%),
    linear-gradient(110deg, #f2fbf8, #edf9f5 65%, #e4f4ef);
}

.kp-home .kp-people-stage {
  position: relative;
  min-height: 440px;
}

.kp-home .kp-people-intro {
  position: relative;
  z-index: 3;
  width: 46%;
  padding: 10px 0 0;
}

.kp-home .kp-people-intro h2 {
  margin: 0;
  color: #10243e;
  font-size: clamp(26px, 2.55vw, 36px);
  line-height: 1.17;
  letter-spacing: -1.15px;
  font-weight: 750;
}

.kp-home .kp-people-tabs {
  display: flex;
  gap: 35px;
  margin-top: 23px;
  border-bottom: 1px solid #d3e7e2;
}

.kp-home .kp-people-tabs button {
  position: relative;
  min-height: 48px;
  padding: 10px 0 13px;
  background: transparent;
  border: 0;
  color: #617a88;
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
}

.kp-home .kp-people-tabs button::after {
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

.kp-home .kp-people-tabs button.is-active {
  color: #10243e;
  font-weight: 750;
}

.kp-home .kp-people-tabs button.is-active::after {
  transform: scaleX(1);
}

.kp-home .kp-people-tabs button:focus-visible {
  outline: 2px solid #129e98;
  outline-offset: 4px;
  border-radius: 3px;
}

.kp-home .kp-people-panel {
  margin-top: 28px;
}

.kp-home .kp-people-panel:focus-visible {
  outline: 2px solid #129e98;
  outline-offset: 5px;
}

.kp-home .kp-people-benefits {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 23px;
  width: 44%;
  padding-bottom: 38px;
  animation: kp-people-enter .28s ease both;
}

.kp-home .kp-people-benefit {
  display: grid;
  grid-template-columns: 27px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.kp-home .kp-people-check {
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

.kp-home .kp-people-benefit h3 {
  margin: 0 0 5px;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 750;
  letter-spacing: -.2px;
}

.kp-home .kp-people-benefit p {
  margin: 0;
  max-width: 345px;
  color: #627e8c;
  font-size: 12px;
  line-height: 1.6;
}

/* Role-specific photograph and floating dashboard */
.kp-home .kp-people-visual {
  position: absolute;
  inset: -42px -25px 10px 47%;
  pointer-events: none;
}

.kp-home .kp-people-photo {
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

.kp-home .kp-people-visual::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 30%;
  height: 345px;
  background: linear-gradient(90deg, #edf9f5, transparent);
}

.kp-home .kp-people-dashboard-wrap {
  position: absolute;
  z-index: 2;
  width: 88%;
  max-width: 475px;
  left: -8px;
  top: 145px;
  animation: kp-people-enter .3s ease both;
}

.kp-home .kp-people-dashboard {
  padding: 21px 20px 10px;
  border: 1px solid #ffffffef;
  border-radius: 15px;
  background: rgba(255, 255, 255, .97);
  box-shadow:
    0 15px 35px rgba(35, 108, 107, .14),
    0 3px 8px rgba(35, 108, 107, .04);
}

.kp-home .kp-people-dashboard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.kp-home .kp-people-dashboard-top h3 {
  font-size: 13px;
  font-weight: 750;
  margin: 0;
  letter-spacing: -.3px;
}

.kp-home .kp-people-filter {
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

.kp-home .kp-people-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 25px 0 20px;
}

.kp-home .kp-people-metrics > div {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.kp-home .kp-people-metrics svg {
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  stroke-width: 1.7;
  color: #079eac;
}

.kp-home .kp-people-metrics > div:nth-child(2) svg {
  color: #ff4d98;
}

.kp-home .kp-people-metrics > div:nth-child(3) svg {
  color: #169fe3;
}

.kp-home .kp-people-metrics strong,
.kp-home .kp-people-metrics small {
  display: block;
}

.kp-home .kp-people-metrics strong {
  font-size: 12px;
  line-height: 1.3;
  font-weight: 750;
}

.kp-home .kp-people-metrics small {
  color: #748898;
  font-size: 8px;
  margin-top: 3px;
}

.kp-home .kp-people-table-wrap {
  overflow-x: auto;
}

.kp-home .kp-people-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 8px;
}

.kp-home .kp-people-table th {
  background: #f5f8fa;
  font-size: 8px;
  color: #687f91;
  font-weight: 600;
  padding: 8px 7px;
}

.kp-home .kp-people-table td {
  padding: 7px;
  border-bottom: 1px solid #f0f4f5;
  color: #435e74;
  white-space: nowrap;
}

.kp-home .kp-people-table tr:last-child td {
  border-bottom: 0;
}

.kp-home .kp-people-status {
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

.kp-home .kp-people-status i {
  display: block;
  width: 5px;
  height: 5px;
  background: #22b67c;
  border-radius: 50%;
}

.kp-home .kp-people-status.is-alert {
  background: #ffe5f0;
  color: #f03b84;
}

.kp-home .kp-people-status.is-alert i {
  background: #ff438f;
}

.kp-home .kp-people-status.is-blue {
  color: #1687bb;
  background: #e6f5ff;
}

.kp-home .kp-people-sample {
  display: block;
  margin-top: 7px;
  text-align: right;
  color: #8499a5;
  font-size: 7px;
}

.kp-home .kp-people-lesson {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 0;
  border-top: 1px solid #edf3f4;
}

.kp-home .kp-people-lesson time {
  color: #74909d;
  font-size: 9px;
}

.kp-home .kp-people-lesson > div {
  flex: 1;
}

.kp-home .kp-people-lesson strong,
.kp-home .kp-people-lesson div > span {
  display: block;
}

.kp-home .kp-people-lesson strong {
  font-size: 10px;
  font-weight: 650;
}

.kp-home .kp-people-lesson div > span {
  margin-top: 3px;
  font-size: 8px;
  color: #78909e;
}

.kp-home .kp-people-child {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 22px 0 17px;
}

.kp-home .kp-people-child > div {
  flex: 1;
}

.kp-home .kp-people-child strong,
.kp-home .kp-people-child div > span {
  display: block;
  font-size: 10px;
}

.kp-home .kp-people-child div > span {
  font-size: 8px;
  color: #718b9a;
  margin-top: 3px;
}

.kp-home .kp-people-family-update {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  background: #eff9f6;
}

.kp-home .kp-people-update-icon {
  color: #11a596;
}

.kp-home .kp-people-family-update strong {
  font-size: 10px;
}

.kp-home .kp-people-family-update p {
  margin: 5px 0 0;
  font-size: 9px;
  color: #607d8a;
  line-height: 1.65;
}

.kp-home .kp-people-family-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 19px;
  padding-bottom: 7px;
}

.kp-home .kp-people-family-bottom > span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  color: #618392;
}

/* Dark teal parent app section */
.kp-home .kp-parent-banner {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  min-height: 390px;
  border: 1px solid #14757b;
  border-radius: 19px;
  color: #fff;
  background:
    radial-gradient(ellipse at 20% 75%, #117d7d66, transparent 60%),
    linear-gradient(115deg, #005960, #004b53 65%, #005961);
}

.kp-home .kp-parent-banner::before {
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

.kp-home .kp-parent-banner-copy {
  position: relative;
  z-index: 2;
  padding: 32px 30px 29px 0;
}

.kp-home .kp-parent-banner-copy h2 {
  color: #fff;
  font-size: clamp(25px, 2.4vw, 34px);
  line-height: 1.2;
  letter-spacing: -.8px;
  font-weight: 650;
}

.kp-home .kp-parent-banner-copy > p {
  color: #d0e6e6;
  font-size: 15px;
  line-height: 1.6;
  max-width: 415px;
  margin: 12px 0 21px;
}

.kp-home .kp-parent-benefits {
  display: grid;
  gap: 17px;
}

.kp-home .kp-parent-benefit {
  display: flex;
  align-items: flex-start;
  gap: 13px;
}

.kp-home .kp-parent-benefit > span {
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

.kp-home .kp-parent-benefit h3 {
  font-size: 13px;
  font-weight: 650;
  color: #fff;
  margin: 1px 0 4px;
}

.kp-home .kp-parent-benefit p {
  color: #bbd9db;
  font-size: 11px;
  line-height: 1.5;
  margin: 0;
}

.kp-home .kp-parent-banner .kp-parent-cta {
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

.kp-home .kp-parent-banner .kp-parent-cta:hover {
  background: #eb337d;
  transform: translateY(-2px);
}

/* Phones built in HTML/CSS */
.kp-home .kp-parent-phones {
  position: relative;
  min-width: 0;
  min-height: 390px;
}

.kp-home .kp-parent-phone {
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

.kp-home .kp-parent-phone.is-updates {
  z-index: 2;
  left: 10%;
  transform: rotate(-5deg);
}

.kp-home .kp-parent-phone.is-messages {
  z-index: 3;
  left: 48%;
  top: 44px;
  transform: rotate(3deg);
}

.kp-home .kp-parent-phone-screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 0 11px;
  border-radius: 24px;
  background: linear-gradient(#fff, #f7fafc);
  color: #10243e;
}

.kp-home .kp-parent-phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 82px;
  height: 15px;
  border-radius: 0 0 10px 10px;
  background: #111c26;
}

.kp-home .kp-parent-phone-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 1px 0;
  font-size: 7px;
}

.kp-home .kp-parent-phone-screen > h3 {
  margin: 22px 0 12px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -.7px;
}

.kp-home .kp-parent-phone-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 13px;
  padding: 3px;
  border-radius: 6px;
  background: #edf3f6;
}

.kp-home .kp-parent-phone-tabs > span {
  padding: 5px 7px;
  color: #6e8193;
  font-size: 6px;
}

.kp-home .kp-parent-phone-tabs > .is-current {
  color: white;
  background: #048993;
  border-radius: 5px;
}

.kp-home .kp-parent-post-author {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.kp-home .kp-parent-post-author .kp-connected-avatar {
  width: 25px;
  height: 25px;
}

.kp-home .kp-parent-post-author strong,
.kp-home .kp-parent-post-author div > span {
  display: block;
  font-size: 8px;
}

.kp-home .kp-parent-post-author div > span {
  color: #8b9baa;
  font-size: 6px;
  margin-top: 3px;
}

.kp-home .kp-parent-post-photo {
  width: 100%;
  height: 89px;
  display: block;
  border-radius: 7px;
  object-fit: cover;
}

.kp-home .kp-parent-post h4 {
  margin: 10px 0 4px;
  font-size: 9px;
  font-weight: 750;
}

.kp-home .kp-parent-post > p {
  margin: 0;
  font-size: 8px;
  line-height: 1.6;
  color: #61778a;
}

.kp-home .kp-parent-post-reactions {
  display: flex;
  gap: 15px;
  margin-top: 9px;
}

.kp-home .kp-parent-post-reactions > span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 7px;
  color: #8da0ad;
}

.kp-home .kp-parent-post-reactions > span:first-child {
  color: #ff438f;
}

.kp-home .kp-parent-inbox-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid #edf1f5;
}

.kp-home .kp-parent-inbox-row > div {
  min-width: 0;
  flex: 1;
}

.kp-home .kp-parent-inbox-row strong {
  display: block;
  font-size: 7px;
  font-weight: 750;
}

.kp-home .kp-parent-inbox-row p {
  margin: 4px 0 0;
  font-size: 6px;
  line-height: 1.4;
  color: #7f91a1;
}

.kp-home .kp-parent-inbox-row time {
  align-self: flex-start;
  font-size: 5px;
  color: #9caab5;
}

.kp-home .kp-parent-inbox-icon {
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

.kp-home .kp-parent-inbox-icon.tone-2 {
  background: #53c7bd;
}

.kp-home .kp-parent-phone-nav {
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

.kp-home .kp-parent-phone-nav > span {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #7b8ba0;
}

.kp-home .kp-parent-phone-nav svg {
  width: 12px;
  height: 12px;
}

.kp-home .kp-parent-phone-nav small {
  font-size: 5px;
}

.kp-home .kp-parent-phone-nav > .is-current {
  color: #08a497;
}

@keyframes kp-people-enter {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes kp-people-photo-enter {
  from { opacity: .3; }
  to { opacity: 1; }
}

/* Tablet */
@media (max-width: 1100px) {
  .kp-home .kp-people-stage {
    min-height: 460px;
  }

  .kp-home .kp-people-tabs {
    gap: 24px;
  }

  .kp-home .kp-people-dashboard-wrap {
    width: 95%;
    left: -10px;
    top: 165px;
  }

  .kp-home .kp-people-dashboard {
    padding: 17px 13px 10px;
  }

  .kp-home .kp-parent-banner {
    gap: 20px;
  }

  .kp-home .kp-parent-phone {
    width: 185px;
    height: 395px;
  }

  .kp-home .kp-parent-phone.is-updates {
    left: 5%;
  }

  .kp-home .kp-parent-phone.is-messages {
    left: 45%;
  }

  .kp-home .kp-parent-banner-copy {
    padding-right: 23px;
  }
}

@media (max-width: 850px) {
  .kp-home .kp-people-section {
    padding-top: 30px;
  }

  .kp-home .kp-people-stage {
    min-height: 0;
  }

  .kp-home .kp-people-intro {
    width: 100%;
  }

  .kp-home .kp-people-intro h2 {
    font-size: 32px;
  }

  .kp-home .kp-people-tabs {
    max-width: 470px;
  }

  .kp-home .kp-people-panel {
    display: grid;
    grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
    gap: 22px;
    align-items: start;
    margin-top: 25px;
  }

  .kp-home .kp-people-benefits {
    width: 100%;
    gap: 20px;
    padding-top: 14px;
  }

  .kp-home .kp-people-visual {
    position: relative;
    inset: auto;
    min-height: 390px;
  }

  .kp-home .kp-people-photo {
    height: 255px;
    border-radius: 15px;
  }

  .kp-home .kp-people-visual::after {
    display: none;
  }

  .kp-home .kp-people-dashboard-wrap {
    top: 155px;
    left: 0;
    width: 100%;
  }

  .kp-home .kp-people-metrics {
    gap: 5px;
  }

  .kp-home .kp-people-metrics > div {
    gap: 5px;
  }

  .kp-home .kp-people-metrics svg {
    width: 20px;
    height: 20px;
  }

  .kp-home .kp-parent-banner {
    margin-top: 24px;
    grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
    gap: 15px;
  }

  .kp-home .kp-parent-phone {
    width: 175px;
  }

  .kp-home .kp-parent-phone.is-updates {
    left: 1%;
    top: 35px;
  }

  .kp-home .kp-parent-phone.is-messages {
    left: 39%;
    top: 66px;
  }

  .kp-home .kp-parent-banner-copy > p {
    font-size: 13px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .kp-home .kp-people-intro h2 {
    font-size: 28px;
  }

  .kp-home .kp-people-tabs {
    justify-content: space-between;
    gap: 15px;
    margin-top: 17px;
  }

  .kp-home .kp-people-tabs button {
    font-size: 12px;
  }

  .kp-home .kp-people-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 7px;
    margin-top: 20px;
  }

  .kp-home .kp-people-benefits {
    padding: 0 0 17px;
    gap: 20px;
  }

  .kp-home .kp-people-benefit p {
    max-width: none;
  }

  .kp-home .kp-people-visual {
    min-height: 430px;
  }

  .kp-home .kp-people-photo {
    height: 280px;
  }

  .kp-home .kp-people-dashboard-wrap {
    top: 175px;
    width: 94%;
    left: 3%;
  }

  .kp-home .kp-people-dashboard {
    padding: 18px 14px 10px;
  }

  .kp-home .kp-people-metrics {
    margin: 21px 0 15px;
  }

  .kp-home .kp-parent-banner {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 10px;
    border-radius: 16px;
  }

  .kp-home .kp-parent-banner-copy {
    order: 0;
    padding: 27px 23px 20px;
  }

  .kp-home .kp-parent-banner-copy h2 {
    font-size: 27px;
  }

  .kp-home .kp-parent-banner-copy > p {
    font-size: 14px;
  }

  .kp-home .kp-parent-phones {
    order: 1;
    min-height: 355px;
    width: 100%;
    max-width: 390px;
    align-self: center;
  }

  .kp-home .kp-parent-phone {
    width: 180px;
    height: 395px;
  }

  .kp-home .kp-parent-phone.is-updates {
    top: 12px;
    left: 7%;
  }

  .kp-home .kp-parent-phone.is-messages {
    top: 35px;
    left: 45%;
  }
}

/* School stories */
.kp-home .kp-school-proof {
  padding: 28px 0 0;
  scroll-margin-top: 95px;
  color: #11233e;
  background: linear-gradient(180deg, #fff, #fcfefe);
}

.kp-home .kp-school-proof h2 {
  margin: 0 0 20px;
  color: #11233e;
  font-size: clamp(25px, 2.5vw, 35px);
  line-height: 1.2;
  letter-spacing: -.95px;
  font-weight: 750;
}

.kp-home .kp-school-proof-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.kp-home .kp-school-proof-card {
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

.kp-home .kp-school-proof-card:hover {
  transform: translateY(-3px);
  border-color: #bbded7;
  box-shadow: 0 10px 23px rgba(32, 86, 83, .1);
}

.kp-home .kp-school-proof-card:focus-visible {
  outline: 3px solid #10a49b;
  outline-offset: 4px;
}

.kp-home .kp-school-proof-photo {
  position: relative;
  min-width: 0;
  min-height: 156px;
  overflow: hidden;
  background: #e6f2ed;
}

.kp-home .kp-school-proof-photo img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .35s ease;
}

.kp-home .kp-school-proof-card:hover .kp-school-proof-photo img {
  transform: scale(1.04);
}

.kp-home .kp-school-proof-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  padding: 15px 13px 12px;
}

.kp-home .kp-school-proof-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 31px;
  margin-bottom: 10px;
}

.kp-home .kp-school-proof-brand img {
  display: block;
  width: 29px;
  height: 31px;
  object-fit: contain;
  flex-shrink: 0;
}

.kp-home .kp-school-proof-brand > span {
  font-size: 10px;
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -.15px;
}

.kp-home .kp-school-proof-copy h3 {
  margin: 0 0 12px;
  color: #11233e;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.45;
  letter-spacing: -.25px;
}

.kp-home .kp-school-proof-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  color: #269b96;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
}

.kp-home .kp-school-proof-link svg {
  flex-shrink: 0;
  transition: transform .2s ease;
}

.kp-home .kp-school-proof-card:hover .kp-school-proof-link svg {
  transform: translateX(3px);
}

/* Integration row */
.kp-home .kp-tools-strip {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(0, 1.35fr);
  align-items: center;
  gap: 30px;
  margin-top: 26px;
  padding-bottom: 23px;
  border-bottom: 1px solid #e5eeee;
}

.kp-home .kp-tools-copy h3 {
  margin: 0 0 6px;
  color: #172c44;
  font-size: 17px;
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -.45px;
}

.kp-home .kp-tools-copy p {
  margin: 0;
  color: #738796;
  font-size: 12px;
  line-height: 1.55;
}

.kp-home .kp-tools-brands {
  display: grid;
  grid-template-columns: .9fr .85fr 1.15fr 1fr;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.kp-home .kp-tools-brands > li {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  padding: 0 15px;
  min-height: 30px;
}

.kp-home .kp-tools-brands > li + li {
  border-left: 1px solid #dce5eb;
}

.kp-home .kp-tools-zoom {
  font-family: Arial, sans-serif;
  font-size: 29px;
  font-weight: 600;
  letter-spacing: -1.7px;
  line-height: 1;
  color: #2d8cff;
}

.kp-home .kp-tools-stripe {
  font-family: Arial, sans-serif;
  font-size: 27px;
  font-weight: 900;
  letter-spacing: -1.3px;
  line-height: 1;
  color: #17143b;
}

.kp-home .kp-tools-openapply,
.kp-home .kp-tools-wonde {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
  line-height: 1;
}

.kp-home .kp-tools-openapply {
  color: #008b85;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -.7px;
}

.kp-home .kp-tools-openapply svg {
  flex-shrink: 0;
}

.kp-home .kp-tools-wonde {
  color: #1d214a;
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -.9px;
}

.kp-home .kp-tools-wonde-mark {
  display: inline-flex;
  color: #286bff;
}

/* Four-step onboarding */
.kp-home .kp-start-path {
  padding: 20px 0 25px;
  background: #fcfefe;
  color: #11233e;
}

.kp-home .kp-start-path h2 {
  margin: 0 0 23px;
  font-size: 21px;
  font-weight: 750;
  letter-spacing: -.55px;
  line-height: 1.3;
  color: #11233e;
}

.kp-home .kp-start-path-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 35px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.kp-home .kp-start-path-step {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
}

.kp-home .kp-start-path-step:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -22px;
  top: 17px;
  width: 10px;
  height: 2px;
  border-radius: 2px;
  background: #dea8be;
}

.kp-home .kp-start-path-number {
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

.kp-home .kp-start-path-step h3 {
  margin: 4px 0 7px;
  color: #17304b;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.3;
}

.kp-home .kp-start-path-step p {
  margin: 0;
  color: #6d8292;
  font-size: 12px;
  line-height: 1.6;
  max-width: 185px;
}

/* Compact privacy strip */
.kp-home .kp-privacy-strip {
  padding: 20px 0 29px;
  background: linear-gradient(180deg, #fcfefe, #f6fcfa);
}

.kp-home .kp-privacy-strip-inner {
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(0, 1.35fr);
  align-items: center;
  gap: 28px;
}

.kp-home .kp-privacy-strip h2 {
  margin: 0;
  color: #17424d;
  font-size: 19px;
  font-weight: 550;
  line-height: 1.4;
  letter-spacing: -.5px;
}

.kp-home .kp-privacy-strip h2 > span {
  color: #19a49b;
}

.kp-home .kp-privacy-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kp-home .kp-privacy-item {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 3px 15px;
}

.kp-home .kp-privacy-item + .kp-privacy-item {
  border-left: 1px solid #d6e3e5;
}

.kp-home .kp-privacy-item > svg {
  flex-shrink: 0;
  color: #24a5a4;
}

.kp-home .kp-privacy-item.is-blue > svg {
  color: #76afbe;
}

.kp-home .kp-privacy-item.is-green > svg {
  color: #20bd80;
}

.kp-home .kp-privacy-item h3 {
  margin: 0 0 5px;
  color: #354e63;
  font-size: 10px;
  font-weight: 750;
  line-height: 1.3;
}

.kp-home .kp-privacy-item p {
  margin: 0;
  color: #78909d;
  font-size: 8px;
  line-height: 1.5;
}

/* Tablet */
@media (max-width: 1100px) {
  .kp-home .kp-school-proof-grid {
    gap: 14px;
  }

  .kp-home .kp-school-proof-card {
    grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  }

  .kp-home .kp-school-proof-copy {
    padding: 12px 10px;
  }

  .kp-home .kp-school-proof-copy h3 {
    font-size: 12px;
  }

  .kp-home .kp-school-proof-brand {
    gap: 5px;
  }

  .kp-home .kp-school-proof-brand img {
    width: 25px;
    height: 28px;
  }

  .kp-home .kp-tools-strip {
    gap: 20px;
  }

  .kp-home .kp-tools-brands > li {
    padding-inline: 10px;
  }

  .kp-home .kp-tools-openapply {
    font-size: 14px;
  }

  .kp-home .kp-tools-wonde {
    font-size: 20px;
  }

  .kp-home .kp-start-path-grid {
    gap: 25px;
  }

  .kp-home .kp-start-path-step {
    gap: 9px;
  }

  .kp-home .kp-start-path-step:not(:last-child)::after {
    right: -17px;
    width: 8px;
  }

  .kp-home .kp-privacy-strip-inner {
    gap: 18px;
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.3fr);
  }

  .kp-home .kp-privacy-item {
    gap: 7px;
    padding-inline: 10px;
  }
}

@media (max-width: 850px) {
  .kp-home .kp-school-proof-card {
    grid-template-columns: minmax(0, 1fr);
  }

  .kp-home .kp-school-proof-photo {
    min-height: 140px;
  }

  .kp-home .kp-school-proof-copy {
    padding: 15px;
  }

  .kp-home .kp-school-proof-copy h3 {
    font-size: 13px;
  }

  .kp-home .kp-tools-strip {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .kp-home .kp-tools-brands {
    max-width: 630px;
    width: 100%;
  }

  .kp-home .kp-tools-brands > li:first-child {
    justify-content: flex-start;
    padding-left: 0;
  }

  .kp-home .kp-start-path-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 40px;
  }

  .kp-home .kp-start-path-step::after {
    display: none;
  }

  .kp-home .kp-start-path-step p {
    max-width: 240px;
  }

  .kp-home .kp-privacy-strip-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .kp-home .kp-privacy-item:first-child {
    padding-left: 0;
  }

  .kp-home .kp-privacy-item h3 {
    font-size: 11px;
  }

  .kp-home .kp-privacy-item p {
    font-size: 9px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .kp-home .kp-school-proof {
    padding-top: 24px;
  }

  .kp-home .kp-school-proof h2 {
    font-size: 27px;
    line-height: 1.2;
  }

  .kp-home .kp-school-proof-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .kp-home .kp-school-proof-card {
    grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
    min-height: 155px;
  }

  .kp-home .kp-school-proof-photo {
    min-height: 155px;
  }

  .kp-home .kp-school-proof-brand > span {
    font-size: 11px;
  }

  .kp-home .kp-school-proof-copy h3 {
    font-size: 14px;
  }

  .kp-home .kp-school-proof-link {
    font-size: 11px;
  }

  .kp-home .kp-tools-copy h3 {
    font-size: 17px;
  }

  .kp-home .kp-tools-brands {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 22px;
  }

  .kp-home .kp-tools-brands > li {
    justify-content: center;
    min-height: 32px;
  }

  .kp-home .kp-tools-brands > li:first-child {
    justify-content: center;
    padding-left: 10px;
  }

  .kp-home .kp-tools-brands > li:nth-child(3) {
    border-left: 0;
  }

  .kp-home .kp-tools-openapply {
    font-size: 17px;
  }

  .kp-home .kp-tools-wonde {
    font-size: 23px;
  }

  .kp-home .kp-start-path {
    padding-top: 23px;
    padding-bottom: 17px;
  }

  .kp-home .kp-start-path h2 {
    font-size: 21px;
    line-height: 1.35;
  }

  .kp-home .kp-start-path-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .kp-home .kp-start-path-step {
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 13px;
  }

  .kp-home .kp-start-path-step h3 {
    font-size: 14px;
  }

  .kp-home .kp-start-path-step p {
    max-width: none;
    font-size: 12px;
  }

  .kp-home .kp-privacy-strip {
    padding-top: 19px;
  }

  .kp-home .kp-privacy-strip h2 {
    font-size: 21px;
    max-width: 320px;
  }

  .kp-home .kp-privacy-items {
    grid-template-columns: minmax(0, 1fr);
    gap: 15px;
  }

  .kp-home .kp-privacy-item {
    padding: 0;
    gap: 13px;
  }

  .kp-home .kp-privacy-item + .kp-privacy-item {
    border-left: 0;
  }

  .kp-home .kp-privacy-item h3 {
    font-size: 12px;
    margin-bottom: 3px;
  }

  .kp-home .kp-privacy-item p {
    font-size: 10px;
  }
}
/* FAQ refresh */
.kp-home .kp-faq-refresh {
  padding: 28px 0 20px;
  background: #fff;
  color: #10223c;
}

.kp-home .kp-faq-refresh-grid {
  display: grid;
  grid-template-columns: minmax(0, .75fr) minmax(0, 1.25fr);
  gap: 42px;
  align-items: start;
}

.kp-home .kp-faq-refresh h2 {
  margin: 0;
  max-width: 355px;
  color: #10223c;
  font-size: clamp(22px, 2.2vw, 31px);
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -.8px;
}

.kp-home .kp-faq-refresh-items {
  border-top: 1px solid #e6edef;
}

.kp-home .kp-faq-refresh-items details {
  border-bottom: 1px solid #e6edef;
}

.kp-home .kp-faq-refresh-items summary {
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

.kp-home .kp-faq-refresh-items summary::-webkit-details-marker {
  display: none;
}

.kp-home .kp-faq-refresh-items summary svg {
  flex-shrink: 0;
  color: #6d8292;
  transition: transform .2s ease;
}

.kp-home .kp-faq-refresh-items details[open] summary {
  color: #0a9b94;
}

.kp-home .kp-faq-refresh-items details[open] summary svg {
  transform: rotate(45deg);
}

.kp-home .kp-faq-refresh-items details p {
  margin: 0;
  max-width: 650px;
  padding: 0 42px 14px 12px;
  color: #6e8492;
  font-size: 10px;
  line-height: 1.7;
}

/* Final CTA */
.kp-home .kp-final-refresh-wrap {
  padding: 0 0 0;
  background: #fff;
}

.kp-home .kp-final-refresh {
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

.kp-home .kp-final-refresh-copy {
  position: relative;
  z-index: 2;
  padding: 19px 32px;
}

.kp-home .kp-final-refresh-copy h2 {
  margin: 0 0 5px;
  color: #10243d;
  font-size: clamp(22px, 2.3vw, 31px);
  font-weight: 750;
  line-height: 1.15;
  letter-spacing: -.8px;
}

.kp-home .kp-final-refresh-copy h2 span {
  color: #0c9992;
}

.kp-home .kp-final-refresh-copy p {
  margin: 0 0 13px;
  color: #5d7482;
  font-size: 10px;
  line-height: 1.5;
}

.kp-home .kp-final-refresh-copy .kp-button {
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 9px;
  gap: 8px;
}

.kp-home .kp-final-refresh-photo {
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  overflow: hidden;
  opacity: .96;
  mask-image: linear-gradient(90deg, transparent 0%, #000 32%);
}

.kp-home .kp-final-refresh-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 242, 246, .95),
    rgba(255, 205, 220, .08)
  );
}

.kp-home .kp-final-refresh-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

/* Footer */
.kp-home .kp-footer-refresh {
  padding: 23px 0 27px;
  border-top: 1px solid #e8eef0;
  background: #fff;
  color: #10223c;
}

.kp-home .kp-footer-refresh-grid {
  display: grid;
  grid-template-columns: 1.55fr repeat(4, .8fr) 1.05fr;
  gap: 24px;
  align-items: start;
}

.kp-home .kp-footer-refresh-brand .kp-logo img {
  width: 135px;
  height: 32px;
}

.kp-home .kp-footer-refresh-brand > p {
  margin: 10px 0 0;
  color: #718692;
  font-size: 9px;
  line-height: 1.6;
}

.kp-home .kp-footer-refresh-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.kp-home .kp-footer-refresh-column h3 {
  margin: 0 0 4px;
  color: #17334d;
  font-size: 10px;
  font-weight: 750;
}

.kp-home .kp-footer-refresh-column a {
  color: #718592;
  font-size: 9px;
  line-height: 1.35;
  text-decoration: none;
}

.kp-home .kp-footer-refresh-column a:hover {
  color: #0a9b94;
}

.kp-home .kp-footer-refresh-social {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 0;
}

.kp-home .kp-footer-refresh-social > div {
  display: flex;
  gap: 15px;
  align-items: center;
}

.kp-home .kp-footer-refresh-social > div a {
  display: grid;
  place-items: center;
  width: 17px;
  height: 17px;
  color: #122943;
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: 750;
  text-decoration: none;
}

.kp-home .kp-footer-refresh-social > div a:hover {
  color: #0a9b94;
}

.kp-home .kp-footer-refresh-social p {
  margin: 28px 0 0;
  color: #7b8c98;
  font-size: 8px;
  line-height: 1.45;
  text-align: right;
}

/* Responsive */
@media (max-width: 1000px) {
  .kp-home .kp-footer-refresh-grid {
    grid-template-columns: 1.3fr repeat(3, 1fr);
  }

  .kp-home .kp-footer-refresh-grid > .kp-footer-refresh-column:nth-of-type(4),
  .kp-home .kp-footer-refresh-grid > .kp-footer-refresh-social {
    grid-column: span 1;
  }
}

@media (max-width: 750px) {
  .kp-home .kp-faq-refresh-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .kp-home .kp-faq-refresh h2 {
    max-width: none;
  }

  .kp-home .kp-final-refresh-photo {
    width: 38%;
  }

  .kp-home .kp-footer-refresh-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px 18px;
  }

  .kp-home .kp-footer-refresh-brand {
    grid-column: 1 / -1;
  }

  .kp-home .kp-footer-refresh-social {
    align-items: flex-start;
  }

  .kp-home .kp-footer-refresh-social p {
    text-align: left;
  }
}

@media (max-width: 520px) {
  .kp-home .kp-faq-refresh {
    padding-top: 23px;
  }

  .kp-home .kp-faq-refresh h2 {
    font-size: 25px;
  }

  .kp-home .kp-faq-refresh-items summary {
    min-height: 46px;
    font-size: 11px;
  }

  .kp-home .kp-final-refresh {
    min-height: 145px;
  }

  .kp-home .kp-final-refresh-copy {
    max-width: 76%;
    padding: 21px 18px;
  }

  .kp-home .kp-final-refresh-copy h2 {
    font-size: 24px;
  }

  .kp-home .kp-final-refresh-photo {
    width: 47%;
  }

  .kp-home .kp-footer-refresh-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .kp-home .kp-footer-refresh-brand {
    grid-column: 1 / -1;
  }

  .kp-home .kp-footer-refresh-social {
    grid-column: 1 / -1;
    align-items: flex-start;
  }
}
@media (prefers-reduced-motion: reduce) {
  .kp-home *, .kp-home *::before, .kp-home *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
`

/* SOURCE AND INTEGRATION NOTES
 * Brand colour/font inspection: https://www.kinderpedia.co/en (24 September 2026).
 * Product categories, 2,000+ customers, 40+ countries, reported 4.9/5:
 * https://www.kinderpedia.co/en
 * School story: https://www.kinderpedia.co/en/case-studies/maple-bear-case-study
 * The logo is loaded from Kinderpedia's official website, with a text fallback.
 * For production, host an authorised copy of the logo locally and change LOGO.
 * Inter is used when loaded by your project; otherwise system fonts are used.
 * Use a full-width parent. Existing parent max-width/padding may constrain this page.
 * Hero/sidebar and module controls change local sample state only.
 * Feature CTAs open the demo route; extra module cards open the official homepage.
 * No form submission, data storage, payment processing or backend is included.
 * Existing application navigation/footer remain the host application's responsibility
 * unless showChrome is passed. Embed inside your layout's existing main landmark.
 */
