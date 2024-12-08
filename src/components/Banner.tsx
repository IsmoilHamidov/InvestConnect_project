import React, { ReactNode } from "react";
import bannerImage from "/src/assets/images/banner_ProductListPage.png";
import logoImage from "/src/assets/images/Subtract.png";

interface BannerProps {
  children?: ReactNode;
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className="relative w-full">
      {/* Слой с баннером */}
      <img 
        src={bannerImage} 
        alt="Баннер" 
        className="absolute inset-0 w-full object-cover pt-[51px]" 
      />
      {/* Слой с логотипом */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={logoImage} 
          alt="Логотип" 
          className="object-contain pt-[275px]" 
        />
      </div>
      {/* Слой с контентом */}
      <div className="absolute inset-0 flex items-center justify-center top-28">
        {children}
      </div>
    </div>
  );
};

export default Banner;
