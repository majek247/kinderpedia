import { useId, useState } from 'react'
import { ArrowRight, Building2, BookOpen, MessageCircle, CalendarDays, Check, Quote, Leaf } from 'lucide-react'

const STORY_URL = 'https://www.kinderpedia.co/en/case-studies/maple-bear-case-study'

// Reuses the classroom asset from Community.jsx. Supply licensed school
// photography via classroomImage when available; this is illustrative imagery.
const DEFAULT_IMAGE = '/images/classroom-activity.png'

const PREVIEWS = {

communication: {
  label: 'Communication',
  title: 'Choose exactly who receives each update.',
  rows: [
    ['Class update', 'Send learning updates and announcements to every family in a class.', 'Class parents'],
    ['Individual message', 'Send child-specific information directly to one family.', 'One family'],
    ['School announcement', 'Share important information with the entire school community.', 'Whole school'],
  ],
},


  calendar: {
    label: 'Calendar',
    title: 'More moments together.',
    rows: [
      ['Science morning', 'Discover what we have been learning.', 'School event'],
      ['Family workshop', 'An invitation to learn together.', 'Community'],
      ['Parent conversations', 'Make time to talk about progress.', 'Meetings'],
    ],
  },
  learning: {
    label: 'Learning',
    title: 'Keep learning visible.',
    rows: [
      ['Classroom moments', 'Photos and activities from the school day.', 'Shared'],
      ['Learning materials', 'Resources to support each learning journey.', 'Available'],
      ['Progress reports', 'Help families follow each unit of study.', 'Published'],
    ],
  },
}

function SchoolMark() {
  return <span className="kp-case-mark"><Leaf size={21} aria-hidden="true" /></span>
}

function CasePreview() {
  const [selected, setSelected] = useState('communication')
  const view = PREVIEWS[selected]
  const Icon = selected === 'calendar' ? CalendarDays : selected === 'learning' ? BookOpen : MessageCircle

  return (
    <div className="kp-case-preview">
      <div className="kp-case-preview-heading">
        <SchoolMark />
        <div>
  <strong>Maple Bear Cluj</strong>
  <small>Parent communication</small>
</div>
        <span className="kp-case-online"><span />Connected</span>
      </div>
      <div className="kp-case-switcher" role="group" aria-label="Choose a product preview">
        {Object.entries(PREVIEWS).map(([key, item]) => (
          <button key={key} type="button" aria-pressed={key === selected} onClick={() => setSelected(key)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="kp-case-preview-body" aria-live="polite" aria-atomic="true">
        <div className="kp-case-preview-label"><span>All campuses</span><span>Sample view</span></div>
        <h3>{view.title}</h3>
        {view.rows.map(([title, description, status], index) => (
          <div className="kp-case-message" key={title}>
            <span className={`kp-case-message-icon tone-${index}`}><Icon size={17} aria-hidden="true" /></span>
            <div><strong>{title}</strong><p>{description}</p><span className="kp-case-message-status"><Check size={11} aria-hidden="true" />{status}</span></div>
          </div>
        ))}
      </div>
      <p className="kp-case-preview-note">Illustrative interface · fictional sample content</p>
    </div>
  )
}

export default function CaseStudy({ classroomImage = DEFAULT_IMAGE, storyUrl = STORY_URL }) {
  const headingId = useId()
  const [failedImage, setFailedImage] = useState(null)

  return (
    <section className="kp-case-section" aria-labelledby={headingId}>
      <style>{styles}</style>
      <div className="kp-case-container">

        <div className="kp-case-divider" aria-hidden="true" />

        <div className="kp-case-intro-header">
<span className="kp-case-pill">Customer Story</span>
<h2 className="kp-case-title">How Maple Bear Cluj Fixed Fragmented Parent Communication.</h2>
        </div>

        <article className="kp-case-card">
          <div className="kp-case-photo">
            {classroomImage && failedImage !== classroomImage ? (
              <img src={classroomImage} alt="Illustrative classroom activity with a teacher and children" loading="lazy" onError={() => setFailedImage(classroomImage)} />
            ) : (
              <div className="kp-case-photo-fallback"><BookOpen size={58} aria-hidden="true" /><span>Every child. Every classroom.<br />One connected community.</span></div>
            )}
            <div className="kp-case-photo-badge"><SchoolMark /><span><strong>Maple Bear Cluj</strong><small>Romania · Customer story</small></span></div>
          </div>

          <div className="kp-case-content">


       <p className="kp-case-eyebrow">Featured case study · Maple Bear Cluj</p>

<h2 id={headingId}>
  Important updates.<br />
  <span>Sent to the right families.</span>
</h2>

<p className="kp-case-intro">
  Maple Bear Cluj replaced fragmented parent communication with one place for teachers to message a family, a class or the entire school community.
</p>
         
            <div className="kp-case-quote">
              <Quote size={24} aria-hidden="true" />
              <div>
                <blockquote>“The message goes directly to the right people. There are no more misunderstandings or confusion.”</blockquote>
                <p><strong>Iulia Moldovan</strong><span>Teacher, Maple Bear Cluj</span></p>
              </div>
            </div>
                   <a className="kp-case-cta" href={storyUrl} target="_blank" rel="noopener noreferrer">Read the Maple Bear story <ArrowRight size={17} aria-hidden="true" /></a>
         </div>

          <div className="kp-case-product"><CasePreview /></div>

        <div className="kp-case-proof">
  <div>
    <Building2 aria-hidden="true" />
    <span>
      <strong>3 Cluj-Napoca locations</strong>
      <small>One view across the school community</small>
    </span>
  </div>

  <div>
    <BookOpen aria-hidden="true" />
    <span>
      <strong>Canadian + Romanian curricula</strong>
      <small>Both supported inside Kinderpedia</small>
    </span>
  </div>

  <div>
    <MessageCircle aria-hidden="true" />
    <span>
      <strong>Targeted parent communication</strong>
      <small>One family, one class or the whole school</small>
    </span>
  </div>
</div>

        </article>
      </div>
    </section>
  )
}

const styles = `
/* ============ Case Study Section ============ */
.kp-case-section {
  padding: 24px 0 100px;
  color: #0B2545;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5FBF9 55%, #FFFFFF 100%);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  isolation: isolate;
  -webkit-font-smoothing: antialiased;
}

.kp-case-section *,
.kp-case-section *::before,
.kp-case-section *::after { box-sizing: border-box; }

.kp-case-section :where(h2,h3,p,blockquote) { margin: 0; }
.kp-case-section :where(h2,h3) { font-family: inherit; color: inherit; }
.kp-case-section svg { flex-shrink: 0; }

/* MATCHES THE HERO WIDTH EXACTLY */
.kp-case-container {
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
}

/* ============ Divider above the section ============ */
.kp-case-divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent 0%, #D8E5E2 20%, #D8E5E2 80%, transparent 100%);
  margin-bottom: 64px;
}

/* ============ Intro Header ============ */
.kp-case-intro-header {
  margin-bottom: 40px;
}

.kp-case-pill {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  color: #0A8A80;
  background: #D8F5F2;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.kp-case-title {
  color: #0B2545;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(28px, 2.6vw, 34px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* ============ Main Card ============ */
.kp-case-card {
  display: grid;
  grid-template-columns: .85fr 1.3fr 1fr;
  gap: 0;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid #DCEBE6;
  background: radial-gradient(ellipse at 100% 0%, #DCF3EC, transparent 55%), linear-gradient(120deg, #FFFFFF, #F0FAF7);
  box-shadow: 0 24px 60px -32px rgba(11, 37, 69, .18);
}

/* ============ Photo Column ============ */
.kp-case-photo {
  position: relative;
  grid-row: span 2;
  min-height: 500px;
  background: #D8EEE7;
}

.kp-case-photo > img {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
}

.kp-case-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(9, 43, 54, .65));
  pointer-events: none;
}

.kp-case-photo-fallback {
  height: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
  color: #0A8A80;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-weight: 600;
  background: radial-gradient(circle at 25% 20%, #FFF9, #FFFFFF00 60%);
}

.kp-case-photo-badge {
  position: absolute;
  z-index: 1;
  left: 20px;
  right: 20px;
  bottom: 44px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, .96);
  border: 1px solid #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(16, 63, 52, .12);
}

.kp-case-photo-badge strong {
  display: block;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
}
.kp-case-photo-badge small {
  display: block;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  color: #55707F;
  margin-top: 2px;
  font-weight: 500;
}

.kp-case-photo-note {
  position: absolute;
  bottom: 15px;
  left: 20px;
  z-index: 1;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  color: #FFFFFF;
  font-weight: 500;
}

.kp-case-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #FFE4EE;
  color: #D9296B;
  flex-shrink: 0;
}

/* ============ Content Column ============ */
.kp-case-content {
  padding: 44px 32px 36px 36px;
  min-width: 0;
}

.kp-case-eyebrow {
  color: #0A8A80;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 16px !important;
}

.kp-case-content h2 {
  color: #0B2545;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(30px, 2.8vw, 38px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.kp-case-content h2 span {
  color: #0FB5A8;
}

.kp-case-intro {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: #506479;
  margin-top: 20px !important;
  font-weight: 400;
}

.kp-case-quote {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 28px;
  padding: 22px 22px;
  border-radius: 16px;
  border: 1px solid #E3EFEA;
  background: #FFFFFF;
  box-shadow: 0 12px 30px -20px rgba(45, 117, 107, .28);
}

.kp-case-quote > svg {
  color: #FF6B5B;
  fill: rgba(255, 107, 91, .1);
}

.kp-case-quote blockquote {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.65;
  color: #233D53;
  font-weight: 500;
}

.kp-case-quote p {
  margin-top: 14px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 12px;
}

.kp-case-quote strong,
.kp-case-quote p span { display: block; }
.kp-case-quote strong {
  color: #0B2545;
  font-weight: 700;
}
.kp-case-quote p span {
  color: #637585;
  font-size: 11px;
  margin-top: 2px;
  font-weight: 500;
}

.kp-case-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
  padding: 14px 22px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0FB5A8, #0A8A80);
  color: #FFFFFF !important;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(15, 181, 168, .22), inset 0 1px 0 rgba(255, 255, 255, .28);
  transition: background .2s, transform .2s, box-shadow .2s;
}

.kp-case-cta:hover {
  background: linear-gradient(135deg, #0A8A80, #076E66);
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(15, 181, 168, .28), inset 0 1px 0 rgba(255, 255, 255, .28);
}

.kp-case-section :where(a, button):focus-visible {
  outline: 3px solid #0FB5A8;
  outline-offset: 4px;
}

/* ============ Product Preview Column ============ */
.kp-case-product {
  display: flex;
  align-items: center;
  padding: 40px 32px 32px 0;
  min-width: 0;
}

.kp-case-preview {
  width: 100%;
  padding: 22px 18px 16px;
  background: #FFFFFF;
  border: 1px solid #E0ECE7;
  border-radius: 18px;
  box-shadow: 0 18px 44px -22px rgba(32, 107, 100, .28);
}

.kp-case-preview-heading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kp-case-preview-heading .kp-case-mark {
  width: 32px;
  height: 32px;
}

.kp-case-preview-heading strong {
  display: block;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
}
.kp-case-preview-heading small {
  display: block;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  color: #6C7C89;
  margin-top: 2px;
  font-weight: 500;
}

.kp-case-online {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  color: #18745A;
  font-weight: 700;
}

.kp-case-online > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0FB5A8;
}

.kp-case-switcher {
  display: flex;
  gap: 4px;
  padding: 5px;
  margin: 18px 0;
  background: #F2F7F5;
  border-radius: 10px;
}

.kp-case-switcher button {
  flex: 1;
  min-width: 0;
  min-height: 40px;
  padding: 6px 4px;
  border: 0;
  border-radius: 7px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #546779;
  cursor: pointer;
  background: transparent;
  transition: background .2s, color .2s;
}

.kp-case-switcher button[aria-pressed="true"] {
  color: #0A8A80;
  background: #FFFFFF;
  box-shadow: 0 2px 6px rgba(23, 62, 52, .06);
  font-weight: 700;
}

.kp-case-preview-label {
  display: flex;
  justify-content: space-between;
  color: #6C7D89;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  font-weight: 500;
}

.kp-case-preview-body {
  min-height: 260px;
}

.kp-case-preview-body h3 {
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  margin: 14px 0 6px;
  font-weight: 700;
}

.kp-case-message {
  display: flex;
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid #EDF3F0;
}

.kp-case-message:last-child { border-bottom: 0; }

.kp-case-message-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  flex-shrink: 0;
  color: #0A8A80;
  background: #E1F7F1;
}

.kp-case-message-icon.tone-1 { background: #E8F5FC; color: #1685B4; }
.kp-case-message-icon.tone-2 { background: #FFE9EE; color: #D9296B; }

.kp-case-message strong {
  display: block;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
}
.kp-case-message p {
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 10px;
  color: #617586;
  line-height: 1.5;
  margin: 3px 0 5px;
  font-weight: 400;
}
.kp-case-message-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  color: #1A8367;
  background: #E1F7F1;
  border-radius: 6px;
  padding: 3px 7px;
  font-weight: 600;
}

.kp-case-preview-note {
  padding-top: 12px;
  border-top: 1px solid #EDF3F0;
  color: #6C7D89;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 9px;
  text-align: center;
  font-weight: 500;
}

/* ============ Proof Strip ============ */
.kp-case-proof {
  grid-column: 2 / 4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 32px 32px 36px;
  padding-top: 24px;
  border-top: 1px solid #DCEBE5;
}

.kp-case-proof > div {
  display: flex;
  align-items: center;
  gap: 11px;
}

.kp-case-proof svg {
  width: 24px;
  height: 24px;
  color: #0FB5A8;
}

.kp-case-proof strong {
  display: block;
  color: #0B2545;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
}
.kp-case-proof small {
  display: block;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 11px;
  line-height: 1.5;
  color: #637987;
  margin-top: 3px;
  font-weight: 500;
}

/* ============ Tablet ============ */
@media (max-width: 1050px) {
  .kp-case-card { grid-template-columns: .85fr 1.15fr; }
  .kp-case-photo { grid-row: 1; min-height: 420px; }
  .kp-case-product { grid-column: 1 / -1; padding: 0 32px 28px; }
  .kp-case-preview { max-width: 560px; margin-inline: auto; }
  .kp-case-proof { grid-column: 1 / -1; }
}

/* ============ Mobile ============ */
@media (max-width: 640px) {
  .kp-case-container { width: calc(100% - 32px); }
  .kp-case-section { padding: 48px 0 64px; }
  .kp-case-divider { margin-bottom: 40px; }
  .kp-case-card { grid-template-columns: 1fr; border-radius: 22px; }
  .kp-case-photo { min-height: 300px; }
  .kp-case-photo-fallback { min-height: 300px; }
  .kp-case-content { padding: 32px 22px; }
  .kp-case-content h2 { font-size: 28px; }
  .kp-case-product { padding: 0 22px 26px; }
  .kp-case-proof { grid-template-columns: 1fr; margin: 0 22px 26px; gap: 18px; }
  .kp-case-proof strong { font-size: 13px; }
  .kp-case-proof small { font-size: 12px; }
  .kp-case-cta { width: 100%; }
  .kp-case-title { font-size: 24px; }
  .kp-case-pill { font-size: 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .kp-case-cta { transition: none; }
  .kp-case-cta:hover { transform: none; }
}
`