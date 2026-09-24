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
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

import Home from './pages/Home'
import Journeys from './pages/Journeys'
import Demo from './pages/Demo'

const navLink =
  'relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold text-[#17324d] transition hover:bg-[#eaf8f5] hover:text-[#078f88]'

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

function Dropdown({ label, children, openMenu, setOpenMenu }) {
  const isOpen = openMenu === label

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        type="button"
        className={`${navLink} ${isOpen ? 'bg-[#eaf8f5] text-[#078f88]' : ''}`}
        aria-expanded={isOpen}
        onClick={() => setOpenMenu(isOpen ? null : label)}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 w-[250px] -translate-x-1/2 pt-3">
          <div className="rounded-2xl border border-[#dcece9] bg-white p-2 shadow-[0_18px_45px_rgba(22,72,78,0.14)]">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownLink({ to, title, description, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-[#eefaf7]"
    >
      <span className="mt-1 grid h-2 w-2 shrink-0 rounded-full bg-[#f0448c] transition group-hover:scale-125" />

      <span>
        <strong className="block text-[13px] font-bold text-[#17324d]">
          {title}
        </strong>

        {description && (
          <small className="mt-1 block text-[11px] leading-4 text-[#728796]">
            {description}
          </small>
        )}
      </span>
    </Link>
  )
}

function DesktopNavigation({ openMenu, setOpenMenu }) {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      <Dropdown
        label="Platform"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      >
        <DropdownLink
          to="/#kp-platform"
          title="Platform overview"
          description="One connected school day"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-platform"
          title="All modules"
          description="Explore Kinderpedia features"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-community"
          title="For your people"
          description="Leaders, teachers and families"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-stories"
          title="Customer stories"
          description="See how schools use Kinderpedia"
          onClick={() => setOpenMenu(null)}
        />
      </Dropdown>

      <Dropdown
        label="Solutions"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      >
        <DropdownLink
          to="/#kp-community"
          title="For school leaders"
          description="A clearer view across your school"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-community"
          title="For teachers"
          description="More room to teach"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-community"
          title="For families"
          description="Closer to every school day"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-platform"
          title="For education groups"
          description="Manage multiple campuses"
          onClick={() => setOpenMenu(null)}
        />
      </Dropdown>

      <NavLink to="/#kp-stories" className={navLink}>
        Customers
      </NavLink>

      <Dropdown
        label="Resources"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      >
        <DropdownLink
          to="/#kp-faq-refresh"
          title="FAQs"
          description="Answers for your school"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-start-path"
          title="Getting started"
          description="From demo to first school day"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-privacy-strip"
          title="Security and privacy"
          description="Built into everyday school life"
          onClick={() => setOpenMenu(null)}
        />

        <DropdownLink
          to="/#kp-stories"
          title="School stories"
          description="Real schools, real change"
          onClick={() => setOpenMenu(null)}
        />
      </Dropdown>

      <NavLink to="/pricing" className={navLink}>
        Pricing
      </NavLink>
    </nav>
  )
}

function MobileNavigation({ open, setOpen }) {
  if (!open) return null

  return (
    <div className="border-t border-[#e4efed] bg-white px-5 pb-5 pt-3 lg:hidden">
      <nav className="mx-auto flex max-w-6xl flex-col" aria-label="Mobile navigation">
        <Link
          to="/#kp-platform"
          onClick={() => setOpen(false)}
          className="border-b border-[#edf2f2] px-1 py-3 text-sm font-semibold text-[#17324d]"
        >
          Platform
        </Link>

        <Link
          to="/#kp-community"
          onClick={() => setOpen(false)}
          className="border-b border-[#edf2f2] px-1 py-3 text-sm font-semibold text-[#17324d]"
        >
          Solutions
        </Link>

        <Link
          to="/#kp-stories"
          onClick={() => setOpen(false)}
          className="border-b border-[#edf2f2] px-1 py-3 text-sm font-semibold text-[#17324d]"
        >
          Customers
        </Link>

        <Link
          to="/#kp-faq-refresh"
          onClick={() => setOpen(false)}
          className="border-b border-[#edf2f2] px-1 py-3 text-sm font-semibold text-[#17324d]"
        >
          Resources
        </Link>

        <Link
          to="/pricing"
          onClick={() => setOpen(false)}
          className="border-b border-[#edf2f2] px-1 py-3 text-sm font-semibold text-[#17324d]"
        >
          Pricing
        </Link>

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
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const closeMenus = event => {
      if (!event.target.closest('[data-site-header]')) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('click', closeMenus)
    return () => document.removeEventListener('click', closeMenus)
  }, [])

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-[#dcebe8] bg-[#f8fdfc]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 xl:px-10">
        <Logo />

        <DesktopNavigation
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />

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
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
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