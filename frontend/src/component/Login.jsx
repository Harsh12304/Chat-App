import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for programmatic navigation

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Implement your login logic here (for example, check username and password)
    // For this example, we'll assume login is always successful

    // If login is successful, navigate to the chat page
    navigate("/chat");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 relative">
        {/* Floating Background Circles */}
        <div className="absolute -top-10 -left-10 bg-gray-300 w-20 h-20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 bg-gray-300 w-32 h-32 rounded-full"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">👤</span>
          </div>
        </div>

        {/* Form */}
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Register Link using React Router Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not a user?{" "}
            <Link
              to="/register"  
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
