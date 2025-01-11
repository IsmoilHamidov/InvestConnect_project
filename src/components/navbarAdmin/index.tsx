import { Bell, Mail, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "@/store/slice/products";
import { useAuthModalStore } from "@/store/authModalStore";

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

  return (
    <nav className="flex fixed z-50 w-full items-center justify-between px-4 py-2 bg-[#7497a7] text-white">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10"
          aria-label="Messages"
        >
          <Mail className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10"
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
              className="Brown_button bg-[#749BA9] text-white p-2 px-5 mx-5 rounded-2xl font-normal text-md"
              onClick={() => openModal("registration")}
            >
              Kirish
            </button>
          ) : (
            <button
              onClick={handelNavigateProfile}
              className="flex items-center justify-center bg-[#B29C6F] text-white p-1 w-[35px] h-[33px] rounded-full text-lg font-medium"
            >
              {initials}
            </button>
          )}
        
      </div>
    </nav>
  );
}
