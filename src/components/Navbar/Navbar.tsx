import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Group.png";
import logo_text from "../../assets/images/Group-1.png";

const Navbar: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);

  // Check signup status on initial render
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsSignedUp(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
        popoverButtonRef.current && !popoverButtonRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false); // Close the popover if click is outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://bakirali007.pythonanywhere.com/api/v1/app/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ phone, password, username }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("username", username);
        setIsSignedUp(true);
        toggleModal();
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const initials =
    username
      ?.trim()
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("") || "";

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUsername("");
    setIsSignedUp(false);
    setShowPopover(false);
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowPopover(false);
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

          <div className="flex gap-x-7 items-center text-white text-base font-normal">
            <button className="Blue_button focus:outline-none border-0 rounded-3xl p-2 px-3 text-sm bg-[#749BA9]">
              ALTRO INVEST PLATFORM
            </button>
            <a href="#">Over ons</a>
            <a href="#">Blog</a>
            <a href="#">Podcast</a>
            <a href="#">Pers</a>
            <a href="#">Contact</a>

            <div className="relative inline-block">
              {isSignedUp ? (
                <>
                  <button
                    ref={popoverButtonRef}
                    onClick={togglePopover}
                    className="flex items-center justify-center bg-[#B29C6F] text-white p-1 w-[35px] h-[33px] rounded-full text-lg font-medium"
                  >
                    {initials}
                  </button>

                  {showPopover && (
                    <div
                      ref={popoverRef}
                      className="overflow-hidden absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40 z-50"
                    >
                      <ul>
                        <li>
                          <button
                            onClick={handleProfileClick}
                            className="block w-full text-left text-md px-4 py-2 hover:bg-gray-100 text-gray-800"
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left text-md px-4 py-2 hover:bg-gray-100 text-gray-800"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={toggleModal}
                  className="Blue_button flex items-center justify-between bg-[#749BA9] text-white p-2 px-4 rounded-2xl font-normal focus:outline-none"
                >
                  Sign up
                </button>
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
              <p style={{ letterSpacing: "3px" }} className="text-white text-[11px] mt-1">
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

      {isModalOpen && !isSignedUp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone number</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
};

export default Navbar;
