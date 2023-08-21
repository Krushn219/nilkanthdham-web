import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);

  const handleLogout = async () => {
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

        // Clear user-related data, if any
        localStorage.removeItem("userData");

        // Call the onLogout function passed as a prop
        // onLogout();

        // Reset the authentication state
        // setIsAuthenticated(false);
        navigate("/"); // Redirect to the login page
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
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img
              src="/logo.png" // Update with the correct relative URL to your logo image
              alt="Logo"
              className="logo-image"
            />
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <p className="title">PRESENCE</p>
          <Link to="/users/presence" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users Presence</span>
            </li>
          </Link>
          {/* <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
