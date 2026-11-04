"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getRecentEvents } from "@/lib/api";
import EventCard from "@/components/EventCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const FEATURES = [
  { icon: "🤝", title: "Easy to Join", desc: "1 click e jekono event e join koro, kono jhamela nai." },
  { icon: "✨", title: "Create Your Own", desc: "Tumar elakay event create koro, sobai ke dak dao." },
  { icon: "📍", title: "Local Impact", desc: "Tumar ashe pashe kothay ki hocche, sob ek jaygay dekho." },
  { icon: "❤️", title: "Real Change", desc: "Choto kaj diye boro poriborton - eksathe kori." },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
  "https://images.unsplash.com/photo-1509099863732-ef4bff19e808?w=800&q=80",
];

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    getRecentEvents()
      .then((d) => setEvents(Array.isArray(d) ? d : d.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  function handleNewsletter(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Thik email dao");
      return;
    }
    toast.success("Newsletter e subscribe hoye gese!");
    setEmail("");
  }

  return (
    <div>
      {/* BANNER */}
      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
            ✨ BANGLADESH ER VOLUNTEER COMMUNITY
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mt-4 text-slate-900 dark:text-white">
            Manusher Pase
            <br />
            <span className="text-teal-700 dark:text-teal-400">Manush</span> Darai.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-lg leading-relaxed">
            Cleanup, plantation, donation, food drive - tumar elakar valo kaj gulo ekhane. Join koro, ba nijei event create koro.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/upcoming" className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3.5 rounded-full shadow-lg">
              Explore Upcoming Events →
            </Link>
            <Link href="/create-event" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3.5 rounded-full shadow-lg">
              + Create Event
            </Link>
          </div>
          <div className="flex gap-6 mt-8">
            <div><p className="text-2xl font-black text-teal-700 dark:text-teal-400">120+</p><p className="text-xs text-slate-500 font-semibold">Events Done</p></div>
            <div><p className="text-2xl font-black text-teal-700 dark:text-teal-400">2,500+</p><p className="text-xs text-slate-500 font-semibold">Volunteers</p></div>
            <div><p className="text-2xl font-black text-teal-700 dark:text-teal-400">15+</p><p className="text-xs text-slate-500 font-semibold">Cities</p></div>
          </div>
        </div>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&q=80" alt="Volunteers" className="w-full h- md:h- object-cover rounded- shadow-2xl" />
          <div className="absolute -bottom-4 -left-2 md:left-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-amber-100">
            <span className="text-3xl">❤️</span>
            <div><p className="font-black text-lg leading-none">50K+ Lives</p><p className="text-xs text-slate-500 mt-1">Touched by volunteers</p></div>
          </div>
          <div className="absolute top-4 right-4 bg-amber-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
            Join Today - Free
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-black text-center">Keno Shohojog?</h2>
        <p className="text-center text-slate-500 mt-2">Valo kaj kora ekhon aro easy</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="font-bold text-lg mt-3">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT EVENTS */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black">Recent Upcoming Events</h2>
            <p className="text-slate-500 mt-1">Samne je event gulo asche</p>
          </div>
          <Link href="/upcoming" className="hidden sm:block bg-white dark:bg-slate-900 border font-semibold px-5 py-2.5 rounded-full">View All →</Link>
        </div>
        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : events.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border">
              <p className="text-4xl">📭</p>
              <p className="font-bold mt-3">Ekhono kono upcoming event nai</p>
              <Link href="/create-event" className="inline-block mt-4 bg-teal-700 text-white px-5 py-2.5 rounded-full font-semibold">Prothom Event Create Koro</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => <EventCard key={ev._id} event={ev} />)}
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-black text-center">Gallery</h2>
        <p className="text-center text-slate-500 mt-2">Amader volunteer der kichu muhurto</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {GALLERY.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="Gallery" className="w-full h-44 md:h-56 object-cover rounded-3xl hover:scale-[1.02] transition" />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-teal-800 rounded- p-8 md:p-12 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black">Notun Event Miss Koro Na</h2>
          <p className="text-teal-100 mt-2">Proti soptahe notun volunteer event er update paba</p>
          <form onSubmit={handleNewsletter} className="max-w-md mx-auto mt-6 flex gap-2 bg-white rounded-full p-1.5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tumar email likho"
              className="flex-1 px-4 outline-none text-slate-900 bg-transparent text-sm"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-full text-sm">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}