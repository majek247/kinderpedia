
import { useId, useState } from 'react'
import { ArrowRight, Building2, BookOpen, MessageCircle, CalendarDays, Check, Quote, Leaf } from 'lucide-react'

const STORY_URL = 'https://www.kinderpedia.co/en/case-studies/maple-bear-case-study'

// Reuses the classroom asset from Community.jsx. Supply licensed school
// photography via classroomImage when available; this is illustrative imagery.
const DEFAULT_IMAGE = '/images/classroom-activity.png'

const PREVIEWS = {
  communication: {
    label: 'Communication',
    title: 'The right update. The right people.',
    rows: [
      ['Class update', 'Today’s discoveries, shared with families.', 'Class parents'],
      ['A personal message', 'A direct conversation about your child.', 'One family'],
      ['School announcement', 'Everything families need for the week.', 'School community'],
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
        <div><strong>Maple Bear Cluj</strong><small>A connected school day</small></div>
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
        <article className="kp-case-card">
          <div className="kp-case-photo">
            {classroomImage && failedImage !== classroomImage ? (
              <img src={classroomImage} alt="Illustrative classroom activity with a teacher and children" loading="lazy" onError={() => setFailedImage(classroomImage)} />
            ) : (
              <div className="kp-case-photo-fallback"><BookOpen size={58} aria-hidden="true" /><span>Every child. Every classroom.<br />One connected community.</span></div>
            )}
            <div className="kp-case-photo-badge"><SchoolMark /><span><strong>Maple Bear Cluj</strong><small>Romania · Customer story</small></span></div>
            <span className="kp-case-photo-note">Illustrative photography</span>
          </div>

          <div className="kp-case-content">
            <p className="kp-case-eyebrow">Featured case study · Maple Bear Cluj</p>
            <h2 id={headingId}>A school community.<br /><span>A clearer connection.</span></h2>
            <p className="kp-case-intro">See how Maple Bear Cluj brought clarity to family communication and gave school leaders a real-time view of everyday school life.</p>
            <div className="kp-case-quote">
              <Quote size={24} aria-hidden="true" />
              <div>
                <blockquote>“The message goes directly to the right people. There are no more misunderstandings or confusion.”</blockquote>
                <p><strong>Iulia Moldovan</strong><span>Teacher, Maple Bear Cluj</span></p>
              </div>
            </div>
            <a className="kp-case-cta" href={storyUrl}>Read the Maple Bear story <ArrowRight size={17} aria-hidden="true" /></a>
          </div>

          <div className="kp-case-product"><CasePreview /></div>

          <div className="kp-case-proof">
            <div><Building2 aria-hidden="true" /><span><strong>Across Cluj-Napoca</strong><small>A connected campus community</small></span></div>
            <div><BookOpen aria-hidden="true" /><span><strong>Canadian + Romanian</strong><small>Supporting a dual curriculum</small></span></div>
            <div><MessageCircle aria-hidden="true" /><span><strong>Real-time communication</strong><small>Teachers and families, together</small></span></div>
          </div>
        </article>
      </div>
    </section>
  )
}

const styles = `
.kp-case-section {
  padding: 32px 0 40px; color: #10243e;
  background: linear-gradient(180deg,#fff,#f5fbf9 65%,#fff);
  font-family: Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  font-size: 16px; line-height: 1.6; isolation: isolate;
  -webkit-font-smoothing: antialiased;
}
.kp-case-section *, .kp-case-section *::before, .kp-case-section *::after { box-sizing: border-box; }
.kp-case-section :where(h2,h3,p,blockquote) { margin: 0; }
.kp-case-section :where(h2,h3) { font-family: inherit; color: inherit; }
.kp-case-section svg { flex-shrink: 0; }
.kp-case-container { width: min(1200px,calc(100% - 80px)); margin-inline: auto; }
.kp-case-card {
  display: grid; grid-template-columns: .85fr 1.3fr 1fr; gap: 0;
  overflow: hidden; border-radius: 24px; border: 1px solid #dceee8;
  background: radial-gradient(ellipse at 100% 0%,#def5ed,transparent 55%),linear-gradient(120deg,#fff,#f0faf7);
  box-shadow: 0 18px 55px -32px #155c5260;
}
.kp-case-photo { position: relative; grid-row: span 2; min-height: 490px; background: #d9eee7; }
.kp-case-photo > img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: center; }
.kp-case-photo::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg,transparent 55%,#092b36a6); pointer-events: none; }
.kp-case-photo-fallback { height: 100%; min-height: 490px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; padding: 24px; text-align: center; color: #087e79; font-weight: 650; background: radial-gradient(circle at 25% 20%,#fff9,#ffffff00 60%); }
.kp-case-photo-badge { position: absolute; z-index: 1; left: 18px; right: 18px; bottom: 42px; padding: 12px; display: flex; align-items: center; gap: 10px; background: #fffffff0; border: 1px solid #fff; border-radius: 14px; box-shadow: 0 8px 24px #103f3420; }
.kp-case-photo-badge strong { display: block; font-size: 14px; }
.kp-case-photo-badge small { display: block; font-size: 11px; color: #536878; }
.kp-case-photo-note { position: absolute; bottom: 15px; left: 20px; z-index: 1; font-size: 10px; color: #fff; }
.kp-case-mark { display: grid; place-items: center; width: 35px; height: 35px; border-radius: 10px; background: #fff0f2; color: #cc2449; flex-shrink: 0; }
.kp-case-content { padding: 34px 24px 24px 28px; min-width: 0; }
.kp-case-eyebrow { color: #157c79; font-size: 10px; line-height: 1.5; font-weight: 750; letter-spacing: 1.1px; text-transform: uppercase; margin-bottom: 13px !important; }
.kp-case-content h2 { font-size: clamp(25px,2.5vw,34px); font-weight: 750; line-height: 1.13; letter-spacing: -1px; }
.kp-case-content h2 span { color: #008c82; }
.kp-case-intro { font-size: 13px; line-height: 1.7; color: #506479; margin-top: 15px !important; }
.kp-case-quote { display: flex; align-items: flex-start; gap: 12px; margin-top: 22px; padding: 18px 16px; border-radius: 14px; border: 1px solid #e3efea; background: #ffffffed; box-shadow: 0 8px 22px -14px #2d756b38; }
.kp-case-quote > svg { color: #ff4c97; fill: #ff4c9718; }
.kp-case-quote blockquote { font-size: 13px; line-height: 1.65; color: #233d53; }
.kp-case-quote p { margin-top: 12px; font-size: 11px; }
.kp-case-quote strong, .kp-case-quote p span { display: block; }
.kp-case-quote p span { color: #637585; font-size: 10px; }
.kp-case-cta { display: inline-flex; align-items: center; justify-content: center; gap: 10px; margin-top: 22px; padding: 12px 17px; border-radius: 10px; background: #d92071; color: #fff !important; font-size: 12px; font-weight: 700; line-height: 1.5; text-decoration: none; box-shadow: 0 6px 16px #e7267620; transition: background .2s,transform .2s; }
.kp-case-cta:hover { background: #bc145d; transform: translateY(-2px); }
.kp-case-section :where(a,button):focus-visible { outline: 3px solid #087e79; outline-offset: 4px; }
.kp-case-product { display: flex; align-items: center; padding: 28px 22px 20px 0; min-width: 0; }
.kp-case-preview { width: 100%; padding: 16px 13px 10px; background: #fffffff5; border: 1px solid #e0ece7; border-radius: 16px; box-shadow: 0 15px 32px -17px #206b645c; }
.kp-case-preview-heading { display: flex; align-items: center; gap: 7px; }
.kp-case-preview-heading .kp-case-mark { width: 29px; height: 29px; }
.kp-case-preview-heading strong { display: block; font-size: 11px; }
.kp-case-preview-heading small { display: block; font-size: 8px; color: #6c7c89; }
.kp-case-online { display: flex; align-items: center; gap: 3px; margin-left: auto; font-size: 8px; color: #18745a; }
.kp-case-online > span { width: 5px; height: 5px; border-radius: 50%; background: #11a87d; }
.kp-case-switcher { display: flex; gap: 3px; padding: 5px; margin: 15px 0; background: #f2f7f5; border-radius: 8px; }
.kp-case-switcher button { flex: 1; min-width: 0; min-height: 38px; padding: 5px 2px; border: 0; border-radius: 5px; font-family: inherit; font-size: 9px; color: #546779; cursor: pointer; background: transparent; }
.kp-case-switcher button[aria-pressed="true"] { color: #087c76; background: #fff; box-shadow: 0 2px 5px #173e3410; font-weight: 750; }
.kp-case-preview-label { display: flex; justify-content: space-between; color: #6c7d89; font-size: 8px; }
.kp-case-preview-body { min-height: 252px; }
.kp-case-preview-body h3 { font-size: 12px; line-height: 1.5; margin: 11px 0 5px; font-weight: 700; }
.kp-case-message { display: flex; gap: 9px; padding: 11px 0; border-bottom: 1px solid #edf3f0; }
.kp-case-message:last-child { border-bottom: 0; }
.kp-case-message-icon { display: grid; place-items: center; width: 29px; height: 29px; border-radius: 9px; flex-shrink: 0; color: #07897f; background: #e6f7f1; }
.kp-case-message-icon.tone-1 { background: #e8f5fc; color: #1685b4; }
.kp-case-message-icon.tone-2 { background: #fff0f5; color: #d8337a; }
.kp-case-message strong { display: block; font-size: 10px; }
.kp-case-message p { font-size: 9px; color: #617586; line-height: 1.5; margin: 2px 0 4px; }
.kp-case-message-status { display: inline-flex; align-items: center; gap: 3px; font-size: 8px; color: #117b63; background: #eaf8f2; border-radius: 5px; padding: 2px 5px; }
.kp-case-preview-note { padding-top: 9px; border-top: 1px solid #edf3f0; color: #6c7d89; font-size: 8px; text-align: center; }
.kp-case-proof { grid-column: 2 / 4; display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin: 0 24px 22px 28px; padding-top: 17px; border-top: 1px solid #dcece5; }
.kp-case-proof > div { display: flex; align-items: center; gap: 9px; }
.kp-case-proof svg { width: 22px; height: 22px; color: #139f97; }
.kp-case-proof strong { display: block; font-size: 10px; line-height: 1.5; }
.kp-case-proof small { display: block; font-size: 9px; line-height: 1.5; color: #637987; margin-top: 3px; }
@media (max-width: 1050px) {
  .kp-case-card { grid-template-columns: .85fr 1.15fr; }
  .kp-case-photo { grid-row: 1; min-height: 400px; }
  .kp-case-product { grid-column: 1 / -1; padding: 0 28px 24px; }
  .kp-case-preview { max-width: 560px; margin-inline: auto; }
  .kp-case-proof { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .kp-case-container { width: calc(100% - 32px); }
  .kp-case-section { padding: 24px 0; }
  .kp-case-card { grid-template-columns: 1fr; border-radius: 19px; }
  .kp-case-photo { min-height: 290px; }
  .kp-case-photo-fallback { min-height: 290px; }
  .kp-case-content { padding: 25px 20px; }
  .kp-case-content h2 { font-size: 31px; }
  .kp-case-product { padding: 0 20px 24px; }
  .kp-case-proof { grid-template-columns: 1fr; margin: 0 20px 24px; gap: 17px; }
  .kp-case-proof strong { font-size: 12px; }
  .kp-case-proof small { font-size: 11px; }
  .kp-case-cta { width: 100%; }
}
@media (prefers-reduced-motion: reduce) { .kp-case-cta { transition: none; } .kp-case-cta:hover { transform: none; } }
`
