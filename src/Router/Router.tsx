import Home from "@/Pages/Home/Home";
import { ProductDetailsPage } from "@/Pages/ProductDetailsPage/ProductsDetailsPage";
import ProductListPage from "@/Pages/ProductListPage/ProductListPage";
import Profile from "@/Pages/profile";
import InvesterProfile from "@/Pages/profile/InvesterProfile";
import ProjectAdd from "@/components/OffersCard/ProjectAdd";
import NotFound from "@/Pages/NotFound/notFound";
import { createBrowserRouter } from "react-router-dom";


const auth = localStorage.getItem("token")

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
    path: "/products/:productid",
    element: <ProductDetailsPage />,
  },
  {
    path: "/profile",
    element: auth ? <Profile /> : <NotFound />,
  },
  {
    path: "/investorProfile",
    element: auth ? <InvesterProfile /> : <NotFound />,
  },
  {
    path: "/ProjectAdd",
    element: <ProjectAdd />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

]);
