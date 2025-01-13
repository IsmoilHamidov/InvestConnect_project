import React, { ReactNode } from "react";
// import bannerImage from "/src/assets/images/banner_ProductListPage.png";
// import logoImage from "/src/assets/images/Subtract.png";
import bannerNewImage from '../assets/images/Product_mage.jpg'

interface BannerProps {
  children?: ReactNode;
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className="relative w-full">
      {/* <img 
        src={bannerImage} 
        alt="Баннер" 
        className="absolute inset-0 w-full object-cover pt-[51px]" 
      /> */}
      <img 
        src={bannerNewImage} 
        alt="Баннер" 
        className="absolute inset-0 w-full h-[19rem] object-cover opacity-80 brightness-100 blur-[1.5px]"
      />


      {/* <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={logoImage} 
          alt="Логотип" 
          className="object-contain pt-[312px]" 
        />
      </div> */}
      {/* Слой с контентом */}
      <div className="absolute inset-0 flex items-center justify-center top-28">
        {children}
      </div>
    </div>
  );
};

export default Banner;
