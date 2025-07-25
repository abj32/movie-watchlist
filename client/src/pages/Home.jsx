export default function Home( { results, watchlist, setWatchlist }) {
  function handleAdd(movie) {
    setWatchlist((prev) => {
      // Prevent duplicates
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  }

  return (
    <div className="w-full">
      {results.length > 0 && (
        <ul className="flex flex-wrap gap-x-[2%] gap-y-4 sm:gap-y-5 md:gap-y-6 justify-center">
          {results.map((movie) => (
            <li key={movie.imdbID} className="flex flex-col w-[17%] bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Movie Poster */}
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x412?text=No+Image"}
                alt={movie.Title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x412?text=No+Image";
                }}
                className="w-full"
              />

              {/* Below Movie Image */}
              <div className="flex flex-grow flex-row">
                {/* Movie Details */}
                <div className="flex flex-col w-[75%] p-[3%] lg:p-[2%]">
                  <h3 className="pb-px md:pb-[2px] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold">{movie.Title}</h3>
                  <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] text-gray-600">{movie.Year}</p>
                </div>

                {/* Watchlist Add Button */}
                <div className="flex w-[25%] items-center justify-center">
                  {watchlist.some((m) => m.imdbID === movie.imdbID) ? (
                    <span className="w-full h-full flex items-center justify-center text-[9px] sm:text-[12px] md:text-[15px] lg:text-[19px] xl:text-[23px] text-white bg-indigo-600">✓</span>
                  ) : (
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