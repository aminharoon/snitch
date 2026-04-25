import { createBrowserRouter } from "react-router";
import {Register,Login} from "../features/auth/pages/index"
import {CreateProduct} from "../features/products/Pages/index"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/dashboard",
    element:<h1>Well come </h1>
  },
  {
    path:"/seller/create-products",
    element:<CreateProduct />
  }
  
]);
