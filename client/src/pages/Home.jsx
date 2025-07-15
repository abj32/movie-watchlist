export default function Home( { results }) {
  return (
    <div className="w-full flex justify-center">
      {results.length > 0 && (
        <ul className="flex gap-6 w-full justify-center">
          {results.map((movie) => (
            <li key={movie.imdbID} className="w-[300px] bg-white rounded-lg shadow overflow-hidden flex-shrink-0">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x412?text=No+Image"}
                alt={movie.Title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x412?text=No+Image";
                }}
                className="w-full h-auto object-cover"
              />
              <div className="p-2">
                <h3 className="text-base font-semibold">{movie.Title}</h3>
                <p className="text-sm text-gray-600">{movie.Year}</p>
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
