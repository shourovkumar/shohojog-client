"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getJoinedCount } from "@/lib/api";

export default function EventCard({ event }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (event?._id) {
      getJoinedCount(event._id).then((d) => setCount(d.count || 0)).catch(() => {});
    }
  }, [event?._id]);

  const type = event?.eventType || event?.type || "";
  const dateStr = event?.eventDate || event?.date
    ? new Date(event.eventDate || event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "";
  const creatorName = event?.creatorName || event?.organizerName || "Shohojog";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-amber-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event?.thumbnail || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"} alt={event?.title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-white/95 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full">{type}</span>
        <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">📅 {dateStr}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 min-h-">{event?.title}</h3>
        <p className="text-sm text-slate-500 mt-1">📍 {event?.location}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 min-h- flex-1">{event?.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-8 h-8 shrink-0 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">{creatorName?.charAt(0)?.toUpperCase() || "S"}</span>
            <div className="leading-tight min-w-0">
              <p className="text-xs font-semibold truncate max-w-">{creatorName}</p>
              <p className="text- text-slate-500">👥 {count} joined</p>
            </div>
          </div>
          <Link href={`/events/${event?._id}`} className="shrink-0 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-4 py-2 rounded-full">View Event →</Link>
        </div>
      </div>
    </div>
  );
}