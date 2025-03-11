import { Bell, Globe, Heart, Home, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "@/store/slice/products";
import { useAuthModalStore } from "@/store/authModalStore";
import { NavbarStep } from "../Navbar/NavbarStep";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/images/navLogo.png"
import CustomSelect from "../ui/navAdmin_select";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";



interface NavbarAdminProps {
  search: string;
  setSearch: (value: string) => void;
  isSidebarOpen?: boolean;
  handleToggleSidebar?: () => void;
}



export default function NavbarAdmin({ search, setSearch, isSidebarOpen, handleToggleSidebar }: NavbarAdminProps) {
  const { openModal } = useAuthModalStore();
  const { data, error } = useGetUsersQuery(undefined);
  const username = data?.username || null;
  const navigate = useNavigate();

  const initials = data?.username?.charAt(0).toUpperCase() || "";
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  const menuLocation = location.pathname === "/profile"
  const handelNavigateProfile = () => {
    if (data?.role === "investor") {
      navigate("/investorProfile");
    } else {
      navigate("/profile");
    }
  };

  const toast = useToast();
  const proccess = () => {
    toast.toast({
      description: 'Jarayonda',
      variant: 'warning',
      duration: 1000,
    });
  };




  return (
    <>
      <nav className="flex fixed z-30 w-full items-center justify-center px-4 py-[16px] bg-primary">

        <NavbarStep />
        <div className={`${menuLocation ? "block" : "hidden"}`} >
          <button
            className={`z-20 bg-white p-2 rounded-full shadow-md lg:hidden ${isSidebarOpen ? "translate-x-full" : "-translate-x-0"} `}
            onClick={handleToggleSidebar}
          >
            <HiMenu size={24} />
          </button>
        </div>
        <div className={`w-full  ${isProductsPage ? "justify-between h-[2.65rem]" : "justify-end h-[2.5rem]"}  flex items-center gap-10`}>
          {isProductsPage && (
            <div className="flex justify-between w-[66%] h-full">
              <Link to={'/'}>
                <img className="h-full object-contain" src={logo} alt="nav_logo" />
              </Link>
              <CustomSelect />
              <div className="flex justify-between items-center gap-x-3 bg-background w-[58%] h-full px-5 py-2 rounded-xl text-secondary">
                <input
                  className="bg-background w-[90%] border-black placeholder-gray-400 placeholder:text-[14px] placeholder:not-italic"
                  type="text"
                  value={search}
                  aria-label="Mahsulot izlash"
                  placeholder="Qidirish..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IoSearch size={22} />
              </div>
            </div>
          )}

          <div className={`${isProductsPage ? " w-[60%] lg:w-[30%]" : " w-[60%] lg:w-[37%]"} h-full flex flex-row items-center justify-between `}>
            <Link to={"/"} className="w-fit h-full mt-4 lg:mt-0 text-white flex flex-col items-center justify-between hover:text-secondary ease-out">
              <Home size={20} />
              <p className=" hidden lg:inline-block lg:text-[13px] leading-none">Bosh sahifa</p>
            </Link>

            <Link to={"#"} onClick={proccess} className="w-fit mt-4 lg:mt-0 h-full text-white flex flex-col items-center justify-between hover:text-secondary ease-out">
              <Bell size={20} />
              <p className="hidden lg:inline-block lg:text-[13px] leading-none">Yangiliklar</p>
            </Link>

            {!isProductsPage && (
              <Link to={"#"} onClick={proccess} className="w-fit mt-4 lg:mt-0 h-full text-white flex flex-col items-center justify-between hover:text-secondary ease-out">
                <Heart size={20} />
                <p className="hidden lg:inline-block lg:text-[13px] leading-none">Sevimlilar</p>
              </Link>
            )}

            <Link to={"#"} onClick={proccess} className="w-fit mt-4 lg:mt-0 h-full text-white flex flex-col items-center justify-between hover:text-secondary ease-out">
              <Globe size={20} />
              <p className="hidden lg:inline-block lg:text-[13px] leading-none">O'zbekcha</p>
            </Link>

            {error || !username ? (
              <Link to={""} onClick={() => openModal("login")} className="w-fit h-full text-white flex flex-col items-center justify-between hover:text-secondary ease-out">
                <UserRound size={20} />
                <p className="text-[13px] leading-none">Kirish</p>
              </Link>
            ) : (
              <button
                onClick={handelNavigateProfile}
                className="w-[42px] h-[95%] text-xl font-medium flex items-center  justify-center bg-[#B29C6F] text-white p-1 rounded-full"
              >
                {initials}
              </button>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}
