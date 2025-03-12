import { useState } from "react";
import { motion } from "framer-motion";
import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import Activities from "../../components/Activities";
import InvestorAnalytics from "@/components/OffersCard/InvestorAnalytics";

function InvesterProfile() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
        <aside className="hidden lg:block w-[270px] bg-white border relative z-40">
          <Sidebar isSidebarOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
        </aside>

        <motion.aside
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: isSidebarOpen ? "0%" : "-100%", opacity: isSidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="lg:hidden fixed top-0 left-0 w-[270px] h-full bg-white border z-50 shadow-lg"
        >
          <Sidebar isSidebarOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
        </motion.aside>

        <main className="flex-1 relative pt-14 pb-6 px-4 sm:px-6 md:px-8 lg:pl-6 lg:pr-9">
          <div className="flex flex-col gap-6 mt-6">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="w-full sm:w-3/5 md:w-2/5">
                <InvestorAnalytics />
              </div>
            </div>

            <div className="w-full">
              <Activities />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InvesterProfile;
