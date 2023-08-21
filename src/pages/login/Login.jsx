import React, { useState } from "react";
import "./login.scss";
import loginImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  // Create state variables for the username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

      if (response.ok) {
        // Login was successful, navigate to the dashboard
        onLogin();
        navigate("/"); 
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
