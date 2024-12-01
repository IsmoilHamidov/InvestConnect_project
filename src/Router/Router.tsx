import { ProductDetailsPage } from "@/Pages/ProductDetailsPage/ProductsDetailsPage";
import ProductListPage from "@/Pages/ProductListPage/ProductListPage";
import { Home } from "lucide-react";
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
]);
