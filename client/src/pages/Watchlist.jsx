export default function Watchlist({ watchlist }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-indigo-600 text-center">Your Watchlist</h2>

      {watchlist.length > 0 && (
        <ul className="mt-3">
          {watchlist.map((movie) => (
            <li key={movie.imdbID} className="m-[1%] p-[1%] flex items-center bg-white rounded-lg shadow-md">
              {/* Display Movie name, year, type, age rating, genre, decription, and ratings */}
              <h3 className="p-1 text-sm sm:text-base lg:text-lg font-medium align-middle">{movie.Title}</h3>
              <p className="pl-2 text-xs sm:text-sm lg:text-base text-gray-500">{movie.Year}</p>
            </li>
          ))}
        </ul>
      )}

      {watchlist.length === 0 && (
        <p className="mt-2 text-center text-gray-600">Saved movies will appear here.</p>
      )}
    </div>
  );
}