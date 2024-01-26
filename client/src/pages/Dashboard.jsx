import React from "react";
import PostFeed from "../components/PostFeed";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="w-screen md:flex">
      <Header />
      <main>
        <PostFeed />
      </main>
    </div>
  );
};

export default Dashboard;
