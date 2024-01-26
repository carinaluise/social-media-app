import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import API_URL from "./config";

export const usePostData = () => {
  const [posts, setPosts] = useState([]);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Fetch posts failed:", error.message);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [setPosts, token]);

  const createPost = async ({ description, image }) => {
    try {
      if (token) {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("image", image);

        const response = await axios.post(
          `${API_URL}/api/v1/posts/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Post created successfully:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  };

  const updatePost = async (postId, { description, image }) => {
    try {
      if (token) {
        const response = await axios.put(
          `${API_URL}/api/v1/posts/${postId}`,
          {
            description,
            image,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? response.data.post : post
          )
        );
      }
    } catch (error) {
      console.error("Update post failed:", error.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      if (token) {
        await axios.delete(`${API_URL}/api/v1/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.error("Delete post failed:", error.message);
    }
  };

  return { posts, createPost, updatePost, deletePost };
};
