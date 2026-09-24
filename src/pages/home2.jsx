import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, Star, Check, Play, BookOpen, 
  Users, MessageCircle, FileText, CreditCard, Calendar, 
  Settings, ChevronRight, Menu, X, CheckCircle2,
  TrendingUp, Activity, Bell, Smartphone, Monitor, Globe,
  Lock, Cloud, Zap, Fingerprint, PieChart, Video, Image as ImageIcon
} from 'lucide-react';


// --- DATA LAYER ---

const STATS = [
  { value: '2,500+', label: 'Schools Worldwide' },
  { value: '1M+', label: 'Active Parents' },
  { value: '98%', label: 'Retention Rate' },
  { value: '4.9/5', label: 'Average Rating' },
];

const MODULES = [
  { name: 'Daily Attendance', icon: Calendar, span: 'col-span-1 md:col-span-2 lg:col-span-2', color: 'bg-blue-50 text-blue-600', border: 'border-blue-200' },
  { name: 'Automated Billing', icon: CreditCard, span: 'col-span-1', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-200' },
  { name: 'Parent Communication', icon: MessageCircle, span: 'col-span-1', color: 'bg-purple-50 text-purple-600', border: 'border-purple-200' },
  { name: 'Gradebook & Progress', icon: TrendingUp, span: 'col-span-1 lg:row-span-2', color: 'bg-[#FF4C60]/10 text-[#FF4C60]', border: 'border-[#FF4C60]/20' },
  { name: 'Media Gallery', icon: ImageIcon, span: 'col-span-1', color: 'bg-orange-50 text-orange-600', border: 'border-orange-200' },
  { name: 'Event Management', icon: Bell, span: 'col-span-1 md:col-span-2 lg:col-span-1', color: 'bg-[#00C2FF]/10 text-[#00C2FF]', border: 'border-[#00C2FF]/20' },
  { name: 'Staff Management', icon: Users, span: 'col-span-1', color: 'bg-slate-100 text-slate-700', border: 'border-slate-300' },
  { name: 'Menu & Nutrition', icon: PieChart, span: 'col-span-1 lg:col-span-2', color: 'bg-[#FFD166]/20 text-yellow-700', border: 'border-[#FFD166]/40' },
  { name: 'Document Sharing', icon: FileText, span: 'col-span-1', color: 'bg-cyan-50 text-cyan-600', border: 'border-cyan-200' },
  { name: 'Live Classes (Video)', icon: Video, span: 'col-span-1 md:col-span-3 lg:col-span-2', color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-200' },
  { name: 'Custom Reports', icon: Activity, span: 'col-span-1', color: 'bg-rose-50 text-rose-600', border: 'border-rose-200' },
  { name: 'System Settings', icon: Settings, span: 'col-span-1', color: 'bg-stone-100 text-stone-600', border: 'border-stone-200' },
];

const ROLES = {
  director: {
    label: 'Directors & Admins',
    color: '#FF4C60',
    title: 'Command central, completely simplified.',
    desc: 'Get a bird\'s-eye view of your entire institution. Track revenue, monitor attendance trends, and communicate with your entire community in one click.',
    steps: [
      { title: 'Setup Campus', desc: 'Import students & staff in minutes.', icon: Globe },
      { title: 'Configure Billing', desc: 'Set tuition plans and automate invoices.', icon: CreditCard },
      { title: 'Publish Schedule', desc: 'Assign teachers to classes seamlessly.', icon: Calendar },
      { title: 'Monitor Health', desc: 'View daily dashboards of school metrics.', icon: PieChart },
    ]
  },
  teacher: {
    label: 'Teachers & Educators',
    color: '#00C2FF',
    title: 'More teaching, less paperwork.',
    desc: 'Reclaim your hours. Take attendance on your tablet, update grades in seconds, and share magical moments with parents without leaving the classroom flow.',
    steps: [
      { title: 'Morning Roll Call', desc: 'One-tap attendance on any device.', icon: CheckCircle2 },
      { title: 'Log Activities', desc: 'Record meals, naps, and learning milestones.', icon: Activity },
      { title: 'Share Moments', desc: 'Upload secure photos directly to parents.', icon: ImageIcon },
      { title: 'Evaluate Progress', desc: 'Update portfolios aligned with curriculum.', icon: BookOpen },
    ]
  },
  parent: {
    label: 'Parents & Family',
    color: '#FFD166',
    title: 'A window into your child\'s day.',
    desc: 'Never miss a moment. Receive real-time updates, pay tuition securely from your phone, and message teachers directly in a private, secure environment.',
    steps: [
      { title: 'Download App', desc: 'Available on iOS and Android.', icon: Smartphone },
      { title: 'Real-time Feed', desc: 'See photos and updates as they happen.', icon: Bell },
      { title: 'Instant Messaging', desc: 'Direct secure line to the teacher.', icon: MessageCircle },
      { title: 'Tap to Pay', desc: 'Clear invoices securely via Stripe.', icon: Zap },
    ]
  }
};

const TESTIMONIALS = [
  {
    quote: "Kinderpedia transformed our chaotic mornings into a smooth, organized flow. The parents love the transparency, and my teachers finally have time to breathe.",
    author: "Sarah Jenkins",
    role: "Principal, Oakwood Academy",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The automated billing module alone paid for the platform in the first month. We recovered thousands in delayed payments thanks to the automated reminders.",
    author: "Marcus Thorne",
    role: "Financial Director, Horizon Schools",
    image: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    quote: "As a parent, getting that mid-day photo of my daughter painting makes my entire day. The app is so easy to use, and I feel more connected to her learning.",
    author: "Elena Rodriguez",
    role: "Parent of Pre-K Student",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];


// --- CUSTOM STYLES & ANIMATIONS ---
const CustomStyles = () => (
  <style>{`
    :root {
      --brand-navy: #0f172a;
      --brand-coral: #FF4C60;
      --brand-teal: #00C2FF;
      --brand-yellow: #FFD166;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.05);
    }

    .glass-panel-dark {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }

    .text-gradient-coral {
      background: linear-gradient(135deg, #FF4C60, #ff7b89);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text-gradient-teal {
      background: linear-gradient(135deg, #00C2FF, #0088ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }

    @keyframes float-slow {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }

    @keyframes float-delay {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }

    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }

    .animate-float { animation: float 4s ease-in-out infinite; }
    .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
    .animate-float-delay { animation: float-delay 5s ease-in-out infinite; animation-delay: 2s; }
    .animate-blob { animation: blob 10s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    
    .blob-shape {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    }
  `}</style>
);


// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-panel border-b' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4C60] to-[#ff7b89] flex items-center justify-center shadow-lg shadow-[#FF4C60]/30">
            <BookOpen className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Kinderpedia</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#" className="hover:text-[#FF4C60] transition-colors">Features</a>
          <a href="#" className="hover:text-[#FF4C60] transition-colors">Solutions</a>
          <a href="#" className="hover:text-[#FF4C60] transition-colors">Resources</a>
          <a href="#" className="hover:text-[#FF4C60] transition-colors">Pricing</a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-slate-600 font-medium hover:text-slate-900 transition-colors">Log in</a>
          <button className="bg-[#FF4C60] hover:bg-[#e03e50] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-[#FF4C60]/25 hover:shadow-xl hover:-translate-y-0.5">
            Book a Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-5 flex flex-col gap-4 md:hidden">
          <a href="#" className="font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Features</a>
          <a href="#" className="font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Solutions</a>
          <a href="#" className="font-medium text-slate-700 p-2 hover:bg-slate-50 rounded-lg">Pricing</a>
          <div className="h-px bg-slate-100 my-2"></div>
          <a href="#" className="font-medium text-slate-700 p-2 text-center">Log in</a>
          <button className="bg-[#FF4C60] text-white px-6 py-3 rounded-xl font-medium w-full">
            Book a Demo
          </button>
        </div>
      )}
    </header>
  );
};


const HeroPathVisual = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
      {/* Background Blobs for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#FFD166] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#FF4C60] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Connection SVG */}
      <svg className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
        <path 
          d="M 100 150 C 250 150, 150 400, 350 400 C 500 400, 450 100, 600 150" 
          fill="none" 
          stroke="url(#gradientPath)" 
          strokeWidth="4"
          strokeDasharray="8 8"
          className="opacity-50"
        />
        <defs>
          <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C2FF" />
            <stop offset="50%" stopColor="#FF4C60" />
            <stop offset="100%" stopColor="#FFD166" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating UI Cards */}
      <div className="absolute top-10 left-4 lg:left-0 z-10 animate-float">
        <div className="glass-panel p-4 rounded-2xl w-64 flex flex-col gap-3 border border-white/60">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-bold">JD</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">John Doe</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 size={12}/> Checked in 8:15 AM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[40%] right-4 lg:-right-8 z-20 animate-float-slow">
        <div className="glass-panel p-5 rounded-2xl w-72 border border-white/60 shadow-xl">
           <div className="flex items-center gap-3 mb-3">
             <div className="p-2 bg-[#FF4C60]/10 rounded-lg text-[#FF4C60]">
               <CreditCard size={20} />
             </div>
             <p className="font-bold text-slate-800">Invoice Paid</p>
           </div>
           <div className="flex justify-between items-end">
             <div>
               <p className="text-xs text-slate-500 mb-1">Monthly Tuition</p>
               <p className="text-2xl font-bold text-slate-900">$450.00</p>
             </div>
             <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">
               Success
             </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/4 z-15 animate-float-delay">
        <div className="bg-white p-4 rounded-2xl w-64 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00C2FF] flex items-center justify-center shrink-0">
             <MessageCircle size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Teacher Sarah</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Emma did a fantastic job in art class today! 🎨</p>
          </div>
        </div>
      </div>
      
      {/* Central Node */}
      <div className="absolute z-30 w-32 h-32 rounded-full glass-panel flex items-center justify-center shadow-2xl border-2 border-white">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF4C60] to-[#FFD166] flex items-center justify-center animate-pulse">
          <ShieldCheck size={40} className="text-white" />
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#00C2FF]"></span>
              <span className="text-xs font-medium text-slate-600">Kinderpedia 2.0 is now live</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Run your school like it's the <span className="text-gradient-coral">easiest thing</span> you do all day.
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
              Attendance, grades, automated billing, and parent communication in one beautifully calm platform. Live in under 90 days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
                Book a free demo <ArrowRight size={20} />
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 group">
                <Play size={20} className="text-[#FF4C60] group-hover:scale-110 transition-transform" /> Watch video
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                <div className="flex text-[#FFD166]">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span>4.9/5 from 2,000+ schools</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <HeroPathVisual />

        </div>
      </div>
    </section>
  );
};


const StatsBar = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 relative z-20 -mt-10 lg:-mt-16 mb-24">
      <div className="glass-panel bg-white/90 rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.1)] border border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          {STATS.map((stat, idx) => (
            <div key={idx} className={`text-center ${idx % 2 === 0 ? '' : 'pl-4'} md:pl-0`}>
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RolesSection = () => {
  const [activeTab, setActiveTab] = useState('director');
  const activeData = ROLES[activeTab];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Everyone gets a path. <br/><span className="text-gradient-teal">Nobody gets lost.</span></h2>
          <p className="text-lg text-slate-600">Pick a role and see exactly how Kinderpedia transforms their daily routine into a seamless, joyful experience.</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl relative">
            {Object.entries(ROLES).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 z-10 ${
                  activeTab === key ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {activeTab === key && (
                  <span className="absolute inset-0 bg-white rounded-xl shadow-sm z-[-1]"></span>
                )}
                {data.label}
              </button>
            ))}
          </div>
        </div>

        {/* Role Content Area */}
        <div className="bg-slate-50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 transition-all duration-500">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            
            {/* Text description */}
            <div>
              <div 
                className="w-16 h-2 rounded-full mb-6 transition-colors duration-500" 
                style={{ backgroundColor: activeData.color }}
              ></div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{activeData.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{activeData.desc}</p>
              <button className="flex items-center gap-2 text-slate-900 font-bold hover:gap-3 transition-all">
                Explore full {activeTab} features <ArrowRight size={20} style={{ color: activeData.color }} />
              </button>
            </div>

            {/* Path Steps */}
            <div className="grid sm:grid-cols-2 gap-4">
              {activeData.steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-opacity-10 transition-colors"
                      style={{ backgroundColor: `${activeData.color}20`, color: activeData.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


const FeaturesDeepDive = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 space-y-32">
        
        {/* Feature 1: Billing */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-[#00C2FF]/10 blob-shape transform -rotate-12 scale-110"></div>
            {/* UI Mockup */}
            <div className="relative z-10 glass-panel bg-white/80 rounded-2xl p-6 shadow-2xl border border-white max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="font-bold text-slate-800">Financial Overview</div>
                <div className="text-sm text-[#00C2FF] font-medium bg-[#00C2FF]/10 px-3 py-1 rounded-full">This Month</div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Tuition Q3', amount: '$45,000', status: 'Paid', bg: 'bg-emerald-100', text: 'text-emerald-700' },
                  { name: 'After-school Care', amount: '$3,200', status: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-700' },
                  { name: 'Material Fees', amount: '$1,500', status: 'Paid', bg: 'bg-emerald-100', text: 'text-emerald-700' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <CreditCard size={16} className="text-slate-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">Auto-invoiced</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">{item.amount}</div>
                      <div className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-1 inline-block ${item.bg} ${item.text}`}>{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">Generate Reports</button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] font-bold text-sm mb-6">
              <CreditCard size={18} /> Automated Billing
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Never chase a payment again.</h2>
            <p className="text-lg text-slate-600 mb-8">Set up tuition plans once and let the system do the rest. Automatically generate invoices, send reminders, and collect payments securely via Stripe integration.</p>
            <ul className="space-y-4">
              {['Recurring billing cycles', 'One-click payment for parents', 'Comprehensive financial reports', 'Automated late payment reminders'].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 2: Communication */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4C60]/10 text-[#FF4C60] font-bold text-sm mb-6">
              <MessageCircle size={18} /> Parent Communication
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Build a community, securely.</h2>
            <p className="text-lg text-slate-600 mb-8">Share newsletters, daily photos, and direct messages in a private environment. Keep personal numbers hidden while maintaining constant, meaningful contact with families.</p>
            <ul className="space-y-4">
              {['School-wide announcements', 'Private 1-on-1 messaging', 'Rich media sharing (Photos/Videos)', 'Read receipts and engagement tracking'].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#FF4C60]/20 flex items-center justify-center text-[#FF4C60] shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-[400px]">
             <div className="absolute inset-0 bg-[#FF4C60]/10 blob-shape transform rotate-45 scale-100 origin-bottom-right"></div>
             {/* Chat UI Mockup */}
             <div className="absolute right-0 lg:-right-4 top-10 z-10 glass-panel bg-white/90 rounded-2xl p-4 shadow-2xl border border-white w-72 lg:w-80 flex flex-col gap-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">ER</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Elena Rodriguez</div>
                    <div className="text-xs text-emerald-500">Online</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0 mt-auto"></div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none text-sm text-slate-700">
                    Did Leo eat his lunch today? He was a bit fussy this morning.
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <div className="bg-[#FF4C60] text-white p-3 rounded-2xl rounded-br-none text-sm max-w-[85%] shadow-md">
                    Yes! He had a great appetite today and even asked for seconds of the fruit salad. 🍎
                  </div>
                </div>

                <div className="mt-2 pt-3 border-t border-slate-100 flex items-center gap-2 text-slate-400">
                   <ImageIcon size={18} />
                   <div className="flex-1 h-8 bg-slate-100 rounded-full px-3 flex items-center text-xs">Type message...</div>
                </div>
             </div>
             
             {/* Secondary floating card */}
             <div className="absolute left-0 bottom-10 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-float-delay">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">New Photo Added</p>
                  <p className="text-xs text-slate-500">"Science Fair Projects"</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};


const ModulesBento = () => {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">22 Modules. <span className="text-[#FFD166]">One Login.</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to run a modern educational institution, packed into a single, cohesive ecosystem. No more duct-taping software together.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-[120px]">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div 
                key={i} 
                className={`${mod.span} bg-white rounded-3xl p-6 border ${mod.border} shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between overflow-hidden relative`}
              >
                {/* Decorative background flair on hover */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl ${mod.color.split(' ')[0]}`}></div>
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${mod.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 transition-colors">{mod.name}</h3>
                </div>
              </div>
            );
          })}
          
          {/* CTA Box inside bento */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3 bg-slate-900 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between shadow-xl relative overflow-hidden">
             <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#00C2FF] to-[#FF4C60] opacity-20 blur-3xl"></div>
             <div className="relative z-10 mb-6 sm:mb-0">
               <h3 className="text-2xl font-bold text-white mb-2">And 10 more modules...</h3>
               <p className="text-slate-400">Discover the full capabilities of Kinderpedia.</p>
             </div>
             <button className="relative z-10 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shrink-0">
               View all features
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};


const TestimonialsAndSecurity = () => {
  return (
    <>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Schools that made the switch</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative">
                <div className="text-[#FFD166] flex mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={20} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 text-lg mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[200px] bg-[#00C2FF] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-5 relative z-10 grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
              <ShieldCheck size={32} className="text-[#00C2FF]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Enterprise-grade security for little learners.</h2>
            <p className="text-slate-400 text-lg">Your community's data is our highest priority. We employ banking-level encryption and strict privacy protocols.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Lock, title: 'Data Privacy', desc: 'Accounts visible only to authorized parents & teachers.' },
              { icon: Cloud, title: 'AWS Hosting', desc: '99.99% uptime with reliable cloud infrastructure.' },
              { icon: Zap, title: 'Stripe Security', desc: 'PCI-compliant payment processing.' },
              { icon: Fingerprint, title: 'GDPR Compliant', desc: 'Strict adherence to global data protection laws.' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
                  <Icon size={24} className="text-[#FFD166] mb-3" />
                  <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  );
};


const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4C60]/80 via-[#00C2FF]/60 to-slate-900 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="relative z-10 text-center max-w-3xl">
        <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">Ready for your first 40 minutes?</h2>
        <p className="text-xl text-white/80 mb-10 font-medium">See how Kinderpedia can transform your school, live with one of our experts.</p>
        <button className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          Book your free demo
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4C60] to-[#ff7b89] flex items-center justify-center">
                  <BookOpen className="text-white" size={18} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-slate-900">Kinderpedia</span>
             </div>
             <p className="text-slate-500 mb-6 max-w-xs">The complete operating system for modern childcare and education institutions.</p>
             <div className="flex gap-4">
               {/* Placeholder social icons */}
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#00C2FF] hover:text-white transition-colors cursor-pointer">In</div>
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#FF4C60] hover:text-white transition-colors cursor-pointer">Fb</div>
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer">X</div>
             </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Solutions</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">For Directors</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">For Teachers</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">For Parents</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Multi-site</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#FF4C60] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Kinderpedia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#FF4C60] selection:text-white">
      <CustomStyles />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <RolesSection />
        <FeaturesDeepDive />
        <ModulesBento />
        <TestimonialsAndSecurity />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}