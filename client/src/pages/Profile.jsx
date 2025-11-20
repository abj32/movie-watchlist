export default function Profile({ user }) {
  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600">
        You are not logged in.
      </p>
    );
  }

  return (
    <div className="mt-20 flex justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">User Profile</h2>

        <p className="text-md mb-3">
          <span className="font-semibold">User email:</span> {user.email}
        </p>

        <p className="text-md">
          <span className="font-semibold">Profile created at:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}