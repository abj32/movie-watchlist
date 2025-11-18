import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register({ onAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
        const user = await register(email, password);
        onAuth(user);
        navigate("/");
        } catch (err) {
        setError(err.message || "Registration failed");
        }
    }

    return (
    <div className="flex justify-center mt-20">
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-md">

        <h2 className="text-center text-xl font-semibold mb-4">Register</h2>

        {error && (
          <p className="text-center text-red-600 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-center mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-center mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}