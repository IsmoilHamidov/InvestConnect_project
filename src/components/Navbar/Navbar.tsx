import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/images/Group.png";
import logo_text from "../../assets/images/Group-1.png";
import ProfilePopover from "./ProfilePopover ";

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
            ALTRO INVEST PLATFORM
          </button>
          <a href="#">Over ons</a>
          <a href="#">Blog</a>
          <a href="#">Podcast</a>
          <a href="#">Pers</a>
          <a href="#">Contact</a>

          <ProfilePopover />
        </div>
      </div>
      <div className="w-full border-t my-1 border-[#749BA9]"></div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-3 py-2">
          <img src={logo} alt="logo" />
          <div className="w-28">
            <img src={logo_text} alt="logo_text" />
            <p
              style={{ letterSpacing: "3px" }}
              className="text-white text-[11px] mt-1"
            >
              INVEST
            </p>
          </div>
        </div>
        <div className="h-full flex items-center gap-x-7 text-white text-base font-normal">
          <a href="#">Aanbod</a>
          <a href="#">Invest Platform</a>
          <a href="#">Onze diensten</a>
          <a href="#">Partners</a>
        </div>
        <div className="flex items-center gap-x-7 text-white text-base font-light">
          <a href="#">
            <i className="fa-solid fa-phone me-2"></i>09 / 279 88 92
          </a>
          <a href="#">
            <i className="fa-solid fa-envelope me-2"></i>info@altro-invest.be
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
