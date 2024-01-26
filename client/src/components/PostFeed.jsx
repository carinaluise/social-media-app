import React from "react";
import Post from "./Post";
import { usePostData } from "../hooks/usePostData";

const PostFeed = () => {
  const { posts } = usePostData();

  return (
    <div className="bg-gray-100 min-h-screen md:absolute md:right-0 md:w-2/3">
      <header className="sticky p-4 top-0 bg-black z-50 flex items-center justify-center">
        <h2 className="text-4xl font-thin text-white font-semibold ">
          Global Feed
        </h2>
      </header>
      <div className="px-8">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
