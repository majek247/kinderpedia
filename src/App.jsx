import {
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Menu,
  X,
} from 'lucide-react'

import Home from './pages/Home'
import Journeys from './pages/Journeys'
import Demo from './pages/Demo'

const navLink =
  'relative inline-flex items-center rounded-full px-3 py-2 text-[13px] font-semibold text-[#17324d] transition hover:bg-[#eaf8f5] hover:text-[#078f88]'

function Logo() {
  return (
    <Link
      to="/"
      className="group inline-flex shrink-0 items-center gap-2.5"
      aria-label="Kinderpedia home"
    >
      <span className="relative grid h-8 w-8 place-items-center">
        <span className="absolute left-[3px] top-[7px] h-[13px] w-[10px] rotate-[-34deg] rounded-[80%_25%_75%_25%] bg-[#087fba]" />
        <span className="absolute right-[3px] top-[7px] h-[13px] w-[10px] rotate-[34deg] rounded-[25%_80%_25%_75%] bg-[#14a995]" />
        <span className="absolute left-[9px] top-[16px] h-[11px] w-[10px] rotate-[28deg] rounded-[75%_25%_75%_25%] bg-[#f0448c]" />
        <span className="absolute left-[14px] top-[10px] h-3 w-[3px] rounded-full bg-[#17324d]" />
      </span>

      <span className="font-display text-[22px] font-bold tracking-[-0.07em] text-[#17324d]">
        kinder<span className="font-medium text-[#ed438b]">pedia</span>
      </span>
    </Link>
  )
}

const SECTIONS = [
  { id: 'kp-platform', label: 'Platform' },
  { id: 'kp-community', label: 'Who We Serve' },
  { id: 'kp-stories', label: 'Customers' },
  { id: 'kp-faq-refresh', label: 'FAQs' },
  { id: 'kp-final-cta', label: 'Contact' },
]

function smoothScrollTo(id) {
  const el = document.getElementById(id)

  if (!el) return

  const header = document.querySelector('[data-site-header]')
  const offset = header ? header.offsetHeight : 0
  const top = el.getBoundingClientRect().top + window.scrollY - offset - 12

  window.scrollTo({ top, behavior: 'smooth' })
}

function DesktopNavigation() {
  const location = useLocation()

  const handleClick = (event, id) => {
    // Only intercept when we're already on the homepage
    if (location.pathname === '/') {
      event.preventDefault()
      smoothScrollTo(id)
      // Update the hash without a jump
      window.history.replaceState(null, '', `#${id}`)
    }
    // Otherwise let React Router navigate to /#id
  }

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      {SECTIONS.map(({ id, label }) => (
        <Link
          key={id}
          to={`/#${id}`}
          onClick={event => handleClick(event, id)}
          className={navLink}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

function MobileNavigation({ open, setOpen }) {
  const location = useLocation()

  if (!open) return null

  const handleClick = (event, id) => {
    setOpen(false)

    if (location.pathname === '/') {
      event.preventDefault()
      smoothScrollTo(id)
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <div className="border-t border-[#e4efed] bg-white px-5 pb-5 pt-3 lg:hidden">
      <nav className="mx-auto flex max-w-6xl flex-col" aria-label="Mobile navigation">
        {SECTIONS.map(({ id, label }) => (
          <Link
            key={id}
            to={`/#${id}`}
            onClick={event => handleClick(event, id)}
            className="border-b border-[#edf2f2] px-1 py-3 text-sm font-semibold text-[#17324d]"
          >
            {label}
          </Link>
        ))}

        <a
          href="https://auth.kinderpedia.co"
          className="px-1 py-3 text-sm font-semibold text-[#17324d]"
        >
          Log in
        </a>

        <Link
          to="/demo"
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#079b93] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(7,155,147,0.2)]"
        >
          Book a free demo
          <ArrowRight size={16} />
        </Link>
      </nav>
    </div>
  )
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  // When the user lands on "/#kp-stories", scroll smoothly after mount
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '')
      const timeout = window.setTimeout(() => smoothScrollTo(id), 80)
      return () => window.clearTimeout(timeout)
    }
  }, [location.pathname, location.hash])

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-[#dcebe8] bg-[#f8fdfc]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Logo />

        <DesktopNavigation />

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="https://auth.kinderpedia.co"
            className="text-[13px] font-semibold text-[#17324d] transition hover:text-[#079b93]"
          >
            Log in
          </a>

          <Link
            to="/demo"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#079b93] px-5 text-[12px] font-bold text-white shadow-[0_8px_18px_rgba(7,155,147,0.2)] transition hover:-translate-y-0.5 hover:bg-[#067e79]"
          >
            Book a demo
            <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#d7e9e6] bg-white text-[#17324d] lg:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(value => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <MobileNavigation
        open={mobileOpen}
        setOpen={setMobileOpen}
      />
    </header>
  )
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    // On route changes to non-home pages, jump to top
    if (pathname !== '/') {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-white text-[#17324d]">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journeys" element={<Journeys />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
    </div>
  )
}