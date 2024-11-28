import Home from "@/Pages/Home/Home";
import Product from "@/Pages/Product/Product";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: "products",
                element: <Product/>,
            }
        ]
    },
]);