import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;

