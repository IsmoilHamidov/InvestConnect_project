import logo from "../../assets/images/footerLogo.png";
import bigLogo from "../../assets/images/Altro Logo.png";
// import { useTranslation } from "@/store/useTransition";

function Footer() {
  // const { footer } = useTranslation();

  return (
    <>
      <div className="w-full bg-gray-100 py-24 relative">
        <div className="max-w-7xl  m-auto flex justify-between relative z-40">
          <div className="w-[35%]  flex flex-col">
            <img
              src={logo}
              className="w-[11rem] h-[3.5rem] object-contain"
              alt="logo"
            />
            <a href="#" className="text-primary mt-8 ">
              <i className="fa-solid fa-phone me-2"></i>
              09 / 279 88 92
            </a>
            <a href="#" className="text-primary mt-4">
              <i className="fa-solid fa-envelope me-2"></i>
              info@altro-invest.be
            </a>
            <div className="flex mt-8 gap-x-3 text-[13px] ">
              <a
                href="#"
                className="w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-secondary"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-secondary"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-secondary"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="#"
                className="w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-secondary"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div
            className="w-[25%] flex flex-col 
                        gap-y-2 text-[#756E6E] font-medium"
          >
            <h4 className="text-secondary text-lg mb-2">Sayt Xaritasi </h4>
            <a href="#">Taklif</a>
            <a>Investitsiya platformasi</a>
            <a href="#">Bizning xizmatlar</a>
            <a href="#">Tadbirlar</a>
            <a href="#">Hamkorlar</a>
          </div>
          <div
            className="w-[25%] flex flex-col 
                        gap-y-2 text-[#756E6E] font-medium"
          >
            <h4 className="text-secondary text-lg mb-2">Muloqot </h4>
            <a href="#">Blog</a>
            <a href="#">Podkastlar</a>
            <a href="#">Yangiliklar</a>
            <a href="#">Aloqa</a>
          </div>
          <div
            className="w-[25%] flex flex-col 
                        gap-y-2 text-[#756E6E] font-medium"
          >
            <h4 className="text-secondary text-lg mb-2">Huquqiy</h4>
            <a href="#">Umumiy shartlar</a>
            <a href="#">Maxfiylik siyosati</a>
            <a href="#">Cookie siyosati</a>
          </div>
        </div>
        <div className="absolute top-0 right-20 z-20">
          <img className="w-[26rem] h-full" src={bigLogo} alt="" />
        </div>
      </div>

      <div className="w-full bg-primary py-4 relative z-40">
        <p className="max-w-7xl m-auto text-white text-base">
          Mualliflik Huquqi 2022 Invest Connect Barcha Huquqlar Himoyalangan.
        </p>
      </div>
    </>
  );
}

export default Footer;