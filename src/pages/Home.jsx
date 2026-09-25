import React, { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectedPlatform from './ConnectedPlatform'
import Community from './Community'
import SchoolProof from './SchoolProof'
import FaqFinal from './FaqFinal'
import {
  ArrowRight, ArrowUpRight, Menu, X, Globe, Box, Users,
} from 'lucide-react'


/*
 * KINDERPEDIA / HOMEPAGE
 * Composed of a small Hero + TrustStrip in this file, plus four
 * self-contained section components:
 *   <ConnectedPlatform />, <Community />, <SchoolProof />, <FaqFinal />
 * Each of those ships its own markup and scoped CSS.
 */
const OFFICIAL = 'https://www.kinderpedia.co'

function Action({ children = 'Book a free demo', to = '/demo', secondary = false, className = '' }) {
  const classes = `kp-button ${secondary ? 'kp-button-secondary' : 'kp-button-primary'} ${className}`
  const content = <>{children}<ArrowRight size={17} aria-hidden="true" /></>
  return /^https?:/.test(to)
    ? <a className={classes} href={to}>{content}</a>
    : <Link className={classes} to={to}>{content}</Link>
}

/* Inline SVG-style logo — matches the App.jsx header mark */
function KpMark({ size = 32 }) {
  return (
    <span
      className="kp-logo-mark"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="kp-mark-leaf-a" />
      <span className="kp-mark-leaf-b" />
      <span className="kp-mark-leaf-c" />
      <span className="kp-mark-stem" />
    </span>
  )
}

function Logo({ compact = false }) {
  return (
    <a className="kp-logo" href={OFFICIAL} aria-label="Kinderpedia homepage">
      <KpMark size={compact ? 26 : 32} />
      <span className="kp-logo-word">
        kinder<span>pedia</span>
      </span>
    </a>
  )
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

function Hero({ demoTo }) {
  return (
    <section
      className="kp-hero kp-hero-refresh"
      aria-labelledby="kp-hero-title"
    >
      <div className="kp-container kp-hero-grid">
        <div className="kp-hero-copy">
          <span className="kp-eyebrow kp-anim kp-anim-1">
            AI-POWERED SCHOOL MANAGEMENT SOFTWARE
          </span>

          <h1 id="kp-hero-title" className="kp-anim kp-anim-2">
            Run Your School Day in<br />
            <span>9 Fewer Hours a Week.</span>
          </h1>

          <p className="kp-hero-description kp-anim kp-anim-3">
            Manage daily school operations, learning and parent communication in one place, with less admin and fewer repetitive tasks.
          </p>

          <div className="kp-actions kp-anim kp-anim-4">
            <Action to={demoTo}>Book a free demo</Action>

            <a
              className="kp-button kp-button-secondary"
              href={`${OFFICIAL}/en/get-a-price`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View pricing
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <p className="kp-hero-audience kp-anim kp-anim-5">
            For schools, preschools and education groups.
          </p>
        </div>

        <div className="kp-hero-artwork kp-anim kp-anim-artwork">
          <img
            src="/images/kinderpediaheroimage.png"
            alt="Kinderpedia school dashboard alongside the parent mobile app."
            className="kp-hero-image"
            loading="eager"
            fetchpriority="high"
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

        <SchoolLogo src={KP_CARD_ASSETS.mapleBear} name="Maple Bear" />
        <SchoolLogo src={KP_CARD_ASSETS.cambridge} name="Cambridge School of Constanța" />
        <SchoolLogo src={KP_CARD_ASSETS.helikon} name="Helikon" />
        <SchoolLogo src={KP_CARD_ASSETS.just4kids} name="Just4Kids" />
      </div>
    </section>
  )
}

function Footer() {
  const offices = [
    {
      region: 'Brazil',
      lines: ['Av. Dr. Mário Vilas Boas Rodrigues', 'São Paulo - SP, 04723-000, BR'],
    },
    {
      region: 'Portugal',
      lines: ['Av. Infante Dom Henrique 143,', '1950-406 Lisboa, PT'],
    },
    {
      region: 'Romania',
      lines: ['46-48 Calea Plevnei', '010233 Bucharest, RO'],
    },
    {
      region: 'Switzerland',
      lines: ['Langgasse 47c', '6340 Baar, CH'],
    },
    {
      region: 'United Arab Emirates',
      lines: ['Al Khatem Tower, Al Maryah Island', 'Abu Dhabi, UAE'],
    },
    {
      region: 'United Kingdom',
      lines: ['30 Churchill Pl, Canary Wharf', 'London E14 5RE, UK'],
    },
  ]

  const legal = [
    ['Privacy Policy', '/en/privacy-policy'],
    ['Terms of Service', '/en/terms-of-service'],
    ['Cookie Policy', '/en/cookie-policy'],
  ]

  const socials = [
    ['f', 'https://www.facebook.com', 'Facebook'],
    ['𝕏', 'https://www.x.com', 'X'],
    ['in', 'https://www.linkedin.com', 'LinkedIn'],
    ['◎', 'https://www.instagram.com', 'Instagram'],
    ['▶', 'https://www.youtube.com', 'YouTube'],
  ]

  return (
    <footer className="kp-footer-refresh">
      <div className="kp-container">

        {/* ── TOP: brand + legal | offices | connect ─── */}
        <div className="kp-footer-top">

          {/* Brand + legal links */}
          <div className="kp-footer-brand-col">
            <Logo compact />

            <ul className="kp-footer-legal">
              {legal.map(([label, path]) => (
                <li key={label}>
                  <a
                    href={`${OFFICIAL}${path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office locations */}
          <div className="kp-footer-offices">
            {offices.map(({ region, lines }) => (
              <div className="kp-footer-office" key={region}>
                <h4>{region}</h4>
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Connect with us */}
          <div className="kp-footer-connect">
            <h3>Connect with us</h3>

            <div className="kp-footer-socials">
              {socials.map(([glyph, href, label]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {glyph}
                </a>
              ))}
            </div>

            <a
              className="kp-footer-demo"
              href={`${OFFICIAL}/en/book-a-demo`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a free demo
            </a>
          </div>
        </div>

        {/* ── BOTTOM: copyright ──────────────────────── */}
        <div className="kp-footer-bottom">
          <p>© {new Date().getFullYear()} Kinderpedia. All rights reserved.</p>
          <p>School management software for a brighter tomorrow.</p>
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
      <Hero demoTo={demoTo} />
      <TrustStrip />
      <ConnectedPlatform demoTo={demoTo} />
      <Community demoTo={demoTo} />
      <SchoolProof demoTo={demoTo} />
      <FaqFinal demoTo={demoTo} />
    </div>
    <Footer />
  </div>
}

const styles = `
/* ============ GOOGLE FONTS ============ */
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

/* ============ BRAND TOKENS ============ */
.kp-home {
  --kp-berry: #b93360;
  --kp-berry-dark: #952347;
  --kp-slate: #4a4d5f;
  --kp-ink: #2c3043;
  --kp-muted: #656a7c;
  --kp-green: #00a533;
  --kp-green-dark: #087d35;
  --kp-line: #e8e8ee;
  --kp-shadow: 0 24px 65px -30px rgba(50, 37, 63, .24);
  color: var(--kp-slate);
  background: #fff;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
.kp-home :where(button) { font: inherit; cursor: pointer; color: inherit; }
.kp-home :where(button,a,summary) { -webkit-tap-highlight-color: transparent; }
.kp-home :where(button,a,summary,[tabindex]):focus-visible { outline: 3px solid var(--kp-berry); outline-offset: 5px; }
.kp-home :where(svg) { flex-shrink: 0; }
.kp-home ::selection { color: #762440; background: #f6dce6; }

.kp-home .kp-container { width: min(1200px, calc(100% - 80px)); margin-inline: auto; }
.kp-home :where(section[id],#kp-main) { scroll-margin-top: 95px; }

.kp-home .kp-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: 10px; font-weight: 750; letter-spacing: .15em; color: var(--kp-berry); line-height: 1.5; }
.kp-home .kp-actions { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
.kp-home .kp-button { min-height: 48px; padding: 13px 21px; border-radius: 9px; display: inline-flex; gap: 14px; align-items: center; justify-content: center; font-weight: 650; font-size: 13px; line-height: 1.45; border: 1px solid transparent; transition: transform .2s, background .2s, box-shadow .2s; }
.kp-home .kp-button-primary { background: var(--kp-green-dark); color: #fff; box-shadow: 0 5px 12px #087d3514, inset 0 1px 0 #ffffff22; }
.kp-home .kp-button-primary:hover { background: #05652a; transform: translateY(-2px); box-shadow: 0 8px 18px #087d3529; }
.kp-home .kp-button-secondary { border-color: #dbdce4; background: #fff; color: var(--kp-slate); }
.kp-home .kp-button-secondary:hover { border-color: #c48197; background: #fff9fb; transform: translateY(-2px); }

/* ============ LOGO (inline mark matching App.jsx) ============ */
.kp-home .kp-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-decoration: none;
}
.kp-home .kp-logo-mark {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
}
.kp-home .kp-logo-mark > span {
  position: absolute;
  display: block;
}
.kp-home .kp-mark-leaf-a {
  left: 9%;
  top: 22%;
  width: 31%;
  height: 41%;
  transform: rotate(-34deg);
  border-radius: 80% 25% 75% 25%;
  background: #087fba;
}
.kp-home .kp-mark-leaf-b {
  right: 9%;
  top: 22%;
  width: 31%;
  height: 41%;
  transform: rotate(34deg);
  border-radius: 25% 80% 25% 75%;
  background: #14a995;
}
.kp-home .kp-mark-leaf-c {
  left: 28%;
  top: 50%;
  width: 31%;
  height: 34%;
  transform: rotate(28deg);
  border-radius: 75% 25% 75% 25%;
  background: #f0448c;
}
.kp-home .kp-mark-stem {
  left: 44%;
  top: 31%;
  width: 9%;
  height: 38%;
  border-radius: 999px;
  background: #17324d;
}
.kp-home .kp-logo-word {
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.07em;
  color: #17324d;
  line-height: 1;
}
.kp-home .kp-logo-word > span {
  color: #ed438b;
  font-weight: 500;
}

/* ============ HEADER ============ */
.kp-home .kp-header { background: #fffffff5; border-bottom: 1px solid #eeedf2; position: sticky; top: 0; z-index: 30; backdrop-filter: blur(16px); }
.kp-home .kp-header-inner { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  min-height: 86px; 
  gap: 28px; 
  /* MATCHES THE HERO WIDTH EXACTLY */
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
}
.kp-home .kp-nav { display: flex; gap: 27px; align-items: center; }
.kp-home .kp-nav > a:not(.kp-button) { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; }
.kp-home .kp-nav > a:not(.kp-button):hover { color: var(--kp-berry); }
.kp-home .kp-nav-cta { min-height: 42px; padding: 11px 16px; font-size: 12px; }
.kp-home .kp-menu-toggle { display: none; background: transparent; border: 1px solid var(--kp-line); width: 44px; height: 44px; border-radius: 8px; align-items: center; justify-content: center; }
.kp-home .kp-skip-link { position: absolute; z-index: 100; left: 12px; top: -80px; padding: 12px 20px; background: white; border: 2px solid var(--kp-berry); }
.kp-home .kp-skip-link:focus { top: 12px; }

/* ============ HERO ============ */
.kp-home .kp-hero.kp-hero-refresh {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 40px 0 30px;
  background: linear-gradient(180deg, #f8fdfc 0%, #ffffff 100%);
}

.kp-home .kp-hero-refresh .kp-hero-grid {
  position: relative;
  z-index: 1;
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.45fr);
  align-items: center;
  gap: 32px;
}

.kp-home .kp-hero-refresh .kp-hero-copy {
  position: relative;
  z-index: 2;
  min-width: 0;
  max-width: 620px;
  padding-block: 0;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
}

.kp-home .kp-hero-refresh .kp-eyebrow {
  color: #0A8A80;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.6;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.kp-home .kp-hero-refresh h1 {
  margin: 16px 0 20px;
  color: #10223c;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: clamp(38px, 4vw, 50px); 
  font-weight: 700;
  line-height: 1.08;

  font-feature-settings: 'ss01' on, 'cv01' on;
  white-space: normal;
  max-width: 100%;
}

.kp-home .kp-hero-refresh h1 > span { color: #119c92; }

.kp-home .kp-hero-refresh .kp-hero-description {
  max-width: 525px;
  color: #011522;
  font-size: 17.5px;
  line-height: 1.7;
  font-weight: 450;
}

.kp-home .kp-hero-refresh .kp-actions { gap: 12px; margin-top: 27px; }

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
  max-width: 100%;
  height: auto;
  min-height: 480px;
  max-height: 620px;
  object-fit: contain;
  object-position: center right;
  align-self: center;
  border-radius: 16px;
}

/* ============ HERO PAGE-LOAD ANIMATIONS ============ */
@keyframes kpFadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes kpFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes kpArtworkIn {
  from {
    opacity: 0;
    transform: translateX(40px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes kpEyebrowIn {
  from {
    opacity: 0;
    transform: translateY(14px);
    letter-spacing: 0.3em;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: 0.12em;
  }
}

@keyframes kpButtonIn {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.kp-home .kp-anim {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-duration: 0.8s;
}

.kp-home .kp-anim-1 {
  animation-name: kpEyebrowIn;
  animation-duration: 0.7s;
  animation-delay: 0.1s;
}

.kp-home .kp-anim-2 {
  animation-name: kpFadeUp;
  animation-duration: 0.9s;
  animation-delay: 0.25s;
}

.kp-home .kp-anim-3 {
  animation-name: kpFadeUp;
  animation-duration: 0.9s;
  animation-delay: 0.42s;
}

.kp-home .kp-anim-4 {
  animation-name: kpButtonIn;
  animation-duration: 0.8s;
  animation-delay: 0.58s;
}

.kp-home .kp-anim-5 {
  animation-name: kpFadeIn;
  animation-duration: 0.9s;
  animation-delay: 0.78s;
}

.kp-home .kp-anim-artwork {
  animation-name: kpArtworkIn;
  animation-duration: 1.1s;
  animation-delay: 0.35s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Subtle floating motion for the hero image after it enters */
@keyframes kpArtworkFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.kp-home .kp-hero-artwork .kp-hero-image {
  animation: kpArtworkFloat 6s ease-in-out 1.6s infinite;
}

/* ============ TRUST STRIP (stats + school logos) ============ */
.kp-home .kp-connected-trust {
  --connected-ink: #10213d;
  --connected-muted: #52677d;
  color: var(--connected-ink);
  padding: 27px 0 24px;
  background: linear-gradient(180deg, #f8fdfc 0%, #fff 100%);
}

.kp-home .kp-connected-trust-inner {
  display: grid;
  grid-template-columns: 1.2fr 1.15fr 1.15fr .85fr 1fr .8fr .8fr;
  align-items: center;
  /* Match hero width */
  width: min(1280px, calc(100% - 80px));
  margin-inline: auto;
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

.kp-home .kp-connected-stat.is-blue > svg { color: #058fbb; }

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

/* ============ FOOTER ============ */
.kp-home .kp-footer-refresh {
  padding: 64px 0 32px;
  border-top: 1px solid #e8eef0;
  background: #fff;
  color: #10223c;
}

/* ---- TOP: brand+legal | offices | connect ---- */
.kp-home .kp-footer-top {
  display: grid;
  grid-template-columns: 1fr 2.4fr 1fr;
  gap: 56px;
  padding-bottom: 48px;
  border-bottom: 1px solid #eef3f5;
}

/* ---- Brand column ---- */
.kp-home .kp-footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
}

.kp-home .kp-footer-brand-col .kp-logo-word { font-size: 26px; }
.kp-home .kp-footer-brand-col .kp-logo-mark { width: 34px !important; height: 34px !important; }

.kp-home .kp-footer-legal {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.kp-home .kp-footer-legal a {
  color: #b93360;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  transition: color .18s ease;
}

.kp-home .kp-footer-legal a:hover { color: #0a9b94; }

/* ---- Offices grid ---- */
.kp-home .kp-footer-offices {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 40px;
  align-content: start;
}

.kp-home .kp-footer-office h4 {
  margin: 0 0 10px;
  color: #b93360;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.kp-home .kp-footer-office p {
  margin: 0;
  color: #4a5a6b;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.55;
  font-weight: 500;
}

/* ---- Connect column ---- */
.kp-home .kp-footer-connect {
  display: flex;
  flex-direction: column;
  justify-self: end;
  align-items: flex-start;
  min-width: 0;
}

.kp-home .kp-footer-connect h3 {
  margin: 0 0 22px;
  padding-bottom: 14px;
  border-bottom: 2px solid #b93360;
  display: inline-block;
  color: #17334d;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.kp-home .kp-footer-socials {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 28px;
}

.kp-home .kp-footer-socials a {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  color: #b93360;
  font-family: Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition: color .18s ease, transform .18s ease;
}

.kp-home .kp-footer-socials a:hover {
  color: #0a9b94;
  transform: translateY(-2px);
}

.kp-home .kp-footer-demo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 14px 28px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0fb5a8, #0a8a80);
  color: #fff;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  text-decoration: none;
  transition: transform .2s, background .2s;
}

.kp-home .kp-footer-demo:hover {
  background: linear-gradient(135deg, #0a8a80, #076e66);
  transform: translateY(-2px);
}

/* ---- BOTTOM: copyright ---- */
.kp-home .kp-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding-top: 28px;
  color: #7b8c98;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.kp-home .kp-footer-bottom p { margin: 0; }

/* ============ RESPONSIVE ============ */
@media (max-width: 1100px) {
  .kp-home .kp-container { width: calc(100% - 48px); }
  .kp-home .kp-nav { gap: 16px; }
  .kp-home .kp-nav > a:not(.kp-button) { font-size: 11px; }

  .kp-home .kp-header-inner { width: min(1200px, calc(100% - 48px)); }

  .kp-home .kp-hero.kp-hero-refresh { padding: 32px 0 24px; }
  .kp-home .kp-hero-refresh .kp-hero-grid {
    width: min(1200px, calc(100% - 48px));
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: 20px;
  }
  .kp-home .kp-hero-refresh h1 { font-size: clamp(30px, 3.6vw, 38px); }
  .kp-home .kp-hero-refresh .kp-hero-description { font-size: 15px; }

  .kp-home .kp-connected-trust-inner { width: min(1200px, calc(100% - 48px)); }

  .kp-home .kp-connected-stat { gap: 10px; padding-inline: 10px; }
  .kp-home .kp-connected-stat > svg { width: 28px; height: 28px; }
  .kp-home .kp-connected-stat strong { font-size: 20px; }
  .kp-home .kp-connected-school { padding-inline: 10px; }

  .kp-home .kp-footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .kp-home .kp-footer-connect {
    justify-self: start;
  }

  .kp-home .kp-footer-offices {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1000px) {
  .kp-home .kp-footer-offices {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 850px) {
  .kp-home .kp-header-inner { min-height: 74px; width: calc(100% - 48px); }
  .kp-home .kp-menu-toggle { display: flex; }
  .kp-home .kp-nav {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    padding: 22px 24px;
    background: #fff;
    border-bottom: 1px solid var(--kp-line);
    box-shadow: 0 18px 20px #4736570d;
  }
  .kp-home .kp-nav-open { display: flex; flex-direction: column; align-items: stretch; }
  .kp-home .kp-nav > a:not(.kp-button) { padding: 10px 0; font-size: 14px; }

  .kp-home .kp-hero.kp-hero-refresh { padding: 28px 0 20px; }
  .kp-home .kp-hero-refresh .kp-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .kp-home .kp-hero-refresh .kp-hero-copy { max-width: 620px; padding: 0; }
  .kp-home .kp-hero-refresh h1 { font-size: clamp(34px, 5.5vw, 46px); }
  .kp-home .kp-hero-refresh .kp-hero-description { max-width: 470px; font-size: 16px; }
  .kp-home .kp-hero-refresh .kp-hero-artwork { max-width: 780px; margin-inline: auto; }
  .kp-home .kp-hero-refresh .kp-hero-image { min-height: 380px; max-height: 520px; }

  .kp-home .kp-connected-trust-inner {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 22px;
  }
  .kp-home .kp-connected-stat { grid-column: span 4; }
  .kp-home .kp-connected-school { grid-column: span 3; }
  .kp-home .kp-connected-trust-inner > :nth-child(4) { border-left: 0; }
}

@media (max-width: 700px) {
  .kp-home .kp-footer-refresh { padding: 48px 0 24px; }

  .kp-home .kp-footer-top {
    gap: 32px;
    padding-bottom: 36px;
  }

  .kp-home .kp-footer-offices {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .kp-home .kp-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-top: 24px;
    font-size: 11px;
  }
}

@media (max-width: 600px) {
  .kp-home .kp-container { width: calc(100% - 36px); }
  .kp-home .kp-header-inner { width: calc(100% - 36px); }

  .kp-home .kp-hero.kp-hero-refresh { padding: 24px 0 16px; }
  .kp-home .kp-hero-refresh .kp-hero-grid {
    width: min(1200px, calc(100% - 36px));
    gap: 24px;
  }
  .kp-home .kp-hero-refresh .kp-eyebrow { font-size: 9px; letter-spacing: 0.1em; }
  .kp-home .kp-hero-refresh h1 { margin: 17px 0 20px; font-size: clamp(30px, 8.5vw, 48px); line-height: 1.12; }
  .kp-home .kp-hero-refresh .kp-hero-description { font-size: 14px; line-height: 1.75; }
  .kp-home .kp-hero-refresh .kp-actions { margin-top: 23px; gap: 10px; }
  .kp-home .kp-hero-refresh .kp-button { padding: 12px 15px; font-size: 11px; }
  .kp-home .kp-hero-refresh .kp-hero-audience { font-size: 10px; margin-top: 15px; }

  .kp-home .kp-connected-trust { padding-top: 23px; }
  .kp-home .kp-connected-trust-inner { width: calc(100% - 36px); }
  .kp-home .kp-connected-stat { gap: 7px; padding-inline: 5px; }
  .kp-home .kp-connected-stat > svg { width: 24px; height: 24px; }
  .kp-home .kp-connected-stat strong { font-size: 17px; }
  .kp-home .kp-connected-stat div > span { font-size: 9px; }
  .kp-home .kp-connected-school { padding-inline: 7px; }
  .kp-home .kp-connected-school img { height: 45px; }
  .kp-home .kp-connected-school > strong { font-size: 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .kp-home *, .kp-home *::before, .kp-home *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
  .kp-home .kp-anim { opacity: 1 !important; }
}
`