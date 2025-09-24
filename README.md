# Movie Watchlist

Movie Watchlist is a full-stack project for discovering films, searching the OMDB catalog, and saving titles to a watchlist you want to come back to later. The frontend is powered by Vite + React. A lightweight node server is included for local development and will evolve into the production API and data persistence layer.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher is recommended)
- npm (bundled with Node.js)
- Git

### Installation
1. **Fork or Clone the Repository**
   ```bash
   git clone https://github.com/abj32/movie-watchlist.git
   cd movie-watchlist
   ```

2. **Install Dependencies**
   Run a single install from the project root:
   ```bash
   npm install
   ```

   The root `package.json` includes a `postinstall` script that fans out to the `client/` app automatically, so you only need to run `npm install` once at the root to hydrate the frontend. As we build out the backend we will extend the same hook to install server dependencies, and once the server side is complete the repository will transition into an npm workspace so the root install orchestrates every package automatically.

### Running the Development Server
From the project root run:
```bash
npm run dev
```

This command uses `concurrently` to start both the frontend (Vite dev server) and the lightweight backend stub. While the persistent database layer is still in progress you can continue working on the client app by starting it directly:
```bash
npm run start-client
```

The Vite dev server will be available at `http://localhost:5173/` by default.

## Project Structure
- `client/` – React application for browsing and managing your watch list.
- `server/` – Lightweight development server that will grow into the full API and database integration.

## Current Features
- 🔍 **Movie search powered by the OMDB API.** Quickly find movies and view their details through a streamlined search experience.
- ✅ **Session-based watchlist management.** Add movies to a watchlist that persists for the current session (cleared on refresh or new session).

## Roadmap & Upcoming Updates
- 🔄 **Database integration & persistence:** connect the backend to a hosted database so watchlists and preferences survive across sessions.
- 👤 **User accounts:** add authentication and profile creation to unlock personalized watchlists.
- 🛠️ **Backend API expansion:** expose endpoints for managing movies, tags, and user preferences.
- 📝 **Issue-driven refinements:** track smaller UX and styling improvements under the [Issues tab](https://github.com/abj32/movie-watchlist/issues).

Stay tuned for updates as the backend and database layers come online!
