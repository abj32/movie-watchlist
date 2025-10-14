export default function Home( { results, watchlist, setWatchlist }) {
  function handleAdd(movie) {
    setWatchlist((prev) => {
      // Prevent duplicates
      if (prev.some(m => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  }

  return (
    <div className="w-full">
      {results.length > 0 && (
        <ul className="flex flex-wrap gap-x-[2%] gap-y-4 sm:gap-y-5 md:gap-y-6 justify-center">
          {results.map((movie) => (
            // Movie Card
            <li key={movie.imdbID} className="flex flex-col w-[17%] bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Movie Poster */}
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x412?text=No+Image"}
                alt={movie.Title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x412?text=No+Image";
                }}
              />

              {/* Space Below Movie Image */}
              <div className="flex flex-grow flex-row">
                {/* Movie Details */}
                <div className="flex flex-col w-[75%] p-[4%] md:p-[3%]">
                  {/* Movie Title */}
                  <h3 className="pb-[2px] md:pb-[4px] xl:pb-[6px] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold">{movie.Title}</h3>
                  <div className="flex justify-start items-center gap-[5%] md:gap-[6%] lg:gap-[7%]">

                  {/* Movie Year */}
                  <span className="max-w-[31%] lg:max-w-[33px] xl:max-w-[38px] text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] text-gray-600">{movie.Year}</span>
                  {/* Entertainment Type */}
                  <span
                    className={`flex items-center justify-center w-[10px] sm:w-[14px] md:w-[18px] lg:w-[22px] xl:w-[26px] p-[1%] text-white text-[4px] sm:text-[5px] md:text-[6px] lg:text-[8px] xl:text-[10px] font-bold rounded ${
                      movie.Type === "movie" ? "bg-red-500" : "bg-teal-500"
                    }`}
                  >
                    {movie.Type === "movie" ? "M" : "S"}
                  </span>
                  {/* Age Rating */}
                  <span className="flex items-center p-[1%] px-[3%] text-[4px] sm:text-[5px] md:text-[6px] lg:text-[8px] xl:text-[10px] font-semibold text-gray-700 bg-gray-200 border border-gray-400 rounded">
                    {movie.Rated || "NR"}
                  </span>
                  </div>
                </div>

                {/* Watchlist Add Button */}
                <div className="flex w-[25%]">
                  {watchlist.some((m) => m.imdbID === movie.imdbID) ? (
                    // ✓ for movies/shows already in the watchlist
                    <span className="w-full h-full flex items-center justify-center text-[9px] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] text-white bg-indigo-600">✓</span>
                  ) : (
                    // + button for unadded movies/shows
                    <button
                      onClick={() => handleAdd(movie)}
                      className="w-full h-full text-[12px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[26px] text-white bg-indigo-600"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Default Home Screen (No Search) */}
      {results.length === 0 && (
        <h2 className="text-center text-gray-500 text-lg">Your recommended movies will appear here later!</h2>
      )}
    </div>
  );
}