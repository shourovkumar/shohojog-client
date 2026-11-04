import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F3D3A] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl font-black">S</span>
            <span className="text-2xl font-black">Shohojog</span>
          </div>
          <p className="mt-3 text-teal-100/80 text-sm leading-relaxed">
            Manusher pase manush. Cleanup, plantation, donation, food drive - choto choto valo kaj diye boro poriborton ani.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-amber-400 mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-teal-100/90">
            <Link href="/">Home</Link>
            <Link href="/upcoming">Upcoming Events</Link>
            <Link href="/create-event">Create Event</Link>
            <Link href="/joined-events">Joined Events</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-amber-400 mb-3">Contact</h3>
          <p className="text-sm text-teal-100/90">Dhaka, Bangladesh</p>
          <p className="text-sm text-teal-100/90 mt-1">hello@shohojog.com</p>
          <p className="text-sm text-teal-100/90 mt-1">Shohojog - B14 Assignment 8</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-teal-100/70">
        © 2026 Shohojog. Sobai mile valo kaj kori.
      </div>
    </footer>
  );
}
