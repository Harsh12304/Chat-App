import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirection

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleRegister = (e) => {
    e.preventDefault();

    // Implement your registration logic here
    // For example, check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // If registration is successful, navigate to the login page
    navigate("/login");
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
            <span className="text-3xl text-white">📝</span>
          </div>
        </div>

        {/* Form */}
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Register
          </button>
        </form>

        {/* Login Link using React Router Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already a user?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
