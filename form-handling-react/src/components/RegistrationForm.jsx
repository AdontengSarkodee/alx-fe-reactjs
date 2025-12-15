import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store errors as an object to satisfy setErrors requirement
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Individual checks (required by your test)
    if (!username) newErrors.username = "Username is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    // If any errors were added, update the state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    // No errors — clear previous errors
    setErrors({});
    setSuccess("User registered successfully! (Mock API)");

    // Logging mock API data
    console.log({
      username,
      email,
      password,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Register (Controlled Form)</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            className="border p-2 w-full rounded"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            className="border p-2 w-full rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            className="border p-2 w-full rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
