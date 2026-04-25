import { createBrowserRouter } from "react-router";
import {Register,Login} from "../features/auth/pages/index"
import {CreateProduct, Dashboard} from "../features/products/Pages/index"

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
    path:"/seller",
    children:[
      {
        path:"create-products", // provide only the relative path -> child does't have "/"
        element:<CreateProduct />
      },
      {
        path:"dashboard",
        element:<Dashboard />
      }
    ]
  }
  
]);
