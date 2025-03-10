import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import Offers from "../../components/OffersCard";
import AnalyticsBox from "@/components/OffersCard/AnalyticsBox";
import Activities from "@/components/Activities";
import { useState } from "react";

const Profile = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="w-full relative z-20">
        <NavbarAdmin 
          search={search} 
          setSearch={setSearch} 
          isSidebarOpen={isSidebarOpen} 
          handleToggleSidebar={handleToggleSidebar} 
        />
      </header>
      <div className="flex w-full flex-1 relative">
        <aside className={`lg:block w-[270px] bg-white border relative z-40 
          ${isSidebarOpen ? "block" : "hidden"} `}>
          <Sidebar isSidebarOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
        </aside>
        <main className="flex-1 relative pt-14 pb-4 pl-6 pr-9">
          <div className="flex mt-12 gap-x-8">
            <div className="flex lg:flex-row flex-col w-full lg:justify-between gap-y-7 ">
              <div className="lg:w-[55%] w-full ">
                <Offers />
              </div>
              <div className="lg:w-2/5 h-full ">
                <AnalyticsBox />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Activities />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
