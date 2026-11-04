"use client";
import { useEffect, useState } from "react";
import { getEvents } from "@/lib/api";
import EventCard from "@/components/EventCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const TYPES = ["", "Cleanup", "Plantation", "Donation", "Winter Relief", "Food Drive", "Health Camp", "Education", "Others"];

export default function UpcomingPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setLoading(true);
    getEvents({ search, type })
      .then((d) => setEvents(Array.isArray(d) ? d : d.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [search, type]);

  function handleSearch(e) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  function handleClear() {
    setSearchInput("");
    setSearch("");
    setType("");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="text-center">
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
          UPCOMING EVENTS
        </span>
        <h1 className="text-3xl md:text-4xl font-black mt-3">Samner Event Gulo</h1>
        <p className="text-slate-500 mt-2">Tumar pochonder event khuje join koro</p>
      </div>

      {/* SEARCH + FILTER */}
      <form onSubmit={handleSearch} className="mt-8 bg-white dark:bg-slate-900 rounded- p-4 md:p-5 border border-amber-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Event khujo... jemon: cleanup, Dhaka, plantation"
          className="flex-1 px-5 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-5 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none font-semibold"
        >
          <option value="">Sob Type</option>
          {TYPES.filter(Boolean).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-7 py-3.5 rounded-full">
          Search
        </button>
        {(search || type) && (
          <button type="button" onClick={handleClear} className="bg-slate-100 dark:bg-slate-800 font-bold px-5 py-3.5 rounded-full">
            Clear ✕
          </button>
        )}
      </form>

      {/* RESULT COUNT */}
      {!loading && (
        <p className="text-sm text-slate-500 mt-5 font-semibold">
          {events.length} ta event pawa gese {search ? ` - "${search}"` : ""} {type ? ` - ${type}` : ""}
        </p>
      )}

      {/* GRID */}
      <div className="mt-5">
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : events.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded- p-12 text-center border border-amber-100 dark:border-slate-800">
            <p className="text-6xl">🔍</p>
            <h2 className="text-2xl font-black mt-4">No result found</h2>
            <p className="text-slate-500 mt-2">Ei search / filter e kono event pawa jay nai. Abar try koro.</p>
            <button onClick={handleClear} className="mt-5 bg-teal-700 text-white font-bold px-6 py-3 rounded-full">
              Sob Event Dekho
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <EventCard key={ev._id} event={ev} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}