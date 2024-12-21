import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { useAuthModalStore } from "@/store/authModalStore";
import logo from "../../assets/images/Group.png";
import logo_text from "../../assets/images/Group-1.png";

const Navbar: React.FC = () => {
  const { openModal } = useAuthModalStore();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  // Check localStorage on load and update state for verification
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const verifiedStatus = localStorage.getItem("isVerified");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    setIsVerified(verifiedStatus === "true");
  }, []);

  // Listen for changes in localStorage to update state
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUsername = localStorage.getItem("username");
      const verifiedStatus = localStorage.getItem("isVerified");
      if (savedUsername) {
        setUsername(savedUsername);
      }
      setIsVerified(verifiedStatus === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target as Node) && 
        popoverButtonRef.current && !popoverButtonRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsVerified(false);
    setUsername(null);
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem('selectedOption');
    localStorage.removeItem('isVerified');
    setTimeout(() => {
      window.location.reload(); 
    }, 200); 
  };

  const handleProfileClick = () => {
    const selectedOption = localStorage.getItem("selectedOption");
  
    const route =
      selectedOption === "investor"
        ? "/investorProfile"
        : selectedOption === "startup"
        ? "/profile"
        : null;
  
    if (route) {
      navigate(route + "?timestamp=" + new Date().getTime());
      setTimeout(() => setShowPopover(false), 100);
    } else {
      console.error("Invalid or missing selectedOption:", selectedOption);
    }
  };
  
  const initials = username?.charAt(0).toUpperCase() || "";

  return (
    <nav className="max-w-7xl m-auto Nav_links">
      <div className="py-2 flex justify-between">
        {/* Social Links */}
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
            ALTRO INVEST PLATFORM
          </button>
          <a href="#">Over ons</a>
          <a href="#">Blog</a>
          <a href="#">Podcast</a>
          <a href="#">Pers</a>
          <a href="#">Contact</a>
          
          <div className="relative">
            {isVerified ? (
              <button
                className="flex items-center justify-center bg-[#B29C6F] text-white p-1 w-[35px] h-[33px] rounded-full text-lg font-medium"
                onClick={() => setShowPopover((prev) => !prev)}
                ref={popoverButtonRef}
              >
                {initials}
              </button>
            ) : (
              <button
                className="Blue_button bg-[#749BA9] text-white p-2 px-4 rounded-2xl font-normal"
                onClick={() => openModal("registration")}
              >
                Sign Up
              </button>
            )}

            {showPopover && (
              <div
                ref={popoverRef}
                className="overflow-hidden absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40 z-50"
              >
                <button
                  className="block w-full text-left text-md px-4 py-2 hover:bg-gray-100 text-black"
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left text-md px-4 py-2 hover:bg-gray-100 text-black"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
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
