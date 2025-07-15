export default function Home( { results }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-10">
      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((item) => (
            <li key={item.id} className="bg-white p-4 shadow rounded">
              {item.title}
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
