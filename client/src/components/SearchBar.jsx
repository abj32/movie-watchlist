import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getMovieDetails } from "../services/omdb.js";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    
    // Do nothing on blank search
    if (query.trim() === "") return;

    setResults([]); // Clear results

    const results = await searchMovies(query);
    if (results.Response === "True" && results.Search) {
      console.log(results.Search)

      // Filter out duplicate movies and limit to 10
      const uniqueMovies = results.Search.filter((movie, index, self) => index === self.findIndex((m) => m.imdbID === movie.imdbID)).slice(0, 10);
      // Get movie details by imdbID
      const detailedMovies = await Promise.all(uniqueMovies.map((movie) => getMovieDetails(movie.imdbID)));

      setResults(detailedMovies)
      navigate("/");
    } else {
      setResults([]);
      console.error("Search failed:", results.Error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for Movie Title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 text-base sm:text-lg md:text-xl indent-1 sm:indent-2 md:indent-3 lg:indent-4 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </form>
  )
}