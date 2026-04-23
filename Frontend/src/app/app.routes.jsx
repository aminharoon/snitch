import { createBrowserRouter } from "react-router";
import {Register,Login} from "../features/auth/pages/index"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
