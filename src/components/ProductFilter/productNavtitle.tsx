import React from "react";
import { BiCaretDown } from "react-icons/bi";

// Define the type for the props
interface NavTitleProps {
  title: string; // The title is a required string
  icons?: boolean; // The icons prop is optional and is a boolean
}

const NavTitle: React.FC<NavTitleProps> = ({ title, icons }) => {
  return (
    <div className="flex items-center justify-between pb-4">
      {icons ? (
        <>
          <h3 className="font-medium lg:text-[17px] text-[#B29C6F]">{title}</h3>
          {icons && <BiCaretDown />}
        </>
      ) : (
        <h3 className="font-medium lg:text-[17px] text-[#B29C6F]">{title}</h3>
      )}
    </div>
  );
};

export default NavTitle;
