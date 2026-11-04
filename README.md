# Shohojog - Manusher Pase Manush

Live Site: https://shohojog-client.vercel.app

Shohojog is a volunteer community platform for Bangladesh. Anyone can discover upcoming volunteer events, join them, or create their own event to help their local community.

## Features

- Explore upcoming volunteer events with backend search and event type filter
- View full event details without login, join event after login
- Create event with title, description, type, thumbnail, location and date (past date not allowed)
- Manage your own events - edit with modal, delete with confirm modal
- Joined events page - sorted by nearest date, with leave option
- Login / Register with Email + Password and Google Login
- Light / Dark theme toggle for full site
- JWT protected APIs for create, update, delete and join
- Loading skeletons, toast notifications, fully responsive on mobile / tablet / desktop

## Tech Stack

- Frontend: Next.js (App Router, JavaScript), Tailwind CSS, BetterAuth, React Hot Toast, Next Themes
- Backend: Express.js, 【entity-MongoDB¦canonical_name=MongoDB】 (Mongoose), JSON Web Token
- Deploy: Vercel (Client), Render (Server)

## Run Locally - Client

```bash
cd shohojog-client
npm install
npm run dev