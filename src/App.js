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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (isAdmin) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
  };

  useEffect(() => {
    // Check if the user is logged in and determine their role
    const token = localStorage.getItem("token"); 

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.isAdmin); 
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []); 

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                isAdmin ? <Navigate to="/admin" /> : <Navigate to="/user" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} onLoginAdmin={() => setIsAdmin(true)} />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
