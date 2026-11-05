import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F3D3E] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-black">S</span>
            <span className="text-2xl font-black">Shoho<span className="text-amber-400">jog</span></span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mt-3">A community-driven platform to discover, create and join social development events across Bangladesh. Small actions, together, make a big change.</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Explore</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link href="/" className="hover:text-amber-400">Home</Link></li>
            <li><Link href="/upcoming" className="hover:text-amber-400">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:text-amber-400">Create Event</Link></li>
            <li><Link href="/joined-events" className="hover:text-amber-400">Joined Events</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Event Types</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Cleanup Drives</li>
            <li>Tree Plantation</li>
            <li>Donation & Food Drive</li>
            <li>Winter Relief & Health Camp</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <p className="text-white/70 text-sm">Dhaka, Bangladesh</p>
          <p className="text-white/70 text-sm mt-1">hello@shohojog.org</p>
          <p className="text-white/70 text-sm mt-1">Join us to build a kinder community.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-4 py-5 text-center text-sm text-white/60">© 2026 Shohojog. Made with care for the community.</p>
      </div>
    </footer>
  );
}