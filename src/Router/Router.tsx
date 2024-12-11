import Home from "@/Pages/Home/Home";
import { ProductDetailsPage } from "@/Pages/ProductDetailsPage/ProductsDetailsPage";
import ProductListPage from "@/Pages/ProductListPage/ProductListPage";
import Profile from "@/Pages/profile";
import InvesterProfile from "@/Pages/profile/InvesterProfile";
import { createBrowserRouter } from "react-router-dom";



export const router = createBrowserRouter([
  {
    path: "/",                
    element: <Home />,
    children: [],             
  },
  {
    path: "/products",        
    element: <ProductListPage />,
  },
  {

    path: "/product/:productName", 
    element: <ProductDetailsPage />,
  },
  {
    path: "/profile",         
    element: <Profile />,
  },
  {
    path: "/investorProfile", 
    element: <InvesterProfile />,
  },
]);
