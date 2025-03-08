import React from "react";
import { BiCaretDown } from "react-icons/bi";

// Define the type for the props
interface NavTitleProps {
  title: string; // The title is a required string
  icons?: boolean; // The icons prop is optional and is a boolean
}

const NavTitle: React.FC<NavTitleProps> = ({ title, icons }) => {
  return (
    <div className="flex items-center justify-between max-lg:border max-lg:rounded-2xl max-lg:px-6 max-lg:py-2 mb-2">
      {icons ? (
        <>
          <h3 className="font-medium lg:text-[17px] text-[#B29C6F] mr-2">{title}</h3>
          {icons && <BiCaretDown />}
        </>
      ) : (
        <h3 className="font-medium lg:text-[17px] text-[#B29C6F]">{title}</h3>
      )}
    </div>
  );
};

export default NavTitle;
