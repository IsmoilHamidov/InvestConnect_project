import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import logo_text from "../../assets/images/navLogo.png";
import ProfilePopover from "./ProfilePopover ";
import { Link } from "react-router-dom";



const Navbar: React.FC = () => {
  return (
    <nav className="max-w-7xl m-auto Nav_links">
      <div className="py-2 flex justify-between">
        {/* Social Links */}
        <div className="flex gap-x-4 text-white text-lg">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>

        {/* Navbar Content */}
        <div className="flex gap-x-7 items-center text-white text-base font-normal">
          <button className="Blue_button border-0 rounded-3xl p-2 px-3 text-sm bg-[#749BA9]">
            Shartlar bilan tanishish
          </button>
          <Link to={'/products'} className="nav_link"> Loyihalar</Link>
          <a href="#about_us" className="nav_link"> Biz haqimizda</a>
          <a href="#our_service" className="nav_link"> Bizning Xizmatlar</a>

          <ProfilePopover />
        </div>
      </div>
      <div className="w-full border-t my-1 border-[#749BA9]"></div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-3 py-2">
          {/* <img src={logo} alt="logo" className="h-[60px] object-contain" /> */}
      
            <img src={logo_text} className="h-14 object-contain" alt="logo_text" />
          
        </div>
        <div className="h-full flex items-center gap-x-7 text-white text-base font-normal">
          <a href="#" className="nav_link">Taklif</a>
          <a href="#" className="nav_link">Investitsiya Platformasi</a>
          <a href="#" className="nav_link">Hamkorlar</a>
        </div>
        <div className="flex items-center gap-x-7 text-white text-base font-light">
          <a href="#">
            <i className="fa-solid fa-phone me-2"></i>09 / 279 88 92
          </a>
          <a href="#">
            <i className="fa-solid fa-envelope me-2"></i>info@invest-connect.be
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
