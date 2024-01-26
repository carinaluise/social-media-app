import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Register from "./Register"; // Import your Register component

const Login = () => {
  const [showRegister, setShowRegister] = useState(false); // State to toggle between login and register forms
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold login error messages
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError("Login failed. Please check your username and password.");
    }
  };

  // If user is already authenticated, redirect to /dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleToggleForm = () => {
    setShowRegister(!showRegister); // Toggle between login and register forms
  };

  return (
    <div className="flex flex-column flex-wrap w-1/4 h-2/3  bg-gray-900 bg-cover bg-no-repeat rounded-lg">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          {showRegister ? (
            <Register /> // Display Register component if showRegister is true
          ) : (
            <>
              <div className="mb-8 flex flex-col items-center">
                <h1 className="mb-2 text-2xl">Social Media App</h1>
                <span className="text-gray-300">Enter Login Details</span>
              </div>
              <form>
                <div className="mb-4 text-lg">
                  <input
                    className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4 text-lg">
                  <input
                    className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* Display error message if there's an error */}
                <div className="mt-8 flex justify-center text-lg text-black">
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                  >
                    Login
                  </button>
                </div>
              </form>
            </>
          )}
          <div className="mt-4 flex justify-center text-lg text-black">
            <button
              onClick={handleToggleForm}
              className="text-white hover:underline focus:outline-none"
            >
              {showRegister ? "Back to Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
