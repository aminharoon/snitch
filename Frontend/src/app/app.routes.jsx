import { createBrowserRouter } from "react-router";
import { Register, Login } from "../features/auth/pages/index"
import { CreateProduct, Dashboard, Home, SingleProductDet,SellerProductDetails } from "../features/products/Pages/index"
import { ProtectedComponent } from "../features/auth/components/index"
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
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
        path: "/seller",
        children: [
          {
            path: "create-products", // provide only the relative path -> child does't have "/"
            element: (
              <ProtectedComponent role="seller">
                <CreateProduct />
              </ProtectedComponent>
            )
          },
          {
            path: "dashboard",
            element: (
              <ProtectedComponent role="seller">
                <Dashboard />
              </ProtectedComponent>
            )
          },
          {
            path:"addVariants",
            element:(
              <ProtectedComponent role="seller" >
                <SellerProductDetails/>
              </ProtectedComponent>
            )
          }
        ]
      },
      {
        path: "/product/:id",
        element: <SingleProductDet />
      }
    ]
  }
]);
