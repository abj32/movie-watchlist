import { request } from "./api";

export function searchMovies(query) {
  return request(`/search?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
}