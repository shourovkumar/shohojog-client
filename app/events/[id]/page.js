"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getEventById, getJoinedCount, getJoinedEvents, joinEvent, leaveEvent, fetchServerToken } from "@/lib/api";

function EventDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!id) return;
    getEventById(id).then((d) => setEvent(d.event || d)).catch(() => setEvent(null)).finally(() => setLoading(false));
    getJoinedCount(id).then((d) => setCount(d.count || 0)).catch(() => {});
  }, [id]);

  useEffect(() => {
    if (user?.email && id) {
      getJoinedEvents(user.email).then((d) => {
        const list = Array.isArray(d) ? d : d.joined || [];
        const found = list.some((ev) => (ev._id === id || ev.eventId === id));
        setAlreadyJoined(found);
      }).catch(() => {});
    }
  }, [user?.email, id]);

  async function handleJoin() {
    if (!user) {
      toast.error("Please login to join this event");
      router.push("/login");
      return;
    }
    if (!localStorage.getItem("shohojog_token")) {
      await fetchServerToken(user);
    }
    setJoining(true);
    try {
      await joinEvent(id, user);
      toast.success("You have joined this event!");
      setAlreadyJoined(true);
      setCount((c) => c + 1);
    } catch (err) {
      toast.error(err.message || "Could not join");
    } finally {
      setJoining(false);
    }
  }

  async function handleLeave() {
    setJoining(true);
    try {
      await leaveEvent(id);
      toast.success("You have left this event");
      setAlreadyJoined(false);
      setCount((c) => Math.max(0, c - 1));
    } catch (err) {
      toast.error(err.message || "Could not leave");
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
        <div className="h- bg-amber-100 dark:bg-slate-800 rounded-" />
        <div className="h-8 bg-amber-100 dark:bg-slate-800 rounded-full w-2/3 mt-6" />
        <div className="h-4 bg-amber-100 dark:bg-slate-800 rounded-full w-full mt-3" />
      </div>
    );
  }

  if (!event?._id && !event?.title) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl">😢</p>
        <h1 className="text-2xl font-black mt-4">Event Not Found</h1>
        <Link href="/upcoming" className="inline-block mt-5 bg-teal-700 text-white px-6 py-3 rounded-full font-bold">View Upcoming Events</Link>
      </div>
    );
  }

  const type = event.eventType || event.type || "";
  const dateStr = event.eventDate || event.date ? new Date(event.eventDate || event.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
  const creatorName = event.creatorName || event.organizerName || "Shohojog";
  const creatorEmail = event.creatorEmail || event.organizerEmail || "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/upcoming" className="font-semibold text-teal-700 dark:text-teal-400">Back to Upcoming</Link>
      <img src={event.thumbnail || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&q=80"} alt={event.title} className="w-full h- md:h- object-cover rounded- mt-4 shadow-xl" />
      <div className="flex flex-wrap gap-2 mt-5">
        <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full">{type}</span>
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">{dateStr}</span>
        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-full">{count} volunteers joined</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-black mt-4">{event.title}</h1>
      <p className="text-slate-500 mt-1">{event.location}</p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4 whitespace-pre-line">{event.description}</p>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 mt-6 border border-amber-100 dark:border-slate-800 flex items-center gap-3">
        <span className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center font-black text-xl">{creatorName?.charAt(0)?.toUpperCase() || "S"}</span>
        <div>
          <p className="text-xs text-slate-400 font-bold">ORGANIZER</p>
          <p className="font-bold">{creatorName}</p>
          <p className="text-sm text-slate-500">{creatorEmail}</p>
        </div>
      </div>
      <div className="bg-amber-50 dark:bg-slate-900 rounded-3xl p-5 mt-5 border border-amber-100 dark:border-slate-800">
        <h2 className="font-black text-lg">Guidelines</h2>
        <ul className="text-sm text-slate-600 dark:text-slate-300 mt-2 space-y-1.5 list-disc pl-5">
          <li>Please arrive at the event location on time</li>
          <li>Bring your water bottle and cap</li>
          <li>Respect everyone and work as a team</li>
          <li>Ask permission before taking photos of others</li>
        </ul>
      </div>
      <div className="mt-6">
        {alreadyJoined ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-green-100 text-green-800 font-bold py-4 rounded-full cursor-default">You have joined this event</button>
            <button onClick={handleLeave} disabled={joining} className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full disabled:opacity-60">{joining ? "Please wait..." : "Leave Event"}</button>
          </div>
        ) : (
          <button onClick={handleJoin} disabled={joining} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-full text-lg shadow-lg disabled:opacity-60">{joining ? "Joining..." : "Join This Event"}</button>
        )}
        {!user && <p className="text-center text-sm text-slate-500 mt-2">Please <Link href="/login" className="text-teal-700 font-bold">login</Link> to join this event</p>}
      </div>
    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading...</div>}>
      <EventDetailsContent />
    </Suspense>
  );
}