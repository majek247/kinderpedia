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
const LOGO = `${OFFICIAL}/images/kp/logo_kp_mobile.svg`

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
            <a href={`${OFFICIAL}/en/solutions/schools`}>For schools</a>
            <a href={`${OFFICIAL}/en/solutions/preschool`}>For preschools</a>
            <a href={`${OFFICIAL}/en/solutions/education-franchises`}>For education groups</a>
            <a href={`${OFFICIAL}/en/features/multi-location-management`}>Multi-campus</a>
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
            <a href={`${OFFICIAL}/en/company/about`}>About us</a>
            <a href={`${OFFICIAL}/en/company/careers`}>Careers</a>
            <a href={`${OFFICIAL}/en/contact`}>Contact</a>
            <a href={`${OFFICIAL}/en/pricing`}>Pricing</a>
          </div>

          <div className="kp-footer-refresh-social">
            <div>
              <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
              <a href="https://www.instagram.com" aria-label="Instagram">◎</a>
              <a href="https://www.youtube.com" aria-label="YouTube">▶</a>
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

/* ============ HEADER ============ */
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

/* ============ HERO ============ */
.kp-home .kp-hero.kp-hero-refresh {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 64px 0 52px;
  background:
    radial-gradient(ellipse at 76% 38%, rgba(124, 215, 202, 0.22), transparent 58%),
    radial-gradient(ellipse at 5% 10%, rgba(255, 255, 255, 0.98), transparent 52%),
    linear-gradient(118deg, #effaf8 0%, #f8fdfc 46%, #e4f5f1 100%);
}

.kp-home .kp-hero-refresh::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  background-image: radial-gradient(rgba(32, 127, 120, 0.16) 0.6px, transparent 0.6px);
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

.kp-home .kp-hero-refresh .kp-eyebrow { color: #218f8a; font-size: 10px; font-weight: 750; letter-spacing: 0.12em; line-height: 1.6; }

.kp-home .kp-hero-refresh h1 {
  margin: 20px 0 24px;
  color: #10223c;
  font-size: clamp(36px, 3.65vw, 57px);
  font-weight: 750;
  line-height: 1.09;
  letter-spacing: -0.055em;
}

.kp-home .kp-hero-refresh h1 > span { color: #119c92; }

.kp-home .kp-hero-refresh .kp-hero-description {
  max-width: 425px;
  color: #526578;
  font-size: 16px;
  line-height: 1.7;
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
  max-width: none;
  height: 100%;
  min-height: 480px;
  object-fit: contain;
  object-position: right center;
  align-self: stretch;
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

.kp-home .kp-footer-refresh-brand .kp-logo img { width: 135px; height: 32px; }

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

.kp-home .kp-footer-refresh-column a:hover { color: #0a9b94; }

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

.kp-home .kp-footer-refresh-social > div a:hover { color: #0a9b94; }

.kp-home .kp-footer-refresh-social p {
  margin: 28px 0 0;
  color: #7b8c98;
  font-size: 8px;
  line-height: 1.45;
  text-align: right;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 1100px) {
  .kp-home .kp-container { width: calc(100% - 48px); }
  .kp-home .kp-nav { gap: 16px; }
  .kp-home .kp-nav > a:not(.kp-button) { font-size: 11px; }

  .kp-home .kp-hero.kp-hero-refresh { padding: 48px 0; }
  .kp-home .kp-hero-refresh .kp-hero-grid {
    width: min(1200px, calc(100% - 48px));
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: 20px;
  }
  .kp-home .kp-hero-refresh h1 { font-size: clamp(34px, 4vw, 44px); }
  .kp-home .kp-hero-refresh .kp-hero-description { font-size: 15px; }

  .kp-home .kp-connected-stat { gap: 10px; padding-inline: 10px; }
  .kp-home .kp-connected-stat > svg { width: 28px; height: 28px; }
  .kp-home .kp-connected-stat strong { font-size: 20px; }
  .kp-home .kp-connected-school { padding-inline: 10px; }

  .kp-home .kp-footer-refresh-grid { grid-template-columns: 1.3fr repeat(3, 1fr); }
  .kp-home .kp-footer-refresh-grid > .kp-footer-refresh-column:nth-of-type(4),
  .kp-home .kp-footer-refresh-grid > .kp-footer-refresh-social { grid-column: span 1; }
}

@media (max-width: 1000px) {
  .kp-home .kp-footer-refresh-grid { grid-template-columns: 1.3fr repeat(3, 1fr); }
}

@media (max-width: 850px) {
  .kp-home .kp-header-inner { min-height: 74px; }
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

  .kp-home .kp-hero.kp-hero-refresh { padding: 48px 0 30px; }
  .kp-home .kp-hero-refresh .kp-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .kp-home .kp-hero-refresh .kp-hero-copy { max-width: 620px; padding: 0; }
  .kp-home .kp-hero-refresh h1 { font-size: clamp(39px, 6.6vw, 56px); }
  .kp-home .kp-hero-refresh .kp-hero-description { max-width: 470px; font-size: 16px; }
  .kp-home .kp-hero-refresh .kp-hero-artwork { max-width: 720px; margin-inline: auto; }

  .kp-home .kp-connected-trust-inner {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 22px;
  }
  .kp-home .kp-connected-stat { grid-column: span 4; }
  .kp-home .kp-connected-school { grid-column: span 3; }
  .kp-home .kp-connected-trust-inner > :nth-child(4) { border-left: 0; }

  .kp-home .kp-footer-refresh-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px 18px;
  }
  .kp-home .kp-footer-refresh-brand { grid-column: 1 / -1; }
  .kp-home .kp-footer-refresh-social { align-items: flex-start; }
  .kp-home .kp-footer-refresh-social p { text-align: left; }
}

@media (max-width: 600px) {
  .kp-home .kp-container { width: calc(100% - 36px); }
  .kp-home .kp-hero.kp-hero-refresh { padding: 38px 0 24px; }
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
  .kp-home .kp-connected-stat { gap: 7px; padding-inline: 5px; }
  .kp-home .kp-connected-stat > svg { width: 24px; height: 24px; }
  .kp-home .kp-connected-stat strong { font-size: 17px; }
  .kp-home .kp-connected-stat div > span { font-size: 9px; }
  .kp-home .kp-connected-school { padding-inline: 7px; }
  .kp-home .kp-connected-school img { height: 45px; }
  .kp-home .kp-connected-school > strong { font-size: 10px; }

  .kp-home .kp-footer-refresh-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .kp-home .kp-footer-refresh-brand { grid-column: 1 / -1; }
  .kp-home .kp-footer-refresh-social { grid-column: 1 / -1; align-items: flex-start; }
}

@media (max-width: 520px) {
  .kp-home .kp-footer-refresh-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .kp-home .kp-footer-refresh-brand { grid-column: 1 / -1; }
  .kp-home .kp-footer-refresh-social { grid-column: 1 / -1; align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  .kp-home *, .kp-home *::before, .kp-home *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
`