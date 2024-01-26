import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import API_URL from "./config";

export const useAuth = () => {
  const [token, setToken] = useLocalStorage("token");
  const [isAuthenticated, setIsAuthenticated] = useState(token);

  useEffect(() => {
    if (token) setIsAuthenticated(true);
    if (!token) setIsAuthenticated(false);
  }, [token, setToken, setIsAuthenticated]);

  const login = async (username, password) => {
    try {
      console.log(`${API_URL}/api/v1/auth/login}`);
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post(`${API_URL}/api/v1/auth/register`, {
        username,
        password,
      });
      await login(username, password);
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  return { isAuthenticated, register, login, logout };
};
