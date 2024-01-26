import React from "react";
import { useUserData } from "../hooks/useUserData";
import { useAuth } from "../hooks/useAuth";
import PostBuilder from "./PostBuilder";

const Header = () => {
  const { userData } = useUserData();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="md:w-1/3 bg-pink max-h-screen md:fixed p-4">
      <h1 className="text-4xl">Dashboard</h1>
      {userData && (
        <div className="md:flex items-center">
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p className="text-gray-800">{userData.username}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <PostBuilder />
    </header>
  );
};

export default Header;
