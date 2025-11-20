import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/search";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    
    if (query.trim() === "") return;  // Do nothing on blank search

    setResults([]); // Clear results

    try {
      const movies = await searchMovies(query);
      setResults(movies);
      navigate("/");
    } catch (err) {
      console.error("Search failed", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for Movie Title..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="p-3 w-full text-base sm:text-lg md:text-xl indent-1 sm:indent-2 md:indent-3 lg:indent-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </form>
  )
}