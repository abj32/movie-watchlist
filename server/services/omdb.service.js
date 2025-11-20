const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Get list of movies/shows with title similar to given query
async function getMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  return res.json();
}

// Get details of given movie/show id
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}`);
  return res.json();
}

// Combined list and detailed search used by SearchBar
export async function combinedSearch(query) {
  // First OMDb API call to get list of relevant movies/shows
  const base = await getMovies(query);
  // Return no result on bad search
  if (base.Response !== "True" || !base.Search) return [];

  // Filter out duplicate movies/shows
  const seen = new Set();
  const unique = base.Search.filter(movie => {
    if (seen.has(movie.imdbID)) return false;
    seen.add(movie.imdbID);
    return true;
  });

  // Get final list of movies with their details
  const detailed = await Promise.all(unique.map(m => getMovieDetails(m.imdbID)));
  return detailed;
}