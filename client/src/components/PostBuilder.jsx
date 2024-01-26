import React, { useState } from "react";
import { useUserData } from "../hooks/useUserData";
import { usePostData } from "../hooks/usePostData";

const PostBuilder = () => {
  const { userData } = useUserData();
  const { createPost } = usePostData(userData);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleToggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setErrorMessage("");
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description || !image) {
      setErrorMessage("Please provide both an image and a description.");
      return;
    }

    setIsPosting(true);

    try {
      const id = userData._id;
      await createPost({ description, image, id });

      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error.message);
    } finally {
      setIsPosting(false);
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative my-4">
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleToggleExpansion}
      >
        {isExpanded ? "x" : "Create Post"}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "h-auto opacity-100" : "h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="bg-gray-200 p-4 rounded mt-8">
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="p-2 mt-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <br />
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-2"
              />
            </div>
            <button
              type="submit"
              className={`bg-black text-white px-4 py-2 rounded mt-2 mr-2 ${
                isPosting || !description || !image
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isPosting || !description || !image}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostBuilder;
