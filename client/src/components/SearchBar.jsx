import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    
    if (query.trim() !== "") {
      setResults([
        { title: `You searched for "${query}"`, id: 1 },
        { title: "Example result", id: 2 },
      ]);

      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for Movie Title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 text-lg rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </form>
  )
}