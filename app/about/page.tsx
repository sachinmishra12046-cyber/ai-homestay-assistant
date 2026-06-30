"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Leaf,
  Bot,
  Home,
  ShieldCheck,
  Lock,
  Headphones,
  BadgePercent,
  Search,
  MousePointerClick,
  CalendarCheck,
  Plane,
  X,       
  ArrowRight,
  Star,
  MapPin,
  Users,
  TrendingUp,
} from "lucide-react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const features = [
  {
    icon: <Leaf className="w-6 h-6 text-emerald-600" />,
    title: "Eco Tourism",
    desc: "Every stay is vetted for low environmental impact and sustainable practices.",
  },
  {
    icon: <Bot className="w-6 h-6 text-emerald-600" />,
    title: "AI Recommendations",
    desc: "Our model learns your travel style and surfaces the perfect match.",
  },
  {
    icon: <Home className="w-6 h-6 text-emerald-600" />,
    title: "Local Communities",
    desc: "Revenue flows directly to host families, strengthening rural economies.",
  },
];

const whyCards = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-emerald-500" />,
    title: "Verified Homestays",
    desc: "Every property passes a 40-point quality and safety inspection before listing.",
  },
  {
    icon: <Lock className="w-7 h-7 text-emerald-500" />,
    title: "Secure Booking",
    desc: "End-to-end encrypted payments with full refund protection on every booking.",
  },
  {
    icon: <Headphones className="w-7 h-7 text-emerald-500" />,
    title: "24 / 7 Support",
    desc: "Real humans (and our AI) ready to help you no matter the time zone.",
  },
  {
    icon: <BadgePercent className="w-7 h-7 text-emerald-500" />,
    title: "Best Price Guarantee",
    desc: "Found it cheaper elsewhere? We'll match it and give you an extra 5% off.",
  },
];

const stats = [
  { icon: <Home className="w-6 h-6" />, value: "500+", label: "Verified Homestays" },
  { icon: <MapPin className="w-6 h-6" />, value: "50+", label: "Cities Covered" },
  { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Happy Travelers" },
  { icon: <Star className="w-6 h-6" />, value: "4.9★", label: "Average Rating" },
];

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    step: "01",
    title: "Search",
    desc: "Tell our AI your destination, dates, and vibe.",
  },
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    step: "02",
    title: "Choose",
    desc: "Browse curated stays ranked just for you.",
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    step: "03",
    title: "Book",
    desc: "Confirm in seconds with secure, flexible payment.",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    step: "04",
    title: "Travel",
    desc: "Arrive to a warm welcome from your host family.",
  },
];

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    avatar: "AM",
    color: "from-emerald-400 to-teal-500",
    bio: "Serial entrepreneur with 10 years in sustainable travel.",
  },
  {
    name: "Priya Sharma",
    role: "AI Engineer",
    avatar: "PS",
    color: "from-violet-400 to-purple-500",
    bio: "Ex-Google ML engineer obsessed with recommendation systems.",
  },
  {
    name: "Ravi Nair",
    role: "Travel Expert",
    avatar: "RN",
    color: "from-amber-400 to-orange-500",
    bio: "Visited 200+ homestays across India to shape our standards.",
  },
  {
    name: "Sneha Rao",
    role: "Customer Support",
    avatar: "SR",
    color: "from-sky-400 to-blue-500",
    bio: "Makes sure every traveler feels heard, helped, and happy.",
  },
];

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-28 pb-20 px-6">
        {/* ambient blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-teal-200/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* left */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full">
              <Leaf className="w-4 h-4" /> About StayNest
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                AI Homestay
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Connecting travelers with authentic eco-friendly homestays across
              India through AI-powered recommendations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/stays"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-7 py-3 rounded-2xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Stays <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/host"
                className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-700 px-7 py-3 rounded-2xl font-semibold hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-200"
              >
                Become a Host
              </a>
            </div>
          </div>

          {/* right — decorative card */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-600 shadow-2xl shadow-emerald-200">
              {/* pattern overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8 gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Home className="w-10 h-10 text-white" />
                </div>
                <p className="text-2xl font-bold leading-tight">
                  India's Smartest<br />Homestay Platform
                </p>
                <p className="text-sm text-emerald-100">
                  Powered by AI · Rooted in culture
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OUR MISSION ──────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* illustration */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 h-96 flex items-center justify-center shadow-inner">
            <div className="text-center space-y-4 p-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl">
                <Leaf className="w-12 h-12 text-white" />
              </div>
              <p className="text-2xl font-bold text-emerald-800">
                Sustainable Travel
              </p>
              <p className="text-emerald-600 text-sm max-w-xs mx-auto">
                Supporting local families and the environment, one stay at a time.
              </p>
            </div>
          </div>

          {/* text */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="mt-2 text-4xl font-extrabold leading-tight">
                Travel that gives{" "}
                <span className="text-emerald-600">back to the land</span>
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                StayNest was built on one belief: the best travel stories come
                from staying with people, not corporations. We use AI to match
                curious travelers with host families who open their homes —
                creating memories while preserving ecosystems and livelihoods.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-200 cursor-default"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{f.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY CHOOSE US ────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
              Why StayNest
            </span>
            <h2 className="mt-2 text-4xl font-extrabold">
              Everything you need,{" "}
              <span className="text-emerald-600">nothing you don't</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((c) => (
              <div
                key={c.title}
                className="group relative p-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors duration-300">
                    {c.icon}
                  </div>
                  <h3 className="font-bold text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. IMPACT STATS ─────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">
              Our Impact in Numbers
            </h2>
            <p className="mt-2 text-emerald-100">
              Real people. Real places. Real change.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center group"
              >
                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-white/30 transition-colors duration-200">
                  {s.icon}
                </div>
                <p className="text-4xl font-black text-white">{s.value}</p>
                <p className="text-sm text-emerald-100 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ─────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
              Process
            </span>
            <h2 className="mt-2 text-4xl font-extrabold">
              How it <span className="text-emerald-600">works</span>
            </h2>
          </div>

          <div className="relative grid md:grid-cols-4 gap-0">
            {/* connector line */}
            <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

            {steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center px-4 pb-4">
                {/* step number badge */}
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-200 mb-5">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900">{s.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed max-w-[160px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TEAM ─────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
              The People
            </span>
            <h2 className="mt-2 text-4xl font-extrabold">
              Meet the <span className="text-emerald-600">team</span>
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              A small crew obsessed with making homestay travel delightful and fair.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                {/* avatar */}
                <div
                  className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-2xl font-black shadow-lg mb-5`}
                >
                  {m.avatar}
                </div>
                <h3 className="font-bold text-gray-900">{m.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mt-0.5">{m.role}</p>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">{m.bio}</p>

                {/* social icons */}
                <div className="flex justify-center gap-3 mt-5">
                  {[X].map((Icon, idx) => (
                    <button
                      key={idx}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-emerald-100 hover:text-emerald-600 flex items-center justify-center text-gray-400 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ──────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 p-16 text-center shadow-2xl shadow-emerald-200 relative overflow-hidden">
          {/* decorative dots */}
          <div className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }} />

          <div className="relative">
            <TrendingUp className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Ready for your<br />next adventure?
            </h2>
            <p className="mt-4 text-emerald-100 text-lg max-w-md mx-auto">
              Join 10,000+ travelers who've found their perfect stay — or open
              your home to the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <a
                href="/stays"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/host"
                className="inline-flex items-center gap-2 border-2 border-white/70 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                Become a Host
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}