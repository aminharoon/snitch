import React from "react";
import { Navbar } from "../components/index";
import { Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  console.log(hideNavbar);
  return (
    <>
      {!hideNavbar && (
        <Navbar
          user={user}
          isLoggedIn={!!user}
          userName={user?.fullName || user?.name || "User"}
        />
      )}
      <Outlet />
    </>
  );
};

export default Layout;
