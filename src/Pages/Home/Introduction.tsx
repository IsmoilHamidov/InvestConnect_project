import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import intro_image from "../../assets/images/Head_image.png";
import Intro_logo from "../../assets/images/Altro icon.png";
import { NavbarProvider } from '@/components/Navbar/SignUp_Context';
import SignUpModal from '@/components/Navbar/NavModal';

const Introduction_Image: React.FC = () => {
  
  return (
    <div
      className="intro_box relative h-[55rem] w-full py-5"
      style={{
        backgroundImage: `url(${intro_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

        <Navbar />

      
      <div
        style={{
          position: "absolute",
          top: "57%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="w-full flex justify-center items-center"
      >
        <img className="h-[26rem] object-contain" src={Intro_logo} alt="Intro Logo" />
      </div>
    </div>
  );
}

export default Introduction_Image;
