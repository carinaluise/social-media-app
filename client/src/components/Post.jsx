import React, { useState } from "react";
import { usePostData } from "../hooks/usePostData";

const Post = ({ post }) => {
  const { deletePost, updatePost } = usePostData();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleEdit = async () => {
    try {
      await updatePost(post._id, { description: editedDescription });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const createObjectURL = (blob) => {
    if (!blob) return "";
    return URL.createObjectURL(
      new Blob([Uint8Array.from(blob.data)], { type: "image/jpeg" })
    );
  };

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-lg my-8 relative">
      {post && (
        <div key={post._id}>
          <img
            className="w-1/2 mx-auto object-contain"
            src={createObjectURL(post.image)}
            alt="Post"
          />
          <button
            className="absolute top-0 right-0 m-2 p-2 rounded-full bg-gray-900 text-white"
            onClick={handleDelete}
          >
            X
          </button>
          <div className="px-6 py-4">
            {isEditing ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <h2 className="text-xl font-semibold">{post.description}</h2>
            )}
            <div className="flex justify-center mt-4">
              {isEditing ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleEdit}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Description
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
