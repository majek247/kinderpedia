import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Check, Lock, Star } from 'lucide-react'
import { roles } from '../data'

const tone={director:['bg-brand','border-brand-dark','text-brand-dark'],teacher:['bg-sun','border-sun-dark','text-ink'],parent:['bg-coral','border-coral-dark','text-coral-dark']}
const offsets=[0,56,20,-40,0]

export default function Journeys(){
  const [sp,setSp]=useSearchParams()
  const role=roles[sp.get('role')]?sp.get('role'):'director'
  const [progress,setProgress]=useState({director:0,teacher:0,parent:0})
  const [open,setOpen]=useState(0)
  const r=roles[role], done=progress[role], [bg,bd,tx]=tone[role]
  const finish=()=>{ if(open===done){ setProgress(p=>({...p,[role]:Math.min(done+1,5)})); setOpen(Math.min(open+1,4)) } }
  const pick=k=>{ setSp({role:k}); setOpen(progress[k]>=5?4:progress[k]) }

  return(<section className="mx-auto max-w-5xl px-5 py-14">
    <h1 className="text-4xl font-bold md:text-6xl">Choose your path</h1>
    <p className="mt-3 max-w-xl text-ink/70">Five steps per role. Tap a step to see what happens, then mark it done.</p>
    <div className="mt-8 flex flex-wrap gap-3">{Object.entries(roles).map(([k,v])=>(<button key={k} onClick={()=>pick(k)} className={`btn ${k===role?'btn-primary':'btn-ghost'}`}>{v.label}</button>))}</div>
    <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-200"><div className={`h-4 rounded-full transition-all duration-500 ${bg}`} style={{width:`${done/5*100}%`}}/></div>
    <div className="mt-1 text-sm text-ink/60">{done} of 5 steps done</div>

    <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.1fr]">
      <ol className="flex flex-col items-center gap-6">{r.steps.map(([t],i)=>{
        const state=i<done?'done':i===done?'now':'lock'
        return(<li key={t} style={{transform:`translateX(${offsets[i]}px)`}} className="flex flex-col items-center">
          <button disabled={state==='lock'} onClick={()=>setOpen(i)} aria-label={t} aria-current={open===i} className={`grid h-20 w-20 place-items-center rounded-full border-b-8 text-white transition active:translate-y-1 active:border-b-0 ${state==='lock'?'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed':`${bg} ${bd}`} ${state==='now'?'animate-ring':''} ${open===i?'ring-4 ring-ink/20':''}`}>
            {state==='done'?<Check size={30}/>:state==='lock'?<Lock size={24}/>:<Star size={28} className="fill-white"/>}</button>
          <span className="mt-2 max-w-[9rem] text-center font-display text-sm font-semibold">{t}</span></li>)})}</ol>

      <aside className="card h-fit md:sticky md:top-24">
        <div className={`font-display text-sm font-semibold ${tx}`}>Step {open+1} of 5</div>
        <h2 className="mt-1 text-3xl font-bold">{r.steps[open][0]}</h2>
        <p className="mt-3 text-lg text-ink/70">{r.steps[open][1]}</p>
        {done>=5?(<div className="mt-6 rounded-2xl bg-brand-soft p-4"><div className="font-display text-lg font-semibold">Path complete.</div><Link to="/demo" className="btn btn-sun mt-3">Book your demo</Link></div>)
        :(<button onClick={finish} disabled={open!==done} className={`btn mt-6 w-full ${open===done?'btn-primary':'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'}`}>{open<done?'Completed':open===done?'Mark step done':'Finish earlier steps first'}</button>)}
      </aside>
    </div></section>)
}
