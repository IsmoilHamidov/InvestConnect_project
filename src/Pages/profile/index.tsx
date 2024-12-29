import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
// import { ProfileForm } from "@/components/profileForms";
import Offers from "../../components/OffersCard";
import AnalyticsBox from "@/components/OffersCard/AnalyticsBox";



const Profile = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <header className="w-full relative">
        <NavbarAdmin />
      </header>
      <div className="flex w-full flex-1 relative">
        <aside className="w-[270px] bg-white border relative">
          <Sidebar />
        </aside>
        <main className="flex-1 relative pt-10 pl-6 pr-9">
          <div className="flex mt-12 gap-x-8">
            {/* <div className="w-full">
              <ProfileForm />
            </div> */}

            <div className="flex flex-row w-full justify-between gap-y-7 ">
              <div className="w-2/5">
                <AnalyticsBox/>
              </div>
              
              <div className="w-[55%]">
                <Offers />
              </div>
            </div>


          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
