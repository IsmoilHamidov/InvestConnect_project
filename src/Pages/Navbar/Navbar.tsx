import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../../assets/images/Group.png";
import logo_text from "../../assets/images/Group-1.png";
import { Link,} from "react-router-dom";

function Navbar() {
  return (
    <nav className="max-w-7xl m-auto">
        <Link to="/products">products</Link>
      <div className="py-2 flex justify-between">
        <div className="flex gap-x-4 text-white text-lg">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>

        <div
          className=" flex 
                    gap-x-7 items-center text-white text-base font-normal "
        >
          <button className="rounded-3xl p-2 px-3  text-sm bg-[#749BA9] ">
            {" "}
            ALTRO INVEST PLATFORM
          </button>
          <a href="#">Over ons</a>
          <a href="#">Blog</a>
          <a href="#">Podcast</a>
          <a href="#">Events</a>
          <a href="#">Pers</a>
          <a href="#">Contact</a>

          <div className="relative inline-block">
            <button
              className="flex items-center justify-between bg-[#749BA9] text-white p-2 px-4 
                            rounded-2xl font-normal focus:outline-none"
            >
              NL
              <i className="fa-solid fa-chevron-down text-sm ms-1"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full border-t my-1 border-[#749BA9]"></div>
      <div className=" flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-3 py-2">
          <img src={logo} alt="logo" />
          <div className=" w-28">
            <img src={logo_text} alt="logo_text" />
            <p
              style={{ letterSpacing: "3px" }}
              className="text-white text-[11px] mt-1 "
            >
              INVEST
            </p>
          </div>
        </div>

        <div
          className=" h-full flex items-center gap-x-7 text-white 
                      text-base font-normal"
        >
          <a href="#">Aonbod</a>
          <a href="#">Inverst Platform</a>
          <a href="#">Onze diensten</a>
          <a href="#">Partners</a>
        </div>

        <div className="flex items-center gap-x-7  text-white text-base font-light">
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
}

export default Navbar;
