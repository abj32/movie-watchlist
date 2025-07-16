import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import SearchBar from "./components/SearchBar";

function App() {
  const [results, setResults] = useState([]);

  function handleHome() {
    setResults([]);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-indigo-50 flex flex-col">
        <header className="relative h-[15vh] bg-indigo-600 text-white p-3 flex flex-row items-center">
          <NavLink to="/" onClick={handleHome} className="text-5xl font-bold tracking-wide" style={{ fontFamily: "'Lilita_One', cursive, sans-serif" }}>
            🎥ReelSearch
          </NavLink>

          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[600px]">
            <SearchBar setResults={setResults} />
          </div>

          <div className="absolute left-1/2 transform translate-x-[320px]">
            <NavLink to="/watchlist" className="hover:underline text-xl">
              My Watchlist
            </NavLink>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home results={results} />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App