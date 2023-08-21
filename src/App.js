import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./pages/edit/EditUserForm";
import EmployeePresence from "./pages/presence/Presence";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  // Set up a state variable to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  // Function to handle login
  const handleLogin = (token) => {
    // Set the JWT token in localStorage
    localStorage.setItem("authToken", token);
   
    // Set isAuthenticated to true
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("authToken");

    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

   // Function to check if the JWT token is valid on the server
   const checkTokenValidity = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/check-token-validity`,
        {
          method: "POST", // Use the appropriate HTTP method for token validation
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the JWT token in the request headers
          },
        }
      );

      if (response.ok) {
        // Token is valid, set isAuthenticated to true
        setIsAuthenticated(true);
      } else {
        // Token is invalid, set isAuthenticated to false
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Token validation error:", error);
      // Handle error, you may want to log the user out or show an error message
    }
  };

  useEffect(() => {
    // Call the function to check token validity when the component mounts
    checkTokenValidity();
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        {/* <Sidebar onLogout={handleLogout} isAuthenticated={isAuthenticated} /> */}
        <Routes>
          <Route path="/">
            {/* Default route is the Login page */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* If logged in, prevent access to the login page */}
            {isAuthenticated ? (
              <Route path="login" element={<Navigate to="/" />} />
            ) : (
              <Route path="login" element={<Login onLogin={handleLogin} />} />
            )}
            {/* Protected routes */}
            {isAuthenticated ? (
              <>
                <Route index element={<Home />} />
                <Route path="users" element={<List />} />
                <Route path="users/:userId" element={<Single />} />
                <Route path="users/edit/:userId" element={<EditUserForm />} />
                <Route
                  path="users/new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
                <Route path="users/presence" element={<EmployeePresence />} />
                {/* <Route path="sidebar" element={<Sidebar onLogout={handleLogout} />} /> */}
                <Route path="logout" element={<Navigate to="/login" />} />
                
              </>
            ) : (
              // Redirect to login if not authenticated
              <Route path="*" element={<Navigate to="/login" />} />
            )}
            <Route path="presence">
              <Route index element={<List />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
