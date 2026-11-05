"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { createEvent, fetchServerToken } from "@/lib/api";

const TYPES = ["Cleanup", "Plantation", "Donation", "Winter Relief", "Food Drive", "Health Camp", "Education", "Others"];

const PRESETS = [
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Cleanup");
  const [thumbnail, setThumbnail] = useState(PRESETS[0]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please login to create an event");
      router.push("/login");
    }
  }, [isPending, user, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a title");
    if (!description.trim()) return toast.error("Please enter a description");
    if (!type) return toast.error("Please select an event type");
    if (!thumbnail.trim()) return toast.error("Please enter a thumbnail URL or select a preset");
    if (!location.trim()) return toast.error("Please enter a location");
    if (!date) return toast.error("Please select an event date");
    if (date < today) return toast.error("Event date cannot be in the past");
    if (!localStorage.getItem("shohojog_token")) {
      await fetchServerToken(user);
    }
    setLoading(true);
    try {
      await createEvent({
        title: title.trim(),
        description: description.trim(),
        eventType: type,
        thumbnail: thumbnail.trim(),
        location: location.trim(),
        eventDate: date,
        creatorEmail: user.email,
        creatorName: user.name,
        creatorPhoto: user.image || "",
      });
      toast.success("Event created successfully!");
      router.push("/upcoming");
    } catch (err) {
      toast.error(err.message || "Could not create event");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black">Create New Event</h1>
        <p className="text-slate-500 mt-2">Create a good work event in your area</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded- p-6 md:p-8 mt-8 border border-amber-100 dark:border-slate-800 shadow-xl space-y-5">
        <div>
          <label className="text-sm font-bold">Event Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Mirpur Lake Cleanup Day" className="w-full mt-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600" />
        </div>
        <div>
          <label className="text-sm font-bold">Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="What is this event about, what will you do, what should volunteers bring..." className="w-full mt-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold">Event Type *</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full mt-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none">
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-bold">Event Date *</label>
            <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none" />
          </div>
        </div>
        <div>
          <label className="text-sm font-bold">Location *</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Example: Mirpur 10, Dhaka" className="w-full mt-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600" />
        </div>
        <div>
          <label className="text-sm font-bold">Thumbnail Image URL *</label>
          <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://... image link" className="w-full mt-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600" />
          <p className="text-xs text-slate-400 mt-2">Or select a preset below:</p>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {PRESETS.map((src) => (
              <img key={src} src={src} alt="Preset" onClick={() => setThumbnail(src)} className={`w-20 h-14 object-cover rounded-xl cursor-pointer shrink-0 ${thumbnail === src ? "ring-4 ring-teal-600" : "opacity-70"}`} />
            ))}
          </div>
          {thumbnail && (
            <img src={thumbnail} alt="Preview" className="w-full h-44 object-cover rounded-2xl mt-3" />
          )}
        </div>
        <div className="bg-amber-50 dark:bg-slate-800 rounded-2xl px-4 py-3 text-sm">
          <p><span className="font-bold">Organizer:</span> {user.name} ({user.email})</p>
          <p className="text-xs text-slate-500 mt-1">This event will be saved with this email</p>
        </div>
        <button disabled={loading} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-full disabled:opacity-60">
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}