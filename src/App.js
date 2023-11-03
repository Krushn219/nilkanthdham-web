import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
    // Check if there's a token in local storage when the component mounts
    const token = localStorage.getItem("authToken");
    if (token) {
      // Set the user as logged in if a valid token is found
      setIsLoggedIn(true);

      // Decode a JWT
      const decoded = jwtDecode(token);

      // Check if the user is an admin
      setIsAdmin(decoded.isAdmin);
    }
    // Update the loading state
    setIsLoading(false);
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
              element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
            />
            {isLoggedIn ? (
              <Route path="login" element={<Navigate to="/" />} />
            ) : (
              <Route path="login" element={<Login onLogin={handleLogin} />} />
            )}
            {isAdmin ? (
              <Route path="/*" element={<AdminRoutes isAdmin={isAdmin}/>} />
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
