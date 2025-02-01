import React, { useState } from "react";
import NavTitle from "./productNavtitle";
import { useGetCategoriesQuery } from '@/store/slice/products';
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";


export type CategoryType = {
  id: string;
  name: string;
  img?: string;
};

type CategoriesModalProps = {
  onSelectCategory: (category: string) => void;
};

const renderSkeleton = () => {
  return Array.from({ length: 1 }).map((_, index) => (
    <div key={index}>
    <div className="space-y-5 mt-3">
      <Skeleton variant="text" width="100%" height={17} />
      <Skeleton variant="text" width="100%" height={17} />
      <Skeleton variant="text" width="100%" height={17} />
      <Skeleton variant="text" width="100%" height={17} />
    </div>

    </div>
  ));
};

const ProductSidebarCategory: React.FC<CategoriesModalProps> = ({ onSelectCategory }) =>  {;
  
  const { data: categories, isLoading, error } = useGetCategoriesQuery(undefined);
  const [showBrands, setShowBrands] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Barchasi")
  


  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    onSelectCategory(categoryName === "Barchasi" ? "" : categoryName); 
  }
  

  return (
    <div className="w-full" >
      <div onClick={() => setShowBrands(!showBrands)}>
        <NavTitle title="Kategoriya" icons={true}/>
           {isLoading && renderSkeleton()}
          {error && <p>Kategoriyalarni yuklashda xatolik yuz berdi.</p>}
      </div>
      <div>
        {showBrands && !isLoading && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
            <div className="space-y-2">
                  <button
                    className={`w-full flex items-center cursor-pointer text-base py-2 duration-300 
                      ${selectedCategory === "Barchasi" 
                        ? 'text-secondary border-b-[1px] border-secondary font-medium' 
                        : 'text-gray-500 border-b-[1px] border-b-gray-200 hover:border-secondary'
                      }`}
                    onClick={() => handleSelectCategory("Barchasi")}
                  >
                    <div>Barchasi</div>
                  </button>

              {categories?.map((category: CategoryType) => (
                <button
                    key={category.id}
                    className={`w-full flex items-center cursor-pointer text-base py-2 duration-300 
                      ${selectedCategory === category.name 
                        ? 'text-secondary border-b-[1px] border-secondary font-medium' 
                        : 'text-gray-500 border-b-[1px] border-b-gray-200  hover:border-secondary'
                      }`}
                    onClick={() => handleSelectCategory(category.name)}
                  >
      
                    <div>{category.name}</div>
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default ProductSidebarCategory;
