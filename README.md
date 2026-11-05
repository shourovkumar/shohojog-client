# Shohojog — Community-Driven Social Development Events

Live Site: https://shohojog-client.vercel.app

Shohojog is a community-driven platform where people can discover, create, and join social development events like cleanup, plantation, donation, winter relief, and health camps.

## Features

- **Discover Upcoming Events:** Search by title / location and filter by event type — all filtering happens on the backend.
- **Event Details + Join System:** Anyone can view event details without login. Logged-in users can join / leave an event, and duplicate join is blocked.
- **Create, Manage & Update Events:** Logged-in users can create events with past-date validation, and manage only their own events with edit / delete modals.
- **Joined Events:** See only my joined events, sorted by nearest date first, with leave option.
- **Secure Auth + JWT:** Email/Password + Google login with BetterAuth. Protected APIs are verified with JWT on the server.
- **Dark / Light Theme:** Full-site theme toggle with `next-themes`, saved across reloads.
- **Profile View & Update:** View profile and update name / photo, synced with auth.
- **Loading Skeletons:** Home and list pages show skeletons while data loads — no blank screen.
- **Fully Responsive:** Mobile, tablet and desktop — new warm cream + deep teal design, not a demo copy.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + JavaScript + Tailwind CSS
- **Auth:** BetterAuth + MongoDB Adapter
- **Backend:** Express.js + MongoDB + Mongoose + JWT
- **Toast:** react-hot-toast

## Run Locally

**Client:**

```bash
cd shohojog-client
npm install
npm run dev