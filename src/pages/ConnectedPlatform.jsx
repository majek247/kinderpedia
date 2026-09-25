import React, { useState } from 'react'

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
  Heart,
  Check,
  AlertCircle,
} from 'lucide-react'


const KP_ASSETS = {
  emma: '/images/student-emma.png',
  lucas: '/images/student-lucas.png',
  sofia: '/images/student-sofia.png',
  teacher: '/images/teacher-avatar.png',
  classroom: '/images/classroom-activity.png',
}


/* =========================================================
   AVATAR
========================================================= */

function CardAvatar({ src, name, size = 'normal' }) {
  const [failed, setFailed] = useState(false)

  const sizeClass =
    size === 'large'
      ? 'is-large'
      : size === 'small'
        ? 'is-small'
        : ''

  return (
    <span
      className={`kp-avatar ${sizeClass}`}
      aria-label={name}
    >
      {failed ? (
        <span className="kp-avatar-fallback">
          {name
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')}
        </span>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}


/* =========================================================
   FEATURE CARD
========================================================= */

function ConnectedCard({
  title,
  description,
  icon: Icon,
  tone = 'teal',
  demoTo = '/demo',
  children,
}) {
  return (
    <article className={`kp-card tone-${tone}`}>
      <div className="kp-card-head">

        <div className="kp-icon-box">
          <Icon size={21} strokeWidth={2} />
        </div>

        <div className="kp-card-copy">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <a
          href={demoTo}
          className="kp-card-link"
          aria-label={`Explore ${title}`}
        >
          <ArrowRight size={17} />
        </a>

      </div>

      <div
        className="kp-card-preview"
        role="img"
        aria-label={`${title} interface preview`}
      >
        {children}
      </div>
    </article>
  )
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ConnectedPlatform({
  demoTo = '/demo',
}) {
  const [page, setPage] = useState(0)

  const [adminTab, setAdminTab] =
    useState('students')


  /* =======================================================
     DATA
  ======================================================= */

  const students = [
    {
      name: 'Emma Popescu',
      year: 'Year 2',
      className: 'Maple Class',
      image: KP_ASSETS.emma,
      status: 'Active',
    },
    {
      name: 'Lucas Martin',
      year: 'Year 1',
      className: 'Oak Class',
      image: KP_ASSETS.lucas,
      status: 'Active',
    },
    {
      name: 'Sofia Ionescu',
      year: 'Reception',
      className: 'Rainbow Class',
      image: KP_ASSETS.sofia,
      status: 'Active',
    },
  ]


  const campuses = [
    {
      name: 'Main Campus',
      count: '482 students',
      status: 'Online',
    },
    {
      name: 'Riverside Campus',
      count: '320 students',
      status: 'Online',
    },
    {
      name: 'City Campus',
      count: '210 students',
      status: 'Attention',
    },
    {
      name: 'West Campus',
      count: '180 students',
      status: 'Online',
    },
  ]


  /* =======================================================
     CARDS
  ======================================================= */

  const allCards = [

    /* =====================================================
       1. SCHOOL ADMINISTRATION
    ===================================================== */

    {
      id: 'admin',

      title: 'School Administration',

      description:
        'Manage student records, enrolments, staff information and the everyday admin that keeps your school running.',

      icon: ContactRound,

      tone: 'teal',

      content: (
        <div className="kp-mock-admin">

          <div className="kp-tabs-bar">

            {[
              'students',
              'enrolments',
              'staff',
            ].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`kp-tab-btn ${
                  adminTab === tab
                    ? 'is-selected'
                    : ''
                }`}
                onClick={() =>
                  setAdminTab(tab)
                }
              >
                {tab
                  .charAt(0)
                  .toUpperCase() +
                  tab.slice(1)}
              </button>
            ))}

          </div>


          <div className="kp-student-list">

            {students.map((student) => (
              <div
                className="kp-student-row"
                key={student.name}
              >

                <CardAvatar
                  src={student.image}
                  name={student.name}
                />

                <div className="kp-student-details">

                  <strong>
                    {student.name}
                  </strong>

                  <span>
                    {student.year}
                    {' • '}
                    {student.className}
                  </span>

                </div>


                <span className="kp-badge is-green">

                  <span className="kp-badge-dot" />

                  {student.status}

                </span>


                <button
                  type="button"
                  className="kp-row-menu"
                  aria-label={`More options for ${student.name}`}
                >
                  •••
                </button>

              </div>
            ))}

          </div>


          <a
            href={demoTo}
            className="kp-preview-link"
          >
            View all students

            <ArrowRight
              size={13}
              strokeWidth={2.2}
            />
          </a>

        </div>
      ),
    },


    /* =====================================================
       2. CLASSROOM MANAGEMENT
    ===================================================== */

    {
      id: 'classroom',

      title: 'Classroom Management',

      description:
        'Build timetables, record attendance, plan lessons and keep teachers on top of what is happening in every class.',

      icon: CalendarDays,

      tone: 'pink',

      content: (
        <div className="kp-timetable-wrap">

          <div className="kp-timetable">

            <div className="kp-timetable-header">

              <span />

              <span>Mon 12</span>

              <span>Tue 13</span>

              <span>Wed 14</span>

              <span>Thu 15</span>

              <span>Fri 16</span>

            </div>


            <div className="kp-timetable-row">

              <span className="kp-time">
                08:30
              </span>


              <div className="kp-subject-block is-blue">
                <strong>
                  English
                </strong>
                <span>
                  Year 2
                </span>
              </div>


              <div className="kp-subject-block is-sky">
                <strong>
                  Maths
                </strong>
                <span>
                  Year 4
                </span>
              </div>


              <div className="kp-subject-block is-teal">
                <strong>
                  Science
                </strong>
                <span>
                  Year 5
                </span>
              </div>


              <div className="kp-empty-slot" />

              <div className="kp-empty-slot" />

            </div>


            <div className="kp-timetable-row">

              <span className="kp-time">
                10:00
              </span>


              <div className="kp-subject-block is-pink">
                <strong>
                  Art
                </strong>
                <span>
                  Year 1
                </span>
              </div>


              <div className="kp-subject-block is-blue">
                <strong>
                  Science
                </strong>
                <span>
                  Year 2
                </span>
              </div>


              <div className="kp-subject-block is-sky">
                <strong>
                  English
                </strong>
                <span>
                  Year 2
                </span>
              </div>


              <div className="kp-empty-slot" />

              <div className="kp-empty-slot" />

            </div>


            <div className="kp-timetable-row">

              <span className="kp-time">
                11:30
              </span>


              <div className="kp-subject-block is-amber">
                <strong>
                  PE
                </strong>
                <span>
                  Year 3
                </span>
              </div>


              <div className="kp-subject-block is-purple">
                <strong>
                  Reading
                </strong>
                <span>
                  Year 1
                </span>
              </div>


              <div className="kp-subject-block is-rose">
                <strong>
                  Music
                </strong>
                <span>
                  Year 3
                </span>
              </div>


              <div className="kp-empty-slot" />

              <div className="kp-empty-slot" />

            </div>

          </div>


          <a
            href={demoTo}
            className="kp-preview-link"
          >
            View full timetable

            <ArrowRight
              size={13}
              strokeWidth={2.2}
            />
          </a>

        </div>
      ),
    },


    /* =====================================================
       3. FAMILY COMMUNICATION
    ===================================================== */

    {
      id: 'family',

      title: 'Family Communication',

      description:
        'Keep parents informed with messages, announcements, classroom updates, photos and important school information in one place.',

      icon: MessageCircle,

      tone: 'purple',

      content: (
        <div className="kp-family-preview">

          <div className="kp-message-card">

            <CardAvatar
              src={KP_ASSETS.teacher}
              name="Emma Wilson"
            />


            <div className="kp-message-body">

              <div className="kp-chat-bubble">

                <p>
                  Today’s class was amazing!
                  The children loved the
                  science experiment.{' '}

                  <Heart
                    size={13}
                    className="kp-heart-icon"
                    fill="#FF438F"
                    color="#FF438F"
                  />
                </p>


                <time>
                  10:26 AM
                </time>

              </div>


              <div className="kp-gallery-grid">

                <div
                  className="kp-photo-box is-photo-one"
                  style={{
                    backgroundImage:
                      `url("${KP_ASSETS.classroom}")`,
                  }}
                />


                <div
                  className="kp-photo-box is-photo-two"
                  style={{
                    backgroundImage:
                      `url("${KP_ASSETS.classroom}")`,
                  }}
                />


                <div
                  className="kp-photo-box is-more"
                  style={{
                    backgroundImage:
                      `url("${KP_ASSETS.classroom}")`,
                  }}
                >
                  <span>
                    +3
                  </span>
                </div>

              </div>

            </div>

          </div>


          <a
            href={demoTo}
            className="kp-preview-link"
          >
            View all updates

            <ArrowRight
              size={13}
              strokeWidth={2.2}
            />
          </a>

        </div>
      ),
    },


    /* =====================================================
       4. TUITION & PAYMENTS
    ===================================================== */

    {
      id: 'tuition',

      title: 'Tuition & Payments',

      description:
        'Create invoices, track payments and keep tuition records organised without relying on separate spreadsheets or finance tools.',

      icon: CreditCard,

      tone: 'sky',

      content: (
        <div className="kp-tuition-preview">

          <div className="kp-invoice-box">

            <div className="kp-invoice-head">

              <div className="kp-invoice-id">

                <span>
                  Invoice
                </span>

                <strong>
                  #INV-2027-089
                </strong>

              </div>


              <span className="kp-badge is-green">

                <Check
                  size={12}
                  strokeWidth={3}
                />

                Paid

              </span>

            </div>


            <div className="kp-invoice-items">

              <div className="kp-invoice-row">

                <span>
                  After school program
                </span>

                <strong>
                  €120.00
                </strong>

              </div>


              <div className="kp-invoice-row">

                <span>
                  April tuition
                </span>

                <strong>
                  €420.00
                </strong>

              </div>

            </div>


            <div className="kp-invoice-total">

              <span>
                Total Amount
              </span>

              <strong>
                €540.00
              </strong>

            </div>

          </div>


          <a
            href={demoTo}
            className="kp-preview-link"
          >
            View all invoices

            <ArrowRight
              size={13}
              strokeWidth={2.2}
            />
          </a>

        </div>
      ),
    },


    /* =====================================================
       5. PROGRESS MONITORING
    ===================================================== */

    {
      id: 'progress',

      title: 'Progress Monitoring',

      description:
        'Record assessments, milestones and development over time, giving teachers and families a clearer view of each student’s progress.',

      icon: BarChart3,

      tone: 'amber',

      content: (
        <div className="kp-progress-box">

          <div className="kp-progress-profile">

            <CardAvatar
              src={KP_ASSETS.emma}
              name="Emma Popescu"
              size="large"
            />


            <div className="kp-progress-meta">

              <strong>
                Emma Popescu
              </strong>

              <span>
                Year 2 • Primary
              </span>

            </div>

          </div>


          <div className="kp-skills-list">

            {[
              {
                skill: 'Reading',
                status: 'On track',
                tone: 'green',
                progress: 88,
              },
              {
                skill: 'Mathematics',
                status: 'On track',
                tone: 'green',
                progress: 81,
              },
              {
                skill: 'Social skills',
                status: 'Excellent',
                tone: 'blue',
                progress: 94,
              },
              {
                skill: 'Creativity',
                status: 'On track',
                tone: 'green',
                progress: 86,
              },
            ].map((item) => (

              <div
                className="kp-skill-row"
                key={item.skill}
              >

                <div className="kp-skill-main">

                  <div className="kp-skill-top">

                    <div className="kp-skill-label">

                      <span
                        className={`kp-skill-dot is-${item.tone}`}
                      />

                      <span className="kp-skill-title">
                        {item.skill}
                      </span>

                    </div>


                    <span
                      className={`kp-badge is-${item.tone}`}
                    >
                      {item.status}
                    </span>

                  </div>


                  <div className="kp-skill-track">

                    <span
                      className={`kp-skill-fill is-${item.tone}`}
                      style={{
                        width:
                          `${item.progress}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>


          <a
            href={demoTo}
            className="kp-preview-link"
          >
            View progress report

            <ArrowRight
              size={13}
              strokeWidth={2.2}
            />
          </a>

        </div>
      ),
    },


    /* =====================================================
       6. MULTI CAMPUS
    ===================================================== */

    {
      id: 'multicampus',

      title: 'Multi-Campus Oversight',

      description:
        'See enrolment, activity and operational data across every campus from one view, without chasing updates from individual locations.',

      icon: MapPin,

      tone: 'teal',

      content: (
        <div className="kp-campus-preview">

          <div className="kp-campus-box">

            <div className="kp-campus-heading">

              <span>
                Campus
              </span>

              <span>
                Status
              </span>

            </div>


            {campuses.map((campus) => (

              <div
                className="kp-campus-row"
                key={campus.name}
              >

                <div className="kp-campus-info">

                  <span className="kp-campus-name">
                    {campus.name}
                  </span>

                  <span className="kp-campus-count">
                    {campus.count}
                  </span>

                </div>


                <span
                  className={`kp-badge ${
                    campus.status ===
                    'Attention'
                      ? 'is-pink'
                      : 'is-green'
                  }`}
                >

                  {campus.status ===
                  'Attention' ? (
                    <AlertCircle
                      size={11}
                    />
                  ) : (
                    <span className="kp-badge-dot" />
                  )}

                  {campus.status}

                </span>

              </div>

            ))}

          </div>


          <a
            href={demoTo}
            className="kp-preview-link"
          >
            View all campuses

            <ArrowRight
              size={13}
              strokeWidth={2.2}
            />
          </a>

        </div>
      ),
    },
  ]


  /* =======================================================
     CAROUSEL
  ======================================================= */

  const totalPages =
    Math.ceil(allCards.length / 4)

  const visibleCards =
    allCards.slice(
      page * 4,
      page * 4 + 4
    )


  const handlePrev = () => {
    setPage((prev) =>
      prev > 0
        ? prev - 1
        : totalPages - 1
    )
  }


  const handleNext = () => {
    setPage((prev) =>
      prev <
      totalPages - 1
        ? prev + 1
        : 0
    )
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="kp-connected-platform">

      <style>
        {styles}
      </style>


      <div className="kp-inner">


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="kp-heading-wrapper">

          <div className="kp-pill">

            <Sparkles size={14} />

  ONE PLATFORM FOR THE WHOLE SCHOOL

          </div>

          <h2 className="kp-title">

            Everything Your School Manages,<br />

            <span className="kp-title-highlight">
              Connected in One Place.
            </span>

          </h2>

          <p className="kp-subtitle">

From enrolment and attendance to lesson planning, payments, progress tracking and parent updates, Kinderpedia brings the day-to-day running of your school into one system.

          </p>

        </div>


        {/* =================================================
            CONTROLS
        ================================================= */}

        <div className="kp-controls-bar">

          <div className="kp-tabs-group">

            <button
              type="button"
              className={`kp-main-tab ${
                page === 0
                  ? 'is-active'
                  : ''
              }`}
              onClick={() =>
                setPage(0)
              }
            >
              Core Operations & Learning
            </button>


            <button
              type="button"
              className={`kp-main-tab ${
                page === 1
                  ? 'is-active'
                  : ''
              }`}
              onClick={() =>
                setPage(1)
              }
            >
              Analytics & Campus Oversight
            </button>

          </div>


          <div className="kp-nav-group">

            <span className="kp-nav-count">

              0{page + 1}
              {' / '}
              0{totalPages}

            </span>


            <button
              type="button"
              className="kp-nav-btn"
              onClick={handlePrev}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>


            <button
              type="button"
              className="kp-nav-btn"
              onClick={handleNext}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>


        {/* =================================================
            GRID
        ================================================= */}

        <div className="kp-grid">

          {visibleCards.map((card) => (

            <ConnectedCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              tone={card.tone}
              demoTo={demoTo}
            >
              {card.content}
            </ConnectedCard>

          ))}

        </div>

      </div>

    </section>
  )
}


/* =========================================================
   STYLES
========================================================= */

const styles = `

/* =========================================================
   BASE
========================================================= */

.kp-connected-platform {

  --ink: #0B2545;
  --ink-soft: #1B2B48;

  --muted: #718096;
  --muted-soft: #8996AA;

  --page: #FFFFFF;

  --border-light: #E7EDF0;
  --border-softer: #EFF3F6;

  --teal: #0FB5A8;
  --teal-bg: #D8F5F2;

  --pink: #FF6B5B;
  --pink-bg: #FFEBF3;

  --purple: #8B5CF6;
  --purple-bg: #F1EAFE;

  --sky: #1597D4;
  --sky-bg: #E7F5FC;

  --amber: #E99B1D;
  --amber-bg: #FFF4D9;

  background: var(--page);

  color: var(--ink);

  font-family:
    'DM Sans',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;

  padding: 80px 0 90px;

  -webkit-font-smoothing:
    antialiased;

}


.kp-connected-platform *,
.kp-connected-platform *::before,
.kp-connected-platform *::after {

  box-sizing: border-box;

  margin: 0;

  padding: 0;

}


.kp-inner {

  width: min(
    1280px,
    calc(100% - 80px)
  );

  margin-inline: auto;

  padding: 0;

}


/* =========================================================
   HEADING
========================================================= */

.kp-heading-wrapper {

  margin-bottom: 40px;

}


.kp-pill {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  background: var(--teal-bg);

  color: #0A8A80;

  padding: 7px 15px;

  border-radius: 999px;

  font-family: 'DM Sans', system-ui, sans-serif;

  font-size: 11px;

  font-weight: 700;

  letter-spacing: .09em;

  margin-bottom: 19px;

}


.kp-title {

  color: var(--ink);

  font-family: 'Fredoka', system-ui, sans-serif;

  font-size:
    clamp(
      30px,
      3.2vw,
      42px
    );

  font-weight: 600;

  letter-spacing: -.02em;

  line-height: 1.15;

}


.kp-title-highlight {

  color: var(--teal);

}


.kp-subtitle {

  max-width: 820px;

  margin-top: 16px;

  color: #011522;

  font-family: 'DM Sans', system-ui, sans-serif;

  font-size: 16px;
    font-weight: 450;

  line-height: 1.65;


}



/* =========================================================
   CONTROLS
========================================================= */

.kp-controls-bar {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  margin-bottom: 26px;

  padding-bottom: 16px;

  border-bottom:
    1px solid var(--border-light);

}


.kp-tabs-group {

  display: flex;

  align-items: center;

  gap: 9px;

}


.kp-main-tab {

  appearance: none;

  border:
    1px solid var(--border-light);

  background: #FFFFFF;

  color: #69788D;

  padding: 10px 17px;

  border-radius: 10px;

  font-family: 'DM Sans', system-ui, sans-serif;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    color 160ms ease,
    border-color 160ms ease,
    background 160ms ease;

}


.kp-main-tab:hover {

  border-color: #D4DEE5;

  color: var(--ink);

}


.kp-main-tab.is-active {

  color: #FFFFFF;

  background: var(--ink);

  border-color: var(--ink);

}


.kp-nav-group {

  display: flex;

  align-items: center;

  gap: 8px;

}


.kp-nav-count {

  color: #7C899B;

  font-family: 'DM Sans', system-ui, sans-serif;

  font-size: 13px;

  font-weight: 600;

  letter-spacing: .02em;

  margin-right: 5px;

}


.kp-nav-btn {

  appearance: none;

  width: 38px;

  height: 38px;

  border-radius: 10px;

  border:
    1px solid var(--border-light);

  background: #FFFFFF;

  color: var(--ink);

  display: grid;

  place-items: center;

  cursor: pointer;

  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease;

}


.kp-nav-btn:hover {

  background: #F2FAF9;

  border-color: #BFE6E1;

  color: var(--teal);

}


/* =========================================================
   GRID
========================================================= */

.kp-grid {

  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 20px;

}


/* =========================================================
   FEATURE CARD
========================================================= */

.kp-card {

  --accent: var(--teal);
  --accent-bg: var(--teal-bg);

  background: #FFFFFF;

  border:
    1px solid #E5EBEF;

  border-radius: 22px;

  padding: 23px;

  min-width: 0;

  display: flex;

  flex-direction: column;

  transition:
    border-color 180ms ease;

}


.kp-card:hover {

  border-color: #D5E0E5;

}


.kp-card.tone-pink {

  --accent: var(--pink);

  --accent-bg: var(--pink-bg);

}


.kp-card.tone-purple {

  --accent: var(--purple);

  --accent-bg: var(--purple-bg);

}


.kp-card.tone-sky {

  --accent: var(--sky);

  --accent-bg: var(--sky-bg);

}


.kp-card.tone-amber {

  --accent: var(--amber);

  --accent-bg: var(--amber-bg);

}


/* =========================================================
   CARD HEADER
========================================================= */

.kp-card-head {

  display: grid;

  grid-template-columns:
    46px minmax(0, 1fr) 30px;

  gap: 14px;

  align-items: start;

}


.kp-icon-box {

  width: 46px;

  height: 46px;

  border-radius: 13px;

  display: grid;

  place-items: center;

  background:
    var(--accent-bg);

  color: var(--accent);

}


.kp-card-copy {

  min-width: 0;

}


.kp-card-copy h3 {

  color: var(--ink);

  font-family: 'Fredoka', system-ui, sans-serif;

  font-size: 17px;

  line-height: 1.25;

  font-weight: 600;

  letter-spacing: -.01em;

  margin-bottom: 5px;

}


.kp-card-copy p {

  max-width: 540px;
  color: #011522;
  font-family: 'DM Sans', system-ui, sans-serif;

  font-size: 14px;

  line-height: 1.55;

  font-weight: 450;

}


.kp-card-link {

  width: 30px;

  height: 30px;

  display: grid;

  place-items: center;

  color: var(--accent);

  text-decoration: none;

  border-radius: 8px;

  transition:
    background 160ms ease;

}


.kp-card-link:hover {

  background:
    var(--accent-bg);

}


/* =========================================================
   PREVIEW CANVAS
========================================================= */

.kp-card-preview {

  margin-top: 20px;

  flex: 1;

  min-height: 0;

  padding: 14px;

  overflow: hidden;

  border:
    1px solid #E8EDF2;

  border-radius: 17px;

  background:
    linear-gradient(
      180deg,
      #F8FAFC 0%,
      #F5F8FB 100%
    );

  display: flex;

  flex-direction: column;

}


.kp-card-preview button,
.kp-card-preview a {

  font-family: inherit;

}


/* =========================================================
   AVATARS
========================================================= */

.kp-avatar {

  width: 34px;

  height: 34px;

  border-radius: 50%;

  flex-shrink: 0;

  overflow: hidden;

  display: grid;

  place-items: center;

  background: #E5EBF0;

  color: #657489;

  font-size: 10px;

  font-weight: 750;

}


.kp-avatar.is-large {

  width: 48px;

  height: 48px;

  font-size: 14px;

}


.kp-avatar.is-small {

  width: 28px;

  height: 28px;

}


.kp-avatar img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.kp-avatar-fallback {

  display: grid;

  place-items: center;

  width: 100%;

  height: 100%;

}


/* =========================================================
   BADGES
========================================================= */

.kp-badge {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 5px;

  min-height: 23px;

  padding: 4px 9px;

  border-radius: 999px;

  font-size: 9px;

  line-height: 1;

  font-weight: 750;

  white-space: nowrap;

}


.kp-badge-dot {

  width: 5px;

  height: 5px;

  border-radius: 50%;

  background: currentColor;

}


.kp-badge.is-green {

  color: #059669;

  background: #E5F8F1;

}


.kp-badge.is-blue {

  color: #1683C4;

  background: #E8F5FC;

}


.kp-badge.is-pink {

  color: #E74D89;

  background: #FFEAF2;

}


/* =========================================================
   SHARED PREVIEW LINK
========================================================= */

.kp-preview-link {

  display: inline-flex;

  align-items: center;

  gap: 5px;

  width: fit-content;

  margin-top: 10px;

  padding: 2px 1px;

  color: var(--accent);

  text-decoration: none;

  font-size: 10px;

  line-height: 1;

  font-weight: 650;

  transition:
    gap 160ms ease,
    opacity 160ms ease;

}


.kp-preview-link:hover {

  gap: 8px;

  opacity: .82;

}


/* =========================================================
   ADMINISTRATION
========================================================= */

.kp-mock-admin {

  min-height: 100%;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.kp-tabs-bar {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 2px;

  padding: 3px;

  margin-bottom: 9px;

  border-radius: 9px;

  background: #EBF0F5;

}


.kp-tab-btn {

  appearance: none;

  border: 0;

  min-height: 28px;

  padding: 5px 7px;

  border-radius: 7px;

  background: transparent;

  color: #768399;

  font-size: 10px;

  font-weight: 650;

  cursor: pointer;

  transition:
    background 160ms ease,
    color 160ms ease;

}


.kp-tab-btn.is-selected {

  background: #FFFFFF;

  color: #5748D8;

  box-shadow:
    0 0 0 1px
      rgba(
        220,
        227,
        234,
        .75
      );

}


.kp-student-list {

  overflow: hidden;

  background: #FFFFFF;

  border:
    1px solid #E4EAF0;

  border-radius: 11px;

  flex: 1;

  display: flex;

  flex-direction: column;

}


.kp-student-row {

  display: grid;

  grid-template-columns:
    34px
    minmax(0, 1fr)
    auto
    24px;

  gap: 9px;

  align-items: center;

  min-height: 53px;

  padding: 8px 10px;

  border-bottom:
    1px solid #EDF1F4;

  flex: 1;

}


.kp-student-row:last-child {

  border-bottom: 0;

}


.kp-student-details {

  min-width: 0;

}


.kp-student-details strong {

  display: block;

  color: #16233D;

  font-size: 12px;

  line-height: 1.2;

  font-weight: 750;

  overflow: hidden;

  white-space: nowrap;

  text-overflow: ellipsis;

}


.kp-student-details span {

  display: block;

  margin-top: 3px;

  color: #76869B;

  font-size: 10px;

  line-height: 1.2;

  font-weight: 500;

  overflow: hidden;

  white-space: nowrap;

  text-overflow: ellipsis;

}


.kp-row-menu {

  width: 24px;

  height: 24px;

  border: 0;

  background: transparent;

  color: #7C8A9C;

  display: grid;

  place-items: center;

  cursor: pointer;

  font-size: 11px;

  letter-spacing: .8px;

}


/* =========================================================
   TIMETABLE
========================================================= */

.kp-timetable-wrap {

  min-height: 100%;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.kp-timetable {

  flex: 1;

  display: flex;

  flex-direction: column;

  padding: 11px;

  background: #FFFFFF;

  border:
    1px solid #E5EBF0;

  border-radius: 11px;

}


.kp-timetable-header,
.kp-timetable-row {

  display: grid;

  grid-template-columns:
    34px
    repeat(
      5,
      minmax(0, 1fr)
    );

  gap: 4px;

}


.kp-timetable-header {

  align-items: center;

  margin-bottom: 5px;

  text-align: center;

  color: #657489;

  font-size: 9px;

  line-height: 1;

  font-weight: 700;

  flex-shrink: 0;

}


.kp-timetable-row {

  flex: 1;

  margin-bottom: 4px;

}


.kp-timetable-row:last-child {

  margin-bottom: 0;

}


.kp-time {

  display: flex;

  align-items: center;

  color: #748297;

  font-size: 9px;

  font-weight: 650;

}


.kp-subject-block,
.kp-empty-slot {

  min-height: 0;

  border-radius: 6px;

}


.kp-subject-block {

  display: flex;

  flex-direction: column;

  justify-content: center;

  gap: 3px;

  padding: 6px;

  border:
    1px solid transparent;

  height: 100%;

}


.kp-subject-block strong {

  font-size: 9px;

  line-height: 1.1;

  font-weight: 800;

}


.kp-subject-block span {

  font-size: 8px;

  line-height: 1.1;

  font-weight: 550;

  opacity: .9;

}


.kp-empty-slot {

  background: #FAFCFD;

  border:
    1px dashed #DDE5EC;

  height: 100%;

}


.kp-subject-block.is-blue {

  color: #126CA2;

  background: #EBF7FD;

  border-color: #DDEFF8;

}


.kp-subject-block.is-sky {

  color: #1683AE;

  background: #ECF8FC;

  border-color: #DAEFF5;

}


.kp-subject-block.is-teal {

  color: #087D68;

  background: #EAF9F4;

  border-color: #D3EEE6;

}


.kp-subject-block.is-pink {

  color: #B94676;

  background: #FFF0F5;

  border-color: #F7DEE8;

}


.kp-subject-block.is-amber {

  color: #A76C15;

  background: #FFF8E8;

  border-color: #F3E7C8;

}


.kp-subject-block.is-purple {

  color: #7155BC;

  background: #F3EFFC;

  border-color: #E7DFF8;

}


.kp-subject-block.is-rose {

  color: #B94B70;

  background: #FFF0F4;

  border-color: #F6DDE6;

}


/* =========================================================
   FAMILY COMMUNICATION
========================================================= */

.kp-family-preview {

  min-height: 100%;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.kp-message-card {

  display: flex;

  align-items: flex-start;

  gap: 9px;

  flex: 1;

}


.kp-message-body {

  flex: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 8px;

}


.kp-chat-bubble {

  padding: 10px 11px 8px;

  border:
    1px solid #E5EBF0;

  border-radius:
    11px 11px 11px 4px;

  background: #FFFFFF;

}


.kp-chat-bubble p {

  padding-right: 10px;

  color: #25344D;

  font-size: 12px;

  line-height: 1.45;

  font-weight: 550;

}


.kp-heart-icon {

  display: inline-block;

  vertical-align: -2px;

}


.kp-chat-bubble time {

  display: block;

  margin-top: 5px;

  color: #8391A4;

  text-align: right;

  font-size: 9px;

  font-weight: 650;

}


.kp-gallery-grid {

  display: grid;

  grid-template-columns:
    minmax(0, 1.55fr)
    minmax(0, 1.1fr)
    minmax(0, .7fr);

  gap: 5px;

  flex: 1;

}


.kp-photo-box {

  min-height: 68px;

  overflow: hidden;

  border-radius: 7px;

  border:
    1px solid #E1E8EE;

  background-size: cover;

  background-position: center;

  height: 100%;

}


.kp-photo-box.is-photo-one {

  background-position:
    18% center;

}


.kp-photo-box.is-photo-two {

  background-position:
    64% center;

}


.kp-photo-box.is-more {

  position: relative;

  display: grid;

  place-items: center;

  color: #FFFFFF;

  font-size: 14px;

  font-weight: 800;

}


.kp-photo-box.is-more::before {

  content: '';

  position: absolute;

  inset: 0;

  background:
    rgba(
      19,
      34,
      58,
      .46
    );

}


.kp-photo-box.is-more span {

  position: relative;

  z-index: 1;

}


/* =========================================================
   INVOICE
========================================================= */

.kp-tuition-preview {

  min-height: 100%;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.kp-invoice-box {

  padding: 13px 14px;

  background: #FFFFFF;

  border:
    1px solid #E4EBF0;

  border-radius: 11px;

  flex: 1;

  display: flex;

  flex-direction: column;

}


.kp-invoice-head {

  display: flex;

  align-items: flex-start;

  justify-content:
    space-between;

  gap: 12px;

  margin-bottom: 12px;

  padding-bottom: 10px;

  border-bottom:
    1px solid #EDF1F4;

}


.kp-invoice-id span {

  display: block;

  margin-bottom: 4px;

  color: #8390A1;

  font-size: 10px;

  line-height: 1;

  font-weight: 550;

}


.kp-invoice-id strong {

  display: block;

  color: #17233D;

  font-size: 13px;

  line-height: 1.15;

  font-weight: 800;

}


.kp-invoice-items {

  display: flex;

  flex-direction: column;

  margin-bottom: 10px;

  flex: 1;

}


.kp-invoice-row {

  min-height: 32px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 15px;

  border-bottom:
    1px solid #F0F3F5;

  font-size: 11px;

  flex: 1;

}


.kp-invoice-row:last-child {

  border-bottom: 0;

}


.kp-invoice-row span {

  color: #77869A;

  font-weight: 500;

}


.kp-invoice-row strong {

  color: #17233D;

  font-weight: 750;

}


.kp-invoice-total {

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 15px;

  padding-top: 10px;

  border-top:
    1px dashed #D3DDE5;

  color: #17233D;

  font-size: 12px;

  font-weight: 800;

}


.kp-invoice-total strong {

  font-size: 13px;

}


/* =========================================================
   PROGRESS
========================================================= */

.kp-progress-box {

  min-height: 100%;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.kp-progress-profile {

  display: flex;

  align-items: center;

  gap: 11px;

  margin-bottom: 14px;

  padding: 11px;

  background: #FFFFFF;

  border:
    1px solid #E5EBF0;

  border-radius: 11px;

}


.kp-progress-meta {

  min-width: 0;

}


.kp-progress-meta strong {

  display: block;

  margin-bottom: 3px;

  color: var(--ink);

  font-size: 13px;

  font-weight: 800;

}


.kp-progress-meta span {

  color: var(--muted);

  font-size: 10px;

  font-weight: 500;

}


.kp-skills-list {

  display: flex;

  flex-direction: column;

  gap: 6px;

  flex: 1;

}


.kp-skill-row {

  padding: 9px 10px;

  background: #FFFFFF;

  border:
    1px solid #E5EBF0;

  border-radius: 9px;

  flex: 1;

  display: flex;

  align-items: center;

}


.kp-skill-main {

  width: 100%;

}


.kp-skill-top {

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 10px;

  margin-bottom: 7px;

}


.kp-skill-label {

  display: flex;

  align-items: center;

  gap: 7px;

}


.kp-skill-dot {

  width: 6px;

  height: 6px;

  border-radius: 50%;

}


.kp-skill-dot.is-green {

  background: #10B981;

}


.kp-skill-dot.is-blue {

  background: #3B82F6;

}


.kp-skill-title {

  color: var(--ink);

  font-size: 12px;

  font-weight: 700;

}


.kp-skill-track {

  position: relative;

  height: 4px;

  overflow: hidden;

  border-radius: 999px;

  background: #EEF2F5;

}


.kp-skill-fill {

  position: absolute;

  inset:
    0 auto 0 0;

  border-radius: inherit;

}


.kp-skill-fill.is-green {

  background: #34C399;

}


.kp-skill-fill.is-blue {

  background: #55A0F3;

}


/* =========================================================
   CAMPUSES
========================================================= */

.kp-campus-preview {

  min-height: 100%;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.kp-campus-box {

  overflow: hidden;

  background: #FFFFFF;

  border:
    1px solid #E5EBF0;

  border-radius: 11px;

  flex: 1;

  display: flex;

  flex-direction: column;

}


.kp-campus-heading {

  display: flex;

  justify-content:
    space-between;

  padding: 9px 12px;

  background: #F8FAFC;

  border-bottom:
    1px solid #EAEFF3;

  color: #8995A5;

  font-size: 9px;

  line-height: 1;

  font-weight: 700;

  letter-spacing: .04em;

  text-transform: uppercase;

}


.kp-campus-row {

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 12px;

  min-height: 47px;

  padding: 8px 12px;

  border-bottom:
    1px solid #EEF2F5;

  flex: 1;

}


.kp-campus-row:last-child {

  border-bottom: 0;

}


.kp-campus-info {

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 3px;

}


.kp-campus-name {

  color: var(--ink);

  font-size: 12px;

  line-height: 1.2;

  font-weight: 750;

}


.kp-campus-count {

  color: var(--muted);

  font-size: 10px;

  line-height: 1.2;

  font-weight: 500;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1040px) {

  .kp-grid {

    gap: 16px;

  }


  .kp-card {

    padding: 19px;

  }


  .kp-card-preview {

    padding: 11px;

  }


  .kp-card-copy h3 {

    font-size: 15px;

  }

}


@media (max-width: 900px) {

  .kp-connected-platform {

    padding:
      64px 0 72px;

  }


  .kp-inner {

    width:
      min(
        100% - 48px,
        1200px
      );

  }


  .kp-grid {

    grid-template-columns:
      1fr;

  }


  .kp-controls-bar {

    align-items:
      flex-start;

    flex-direction:
      column;

    gap: 14px;

  }


  .kp-tabs-group {

    width: 100%;

  }


  .kp-main-tab {

    flex: 1;

  }


  .kp-nav-group {

    align-self:
      flex-end;

  }


  .kp-card-preview {

    min-height: 0;

  }

}


@media (max-width: 600px) {

  .kp-connected-platform {

    padding:
      54px 0 60px;

  }


  .kp-inner {

    width:
      calc(100% - 36px);

  }


  .kp-heading-wrapper {

    margin-bottom: 30px;

  }


  .kp-title {

    font-family: 'Fredoka', system-ui, sans-serif;

    font-size: 26px;

    line-height: 1.2;

  }


  .kp-subtitle {

    font-family: 'DM Sans', system-ui, sans-serif;

    font-size: 14px;

  }


  .kp-tabs-group {

    flex-direction:
      column;

    align-items: stretch;

  }


  .kp-main-tab {

    width: 100%;

  }


  .kp-card {

    padding: 17px;

    border-radius: 18px;

  }


  .kp-card-head {

    grid-template-columns:
      42px
      minmax(0, 1fr)
      28px;

    gap: 11px;

  }


  .kp-icon-box {

    width: 42px;

    height: 42px;

    border-radius: 12px;

  }


  .kp-card-copy h3 {

    font-family: 'Fredoka', system-ui, sans-serif;

    font-size: 15px;

  }


  .kp-card-copy p {

    font-size: 11px;

  }


  .kp-card-preview {

    margin-top: 17px;

    padding: 10px;

    border-radius: 14px;

  }


  .kp-student-row {

    grid-template-columns:
      30px
      minmax(0, 1fr)
      auto;

  }


  .kp-student-row
  .kp-row-menu {

    display: none;

  }


  .kp-avatar {

    width: 30px;

    height: 30px;

  }


  .kp-timetable {

    overflow-x: auto;

  }


  .kp-timetable-header,
  .kp-timetable-row {

    min-width: 430px;

  }


  .kp-gallery-grid {

    grid-template-columns:
      1.6fr
      1fr
      .7fr;

  }

}

`