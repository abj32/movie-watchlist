import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getMovieDetails } from "../services/omdb.js";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    
    if (query.trim() === "") return;  // Do nothing on blank search

    setResults([]); // Clear results

    // First OMDb API call to get list of relevant movies/shows
    const results = await searchMovies(query);
    if (results.Response && results.Search) {
      console.log("Raw result: " + JSON.stringify(results.Search) + "\n\n\n")

      // Filter out duplicate movies/shows and limit to 10
      const uniqueMovies = results.Search.filter((movie, index, self) => index === self.findIndex((m) => m.imdbID === movie.imdbID));
      console.log("Unique filter result: " + JSON.stringify(uniqueMovies) + "\n\n\n")

      // Check if filter did anything
      console.log((JSON.stringify(results.Search) == JSON.stringify(uniqueMovies)) + "\n\n\n")

      // Get movie/show details by using second OMDb API call and seaching by imdbID
      const detailedMovies = await Promise.all(uniqueMovies.map((movie) => getMovieDetails(movie.imdbID)));
      console.log("Detailed movie result: " + JSON.stringify(detailedMovies) + "\n")

      // Set the final array of detailed movies/shows and navigates back to the home screen to display results
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
        onChange={e => setQuery(e.target.value)}
        className="w-full p-3 text-base sm:text-lg md:text-xl indent-1 sm:indent-2 md:indent-3 lg:indent-4 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </form>
  )
}