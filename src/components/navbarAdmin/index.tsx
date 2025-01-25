import { Bell, Home, Mail, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


const linkTranslate: Record<string, string> = {
  products: "Loyihalar",
  product: "Loyiha",
};

export default function NavbarAdmin() {
  const { openModal } = useAuthModalStore();
  const { data, error } = useGetUsersQuery(undefined);
  const username = data?.username || null;
  const navigate = useNavigate();

  const pathname = location.pathname.split("/")[1]

  const initials = data?.username?.charAt(0).toUpperCase() || "";

  const handelNavigateProfile = () => {
    if (data?.role === "investor") {
      navigate("/investorProfile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="flex fixed z-50 w-full items-center justify-between px-4 py-2 bg-primary">
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
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Bosha sahifa</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${pathname}`}>
                {linkTranslate[pathname] || pathname}
              </BreadcrumbLink>
            </BreadcrumbItem>
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
