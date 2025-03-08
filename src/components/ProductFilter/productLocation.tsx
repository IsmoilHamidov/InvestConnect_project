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
    <div className="w-full mb-4">
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="cursor-pointer"
      >
        <NavTitle title="Joylashuv" icons={true} />
      </div>
      {isDropdownOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="cursor-pointer lg:space-y-2 lg:block flex flex-wrap border lg:border-0 rounded-2xl lg:w-[calc(100vw - 8em)] lg:px-0 px-8 gap-y-1 lg:gap-y-4 text-sm lg:text-base text-[#767676]">
            {locations.map((item, index) => (
              <li
                onClick={() => handleLocationClick(item)}
                key={index}
                className={`flex items-center cursor-pointer text-base py-2 lg:px-0 px-6 mx-auto duration-300 text-center lg:text-left ${
                  selectedLocation === item ||
                  (selectedLocation === "" && item === "Barchasi")
                    ? "text-secondary  border-b-[1px] border-secondary font-medium"
                    : "hover:border-b-[1px] border-b-gray-200 hover:border-secondary duration-300 hover:text-foreground"
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
