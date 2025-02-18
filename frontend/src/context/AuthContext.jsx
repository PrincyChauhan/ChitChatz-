import { createContext, useState } from "react";
import axios from "axios";

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
  // Use destructuring here
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup"
      );
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "signup failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "login failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <AuthProvider.Provider
      value={{ user, isAuthenticated, loading, signup, login }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
