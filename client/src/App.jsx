import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import SearchBar from "./components/SearchBar";

import { getProfile, logout } from "./services/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Watchlist from './pages/Watchlist';


function AppShell() {
  const [results, setResults] = useState([]);   // stores results of search

  const [user, setUser] = useState(null);        // stores logged-in user (or null)
  const [checkingAuth, setCheckingAuth] = useState(true); // while we call /auth/profile on load
  const [menuOpen, setMenuOpen] = useState(false);        // dropdown state
  const [watchlist, setWatchlist] = useState([]);   // stores watchlist

  const navigate = useNavigate();
  
  // Clear search results (for when user clicks home button)
  function handleHome() {
    setResults([]);
  }

  // Check if user is logged in on first load via their cookie
  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();  // GET /api/auth/profile
        setUser(profile);
      } catch (err) {
        if (err.status !== 401) { // If error other than "user not logged in"
          console.error("Failed to load profile", err);
        }
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  async function handleLogout() {
    try {
      await logout(); // POST /api/auth/logout
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      setWatchlist([]);
      setMenuOpen(false);
      navigate("/");
    }
  }

  return (
      <div className="flex flex-col min-h-screen bg-gray-200">
        {/* Header area for logo, search bar, and watchlist (later user profile) */}
        <header className="flex flex-row items-center relative px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-10 text-white bg-indigo-600 ">
          {/* Logo sends user back to home page */}
          <NavLink to="/" onClick={handleHome} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide" style={{ fontFamily: "'Lilita_One', cursive, sans-serif" }}>
            🎥ReelSearch
          </NavLink>

          {/* Search Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1/3">
            <SearchBar setResults={setResults} />
          </div>

          {/* Watchlist button */}
          <div className="absolute translate-x-[115px] left-1/2 sm:translate-x-[140px] md:translate-x-[180px] lg:translate-x-[225px] xl:translate-x-[300px]">
            <NavLink to="/watchlist" className="text-xs md:text-sm lg:text-base xl:text-lg hover:underline">
              My Watchlist
            </NavLink>
          </div>
        </header>

        {/* Main area for displaying search results and user watchlist */}
        <main className="p-3 sm:p-4 md:p-5 lg:p-6">
          <Routes>
            <Route path="/" element={<Home results={results} watchlist={watchlist} setWatchlist={setWatchlist} />} />
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />} />
          </Routes>
        </main>
      </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}