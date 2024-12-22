import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import {
    Mail,
    Home,
    Briefcase, 
    Calendar,
    Activity,
    Users,
    HelpCircle,
    Building2,
    CircleUserRound,
    UserRound,
  } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { SidebarItemProps } from "@/interface";
  import UserImg from "@/assets/images/user-img.svg"; // Ensure path correctness
  import { useGetUserProfileQuery } from "@/store/slice/products";
import { Link } from "react-router-dom";
  
  function SidebarItem({ icon, label, isActive }: SidebarItemProps) {
    return (
      <Button
        variant="ghost"
        className={cn("w-full justify-start gap-2", isActive && "bg-accent")}
      >
        {icon}
        <span>{label}</span>
      </Button>
    );
  }
  
  export default function Sidebar() {
    const { data, error, isLoading } = useGetUserProfileQuery();
  
    return (
      <div className="flex fixed z-50 flex-col left-0 items-center w-[270px] min-h-screen border-r bg-white">
        <Link to={"/"} className="pt-4">
          <img
            src="/src/assets/images/invest-icon.png" // Update this path if needed
            alt="Altro"
            className="h-8 pl-3"
          />
        </Link>
  
        <div className="flex flex-col items-center border-b p-6">
          
          <UserRound size={'40'} className="text-custom-gray mt-2" />
          
          <div className="text-center mt-2">
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                <h2 className="font-semibold text-base text-custom-gray">
                  {data?.firstname || "Unknown"} {data?.lastname || "User"}
                </h2>
                <p className="text-base text-[#749BA9]">
                  {data?.role || "Unknown Role"}
                </p>
              </>
            ) : null}
          </div>
          <div className="flex gap-2 mt-4 mb-8">
            <Button variant="ghost" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
            </Button>
            <Link to={'/products'}>
              <Button variant="ghost" size="icon">
                <Briefcase className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
  
        <div className="flex-1 space-y-2 p-2">
          <Link to={'/'}>
            <SidebarItem 
              icon={<Home className="h-4 w-4" />}
              label="Home"
            />
          </Link>

          <Link to={'/products'}>
            <SidebarItem 
              icon={<Briefcase  className="h-4 w-4" />}
              label="Projects"
            />
          </Link>
          <SidebarItem
            icon={<Building2 className="h-4 w-4" />}
            label="Aanbod"
            isActive
          />
          <SidebarItem
            icon={<Calendar className="h-4 w-4" />}
            label="Kalender"
          />
          <SidebarItem
            icon={<Users className="h-4 w-4" />}
            label="Community"
          />
          <SidebarItem
            icon={<Users className="h-4 w-4" />} // Update icon if incorrect
            label="Mijncontacten"
          />
        </div>
  
        <div className="mt-auto border-t p-2">
          <SidebarItem
            icon={<HelpCircle className="h-4 w-4" />}
            label="Altro Support"
          />
        </div>
      </div>
    );
  }
  