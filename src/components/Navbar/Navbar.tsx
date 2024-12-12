import React, { useRef, useEffect } from 'react';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useNavbarContext } from './SignUp_Context';
import logo from '../../assets/images/Group.png';
import logo_text from '../../assets/images/Group-1.png';

const Navbar: React.FC = () => {
  const {
    isSignedUp,
    username,
    setIsSignedUp,
    setUsername,
    setIsModalOpen,
    selectedOption,
    setSelectedOption,
  } = useNavbarContext();

  const [showPopover, setShowPopover] = React.useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedOption = localStorage.getItem('selectedOption');
    
    if (savedUsername) {
      setUsername(savedUsername);
      setIsSignedUp(true);
    }
    if (savedOption) {
      setSelectedOption(savedOption as 'investor' | 'startup' | null);
    }
  }, [setUsername, setIsSignedUp, setSelectedOption]);

  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('selectedOption');
    setUsername('');
    setIsSignedUp(false);
    setSelectedOption(null);
    setShowPopover(false);
    navigate('/'); // Signing Out
  };

  const handleProfileClick = () => {
    const route =
      selectedOption === 'investor'
        ? '/investorProfile'
        : selectedOption === 'startup'
        ? '/profile'
        : null;

    if (route) {
      navigate(route + '?timestamp=' + new Date().getTime());
      setTimeout(() => setShowPopover(false), 100);
    } else {
      console.error('Invalid or missing selectedOption:', selectedOption);
    }
  };

  const initials =
    username
      ?.trim()
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('') || '';

  return (
    <nav className="max-w-7xl m-auto Nav_links">
      <div className="py-2 flex justify-between">
        <div className="flex gap-x-4 text-white text-lg">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaTwitter /></a>
        </div>
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
            {isSignedUp ? (
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
                onClick={() => setIsModalOpen(true)}
              >
                Sign Up
              </button>
            )}

            {/* Popover Menu */}
            {showPopover && (
              <div
                ref={popoverRef}
                className="overflow-hidden absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40 z-50"
              >
                <button
                  className="block w-full text-left text-md px-4 py-2 hover:bg-gray-100 hover:text-black text-custom-gray"
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left text-md px-4 py-2 hover:bg-gray-100 hover:text-black text-custom-gray"
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
            <p style={{ letterSpacing: '3px' }} className="text-white text-[11px] mt-1">
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
          <a href="#"><i className="fa-solid fa-phone me-2"></i>09 / 279 88 92</a>
          <a href="#"><i className="fa-solid fa-envelope me-2"></i>info@altro-invest.be</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
