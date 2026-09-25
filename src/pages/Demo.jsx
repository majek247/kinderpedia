import { useState } from 'react'
import { Check } from 'lucide-react'

const steps=[['Who are you?','role',['Owner or director','Teacher','Finance or admin','IT manager']],['What kind of school?','type',['Nursery or childcare','Primary or secondary','Education franchise']],['How many students?','size',['Under 100','100–500','500–2,000','2,000+']]]

export default function Demo(){
  const [i,setI]=useState(0), [a,setA]=useState({}), [email,setEmail]=useState(''), [sent,setSent]=useState(false)
  const total=steps.length+1
  const ok=i<steps.length?!!a[steps[i][1]]:/\S+@\S+\.\S+/.test(email)
  return(<section className="mx-auto max-w-2xl px-5 py-16">
    <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-ink/50">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sun" />
      Design preview · No data is collected or submitted
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sun" />
    </div>
    <div className="mb-8 h-4 overflow-hidden rounded-full bg-slate-200"><div className="h-4 rounded-full bg-brand transition-all" style={{width:`${(sent?total:i)/total*100}%`}}/></div>
    {sent?(<div className="card text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white"><Check size={32}/></div><h1 className="mt-4 text-4xl font-bold">You're on the list.</h1><p className="mt-2 text-ink/70">We'll email {email} within one working day to book your 40-minute demo.</p></div>)
    :(<div className="card"><h1 className="text-3xl font-bold md:text-4xl">{i<steps.length?steps[i][0]:'Where should we send your demo invite?'}</h1>
      <div className="mt-6 grid gap-3">{i<steps.length?steps[i][2].map(o=>(<button key={o} onClick={()=>setA({...a,[steps[i][1]]:o})} className={`rounded-2xl border-2 border-b-4 p-4 text-left font-display text-lg font-medium transition ${a[steps[i][1]]===o?'border-brand bg-brand-soft':'border-slate-200 hover:bg-sky'}`}>{o}</button>))
        :<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@school.com" className="rounded-2xl border-2 border-slate-200 p-4 text-lg"/>}</div>
      <div className="mt-8 flex justify-between"><button disabled={!i} onClick={()=>setI(i-1)} className="btn btn-ghost disabled:opacity-40">Back</button>
        <button disabled={!ok} onClick={()=>i<steps.length?setI(i+1):setSent(true)} className="btn btn-sun disabled:opacity-40">{i<steps.length?'Continue':'Book my demo'}</button></div></div>)}
  </section>)
}