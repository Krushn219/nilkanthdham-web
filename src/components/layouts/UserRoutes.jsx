import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import EmployeePresence from "../../pages/presence/Presence";

const UserRoutes = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={<Outlet />}>
        <Route path="users/presence" element={<EmployeePresence />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
