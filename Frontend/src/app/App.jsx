import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { Toaster } from "react-hot-toast";
// import {} from "../features/auth/hooks/useAuth.js"
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const App = () => {
  const { handleGetMe } = useAuth();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
