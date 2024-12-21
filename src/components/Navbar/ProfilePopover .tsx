import { useAuthModalStore } from "@/store/authModalStore";
import { useGetUsersQuery } from "@/store/slice/products";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePopover: React.FC = () => {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetUsersQuery();
  const { openModal } = useAuthModalStore();
  const username = data?.username || null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        popoverButtonRef.current &&
        !popoverButtonRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.clear(); // Очистка всех данных
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleProfileClick = () => {
    const selectedOption = data?.role;

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
    <div className="relative">
      {isLoading ? (
        <button className="Blue_button bg-gray-400 text-white p-2 px-4 rounded-2xl font-normal" disabled>
          Loading...
        </button>
      ) : error || !username ? (
        <button
          className="Blue_button bg-[#749BA9] text-white p-2 px-4 rounded-2xl font-normal"
          onClick={() => openModal("registration")}
        >
          Sign Up
        </button>
      ) : (
        <button
          className="flex items-center justify-center bg-[#B29C6F] text-white p-1 w-[35px] h-[33px] rounded-full text-lg font-medium"
          onClick={() => setShowPopover((prev) => !prev)}
          ref={popoverButtonRef}
        >
          {initials}
        </button>
      )}

      {showPopover && username && (
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
  );
};

export default ProfilePopover;
