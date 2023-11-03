import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AdminRoutes from "./components/layouts/AdminRoutes";
import UserRoutes from "./components/layouts/UserRoutes";
import { jwtDecode } from "jwt-decode";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  // Set up a state variable to track authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    try {
      // Check if there's a token in local storage when the component mounts
      const token = localStorage.getItem("authToken");
      if (token) {
        if (token === "undefined" || token === null) {
          // Handle the case when there's no token in local storage
        setIsLoggedIn(false);
        setIsAdmin(false);
        }
        else{
        // Set the user as logged in if a valid token is found
        setIsLoggedIn(true);

        // Decode a JWT
        const decoded = jwtDecode(token);

        // Check if the user is an admin
        setIsAdmin(decoded.isAdmin);
        }
      } else {
        // Handle the case when there's no token in local storage
        setIsLoggedIn(false);
        setIsAdmin(false);
      }

      // Update the loading state
      setIsLoading(false);
    } catch (error) {
      // Handle any errors that might occur during token decoding or storage access
      console.error("Error in useEffect:", error);
      setIsLoggedIn(false);
      setIsAdmin(false);
      setIsLoading(false);
    }
  }, []);

  // While loading, don't render any content
  if (isLoading) {
    return null;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="/"
              element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>}
            />
            {isLoggedIn ? (
              <Route path="login" element={<Navigate to="/" />} />
            ) : (
              <Route path="login" element={<Login onLogin={handleLogin} isAdmin={isAdmin}/>} />
            )}
            {isAdmin ? (
              <Route path="/*" element={<AdminRoutes isAdmin={isAdmin} />} />
            ) : (
              <Route path="/*" element={<UserRoutes />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
