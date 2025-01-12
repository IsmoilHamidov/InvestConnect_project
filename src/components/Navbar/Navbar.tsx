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

import { useToast } from "@/hooks/use-toast";


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true); // Change state when scrolled
      } else {
        setIsScrolled(false); // Reset state when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


const Navbar: React.FC = () => {
  const {toast} = useToast()
  const inProcces = () => {
    toast({
      description: "jarayonda",
      variant: "success",
    });
  }

  return (
    <div
      className={`fixed w-full top-0 z-[1000] transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-[#362e2c] bg-opacity-97 shadow-md pt-1 pb-1" : "bg-transparent"
      }`}
      style={{ position: "fixed", zIndex: 1000 }}
    >
      <nav className="max-w-7xl mx-auto Nav_links pt-5">
        <div
          className={`py-2 flex justify-between transition-all duration-700 ease-in ${
            isScrolled ? "max-h-12 overflow-hidden" : "max-h-32"
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
          <div className="flex gap-x-7 items-center text-white text-base font-normal">
            <button className="Blue_button border-0 rounded-3xl p-2 px-3 text-sm bg-[#749BA9]">
              Shartlar bilan tanishish
            </button>
            <Link to={"/products"}>Loyihalar</Link>
            <a href="#about_us">Biz haqimizda</a>
            <a href="#our_service">Bizning Xizmatlar</a>

        {/* Navbar Content */}
        <div className="flex gap-x-7 items-center text-white text-base font-normal">
          <button className="Blue_button border-0 rounded-3xl p-2 px-3 text-sm bg-[#749BA9]">
            INVEST CONNECT PLATFORM
          </button>
          <Link to={'/products'}>Loyihalar</Link>
          <a href="#">Biz haqimizda</a>


            <ProfilePopover />
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
        <div className="h-full flex items-center gap-x-7 text-white text-base font-normal">
          <a onClick={inProcces} href="#">Taklif</a>
          <a onClick={inProcces} href="#">Investitsiya Platformasi</a>
          <a onClick={inProcces} href="#">Bizning xizmatlar</a>
          <a onClick={inProcces} href="#">Hamkorlar</a>
        </div>
        <div className="flex items-center gap-x-7 text-white text-base font-light">
          <a href="#">
            <i className="fa-solid fa-phone me-2"></i>09 / 279 88 92
          </a>
          <a href="#">
            <i className="fa-solid fa-envelope me-2"></i>info@invest-connect.be
          </a>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
