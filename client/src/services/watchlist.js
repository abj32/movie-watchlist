import { request } from "./api";

function normalizeMovie(movie) {
  // Build a Ratings array from raw strings
  const ratings = [];
  if (movie.imdbRaw) {
    ratings.push({
      Source: "Internet Movie Database",
      Value: movie.imdbRaw,
    });
  }
  if (movie.rtRaw) {
    ratings.push({
      Source: "Rotten Tomatoes",
      Value: movie.rtRaw,
    });
  }
  if (movie.mcRaw) {
    ratings.push({
      Source: "Metacritic",
      Value: movie.mcRaw,
    });
  }

  return {
    ...movie,
    imdbID: movie.imdbId,
    Ratings: ratings,
  };
}

export async function fetchWatchlist() {
  const movies = await request("/watchlist", { method: "GET" });
  return movies.map(normalizeMovie);
}

export async function addToWatchlist(imdbID) {
  const movie = await request("/watchlist", {
    method: "POST",
    body: JSON.stringify({ imdbId: imdbID }),
  });
  return normalizeMovie(movie);
}

export async function removeFromWatchlist(imdbID) {
  await request(`/watchlist/${encodeURIComponent(imdbID)}`, {
    method: "DELETE",
  });
}