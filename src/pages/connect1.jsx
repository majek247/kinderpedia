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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react'

const KP_CARD_ASSETS = {
  emma: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  lucas: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  sofia: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
  teacher: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
}

function Action({ children = 'Explore module', to = '/demo', className = '' }) {
  const classes = `kp-action-btn ${className}`
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight size={15} aria-hidden="true" />
    </>
  )
  return /^https?:/.test(to) ? (
    <a className={classes} href={to}>
      {content}
    </a>
  ) : (
    <Link className={classes} to={to}>
      {content}
    </Link>
  )
}

function CardAvatar({ src, name, size = 'md' }) {
  const [failed, setFailed] = useState(false)

  return (
    <span className={`kp-avatar kp-avatar-${size}`} aria-label={name} role="img">
      {failed ? (
        name
          .split(' ')
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
      ) : (
        <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  )
}

function ConnectedCard({ title, category, description, icon: Icon, badgeText, children, demoTo }) {
  return (
    <article className="kp-card">
      <div className="kp-card-header">
        <div className="kp-card-title-group">
          <div className="kp-card-icon-wrapper">
            <Icon size={20} strokeWidth={2} />
          </div>
          <div>
            <span className="kp-card-category">{category}</span>
            <h3 className="kp-card-title">{title}</h3>
          </div>
        </div>
        {badgeText && <span className="kp-card-pill">{badgeText}</span>}
      </div>

      <p className="kp-card-desc">{description}</p>

      {/* Main High-Fidelity Executive Mockup Container */}
      <div className="kp-card-mockup" role="img" aria-label={`${title} preview interface`}>
        <div className="kp-mockup-inner">{children}</div>
      </div>

      <div className="kp-card-footer">
        <Action to={demoTo}>Request Executive Briefing</Action>
      </div>
    </article>
  )
}

export default function ConnectedPlatform({ demoTo = '/demo' }) {
  // Page index for 4-card visible grid pagination
  const [currentPage, setCurrentPage] = useState(0)

  const cardsData = [
    {
      id: 'admin',
      title: 'School Administration & SIS',
      category: 'OPERATIONS',
      badgeText: 'Live Sync',
      description: 'Centralized enterprise record management, automated admissions workflow, and staff compliance tracking.',
      icon: ContactRound,
      content: (
        <div className="kp-mock-sis">
          <div className="kp-mock-toolbar">
            <div className="kp-mock-tabs">
              <span className="active">Students (1,240)</span>
              <span>Enrolments</span>
              <span>Faculty</span>
            </div>
            <span className="kp-mock-status-dot">● System Active</span>
          </div>

          <div className="kp-mock-table">
            {[
              { name: 'Emma Popescu', id: 'ST-9021', year: 'Grade 2 • A', status: 'Active', src: KP_CARD_ASSETS.emma },
              { name: 'Lucas Martin', id: 'ST-8842', year: 'Grade 1 • B', status: 'Active', src: KP_CARD_ASSETS.lucas },
              { name: 'Sofia Ionescu', id: 'ST-9104', year: 'Reception', status: 'Pending Review', src: KP_CARD_ASSETS.sofia },
            ].map((st) => (
              <div className="kp-mock-row" key={st.id}>
                <CardAvatar src={st.src} name={st.name} size="sm" />
                <div className="kp-mock-col-main">
                  <strong>{st.name}</strong>
                  <small>{st.id}</small>
                </div>
                <span className="kp-mock-subtext">{st.year}</span>
                <span className={`kp-status-badge ${st.status === 'Active' ? 'is-green' : 'is-amber'}`}>
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'classroom',
      title: 'Academic & Schedule Management',
      category: 'ACADEMICS',
      badgeText: 'Real-time',
      description: 'Dynamic timetable scheduling, automated attendance registers, and curriculum alignment tools.',
      icon: CalendarDays,
      content: (
        <div className="kp-mock-schedule">
          <div className="kp-schedule-header">
            <div>
              <span className="kp-text-muted">CURRENT TERM</span>
              <h4>Spring Semester • Week 8</h4>
            </div>
            <div className="kp-live-indicator">
              <span className="pulse" /> Live Sessions
            </div>
          </div>

          <div className="kp-schedule-grid">
            <div className="kp-sched-card is-active">
              <div className="kp-sched-time">08:30 - 09:45 AM</div>
              <strong>Advanced Mathematics</strong>
              <div className="kp-sched-meta">
                <span>Room 402</span>
                <span className="kp-pill-sm">Grade 4</span>
              </div>
            </div>

            <div className="kp-sched-card">
              <div className="kp-sched-time">10:15 - 11:30 AM</div>
              <strong>Natural Sciences & Lab</strong>
              <div className="kp-sched-meta">
                <span>Lab B</span>
                <span className="kp-pill-sm">Grade 5</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'communication',
      title: 'Family & Parent Engagement',
      category: 'COMMUNICATION',
      badgeText: 'Encrypted',
      description: 'Direct family messaging, announcements, broadcast channels, and real-time activity feeds.',
      icon: MessageCircle,
      content: (
        <div className="kp-mock-feed">
          <div className="kp-feed-header">
            <CardAvatar src={KP_CARD_ASSETS.teacher} name="Sarah Jenkins" size="md" />
            <div>
              <strong>Sarah Jenkins</strong>
              <span className="kp-text-muted">Head of Primary Learning</span>
            </div>
            <span className="kp-time-stamp">10:24 AM</span>
          </div>

          <div className="kp-feed-bubble">
            <p>
              "Students successfully finished their robotics presentation today! View photos from today's workshop below."
            </p>
            <div className="kp-feed-gallery">
              <div
                className="kp-gallery-img"
                style={{ backgroundImage: `url("${KP_CARD_ASSETS.classroom}")` }}
              />
              <div
                className="kp-gallery-img is-overlay"
                style={{ backgroundImage: `url("${KP_CARD_ASSETS.classroom}")` }}
              >
                <span>+4 Photos</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'finance',
      title: 'Tuition & Financial Operations',
      category: 'FINANCE',
      badgeText: 'Automated',
      description: 'Automate billing cycles, recurring fee collection, ledger accounting, and ERP reconciliation.',
      icon: CreditCard,
      content: (
        <div className="kp-mock-billing">
          <div className="kp-billing-top">
            <div>
              <span className="kp-text-muted">STATEMENT #INV-2027-89</span>
              <h4>Tuition & Extended Care</h4>
            </div>
            <span className="kp-status-badge is-green">
              <CheckCircle2 size={12} /> Paid
            </span>
          </div>

          <div className="kp-billing-breakdown">
            <div className="kp-billing-line">
              <span>Term 2 Base Tuition</span>
              <strong>$4,250.00</strong>
            </div>
            <div className="kp-billing-line">
              <span>After-School STEM Lab</span>
              <strong>$380.00</strong>
            </div>
            <div className="kp-billing-divider" />
            <div className="kp-billing-line is-total">
              <span>Total Settled</span>
              <strong className="kp-total-val">$4,630.00</strong>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'analytics',
      title: 'Learning Analytics & Progress',
      category: 'ANALYTICS',
      badgeText: 'AI Insights',
      description: 'Track student development milestones, competency standards, and standardized report cards.',
      icon: BarChart3,
      content: (
        <div className="kp-mock-analytics">
          <div className="kp-analytics-profile">
            <CardAvatar src={KP_CARD_ASSETS.emma} name="Emma Popescu" size="md" />
            <div>
              <strong>Emma Popescu</strong>
              <span className="kp-text-muted">Grade 2 • Overall Performance: 96%</span>
            </div>
          </div>

          <div className="kp-skills-list">
            {[
              { skill: 'Mathematical Reasoning', pct: 94, status: 'Exceeds' },
              { skill: 'Language & Literacy', pct: 98, status: 'Mastered' },
              { skill: 'Social & Emotional Skills', pct: 90, status: 'On Track' },
            ].map((s) => (
              <div className="kp-skill-item" key={s.skill}>
                <div className="kp-skill-info">
                  <span>{s.skill}</span>
                  <strong>{s.pct}%</strong>
                </div>
                <div className="kp-progress-track">
                  <div className="kp-progress-bar" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'multicampus',
      title: 'Multi-Campus Enterprise Oversight',
      category: 'GOVERNANCE',
      badgeText: 'HQ Dashboard',
      description: 'Real-time multi-site management, centralized compliance auditing, and network-wide capacity analytics.',
      icon: MapPin,
      content: (
        <div className="kp-mock-campuses">
          <div className="kp-campus-stats">
            <div className="kp-stat-box">
              <span className="kp-text-muted">Total Enrolment</span>
              <strong>1,840</strong>
            </div>
            <div className="kp-stat-box">
              <span className="kp-text-muted">Network Utilization</span>
              <strong>94.2%</strong>
            </div>
          </div>

          <div className="kp-campus-list">
            {[
              { name: 'Main Metropolitan Campus', capacity: '98% Full', count: '640 students', status: 'Optimal' },
              { name: 'Riverside Innovation Hub', capacity: '91% Full', count: '480 students', status: 'Optimal' },
              { name: 'West Valley Primary Site', capacity: '86% Full', count: '320 students', status: 'Attention' },
            ].map((c) => (
              <div className="kp-campus-row" key={c.name}>
                <div>
                  <strong>{c.name}</strong>
                  <small>{c.count}</small>
                </div>
                <span className={`kp-status-badge ${c.status === 'Optimal' ? 'is-green' : 'is-amber'}`}>
                  {c.capacity}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  // Pagination logic: 4 cards visible at a time
  const CARDS_PER_PAGE = 4
  const totalPages = Math.ceil(cardsData.length / CARDS_PER_PAGE)
  const visibleCards = cardsData.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  )

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="kp-platform-root" id="kp-platform" aria-labelledby="kp-platform-title">
      <style>{styles}</style>

      <div className="kp-container">
        {/* Top Header Section */}
        <div className="kp-header">
          <div className="kp-badge-pill">
            <Sparkles size={14} className="kp-sparkle-icon" />
            <span>ENTERPRISE ECOSYSTEM</span>
          </div>

          <h2 id="kp-platform-title" className="kp-title">
            Every part of your institution. <span className="kp-text-gradient">Unified.</span>
          </h2>

          <p className="kp-subtitle">
            An all-in-one operating system engineered for executive leadership, school administration, academic excellence, and family engagement.
          </p>
        </div>

        {/* Carousel / Slider Navigation Bar */}
        <div className="kp-controls-bar">
          <div className="kp-category-pills">
            <button
              type="button"
              className={`kp-filter-pill ${currentPage === 0 ? 'is-active' : ''}`}
              onClick={() => setCurrentPage(0)}
            >
              Core Operations & Academics
            </button>
            <button
              type="button"
              className={`kp-filter-pill ${currentPage === 1 ? 'is-active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              Analytics & Governance
            </button>
          </div>

          <div className="kp-carousel-arrows">
            <span className="kp-page-counter">
              0{currentPage + 1} / 0{totalPages}
            </span>
            <button
              type="button"
              className="kp-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous features"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="kp-arrow-btn"
              onClick={handleNext}
              aria-label="Next features"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 2-Card Row Grid (4 Cards Visible on Load) */}
        <div className="kp-grid-2col">
          {visibleCards.map((card) => (
            <ConnectedCard
              key={card.id}
              title={card.title}
              category={card.category}
              badgeText={card.badgeText}
              description={card.description}
              icon={card.icon}
              demoTo={demoTo}
            >
              {card.content}
            </ConnectedCard>
          ))}
        </div>

        {/* Slide Pagination Dots */}
        <div className="kp-dots-indicator">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`kp-dot ${currentPage === idx ? 'is-active' : ''}`}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = `
.kp-platform-root {
  --kp-bg: #FAFCFF;
  --kp-card-bg: #FFFFFF;
  --kp-border: #E2E8F0;
  --kp-border-hover: #CBD5E1;
  --kp-text-primary: #0F172A;
  --kp-text-muted: #64748B;
  --kp-accent: #0D9488;
  --kp-accent-light: #F0FDFA;
  --kp-indigo: #4F46E5;

  background-color: var(--kp-bg);
  color: var(--kp-text-primary);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 80px 0;
  -webkit-font-smoothing: antialiased;
}

.kp-platform-root *,
.kp-platform-root *::before,
.kp-platform-root *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.kp-container {
  width: min(1280px, calc(100% - 64px));
  margin-inline: auto;
}

/* Header */
.kp-header {
  max-width: 760px;
  margin-bottom: 40px;
}

.kp-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #475569;
  margin-bottom: 18px;
}

.kp-sparkle-icon {
  color: var(--kp-accent);
}

.kp-title {
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--kp-text-primary);
}

.kp-text-gradient {
  background: linear-gradient(135deg, #0D9488 0%, #0284C7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.kp-subtitle {
  margin-top: 16px;
  font-size: 17px;
  line-height: 1.6;
  color: var(--kp-text-muted);
  font-weight: 450;
}

/* Controls Bar */
.kp-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E2E8F0;
}

.kp-category-pills {
  display: flex;
  gap: 10px;
}

.kp-filter-pill {
  border: 1px solid #E2E8F0;
  background: #FFFFFF;
  color: var(--kp-text-muted);
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.kp-filter-pill.is-active,
.kp-filter-pill:hover {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.kp-carousel-arrows {
  display: flex;
  align-items: center;
  gap: 12px;
}

.kp-page-counter {
  font-size: 13px;
  font-weight: 700;
  color: var(--kp-text-muted);
  letter-spacing: 0.05em;
  margin-right: 4px;
}

.kp-arrow-btn {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background: #FFFFFF;
  color: var(--kp-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.kp-arrow-btn:hover {
  border-color: #CBD5E1;
  background: #F8FAFC;
}

/* 2-Column Grid (Exactly 2 cards per row) */
.kp-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

/* Premium C-Suite Executive Card Styling (No muddy shadows) */
.kp-card {
  background: var(--kp-card-bg);
  border: 1px solid var(--kp-border);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.kp-card:hover {
  border-color: var(--kp-border-hover);
  transform: translateY(-2px);
}

.kp-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.kp-card-title-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.kp-card-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--kp-accent-light);
  color: var(--kp-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.kp-card-category {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--kp-accent);
  margin-bottom: 2px;
}

.kp-card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--kp-text-primary);
  letter-spacing: -0.02em;
}

.kp-card-pill {
  font-size: 11px;
  font-weight: 600;
  background: #F1F5F9;
  color: #475569;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
}

.kp-card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--kp-text-muted);
  margin-bottom: 24px;
}

/* Finer, Bigger Executive Mockup Box */
.kp-card-mockup {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  min-height: 220px;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.kp-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--kp-text-primary);
  margin-top: 20px;
  transition: gap 0.2s ease, color 0.2s ease;
}

.kp-action-btn:hover {
  gap: 12px;
  color: var(--kp-accent);
}

/* --- MOCKUP INTERFACE DETAILS --- */
/* SIS Mockup */
.kp-mock-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E2E8F0;
}

.kp-mock-tabs {
  display: flex;
  gap: 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--kp-text-muted);
}

.kp-mock-tabs .active {
  color: var(--kp-accent);
  border-bottom: 2px solid var(--kp-accent);
  padding-bottom: 4px;
}

.kp-mock-status-dot {
  font-size: 10px;
  font-weight: 700;
  color: #10B981;
}

.kp-mock-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kp-mock-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FFFFFF;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.kp-mock-col-main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.kp-mock-col-main strong {
  font-size: 13px;
  font-weight: 600;
}

.kp-mock-col-main small {
  font-size: 10px;
  color: var(--kp-text-muted);
}

.kp-mock-subtext {
  font-size: 11px;
  color: var(--kp-text-muted);
  font-weight: 500;
}

.kp-status-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 100px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.kp-status-badge.is-green {
  background: #ECFDF5;
  color: #059669;
}

.kp-status-badge.is-amber {
  background: #FFFBEB;
  color: #D97706;
}

/* Schedule Mockup */
.kp-schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.kp-schedule-header h4 {
  font-size: 13px;
  font-weight: 700;
}

.kp-text-muted {
  font-size: 10px;
  font-weight: 700;
  color: var(--kp-text-muted);
  letter-spacing: 0.05em;
}

.kp-live-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #059669;
}

.pulse {
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
}

.kp-schedule-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kp-sched-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 10px 14px;
  border-radius: 8px;
}

.kp-sched-card.is-active {
  border-left: 3px solid var(--kp-accent);
  background: #FFFFFF;
}

.kp-sched-time {
  font-size: 10px;
  font-weight: 700;
  color: var(--kp-text-muted);
}

.kp-sched-card strong {
  font-size: 12px;
  display: block;
  margin: 2px 0;
}

.kp-sched-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--kp-text-muted);
}

.kp-pill-sm {
  background: #F1F5F9;
  padding: 1px 6px;
  border-radius: 4px;
}

/* Message Feed Mockup */
.kp-feed-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.kp-feed-header strong {
  font-size: 12px;
  display: block;
}

.kp-time-stamp {
  margin-left: auto;
  font-size: 10px;
  color: var(--kp-text-muted);
}

.kp-feed-bubble {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 12px;
}

.kp-feed-bubble p {
  font-size: 12px;
  color: #334155;
  line-height: 1.5;
  margin-bottom: 10px;
}

.kp-feed-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.kp-gallery-img {
  height: 65px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
}

.kp-gallery-img.is-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
}

.kp-gallery-img.is-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 6px;
}

.kp-gallery-img.is-overlay span {
  position: relative;
  z-index: 1;
}

/* Billing Mockup */
.kp-billing-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.kp-billing-top h4 {
  font-size: 13px;
  font-weight: 700;
}

.kp-billing-breakdown {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px;
}

.kp-billing-line {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 6px;
  color: #475569;
}

.kp-billing-divider {
  height: 1px;
  background: #E2E8F0;
  margin: 8px 0;
}

.kp-billing-line.is-total {
  font-weight: 700;
  color: var(--kp-text-primary);
  margin-bottom: 0;
}

.kp-total-val {
  color: var(--kp-accent);
}

/* Analytics Mockup */
.kp-analytics-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.kp-analytics-profile strong {
  font-size: 12px;
  display: block;
}

.kp-skills-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kp-skill-item {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 8px 10px;
}

.kp-skill-info {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
}

.kp-progress-track {
  height: 4px;
  background: #F1F5F9;
  border-radius: 2px;
  overflow: hidden;
}

.kp-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #0D9488 0%, #0284C7 100%);
}

/* Multi Campus Mockup */
.kp-campus-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.kp-stat-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 8px 10px;
  border-radius: 6px;
}

.kp-stat-box strong {
  display: block;
  font-size: 16px;
  color: var(--kp-text-primary);
}

.kp-campus-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.kp-campus-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 8px 10px;
  border-radius: 6px;
}

.kp-campus-row strong {
  font-size: 11px;
  display: block;
}

.kp-campus-row small {
  font-size: 10px;
  color: var(--kp-text-muted);
}

/* Avatars */
.kp-avatar {
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #E2E8F0;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  flex-shrink: 0;
}

.kp-avatar-sm { width: 28px; height: 28px; }
.kp-avatar-md { width: 34px; height: 34px; }

.kp-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dots Indicator */
.kp-dots-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.kp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #E2E8F0;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.kp-dot.is-active {
  background: var(--kp-accent);
  width: 24px;
  border-radius: 100px;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .kp-grid-2col {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .kp-platform-root {
    padding: 48px 0;
  }
  .kp-controls-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .kp-carousel-arrows {
    width: 100%;
    justify-content: space-between;
  }
}
`