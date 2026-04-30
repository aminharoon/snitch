import { createBrowserRouter } from "react-router";
import { Register, Login, Profile } from "../features/auth/pages/index";
import {
  CreateProduct,
  Dashboard,
  Home,
  SingleProductDet,
  UpdateSellerProduct,
} from "../features/products/Pages/index";
import { ProtectedComponent } from "../features/auth/components/index";
import Layout from "./Layout";
import Cart from "../features/cart/pages/Cart.jsx";

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
        element: (
          <ProtectedComponent redirectIfAuth={true}>
            <Login />
          </ProtectedComponent>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product/:id",
        element: <SingleProductDet />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedComponent>
            <Profile />
          </ProtectedComponent>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedComponent>
            <Cart />
          </ProtectedComponent>
        ),
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
            ),
          },
          {
            path: "dashboard",
            element: (
              <ProtectedComponent role="seller">
                <Dashboard />
              </ProtectedComponent>
            ),
          },
          {
            path: "product/:id",
            element: (
              <ProtectedComponent role="seller">
                <UpdateSellerProduct />
              </ProtectedComponent>
            ),
          },
        ],
      },
    ],
  },
]);
