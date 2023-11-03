import React, { useEffect, useState } from "react";
import "./login.scss";
import loginImage from "../../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLogin, isLoggedIn, isAuthenticated }) => {
  const navigate = useNavigate();

  // Create state variables for the username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if there's a token in local storage when the component mounts
    const token = localStorage.getItem("authToken");
    if (token) {
      // Decode a JWT
      const decoded = jwtDecode(token);
      // console.log(decoded, isAdmin);

      // Check if the user is an admin
      setIsAdmin(decoded.isAdmin);
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object to send in the request body
    const data = {
      email,
      password,
    };

    try {
      // Send a POST request to your backend login endpoint
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await response.json();
      console.log("responseresponse", resData);
      if (response.ok) {
        // Login was successful, call the onLogin function to update the parent component's state
        onLogin();

        // Set the JWT token in localStorage
        localStorage.setItem("authToken", resData.token);

        if (isAdmin) {
          // console.log("isAdmin*****",isAdmin)
          navigate("/admin");
        } else {
          navigate("/users/presence");
        }
      } else {
        // Login failed, handle the error
        setError("Invalid credentials. Please try again.");

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again later.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <img src={loginImage} alt="Login" className="login-image" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
