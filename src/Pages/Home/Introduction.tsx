import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import intro_image from "../../assets/images/9899513.jpeg";
// import intro_image from "../../assets/images/Leadership-Excellence-Header-scaled-1.jpg";
import Intro_logo from "../../assets/images/InvestLogo.png";

const Introduction_Image: React.FC = () => {
  return (
    <div
      className="intro_box relative h-[100vh] w-full py-5 z-10"
      style={{
        backgroundImage: `url(${intro_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.51)",  
          filter: "brightness(60%)", 
          zIndex: -1, 
        }}
      />
      
       <Navbar />
       

      <div
        style={{
          position: "absolute",
          top: "59%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="w-full flex justify-center items-center"
      >
        <img className="h-[27rem] object-contain" src={Intro_logo} 
        alt="Intro Logo"
        style={{  
          filter: "brightness(50%)", 
        }}/>
      </div>
    </div>
  );
}

export default Introduction_Image;
