# Shohojog - Community Volunteer Events Platform

A community-driven platform to discover, create, and join social development events across Bangladesh. Small actions, together, make a big change.

## Live Links

- **Client:** https://shohojog-client.vercel.app
- **Server:** https://shohojog-server-1.onrender.com
- **Client Repo:** https://github.com/shourovkumar/shohojog-client
- **Server Repo:** https://github.com/shourovkumar/shohojog-server

## Features

- Browse upcoming events with search by title/location and filter by event type
- View event details with joined volunteer count
- Create, edit, and delete your own events (protected with JWT)
- Join / Leave events - duplicate join blocked
- My Events, Joined Events, and My Profile pages (private routes)
- Email + Google login with BetterAuth
- Light / Dark mode with theme persistence
- Fully responsive on mobile, tablet, and desktop
- Toast notifications - no alert() used

## Tech Stack

**Client:** Next.js 16 (App Router), Tailwind CSS v4, BetterAuth, react-hot-toast
**Server:** Express.js, 【entity-MongoDB¦canonical_name=MongoDB】 / Mongoose, JWT

## Pages / Routes

- `/` - Home (Hero, Stats, Features, Recent Events, Gallery, Newsletter)
- `/upcoming` - All Upcoming Events with Search + Filter
- `/events/[id]` - Event Details + Join
- `/login` - Login (Email + Google)
- `/register` - Register
- `/create-event` - Create Event (Private)
- `/manage-events` - Manage My Events (Private)
- `/joined-events` - Joined Events (Private)
- `/profile` - My Profile (Private)

## How To Run Locally

### 1. Clone Client
```bash
git clone https://github.com/shourovkumar/shohojog-client.git
cd shohojog-client
npm install