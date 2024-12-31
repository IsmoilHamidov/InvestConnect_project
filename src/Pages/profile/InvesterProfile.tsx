import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
// import { ProfileForm } from "@/components/profileForms";
import TimeCount from "../../components/timeCount";
import Activities from "../../components/Activities";
import Offers from "@/components/OffersCard";
import InvestorAnalytics from "@/components/OffersCard/InvestorAnalytics";
import BankCardBalance from "@/components/timeCount/Balance";


function InvesterProfile() {
  return (
    <div className="flex flex-col w-full h-screen">
      <header className="w-full relative">
        <NavbarAdmin />
      </header>
      <div className="flex w-full flex-1 relative">
        <aside className="w-[270px] bg-white border relative">
          <Sidebar />
        </aside>
        <main className="flex-1 relative pt-10 pb-6 pl-6 pr-9">
          <div className="flex mt-12 gap-x-8">
           
            <div className="flex flex-col w-full gap-y-7 justify-between">

              <div className="flex justify-between items-center">
                <div className="w-2/5">
                    <InvestorAnalytics/>
                </div>

                  <div className="w-1/2">
                    {/* <TimeCount /> */}
                    <BankCardBalance/>
                  </div>
              </div>

              <div className="w-full">
                <Activities />
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InvesterProfile
