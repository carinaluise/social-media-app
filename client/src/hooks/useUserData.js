import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import API_URL from "./config";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Fetch user data failed:", error.message);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token, setUserData]);

  return { userData };
};
