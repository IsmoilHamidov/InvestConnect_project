import { Bell, Home, Mail, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "@/store/slice/products";
import { useAuthModalStore } from "@/store/authModalStore";
import { NavbarStep } from "../Navbar/NavbarStep";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMemo } from "react";
import React from "react";


const linkTranslate: Record<string, string> = {
  products: "Loyihalar",
  product: "Loyiha",
  ProjectAdd: "Loyiha Qo'shish",
};

export default function NavbarAdmin() {
  const { openModal } = useAuthModalStore();
  const { data, error } = useGetUsersQuery(undefined);
  const username = data?.username || null;
  const navigate = useNavigate();


  const initials = data?.username?.charAt(0).toUpperCase() || "";

  const handelNavigateProfile = () => {
    if (data?.role === "investor") {
      navigate("/investorProfile");
    } else {
      navigate("/profile");
    }
  };

  const location = useLocation();
  const { pathname } = location;

  const pathSegments = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments;
  }, [pathname]);

  return (
    <nav className="flex fixed z-50 w-full items-center justify-between px-4 py-[9px] bg-primary">
      <NavbarStep />
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-white/10"
        >
          <Menu className="h-5 w-5 text-foreground" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink className="font-medium" href="/">
                Bosh sahifa
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;
            const isId = /^\d+$/.test(segment);
            const isRepeated = segment === pathSegments[index - 1];

            return (
                  <React.Fragment key={segment}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast || isRepeated ? (
                          <BreadcrumbPage>
                            {isId ? "Loyiha" : linkTranslate[segment] || segment}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {linkTranslate[segment] || segment}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}   
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <Link to={"/"}>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 text-white"
            aria-label="Messages"
          >
            <Home className="h-5 w-5 " />
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 text-white"
          aria-label="Messages"
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=info@invest-connect.be"
            target="_blank"
          >
            <Mail className="h-5 w-5 " />
          </a>
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            2
          </Badge>
        </div>

        {error || !username ? (
          <button
            className="flex justify-center items-center gap-x-4  
              border-2 text-white py-1 px-4 mx-3 rounded-lg  
              font-medium text-md hover:bg-[#749BA9] "
            onClick={() => openModal("login")}
          >
            Kirish
            <FiLogIn size={17} />
          </button>
        ) : (
          <button
            onClick={handelNavigateProfile}
            className="flex items-center ms-4 me-3 justify-center bg-[#B29C6F] text-white p-1 w-[35px] h-[33px] rounded-full text-lg font-medium"
          >
            {initials}
          </button>
        )}
      </div>
    </nav>
  );
}
