import React, { useState } from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/images/Group.png";
import logo_text from "../../assets/images/Group-1.png";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="max-w-7xl m-auto Nav_links">
        <div className="py-2 flex justify-between">
          <div className="flex gap-x-4 text-white text-lg">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="flex gap-x-7 items-center text-white text-base font-norma">
            <button className="Blue_button rounded-3xl p-2 px-3 text-sm bg-[#749BA9]">ALTRO INVEST PLATFORM</button>
            <a href="#">Over ons</a>
            <a href="#">Blog</a>
            <a href="#">Podcast</a>
            <a href="#">Events</a>
            <a href="#">Pers</a>
            <a href="#">Contact</a>

            <div className="relative inline-block">
              <button
                onClick={toggleModal}
                className="Blue_button flex items-center justify-between bg-[#749BA9] text-white p-2 px-4 
                rounded-2xl font-normal focus:outline-none"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        <div className="w-full border-t my-1 border-[#749BA9]"></div>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-x-3 py-2">
            <img src={logo} alt="logo" />
            <div className="w-28">
              <img src={logo_text} alt="logo_text" />
              <p style={{ letterSpacing: "3px" }} className="text-white text-[11px] mt-1">INVEST</p>
            </div>
          </div>

          <div className="h-full flex items-center gap-x-7 text-white text-base font-normal">
            <a href="#">Aonbod</a>
            <a href="#">Inverst Platform</a>
            <a href="#">Onze diensten</a>
            <a href="#">Partners</a>
          </div>

          <div className="flex items-center gap-x-7 text-white text-base font-light">
            <a href="#"><i className="fa-solid fa-phone me-2"></i>09 / 279 88 92</a>
            <a href="#"><i className="fa-solid fa-envelope me-2"></i>info@altro-invest.be</a>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                className="Blue_button w-full mt-3 bg-[#749BA9] text-white p-2 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
