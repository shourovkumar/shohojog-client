"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getJoinedEvents, leaveEvent } from "@/lib/api";

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leavingId, setLeavingId] = useState(null);

  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Joined events dekhte login korte hobe");
      router.push("/login");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (user?.email) {
      getJoinedEvents(user.email)
        .then((d) => {
          // Server direct event array dey
          const list = Array.isArray(d) ? d : d.joined || d.events || [];
          const sorted = [...list].sort((a, b) => {
            const dateA = new Date(a.eventDate || a.date || 0);
            const dateB = new Date(b.eventDate || b.date || 0);
            return dateA - dateB;
          });
          setJoined(sorted);
        })
        .catch(() => setJoined([]))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  async function handleLeave(ev) {
    const eventId = ev._id;
    setLeavingId(eventId);
    try {
      await leaveEvent(eventId);
      toast.success("Event theke leave hoye gese");
      setJoined((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      toast.error(err.message || "Leave hoy nai");
    } finally {
      setLeavingId(null);
    }
  }

  if (isPending || loading) {
    return <div className="max-w-5xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-black">My Joined Events ❤️</h1>
      <p className="text-slate-500 mt-1">Tumi join kora event gulo - nearest date age - {joined.length} ta</p>

      {joined.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded- p-12 text-center border mt-8">
          <p className="text-6xl">💔</p>
          <h2 className="text-2xl font-black mt-4">Ekhono kono event e join koro nai</h2>
          <Link href="/upcoming" className="inline-block mt-5 bg-teal-700 text-white font-bold px-6 py-3 rounded-full">Explore Events →</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {joined.map((ev) => (
            <div key={ev._id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-amber-100 dark:border-slate-800 flex gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ev.thumbnail || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80"} alt={ev.title} className="w-28 h-28 object-cover rounded-2xl shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="bg-teal-100 text-teal-800 text- font-bold px-2.5 py-1 rounded-full">{ev.eventType || ev.type || "Event"}</span>
                <h3 className="font-bold mt-2 line-clamp-2">{ev.title}</h3>
                <p className="text-xs text-slate-500 mt-1">📍 {ev.location || ""}</p>
                <p className="text-xs text-slate-500">📅 {ev.eventDate ? new Date(ev.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                <div className="flex gap-2 mt-3">
                  <Link href={`/events/${ev._id}`} className="bg-teal-700 text-white text-sm font-bold px-4 py-2 rounded-full">View</Link>
                  <button onClick={() => handleLeave(ev)} disabled={leavingId === ev._id} className="bg-rose-100 text-rose-700 text-sm font-bold px-4 py-2 rounded-full disabled:opacity-60">
                    {leavingId === ev._id ? "Leaving..." : "Leave"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}