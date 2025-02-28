import React, { useState } from "react";
import NavTitle from "./productNavtitle";
import { useGetCategoriesQuery } from "@/store/slice/products";
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
  return (
    <div className="space-y-5 mt-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} variant="text" width="100%" height={17} />
      ))}
    </div>
  );
};

const ProductSidebarCategory: React.FC<CategoriesModalProps> = ({
  onSelectCategory,
}) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesQuery(undefined);
  const [showBrands, setShowBrands] = useState<boolean>(true);

  // LocalStorage dan boshlang'ich kategoriya olish
  const savedCategory = localStorage.getItem("selectedCategory") || "Barchasi";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(savedCategory);

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    localStorage.setItem("selectedCategory", categoryName);
    onSelectCategory(categoryName === "Barchasi" ? "" : categoryName);
  };

  return (
    <div className="w-full mb-4">
      <div
        className="cursor-pointer"
        onClick={() => setShowBrands(!showBrands)}
      >
        <NavTitle title="Turkum" icons={true} />
        {isLoading && renderSkeleton()}
        {error && <p>Turkum yuklashda xatolik yuz berdi.</p>}
      </div>
      {showBrands && !isLoading && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:space-y-2 flex lg:block flex-wrap w-[calc(100vw - 8em)] px-8 lg:px-0 border lg:border-0 max-lg:rounded-2xl bg-white">
            <button
              className={`lg:w-full cursor-pointer text-base py-1 duration-300 text-center lg:text-left
                  ${
                    selectedCategory === "Barchasi"
                      ? "text-secondary border-b-[1px] border-secondary font-medium"
                      : "text-muted-foreground border-b-[1px] border-b-gray-200 hover:text-foreground hover:border-secondary"
                  }`}
              onClick={() => handleSelectCategory("Barchasi")}
            >
              Barchasi
            </button>

            {categories?.map((category: CategoryType) => (
              <button
                key={category.id}
                className={`lg:w-full mx-auto cursor-pointer text-base py-2 px-6 lg:px-0 duration-300 text-center lg:text-left
                    ${
                      selectedCategory === category.name
                        ? "text-secondary border-b-[1px] border-secondary font-medium"
                        : "text-muted-foreground border-b-[1px] border-b-gray-200 hover:text-foreground hover:border-secondary"
                    }`}
                onClick={() => handleSelectCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductSidebarCategory;
