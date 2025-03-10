import { Button } from "@/components/ui/button";
import ivestIcon from "../../assets/images/invest-icon.png";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { HiX } from "react-icons/hi";
import {
  Home,
  Briefcase,
  Calendar,
  Users,
  HelpCircle,
  UserPen,
  LogOut,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/store/slice/products";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProfileForm from "../profileForms";
import { useToast } from "@/hooks/use-toast";


export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}
export interface SidebarProps {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
 
}

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

export default function Sidebar({ isSidebarOpen, handleToggleSidebar }: SidebarProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserProfileQuery(undefined);

  const handleSignOut = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
    navigate("/");
  };

  const proccess = () => {
    toast.toast({
      description: "Jarayonda",
      variant: "warning",
      duration: 1000,
    });
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };




  return (
    <>
    

      <div
        className={cn(
          "fixed inset-y-0 hidden left-0 z-40 w-[270px] bg-white border-r p-4 transition-transform transform",
          isSidebarOpen ? "translate-x-0 block" : "-translate-x-full",
          "lg:translate-x-0 lg:relative lg:w-[270px] lg:flex  lg:flex-col"
        )}
      >
        <div className=" relative">
          <div className="flex items-center justify-center">
            <Link to={"/"}>
              <img src={ivestIcon} alt="Logo" className="h-8" />
            </Link>
          </div>
          <div>
                
            <button className=" absolute top-2 right-2 lg:hidden" onClick={handleToggleSidebar}>
              <HiX size={24} />
            </button>
          </div>
        </div> 

        <div className="flex flex-col items-center border-b p-6">
          <div className="w-[60px] h-[60px] bg-[#B29C6F] text-white rounded-full flex items-center justify-center text-4xl font-normal mb-2">
            {data?.profile_image ? (
              <img
                src={data.profile_image}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              data?.username?.charAt(0).toUpperCase() || ""
            )}
          </div>

          <div className="text-center mt-2">
            {error ? (
              <>Yo'q, xatolik yuz berdi</>
            ) : isLoading ? (
              <>
                <Skeleton variant="text" width="120px" height={20} />
                <Skeleton variant="text" width="120px" height={20} />
              </>
            ) : data ? (
              <>
                <h2 className="font-semibold text-base text-secondary">
                  {data?.firstname || "Noma'lum"} {data?.lastname || "shaxs"}
                </h2>
                <p className="text-[14px] leading-7 text-[#749BA9]">
                  {data?.role === "startup"
                    ? "Loyiha asoschisi"
                    : data?.role === "investor"
                      ? "Sarmoya kirituvchi"
                      : "Noma'lum rol"}
                </p>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3 mb-3 ">
          <Button variant="ghost" size="icon" onClick={toggleModal}>
            <Pencil style={{ width: "17px", height: "17px" }} />
          </Button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                <ProfileForm closeModal={toggleModal} />
              </div>
            </div>
          )}



          <Button variant="ghost" size="icon">
            <Dialog>
              <DialogTrigger>
                <LogOut
                  style={{ width: "17px", height: "17px" }}
                  className="hover:text-primary ease-in"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hisobdan chiqmoqchimisiz?</DialogTitle>
                  <div className="flex justify-center items-center gap-10">
                    <DialogTrigger>
                      <button className="text-lg font-semibold">Yo'q</button>
                    </DialogTrigger>
                    <Button
                      className="rounded-2xl text-lg font-normal px-6 py-3 "
                      onClick={handleSignOut}
                    >
                      Ha
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Button>
        </div>
        <div className="flex-1 space-y-2 p-2">
          <Link to={"/"}>
            <SidebarItem
              icon={<Home className="h-4 w-4" />}
              label="Bosh sahifa"
            />
          </Link>

          <Link to={"/products"}>
            <SidebarItem
              icon={<Briefcase className="h-4 w-4" />}
              label="Loyihalar"
            />
          </Link>
          <SidebarItem
            icon={<UserPen className="h-4 w-4" />}
            label="Shaxsiy sarlavha"

          />

          <button onClick={proccess} className="w-full">
            <SidebarItem

              icon={<Calendar className="h-4 w-4" />}
              label="Kalendar" />
          </button>
          <button onClick={proccess} className="w-full">
            <SidebarItem icon={<Users className="h-4 w-4" />} label="Jamiyat" />
          </button>

          <button onClick={proccess} className="w-full">
            <SidebarItem
              icon={<Users className="h-4 w-4" />}
              label="Mening kontaktlarim"
            />
          </button>

        </div>

        <div className="mt-auto border-t p-2">
          <SidebarItem
            icon={<HelpCircle className="h-4 w-4" />}
            label="Boshqa yordamlar"
          />
        </div>
      </div>

      {
        isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={handleToggleSidebar}
          ></div>
        )
      }
    </>
  );
}




// import { Button } from "@/components/ui/button";
// import ivestIcon from "../../assets/images/invest-icon.png";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { useNavigate } from "react-router-dom";
// import { Skeleton } from '@mui/material';

// import {
//   Home,
//   Briefcase,
//   Calendar,
//   Users,
//   HelpCircle,
//   UserPen,
//   LogOut,
//   Pencil,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useGetUserProfileQuery } from "@/store/slice/products";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { HiX } from "react-icons/hi";
// import ProfileForm from "../profileForms";
// import { useToast } from "@/hooks/use-toast";

// function SidebarItem({ icon, label, isActive }: SidebarItemProps) {
//   return (
//     <Button
//       variant="ghost"
//       className={cn("w-full justify-start gap-2", isActive && "bg-accent")}
//     >
//       {icon}
//       <span>{label}</span>
//     </Button>
//   );
// }

// export default function Sidebar() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const toast = useToast()

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const navigate = useNavigate();
//   const { data, error, isLoading } = useGetUserProfileQuery(undefined);
//   const handleSignOut = () => {
//     localStorage.clear();
//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//     navigate("/");
//   };

//   const proccess = () => {
//     toast.toast({
//       description: 'Jarayonda',
//       variant: "warning",
//       duration: 1000
//     });
//   };

//   return (
//     <div className="flex fixed z-50 flex-col left-0 items-center w-[270px] min-h-screen border-r bg-white">
//       <Link to={"/"} className="pt-4">
//         <img src={ivestIcon} alt="Altro" className="h-8 pl-3" />
//       </Link>

//       <div className="flex flex-col items-center border-b p-6">
//         <div
//           className="flex items-center justify-center bg-[#B29C6F] text-white  
//             w-[60px] h-[60px] rounded-full text-4xl font-normal mb-2 mt-3"
//         >
//           {data?.profile_image ? (
//             <img
//               src={data.profile_image}
//               alt="Profile"
//               className="w-full h-full object-cover rounded-full"
//             />
//           ) : (
//             data?.username?.charAt(0).toUpperCase() || ""
//           )}
//         </div>

//         <div className="text-center mt-2">
//           {error ? (
//             <>Yo'q, xatolik yuz berdi</>
//           ) : isLoading ? (
//             <>
//                 <Skeleton variant="text" width="120px" height={20} />
//                 <Skeleton variant="text" width="120px" height={20} />
//             </>
//           ) : data ? (
//             <>
//               <h2 className="font-semibold text-base text-secondary">
//                 {data?.firstname || "Noma'lum"} {data?.lastname || "shaxs"}
//               </h2>
//               <p className="text-[14px] leading-7 text-[#749BA9]">
//                 {data?.role === "startup"
//                   ? "Loyiha asoschisi"
//                   : data?.role === "investor"
//                     ? "Sarmoya kirituvchi"
//                     : "Noma'lum rol"}
//               </p>
//             </>
//           ) : null}
//         </div>
//         <div className="flex gap-2 mt-3 mb-8">
//           <Button variant="ghost" size="icon" onClick={toggleModal}>
//             <Pencil style={{ width: "17px", height: "17px" }} />
//           </Button>

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//               <div
//                 className="bg-white rounded-xl p-6 w-[31%] h-[auto] relative"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//                   onClick={toggleModal}
//                 >
//                   <HiX size={24} />
//                 </button>
//                 <ProfileForm closeModal={toggleModal} />
//               </div>
//             </div>
//           )}

//           <Link to={"/products"}>
//             <Button variant="ghost" size="icon">
//               <Briefcase style={{ width: "17px", height: "17px" }} />
//             </Button>
//           </Link>

//           <Button variant="ghost" size="icon">
//             <Dialog>
//               <DialogTrigger>
//                 <LogOut
//                   style={{ width: "17px", height: "17px" }}
//                   className="hover:text-primary ease-in"
//                 />
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Hisobdan chiqmoqchimisiz?</DialogTitle>
//                   <div className="flex justify-center items-center gap-10">
//                     <DialogTrigger>
//                       <button className="text-lg font-semibold">Yo'q</button>
//                     </DialogTrigger>
//                     <Button
//                       className="rounded-2xl text-lg font-normal px-6 py-3 "
//                       onClick={handleSignOut}
//                     >
//                       Ha
//                     </Button>
//                   </div>
//                 </DialogHeader>
//               </DialogContent>
//             </Dialog>
//           </Button>
//         </div>
//       </div>

//       <div className="flex-1 space-y-2 p-2">
//         <Link to={"/"}>
//           <SidebarItem
//             icon={<Home className="h-4 w-4" />}
//             label="Bosh sahifa"
//           />
//         </Link>

//         <Link to={"/products"}>
//           <SidebarItem
//             icon={<Briefcase className="h-4 w-4" />}
//             label="Loyihalar"
//           />
//         </Link>
//         <SidebarItem
//           icon={<UserPen className="h-4 w-4" />}
//           label="Shaxsiy sarlovha"
//           isActive
//         />

//         <button onClick={proccess} className="w-full">
//           <SidebarItem

//             icon={<Calendar className="h-4 w-4" />}
//             label="Kalendar" />
//         </button>
//         <button onClick={proccess} className="w-full">
//           <SidebarItem icon={<Users className="h-4 w-4" />} label="Jamiyat" />
//         </button>

//         <button onClick={proccess} className="w-full">
//           <SidebarItem
//             icon={<Users className="h-4 w-4" />} 
//             label="Mening kontaktlarim"
//           />
//         </button>

//       </div>

//       <div className="mt-auto border-t p-2">
//         <SidebarItem
//           icon={<HelpCircle className="h-4 w-4" />}
//           label="Boshqa yordamlar"
//         />
//       </div>
//     </div>
//   );
// }

// export interface SidebarItemProps {
//   icon: React.ReactNode; // Accepts any React element
//   label: string;
//   isActive?: boolean;
// }
