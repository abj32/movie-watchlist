export default function Home( { results }) {
  return (
    <div className="w-full">
      {results.length > 0 && (
        <ul className="flex flex-wrap gap-x-[1.25%] gap-y-2 sm:gap-y-3 md:gap-y-4 w-full justify-center">
          {results.map((movie) => (
            <li key={movie.imdbID} className="w-[19%] bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x412?text=No+Image"}
                alt={movie.Title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x412?text=No+Image";
                }}
                className="w-full"
              />
              <div className="p-[2%]">
                <h3 className="w-[72%] pb-[2px] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold">{movie.Title}</h3>
                <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] text-gray-600">{movie.Year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && (
        <h2 className="text-center text-gray-500 text-lg">Your recommended movies will appear here later!</h2>
      )}
    </div>
  );
}
