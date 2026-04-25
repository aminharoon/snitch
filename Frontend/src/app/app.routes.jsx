import { createBrowserRouter } from "react-router";
import {Register,Login} from "../features/auth/pages/index"
import {CreateProduct, Dashboard} from "../features/products/Pages/index"
import {ProtectedComponent} from "../features/auth/components/index"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello world</h1>,
  },
  {
    path: "/login",
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
        element:<ProtectedComponent
        role="seller"
        >
             <CreateProduct />
          </ProtectedComponent>
      },
      {
        path:"dashboard",
        element:<ProtectedComponent
        role="seller"
        >
             <Dashboard />
          </ProtectedComponent>
      }
    ]
  }
  
]);
