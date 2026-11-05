"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentEvents } from "@/lib/api";
import EventCard from "@/components/EventCard";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentEvents().then((d) => setEvents(Array.isArray(d) ? d : d.events || [])).catch(() => setEvents([])).finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: "🎉", value: "120+", label: "Events Completed" },
    { icon: "❤️", value: "2,400+", label: "Happy Volunteers" },
    { icon: "🌳", value: "15,000+", label: "Trees Planted" },
    { icon: "📍", value: "8 Cities", label: "Active Communities" },
  ];

  const features = [
    { icon: "🔍", title: "Find Events Fast", desc: "Search by title or location and filter by event type. New events are added every week." },
    { icon: "🤝", title: "Join in One Click", desc: "See event details, check who joined, and join instantly. No long forms, no waiting." },
    { icon: "🌱", title: "Create Your Own", desc: "Organize a cleanup, plantation or donation drive in your area and invite the community." },
    { icon: "🛡️", title: "Safe and Verified", desc: "Protected routes with JWT. Only event creators can edit or delete their own events." },
    { icon: "📱", title: "Works Everywhere", desc: "Fully responsive on mobile, tablet and desktop, with light and dark mode." },
    { icon: "❤️", title: "Track Your Impact", desc: "See all your joined events in one place, sorted by the nearest date first." },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  ];

  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-[#FFF8ED] dark:bg-slate-900 rounded- overflow-hidden grid md:grid-cols-2 min-h- md:min-h- border border-amber-100 dark:border-slate-800">
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text- font-bold px-3 py-1.5 rounded-full w-fit">COMMUNITY - TOGETHER - CHANGE</span>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mt-4 text-slate-900 dark:text-white">Do Good.<br />Together.<br /><span className="text-teal-700 dark:text-teal-400">Right Here.</span></h1>
            <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-md">Discover cleanup drives, tree plantations, donation events and health camps near you. Join a cause, meet good people, and make your city better.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/upcoming" className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3 rounded-full">Explore Upcoming</Link>
              <Link href="/create-event" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold px-6 py-3 rounded-full border border-amber-100 dark:border-slate-700">+ Create Event</Link>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">No fees. Just show up with a kind heart.</p>
          </div>
          <div className="relative min-h-">
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&q=80" alt="Volunteers" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg">
              <span>🤝</span>
              <div><p className="font-black text-sm text-slate-900 dark:text-white">2,400+ Volunteers</p><p className="text-xs text-slate-500 dark:text-slate-400">Joined events across Bangladesh</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-3xl p-5 text-center">
            <p className="text-2xl">{s.icon}</p>
            <p className="text-2xl md:text-3xl font-black mt-1 text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 dark:text-white">Why Join Shohojog?</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">Everything you need to find a cause, join it, and lead it - in one simple place.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-3xl p-6">
              <p className="text-3xl">{f.icon}</p>
              <h3 className="font-black text-lg mt-3 text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-end justify-between">
          <div><h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Recent Upcoming Events</h2><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fresh events near you - join before seats fill up.</p></div>
          <Link href="/upcoming" className="text-teal-700 dark:text-teal-400 font-bold text-sm shrink-0">View All</Link>
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 animate-pulse">{[1, 2, 3].map((i) => <div key={i} className="h- bg-amber-100 dark:bg-slate-800 rounded-3xl" />)}</div>
        ) : events.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-3xl p-10 text-center mt-6">
            <p className="text-4xl">📭</p>
            <h3 className="font-black text-lg mt-3 text-slate-900 dark:text-white">No upcoming events yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Be the first to create one in your area.</p>
            <Link href="/create-event" className="inline-block mt-4 bg-teal-700 text-white font-bold px-6 py-3 rounded-full">Create Event</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">{events.map((ev) => <EventCard key={ev._id} event={ev} />)}</div>
        )}
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white">Moments From Our Community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {gallery.map((src, i) => <img key={i} src={src} alt="Community" className="w-full h-44 md:h-56 object-cover rounded-3xl" />)}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 mt-12 mb-12">
        <div className="bg-teal-700 dark:bg-teal-800 rounded- p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white">Get New Events in Your Inbox</h2>
          <p className="text-teal-100 mt-2">One email a week. No spam. Only good causes near you.</p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed!"); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
            <input type="email" required placeholder="Your email address" className="flex-1 px-4 py-3 rounded-full outline-none bg-white text-slate-900" />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}