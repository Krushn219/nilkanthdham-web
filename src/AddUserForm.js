import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleAddUser = async () => {
    try {
      // Call your adduser API here
      await fetch("http://localhost:4001/api/employee/create", {
        method: "POST",
        // Add necessary headers and body
      });
      // After successful API call, navigate back to the main datatable
      navigate("/users"); // Change this route to the appropriate route for your datatable
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      {/* Your form UI and input fields for adding a new user */}
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUserForm;
