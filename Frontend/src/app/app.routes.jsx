import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>this is Home</h1>,
  },
  {
    path: "/about",
    element: <h1>this is About </h1>,
  },
]);
