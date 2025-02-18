import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser, "--------storeduser--------");
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Signup function
  const signup = async (userData) => {
    setLoading(true);
    setIsSigningUp(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userData
      );

      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return { success: true };
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "An unexpected error occurred.";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
      setIsSigningUp(false);
    }
  };

  // Login function
  const login = async (userData) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        userData
      );
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed.";
      setError(errorMsg);
      throw new Error(errorMsg); // Ensure error is thrown
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signup,
        login,
        logout,
        error,
        isSigningUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
