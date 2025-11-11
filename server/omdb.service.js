const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Search by title
async function searchByTitle(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  return res.json();
}

// Search by imdbID
async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}`);
  return res.json();
}

// Detailed search used by SearchBar 
export async function detailedSearch(query, { max = 10 } = {}) {
  // First OMDb API call to get list of relevant movies/shows
  const base = await searchByTitle(query);
  // Return no result on bad search
  if (base?.Response !== 'True' || !Array.isArray(base.Search)) return [];

  // Filter out duplicate movies/shows
  const seen = new Set();
  const unique = [];
  for (const m of base.Search) {
    if (!seen.has(m.imdbID)) {
      seen.add(m.imdbID);
      unique.push(m);
    }
  }

  // Get final list of movies with their details
  const detailed = await Promise.all(unique.map(m => getMovieDetails(m.imdbID)));
  return detailed;
}