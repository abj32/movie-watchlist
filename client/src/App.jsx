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
      <div className="min-h-screen bg-indigo-100 flex flex-col">
        <header className="relative bg-indigo-600 text-white px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-10 flex flex-row items-center">
          <NavLink to="/" onClick={handleHome} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide" style={{ fontFamily: "'Lilita_One', cursive, sans-serif" }}>
            🎥ReelSearch
          </NavLink>

          <div className="absolute left-1/2 -translate-x-1/2 w-1/3">
            <SearchBar setResults={setResults} />
          </div>

          <div className="absolute translate-x-[115px] left-1/2 sm:translate-x-[140px] md:translate-x-[180px] lg:translate-x-[225px] xl:translate-x-[300px]">
            <NavLink to="/watchlist" className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg hover:underline">
              My Watchlist
            </NavLink>
          </div>
        </header>

        <main className="p-3 sm:p-4 md:p-5 lg:p-6">
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