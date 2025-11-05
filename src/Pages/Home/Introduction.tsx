import React from "react";
import Navbar from "../../components/Navbar/Navbar";
// import intro_image from "../../assets/images/9899513.jpeg";
// import Intro_logo from "../../assets/images/InvestLogo.png";
import { useAuthModalStore } from "@/store/authModalStore";
import { useGetUsersQuery } from "@/store/slice/products";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../assets/mbp4/5981904-uhd_4096_2160_25fps.mp4";
import { useTranslation } from "@/components/LanguageTriger";

const Introduction_Image: React.FC = () => {
  const { openModal } = useAuthModalStore();
  const { data, error } = useGetUsersQuery(undefined);
  const username = data?.username || null;
  const navigate = useNavigate();

  const { homePage } = useTranslation();

  const handelNavigateProfile = () => {
    if (data?.role === "investor") {
      navigate("/products");
    } else {
      navigate("/ProjectAdd");
    }
  };

  const buttonText =
    data?.role === "investor"
      ? homePage.introduction.buttonUser
      : "Startap loyihangizni qo'shishni boshlash";

  return (
    <div
      className="intro_box relative h-[100vh] w-full py-5 z-10"
     
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={BgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        className="absolute inset-0 bg-black/30 "
      />

      <Navbar />

      <div
        style={{
          position: "absolute",
          top: "63%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "80rem",
        }}
        className="w-full flex justify-start items-center "
      >
        <div className="flex flex-col max-w-xl text-white">
          <h2
            className="text-7xl font-medium text-white 
          [text-shadow:_1.1px_1px_1px_rgba(0,0,0,0.6)]"
          >
            Invest Connect
          </h2>
          <p className="text-white text-xl leading-8 tracking-wider mt-8 mb-7">
            {homePage.introduction.description}
          </p>

          {error || !username ? (
            <button
              onClick={() => openModal("login")}
              className="border border-gray-600 Blue_button cursor-pointer bg-primary px-5 py-[12px]  
              rounded-2xl w-fit text-base font-medium tracking-wide"
            >
              {homePage.introduction.buttonGuest}
            </button>
          ) : (
            <button
              onClick={handelNavigateProfile}
              className="border border-gray-600 Blue_button cursor-pointer bg-primary px-5 py-[12px]  
              rounded-2xl w-fit text-base font-medium tracking-wide"
            >
              {buttonText}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Introduction_Image;
