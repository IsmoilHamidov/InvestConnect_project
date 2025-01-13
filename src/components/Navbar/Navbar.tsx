import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import logo_text from "../../assets/images/navLogo.png";
import { Link } from "react-router-dom";
import ProfilePopover from "./ProfilePopover ";
import PrivacyPolicy from "../PrivacyPolicy";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate the scroll progress as a percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div
        className={`pt-5 fixed w-full top-0 z-[1000] transition-all duration-500 ease-in-out ${
          isScrolled ? "bg-[#242323c8] bg-opacity-97 shadow-md pb-[2px] " : "bg-transparent"
        }`}
        style={{ position: "fixed", zIndex: 1000 }}
      >
        <nav className="max-w-7xl mx-auto Nav_links">
          <div
            className={`py-2 flex justify-between transition-all duration-700 ease-in ${
              isScrolled ? "max-h-12 overflow-hidden " : "max-h-32"
            }`}
          >
            <div className="flex gap-x-4 text-white text-lg">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaYoutube /></a>
              <a href="#"><FaTwitter /></a>
            </div>

            {/* Navbar Content */}
            <div className="flex gap-x-9 items-center text-white text-base font-normal">
              <button 
              className="Blue_button text-white border-0 rounded-3xl p-2 px-3 text-sm bg-[#749BA9]">
                <PrivacyPolicy />
              </button>
              <Link to={"/products"}>Loyihalar</Link>
              <a href="#about_us">Biz haqimizda</a>
              <a href="#our_service">Bizning Xizmatlar</a>

              <div className="relative flex gap-x-7 items-center text-white text-base font-normal">
                <div className="fixed">
                  <ProfilePopover />
                </div>
              </div>

            </div>
            
          </div>
          <div
            className={`w-full border-t my-1 border-[#749BA9] transition-all duration-500 ease-in-out ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
              isScrolled ? "hidden" : "flex"
            }`}
          >
            <div className="flex justify-center items-center gap-x-3 py-2">
              <img src={logo_text} className="h-14 object-contain" alt="logo_text" />
            </div>
            <div className="h-full flex items-center gap-x-7 text-white text-base font-normal">
              <a href="#">Taklif</a>
              <a href="#">Investitsiya Platformasi</a>
              <a href="#">Hamkorlar</a>
            </div>
            <div className="flex items-center gap-x-7 text-white text-base font-light">
              <a href="#"><i className="fa-solid fa-phone me-2"></i>09 / 279 88 92</a>
              <a href="#"><i className="fa-solid fa-envelope me-2"></i>info@invest-connect.be</a>
            </div>
          </div>
        </nav>
        {/* bg-[#B29C6F] */}
        <div
          className="h-1 bg-custom-blue-gray transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
