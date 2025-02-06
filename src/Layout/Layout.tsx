import ScrollRestoration from "@/components/Loading/ScrollPosition/ScrollRestoration";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default Layout;
