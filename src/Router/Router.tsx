import Home from "@/Pages/Home/Home";
import Product from "@/Pages/Product/Product";
import { ProductDetailsPage } from "@/Pages/ProductDetailsPage/ProductsDetailsPage";
import ProductListPage from "@/Pages/ProductListPage/ProductListPage";
import Profile from "@/Pages/profile";
import InvesterProfile from "@/Pages/profile/InvesterProfile";
import { createBrowserRouter } from "react-router-dom";



export const router = createBrowserRouter([
  {
    path: "/",                // Home route
    element: <Home />,
    children: [],             // Ready for nesting child routes if needed
  },
  {
    path: "/products",        // Products list
    element: <ProductListPage />,
  },
  {
    path: "/product/:productName", // Dynamic route for product details
    element: <ProductDetailsPage />,
  },
  {
    path: "/profile",         // Profile page
    element: <Profile />,
  },
  {
    path: "/investorProfile", // Investor profile page
    element: <InvesterProfile />,
  },
]);
