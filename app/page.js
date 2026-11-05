"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import EventCard from "@/components/EventCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { getRecentEvents } from "@/lib/api";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    getRecentEvents().then((d) => setEvents(Array.isArray(d) ? d : [])).catch(() => setEvents([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-12">
        <div className="bg-[#FFF8ED] dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded- overflow-hidden grid md:grid-cols-2">
          <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
            <span className="inline-block w-fit bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">COMMUNITY - TOGETHER - CHANGE</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mt-4">Do Good.<br />Together.<br /><span className="text-teal-700 dark:text-teal-400">Right Here.</span></h1>
            <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-md">Discover cleanup drives, tree plantations, donation events and health camps near you. Join a cause, meet good people, and make your city better.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/upcoming" className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3.5 rounded-full text-sm sm:text-base">Explore Upcoming</Link>
              <Link href="/create-event" className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 font-bold px-6 py-3.5 rounded-full text-sm sm:text-base">+ Create Event</Link>
            </div>
            <p className="text-xs text-slate-400 mt-4">No fees. Just show up with a kind heart.</p>
          </div>
          <div className="relative min-h- md:min-h-">
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&q=80" alt="Community volunteers" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div><p className="font-bold text-sm leading-tight">2,400+ Volunteers</p><p className="text-xs text-slate-500">Joined events across Bangladesh</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { n: "120+", t: "Events Completed", e: "🎉" },
            { n: "2,400+", t: "Happy Volunteers", e: "❤️" },
            { n: "15,000+", t: "Trees Planted", e: "🌳" },
            { n: "8 Cities", t: "Active Communities", e: "📍" },
          ].map((s) => (
            <div key={s.t} className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 text-center">
              <p className="text-2xl">{s.e}</p>
              <p className="text-2xl sm:text-3xl font-black mt-1">{s.n}</p>
              <p className="text-xs sm:text-sm text-slate-500">{s.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 mt-14">
        <h2 className="text-2xl sm:text-3xl font-black text-center">Why Join Shohojog?</h2>
        <p className="text-center text-slate-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">Everything you need to find a cause, join it, and lead it - in one simple place.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            { e: "🔍", t: "Find Events Fast", d: "Search by title or location and filter by event type. New events are added every week." },
            { e: "🤝", t: "Join in One Click", d: "See event details, check who joined, and join instantly. No long forms, no waiting." },
            { e: "🌱", t: "Create Your Own", d: "Organize a cleanup, plantation or donation drive in your area and invite the community." },
            { e: "🛡️", t: "Safe and Verified", d: "Protected routes with JWT. Only event creators can edit or delete their own events." },
            { e: "📱", t: "Works Everywhere", d: "Fully responsive on mobile, tablet and desktop, with light and dark mode." },
            { e: "❤️", t: "Track Your Impact", d: "See all your joined events in one place, sorted by the nearest date first." },
          ].map((f) => (
            <div key={f.t} className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-3xl p-6">
              <p className="text-3xl">{f.e}</p>
              <h3 className="font-bold text-lg mt-3">{f.t}</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Events */}
      <section className="max-w-7xl mx-auto px-4 mt-14">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div><h2 className="text-2xl sm:text-3xl font-black">Recent Upcoming Events</h2><p className="text-slate-500 text-sm mt-1">Fresh events near you - join before seats fill up.</p></div>
          <Link href="/upcoming" className="font-bold text-teal-700 dark:text-teal-400 text-sm">View All</Link>
        </div>
        {loading ? <LoadingSkeleton count={6} /> : events.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border rounded- p-10 text-center mt-6"><p className="text-4xl">📭</p><p className="font-bold mt-3">No upcoming events yet</p><p className="text-sm text-slate-500">Be the first to create one in your area.</p><Link href="/create-event" className="inline-block mt-4 bg-teal-700 text-white font-bold px-5 py-3 rounded-full text-sm">Create Event</Link></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">{events.map((ev) => <EventCard key={ev._id} event={ev} />)}</div>
        )}
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 mt-14">
        <h2 className="text-2xl sm:text-3xl font-black text-center">Moments From Our Community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {[
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
          ].map((src, i) => (
            <img key={i} src={src} alt="Community event" className="w-full h-40 sm:h-56 object-cover rounded-3xl" />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 mt-14 mb-4">
        <div className="bg-teal-700 rounded- p-6 sm:p-10 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-black">Get New Events in Your Inbox</h2>
          <p className="text-white/80 text-sm sm:text-base mt-2">One email a week. No spam. Only good causes near you.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (!email) return; toast.success("Thanks for subscribing!"); setEmail(""); }} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 px-5 py-3.5 rounded-full text-slate-900 outline-none" />
            <button className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3.5 rounded-full">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}