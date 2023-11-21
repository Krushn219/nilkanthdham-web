// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/login/logout`,
        {
          method: "POST", // Use the appropriate HTTP method for your logout endpoint
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Logout was successful
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
        });
        // Clear the authentication token from local storage
        localStorage.removeItem("authToken");

        setIsLoggedIn(false);
      } else {
        console.log("data===", response);
        // Extract the error message from the response, if available
        const errorData = await response.json();
        const errorMessage =
          errorData && errorData.msg
            ? errorData.msg
            : "An error occurred while logging out. Please try again.";
        // Logout failed, handle the error
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "An error occurred while logging out. Please try again.",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Error",
        text: "An error occurred while logging out. Please try again later.",
      });
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
