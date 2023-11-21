import React, { useEffect, useState } from "react";
import "./login.scss";
import loginImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";


const Login = ({ onLogin, onLoginAdmin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
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

      if (response.ok) {
        localStorage.setItem("authToken", resData.token);
        const decoded = jwtDecode(resData.token);

        // Call the onLogin function passed as a prop to update the login state in the parent component
        onLogin(decoded.isAdmin);

        if (decoded.isAdmin) {
          onLoginAdmin();
          navigate("/admin"); // Redirect to the admin dashboard
        } else {
          navigate("/user/presence");
        }
      } else {
        setError(response.statusText);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.statusText,
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

