import React, { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Bell, BookOpen, Building2, CalendarDays,
  Check, CheckCircle2, CircleHelp, Clock3, CreditCard,
  GraduationCap, Heart, LayoutDashboard, LockKeyhole, Menu,
  MessageCircle, Plus, ShieldCheck, Sparkles, Users, X,
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
    eyebrow: 'PARENT ENGAGEMENT', title: 'Keep families close to the school day.',
    text: 'Share the moments, messages and practical updates that parents need. Keep school communication organised around each child and class.',
    points: ['Class and individual communication', 'Photos, updates and school events', 'A familiar mobile experience'],
    action: 'Explore parent engagement',
  },
  {
    id: 'tuition', label: 'Tuition', icon: CreditCard,
    eyebrow: 'TUITION MANAGEMENT', title: 'A clearer picture of school finances.',
    text: 'Bring invoicing and payment tracking into the same platform as your school records. Help your finance team follow up with the right context.',
    points: ['Automated invoice generation', 'Payment tracking and reporting', 'Less disconnected financial admin'],
    action: 'Explore tuition management',
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
  return <section className="kp-hero" aria-labelledby="kp-hero-title">
    <div className="kp-hero-glow" aria-hidden="true" />
    <div className="kp-container kp-hero-grid">
      <div className="kp-hero-copy">
        <span className="kp-eyebrow"><span className="kp-eyebrow-dot" />A MORE CONNECTED SCHOOL DAY</span>
        <h1 id="kp-hero-title">Less admin.<br />Closer connections.<br /><span>More room to teach.</span></h1>
        <p className="kp-hero-description">Bring school management, classroom activity and family communication together. One platform for the people who make your school work.</p>
        <div className="kp-actions"><Action to={demoTo} /><a className="kp-text-button" href="#kp-platform">Explore the platform <ArrowRight size={17} /></a></div>
        <div className="kp-hero-checks"><span><Check size={15} />Schools & nurseries</span><span><Check size={15} />Web & mobile</span></div>
        <div className="kp-hero-proof"><div className="kp-rating-stars" aria-label="Rated 4.9 out of 5">★★★★★</div><div><strong>4.9 / 5</strong><span>Reported by Kinderpedia across GetApp, Capterra & G2</span></div></div>
      </div>
      <ProductPreview />
    </div>
  </section>
}

function TrustStrip() {
  return <section className="kp-trust" aria-label="Kinderpedia community">
    <div className="kp-container kp-trust-grid"><div className="kp-trust-intro"><span className="kp-eyebrow">A GLOBAL SCHOOL COMMUNITY</span><h2>Different schools.<br />Shared priorities.</h2></div>
      <div className="kp-trust-stat"><strong>2,000+</strong><span>customers worldwide</span></div>
      <div className="kp-trust-stat"><strong>40+</strong><span>countries represented</span></div>
      <div className="kp-trust-note"><Users size={25} /><p>Helping school teams and families stay connected.</p></div>
    </div>
  </section>
}

function Platform({ demoTo }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const buttons = useRef([])
  const feature = FEATURES[active]
  const selectByKey = e => {
    let next = active
    if (e.key === 'ArrowRight') next = (active + 1) % FEATURES.length
    else if (e.key === 'ArrowLeft') next = (active + FEATURES.length - 1) % FEATURES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = FEATURES.length - 1
    else return
    e.preventDefault(); setActive(next); buttons.current[next]?.focus()
  }
  return <section className="kp-section kp-platform" id="kp-platform" aria-labelledby="kp-platform-title">
    <div className="kp-container">
      <div className="kp-section-heading"><div><span className="kp-eyebrow">ONE PLATFORM. THE WHOLE SCHOOL.</span><h2 id="kp-platform-title">Everything connects.<br /><span>Everyone benefits.</span></h2></div><p>From the first register to the last parent update, give your team a simpler way to get through the day.</p></div>
      <div className="kp-feature-tabs" role="tablist" aria-label="Explore platform features" onKeyDown={selectByKey}>
        {FEATURES.map(({ id: featureId, label, icon: Icon }, index) => <button key={featureId} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={el => { buttons.current[index] = el }} onClick={() => setActive(index)} className={active === index ? 'is-active' : ''}><Icon size={18} />{label}<ArrowUpRight size={16} /></button>)}
      </div>
      <div className="kp-feature-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
        <div className="kp-feature-copy"><span className="kp-eyebrow">{feature.eyebrow}</span><h3>{feature.title}</h3><p>{feature.text}</p><ul className="kp-check-list">{feature.points.map(point => <li key={point}><CheckCircle2 size={17} />{point}</li>)}</ul><Action to={demoTo} secondary>{feature.action}</Action></div>
        <div className={`kp-feature-visual kp-feature-${feature.id}`}><div className="kp-feature-screen"><PreviewContent active={feature.id} /><p className="kp-sample-label">Illustrative interface · sample data</p></div><span className="kp-visual-decoration" aria-hidden="true">✳</span></div>
      </div>
      <div className="kp-module-grid">{EXTRA_MODULES.map(({ icon, title, text }) => <a className="kp-module-card" href={OFFICIAL + '/en'} key={title}><IconTile icon={icon} tone="neutral" /><h3>{title}</h3><p>{text}</p><span>Explore Kinderpedia <ArrowUpRight size={14} /></span></a>)}</div>
    </div>
  </section>
}

function Community({ demoTo }) {
  const [active, setActive] = useState(0)
  const role = ROLES[active]
  return <section className="kp-section kp-community" id="kp-community" aria-labelledby="kp-community-title">
    <div className="kp-container">
      <div className="kp-centered-heading"><span className="kp-eyebrow">BUILT AROUND YOUR PEOPLE</span><h2 id="kp-community-title">One school community.<br /><span>A better day for everyone.</span></h2><p>Different responsibilities. The same need to stay informed.</p></div>
      <div className="kp-role-picker" role="group" aria-label="Choose your role">{ROLES.map(({ id, label, icon: Icon }, index) => <button type="button" key={id} aria-pressed={active === index} onClick={() => setActive(index)} className={active === index ? 'is-active' : ''}><Icon size={18} />{label}</button>)}</div>
      <div className="kp-role-content">
        <div className="kp-role-visual"><div className="kp-role-board"><div className="kp-board-top"><IconTile icon={role.icon} tone={role.tone} /><span className="kp-pill">{role.label}</span></div><h3>{role.visualTitle}</h3><p>{role.visualSub}</p><div className="kp-role-metrics">{role.metrics.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><span className="kp-micro">EVERYDAY PRIORITIES</span><ul className="kp-role-tasks">{role.tasks.map(task => <li key={task}><CheckCircle2 size={17} />{task}</li>)}</ul><div className="kp-board-bottom"><span className="kp-small-dot" />Illustrative role overview</div></div><span className="kp-role-orbit" aria-hidden="true" /></div>
        <div className="kp-role-copy"><span className="kp-eyebrow">FOR {role.label.toUpperCase()}</span><h3>{role.title}</h3><p>{role.text}</p><ul className="kp-check-list">{role.points.map(point => <li key={point}><CheckCircle2 size={17} />{point}</li>)}</ul><Action to={demoTo} secondary>See your role in a demo</Action></div>
      </div>
    </div>
  </section>
}

function SchoolStories() {
  return <section className="kp-section" id="kp-stories" aria-labelledby="kp-stories-title">
    <div className="kp-container"><div className="kp-section-heading"><div><span className="kp-eyebrow">REAL SCHOOLS. EVERYDAY CHANGE.</span><h2 id="kp-stories-title">See what changes<br /><span>when people connect.</span></h2></div><a className="kp-text-button" href={`${OFFICIAL}/en/case-studies/maple-bear-case-study`}>Read the school’s story <ArrowUpRight size={18} /></a></div>
      <article className="kp-story"><div className="kp-story-art" aria-hidden="true"><span className="kp-story-kicker">SCHOOL SPOTLIGHT</span><div className="kp-story-monogram">M<span>B</span></div><div className="kp-story-school">Maple Bear<br /><span>Cluj · Romania</span></div><div className="kp-story-line" /></div><div className="kp-story-copy"><span className="kp-eyebrow">COMMUNICATION & SCHOOL VISIBILITY</span><h3>School messages that reach the right people.</h3><p>At Maple Bear Cluj, important updates used to disappear among replies. Kinderpedia helped the team organise family communication and gave leaders a clearer view across school activity.</p><div className="kp-story-outcomes"><span><MessageCircle size={18} />More focused family communication</span><span><LayoutDashboard size={18} />A shared view of school activity</span></div><a href={`${OFFICIAL}/en/case-studies/maple-bear-case-study`} className="kp-text-button">Explore the Maple Bear story <ArrowRight size={18} /></a></div></article>
    </div>
  </section>
}

function Onboarding({ demoTo }) {
  const steps = [
    ['01', 'Start with your school', 'Walk through your current tools, everyday challenges and what your team needs most.'],
    ['02', 'Plan the right setup', 'Review your data, workflows and rollout requirements with the Kinderpedia team.'],
    ['03', 'Bring your people along', 'Agree a training and launch plan that supports staff and families as they get started.'],
  ]
  return <section className="kp-section kp-onboarding" aria-labelledby="kp-onboarding-title"><div className="kp-container"><div className="kp-section-heading"><div><span className="kp-eyebrow">A THOUGHTFUL START</span><h2 id="kp-onboarding-title">A new platform.<br /><span>A clear way forward.</span></h2></div><p>You know your school. Use the first conversation to shape a rollout around the people and processes that matter.</p></div><div className="kp-steps">{steps.map(([number, title, text]) => <article key={number}><span className="kp-step-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="kp-onboarding-bottom"><span><Users size={18} />Make your team’s priorities the starting point.</span><Action to={demoTo} secondary>Talk through your setup</Action></div></div></section>
}

function DataCare({ demoTo }) {
  return <section className="kp-container kp-data-care" aria-labelledby="kp-data-title"><div className="kp-data-icon"><ShieldCheck size={34} /></div><div><span className="kp-eyebrow">IMPORTANT INFORMATION. CAREFUL QUESTIONS.</span><h2 id="kp-data-title">Your school’s data deserves a proper conversation.</h2><p>Include your IT and leadership teams in the demo. Review access permissions, data handling, integrations and your school’s requirements before you make the move.</p></div><Action to={demoTo} secondary>Discuss your requirements</Action></section>
}

function FAQs() {
  return <section className="kp-section kp-faq" aria-labelledby="kp-faq-title"><div className="kp-container kp-faq-grid"><div><span className="kp-eyebrow">A FEW USEFUL ANSWERS</span><h2 id="kp-faq-title">Before you<br /><span>take the next step.</span></h2><p>Start here, then bring your school’s specific questions to a demo.</p></div><div className="kp-faq-items">{FAQS.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
}

function FinalCTA({ demoTo }) {
  return <section className="kp-container kp-final-wrap"><div className="kp-final"><div className="kp-final-orbit" aria-hidden="true" /><span className="kp-eyebrow">LET’S MAKE THE SCHOOL DAY SIMPLER</span><h2>More connected people.<br /><span>More room for what matters.</span></h2><p>See how Kinderpedia could work for your school, your team and your families.</p><Action to={demoTo} /><span className="kp-final-note">A conversation about your school. A closer look at the platform.</span></div></section>
}

function Footer() {
  return <footer className="kp-footer"><div className="kp-container kp-footer-inner"><div><Logo /><p>Connecting schools, teachers and families.</p></div><nav aria-label="Footer navigation"><a href="#kp-platform">Platform</a><a href="#kp-community">Community</a><a href="#kp-stories">School stories</a><a href={OFFICIAL + '/en'}>Official website <ArrowUpRight size={13} /></a></nav><small>© {new Date().getFullYear()} Kinderpedia</small></div></footer>
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
    {showChrome && <Footer />}
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
.kp-home .kp-section-heading h2 { margin-top: 13px; }
.kp-home .kp-section-heading > p { max-width: 345px; color: var(--kp-muted); font-size: 14px; line-height: 1.8; }
.kp-home .kp-feature-tabs { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; padding: 7px; border: 1px solid var(--kp-line); background: #f8f8fb; border-radius: 13px; margin-bottom: 18px; }
.kp-home .kp-feature-tabs button { border: 1px solid transparent; background: transparent; display: flex; align-items: center; gap: 10px; padding: 15px 19px; font-size: 13px; font-weight: 600; border-radius: 8px; transition: background .2s,color .2s; }
.kp-home .kp-feature-tabs button > svg:last-child { margin-left: auto; opacity: .5; }
.kp-home .kp-feature-tabs button.is-active { background: white; border-color: #e7d9e0; box-shadow: 0 2px 5px #35254309; color: var(--kp-berry); }
.kp-home .kp-feature-tabs button:hover { color: var(--kp-berry); background: #fff; }
.kp-home .kp-feature-panel { border: 1px solid #e8e5ed; border-radius: 18px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; min-height: 465px; }
.kp-home .kp-feature-copy { padding: 50px; align-self: center; }
.kp-home .kp-feature-copy h3, .kp-home .kp-role-copy h3 { font-size: clamp(25px,2.6vw,34px); letter-spacing: -1px; font-weight: 620; line-height: 1.22; margin: 17px 0; }
.kp-home .kp-feature-copy > p, .kp-home .kp-role-copy > p { font-size: 13px; line-height: 1.85; color: var(--kp-muted); }
.kp-home .kp-check-list { list-style: none; padding: 0; display: grid; gap: 12px; margin: 23px 0 29px; }
.kp-home .kp-check-list li { display: flex; align-items: center; gap: 9px; font-size: 12px; }
.kp-home .kp-check-list svg { color: var(--kp-berry); }
.kp-home .kp-feature-visual { position: relative; background: #f7f0f5; background-image: radial-gradient(#bea5b12e .8px,transparent .8px); background-size: 12px 12px; display: grid; align-items: center; padding: 43px; overflow: hidden; }
.kp-home .kp-feature-tuition { background-color: #eff6f1; }
.kp-home .kp-feature-progress { background-color: #f0eef9; }
.kp-home .kp-feature-screen { background: white; border-radius: 12px; border: 1px solid #e7dee9; box-shadow: var(--kp-shadow); padding: 23px; position: relative; z-index: 1; width: 100%; }
.kp-home .kp-feature-screen .kp-preview-heading h4 { font-size: 15px; }
.kp-home .kp-feature-screen .kp-person strong { font-size: 11px; }
.kp-home .kp-feature-screen .kp-student-row { padding-block: 12px; }
.kp-home .kp-feature-screen .kp-avatar { width: 34px; height: 34px; }
.kp-home .kp-visual-decoration { position: absolute; right: -20px; bottom: -43px; font-size: 180px; line-height: 1; color: #b9336015; transform: rotate(15deg); }
.kp-home .kp-register-note { display: flex; align-items: center; gap: 6px; padding: 10px 0 16px; color: #838293; font-size: 9px; }
.kp-home .kp-auto-save { margin-left: auto; color: #528164; font-size: 8px; }
.kp-home .kp-module-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 15px; margin-top: 23px; }
.kp-home .kp-module-card { padding: 25px; border: 1px solid var(--kp-line); border-radius: 12px; transition: border-color .2s,transform .2s,box-shadow .2s; }
.kp-home .kp-module-card:hover { transform: translateY(-4px); border-color: #dfb8c6; box-shadow: 0 12px 22px -15px #74496038; }
.kp-home .kp-module-card .kp-icon { width: 38px; height: 38px; border-radius: 10px; }
.kp-home .kp-module-card h3 { margin: 18px 0 7px; font-size: 14px; font-weight: 650; }
.kp-home .kp-module-card p { color: var(--kp-muted); font-size: 12px; line-height: 1.75; }
.kp-home .kp-module-card > span:last-child { display: flex; gap: 6px; align-items: center; font-size: 10px; font-weight: 600; color: var(--kp-berry); margin-top: 20px; }
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
