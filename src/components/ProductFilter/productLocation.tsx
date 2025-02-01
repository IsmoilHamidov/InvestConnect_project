import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./productNavtitle";
import { useProductsFiltersStore } from "@/store/ProductsFiltersStore";


const ProductLocation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const { selectedLocation, setSelectedLocation } = useProductsFiltersStore();

  const locations: string[] = [
    "Toshkent",
    "Buxoro",
    "Andijon",
    "Samarqand",
    "Xorazm",
    "Namangan",
    "Sirdaryo",
    "Surxandaryo",
  ];

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
                onClick={() => setSelectedLocation(item)}
                key={index}
<<<<<<< HEAD:src/Pages/ProductFilter/productLocation.tsx
                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 ${selectedLocation === item ? "text-primeColor font-bold" : ""
                  }`}
=======
                className={`w-full flex items-center cursor-pointer text-base pb-1  duration-300 ${
                  selectedLocation === item ? "text-secondary  border-b-[1px] border-secondary font-medium" : ""
                }`}
>>>>>>> 1102cde112e8afc3e52b4bf11c8b550bc49a6fe8:src/components/ProductFilter/productLocation.tsx
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
