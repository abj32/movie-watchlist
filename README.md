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

   The backend is not yet implemented. At this stage, the project runs entirely on the client side, with all dependencies managed from the root. The `predev` hook automatically installs client dependencies when needed. Once the backend is introduced, this setup will be expanded to include server dependencies and evolve into a unified npm workspace for managing all packages seamlessly.

### Running the Development Server
This command uses `concurrently` to start both the frontend (Vite dev server) and the backend server.
From the project root run:
```bash
npm run dev
```

- `start-client` runs the Vite development server from the client/ directory
- `start-server` currently just echoes a placeholder message (`"No server yet — skipping"`).

 While the persistent database layer is still in progress you can work on the client app exclusively by starting it directly:
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
