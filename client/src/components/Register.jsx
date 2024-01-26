import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      await register(username, password);
    } catch (error) {
      setError("Oops - this username is already taken. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        <h1 className="mb-2 text-2xl text-center">Social Media App</h1>
        <span className="text-gray-300">Enter Registration Details</span>
      </div>
      <div className="mb-4 text-lg">
        <input
          className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4 text-lg">
        <input
          className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-8 flex justify-center text-lg text-black">
        <button
          onClick={handleRegister}
          className="rounded-3xl bg-yellow-100 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
