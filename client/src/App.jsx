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
        <header className="bg-indigo-600 text-white flex flex-col items-center justify-center" style={{ height: '20vh' }}>
          <nav className="flex gap-6 mb-4">
            <NavLink to="/" onClick={handleHome} className="font-bold text-xl">🎬 Movie Watchlist</NavLink>
            <NavLink to="/watchlist" className="hover:underline text-xl">My Watchlist</NavLink>
          </nav>
          <div className="w-full max-w-xl px-4">
            <SearchBar setResults={setResults} />
          </div>
        </header>

        <main className="p-4 max-w-4xl mx-auto flex-grow">
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