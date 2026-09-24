import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { GraduationCap } from 'lucide-react'
import Home from './pages/Home'
import Journeys from './pages/Journeys'
import Demo from './pages/Demo'

const Logo=()=>(<Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand border-b-4 border-brand-dark text-white"><GraduationCap size={22}/></span>kinderpedia</Link>)
const link=({isActive})=>`px-4 py-2 rounded-xl font-display font-semibold ${isActive?'bg-brand-soft text-brand-dark':'hover:bg-sky'}`

export default function App(){
  const {pathname}=useLocation()
  useEffect(()=>window.scrollTo(0,0),[pathname])
  return(<>
    <header className="sticky top-0 z-30 border-b-2 border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo/>
        <nav className="hidden items-center gap-1 md:flex"><NavLink to="/" end className={link}>Home</NavLink><NavLink to="/journeys" className={link}>Your path</NavLink></nav>
        <Link to="/demo" className="btn btn-sun !py-2">Book a free demo</Link>
      </div>
    </header>
    <main><Routes><Route path="/" element={<Home/>}/><Route path="/journeys" element={<Journeys/>}/><Route path="/demo" element={<Demo/>}/></Routes></main>
    <footer className="mt-24 bg-ink text-white"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
      <div><div className="font-display text-2xl font-bold">kinderpedia</div><p className="mt-3 max-w-xs text-white/70">One platform for schools, nurseries and the families they serve.</p></div>
      <div className="space-y-2 text-white/70"><div className="font-display text-white">Explore</div><Link className="block hover:text-white" to="/journeys">Your path</Link><Link className="block hover:text-white" to="/demo">Book a demo</Link></div>
      <div className="space-y-2 text-white/70"><div className="font-display text-white">Offices</div><div>London · Lisbon · Bucharest</div><div>Abu Dhabi · São Paulo · Baar</div></div>
    </div><div className="border-t border-white/10 py-5 text-center text-sm text-white/50">Redesign concept. Not affiliated with Kinderpedia.</div></footer>
  </>)
}
