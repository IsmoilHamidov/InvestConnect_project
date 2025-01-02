  import { Button } from "@/components/ui/button";
  import ivestIcon from "../../assets/images/invest-icon.png"
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
  import { useNavigate } from 'react-router-dom';

  import {
    Home,
    Briefcase, 
    Calendar,
    Users,
    HelpCircle,
    Building2,
    LogOut,
    Pencil,
  } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { useGetUserProfileQuery } from "@/store/slice/products";
import { Link } from "react-router-dom";
import { ProfileForm } from "../profileForms";
import { useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";




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
    
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };



    
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetUserProfileQuery(undefined);
    const handleSignOut = () => {
      localStorage.clear();
      setTimeout(() => {
          window.location.reload();
      }, 200);
      navigate('/');
  };


  
    return (
      <div className="flex fixed z-50 flex-col left-0 items-center w-[270px] min-h-screen border-r bg-white">
        <Link to={"/"} className="pt-4">
          <img
            src={ivestIcon}
            alt="Altro"
            className="h-8 pl-3"
          />
        </Link>
  
        <div className="flex flex-col items-center border-b p-6">
          
        
          <div className="flex items-center justify-center bg-[#B29C6F] text-white p-1
           w-[70px] h-[70px] rounded-full text-5xl font-normal mb-2 mt-3">
                    {data?.username?.charAt(0).toUpperCase() || ""}
                </div>
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

          <Button variant="ghost" size="icon" onClick={toggleModal}>
              <Pencil style={{ width: '17px', height: '17px' }} />
          </Button>

            {isModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div
                  className="bg-white rounded-xl p-6 w-[31%] h-[auto] relative"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={toggleModal} 
                  >
                    <HiX size={24} />
                  </button>
                  <ProfileForm />
                </div>
              </div>
            )}

          
            <Link to={'/products'}>
              <Button  variant="ghost" size="icon">
                  <Briefcase style={{ width: '17px', height: '17px' }} />
              </Button>
            </Link>

            <Button variant="ghost" size="icon">
                    <Dialog>
                        <DialogTrigger>
                            <LogOut style={{ width: '17px', height: '17px' }} className="hover:text-custom-blue-gray ease-in" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>You want to log out of the account?</DialogTitle>
                                <div className="flex justify-center gap-10 pt-5">
                                    <DialogTrigger>No</DialogTrigger>
                                    <Button onClick={handleSignOut}>Yes</Button>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
              </Button>
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

  
  export interface SidebarItemProps {
  icon: React.ReactNode; // Accepts any React element
  label: string;
  isActive?: boolean;
}
