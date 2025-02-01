import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./productNavtitle";
import { useProductsFiltersStore } from "@/store/ProductsFiltersStore";


const ProductLocation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const { selectedLocation, setSelectedLocation } = useProductsFiltersStore();

  const locations: string[] = [
    "Barchasi",
    "Toshkent",
    "Buxoro",
    "Andijon",
    "Samarqand",
    "Xorazm",
    "Namangan",
    "Sirdaryo",
    "Surxandaryo",
  ];

  const handleLocationClick = (location: string) => {
    if (location === "Barchasi") {
      setSelectedLocation(""); 
    } else {
      setSelectedLocation(location); 
    }
  };

  return (
    <div>
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer">
        <NavTitle title="Joylashuv" icons={true} />
      </div>
      {isDropdownOpen && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <ul className="cursor-pointer flex flex-col gap-y-4 text-sm lg:text-base text-[#767676]">
            {locations.map((item, index) => (
              <li
                onClick={() => handleLocationClick(item)}
                key={index}
                className={`w-full flex items-center cursor-pointer text-base pb-1  duration-300 ${
                  selectedLocation === item || (selectedLocation === "" && item === "Barchasi")
                    ? "text-secondary  border-b-[1px] border-secondary font-medium"
                    : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ProductLocation;
