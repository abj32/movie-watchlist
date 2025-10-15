export default function Watchlist({ watchlist }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-indigo-600 text-center">Your Watchlist</h2>

      {watchlist.length > 0 && (
        <ul className="mt-3">
          {watchlist.map((movie) => (
            <li key={movie.imdbID} className="group relative m-[1%] my-[2%] md:my-[1.5%] xl:my-[1%] bg-white rounded-lg shadow-md">
              {/* Top bar displays movie\show title, year, type, age rating, and genres */}
              <div className="flex items-center px-[1%] py-[.5%]">
                {/* Title */}
                <h3 className="m-[.5%] max-w-[45%] text-sm sm:text-base lg:text-lg font-medium">{movie.Title}</h3>
                {/* Year */}
                <p className="m-[.5%] ml-[1.5%] text-xs sm:text-sm lg:text-base text-gray-500">{movie.Year}</p>

                {/* Entertainment Type */}
                <span
                    className={`flex justify-center m-[.6%] md:m-[.5%] l:m-[.4%] xl:m-[.3%] ml-[3%] md:ml-[3%] xl:ml-[3%] p-[.2%] w-[14px] sm:w-[16px] md:w-[18px] lg:w-[22px] xl:w-[26px] text-white text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] font-bold rounded ${
                      movie.Type === "movie" ? "bg-red-500" : "bg-teal-500"
                    }`}
                  >
                    {movie.Type === "movie" ? "M" : "S"}
                </span>
                {/* Age Rating */}
                <span className="flex m-[.6%] md:m-[.5%] l:m-[.4%] xl:m-[.3%] p-[.2%] px-[.5%] text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] font-semibold text-gray-700 bg-gray-200 border border-gray-400 rounded">
                    {movie.Rated || "NR"}
                </span>
                {/* Genres */}
                <span className="flex m-[.6%] md:m-[.5%] l:m-[.4%] xl:m-[.3%] p-[.3%] px-[.6%] text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] xl:text-[9px] font-semibold text-gray-700 bg-gray-200 border border-gray-300 rounded">{movie.Genre}</span>
              </div>

              {/* Hover panel displays movie poster, plot, director, actors, and critic ratings */}
              <div className="relative hidden group-hover:flex items-start p-[1.5%] w-full bg-gray-100 after:content-[''] after:absolute after:inset-x-0 after:top-full after:h-3 sm:after:h-4 lg:after:h-5">
                {/* Movie Poster */}
                <img
                  className="w-[17%] rounded"
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x412?text=No+Image"}
                  alt={movie.Title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x412?text=No+Image";
                  }}
                />

                <div className="mx-[1.5%]">
                  {/* Movie Plot */}
                    <p className="text-xs sm:text-sm lg:text-base"><strong>Plot</strong></p>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-700">{movie.Plot}</p>
                  
                  <div className="mt-[1%] text-xs md:text-sm xl:text-base text-gray-700">
                    {/* Movie Director */}
                    <p><strong>Director:</strong> {movie.Director}</p>
                    {/* Actors/Actresses */}
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                  </div>

                  {/* Ratings */}
                  <p className="mt-[2%] text-xs md:text-sm xl:text-base"><strong>Ratings</strong></p>
                  <div className="flex text-xs md:text-sm xl:text-base text-gray-700">
                    {/* IMDB Score */}
                    <p><strong>IMDB:</strong> {movie.Ratings[0].Value}</p>
                    {/* Rotten Tomatoes Score */}
                    <p className="ml-[3%]"><strong>Rotten Tomatoes:</strong> {movie.Ratings[1].Value}</p>
                    {/* Metacritic Score */}
                    <p className="ml-[3%]"><strong>Metacritic:</strong> {movie.Ratings[2].Value}</p>
                  </div>
                </div>
              </div>
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