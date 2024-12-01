import Home from "@/Pages/Home/Home";
import Product from "@/Pages/Product/Product";
import Profile from "@/Pages/profile";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home />,
  },
  {
    path: "/profile", 
    element: <Profile />, 
  },
  {
    path: "/product", 
    element: <Product />, 
  },
]);
