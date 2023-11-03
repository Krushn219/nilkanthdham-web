import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import List from "../../pages/list/List";
import Single from "../../pages/single/Single";
import EditUserForm from "../../pages/edit/EditUserForm";
import { userInputs } from "../../formSource";
import EmployeePresence from "../../pages/presence/Presence";
import AdminEmployeePresence from "../../pages/presence/AdminPresence";
import Sidebar from "../sidebar/Sidebar";
import New from "../../pages/new/New";



const AdminRoutes = ({isAdmin}) => {
  // console.log("isAdmin++++++", isAdmin)
  isAdmin = "true"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("token");

    setIsLoggedIn(false);

   
  };
  return (
    
      <Routes path='/' element={<Outlet/>}>
        <Route index element={isAdmin ? <Home /> : <EmployeePresence />} />
        <Route path="admin" element={isAdmin ? <List /> : <EmployeePresence />} />
        <Route path="admin/:userId" element={isAdmin ? <Single /> : <EmployeePresence />} />
        <Route path="admin/edit/:userId" element={isAdmin ? <EditUserForm /> : <EmployeePresence />} />
        <Route
          path="admin/new"
          element={isAdmin ? <New inputs={userInputs} title="Add New User" />: <EmployeePresence />}
        />
        <Route path="admin/presence" element={isAdmin ? <AdminEmployeePresence /> : <EmployeePresence />} />
        {/* <Route path="users/presence" element={<EmployeePresence />} /> */}
        <Route path="sidebar" element={isAdmin ? <Sidebar onLogout={handleLogout} /> : <EmployeePresence />} />
        
      </Routes>
  );
};

export default AdminRoutes;
