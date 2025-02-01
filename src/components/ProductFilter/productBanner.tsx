import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
<<<<<<< HEAD:src/Pages/ProductFilter/productBanner.tsx
=======
import { useToast } from "@/hooks/use-toast";
>>>>>>> 1102cde112e8afc3e52b4bf11c8b550bc49a6fe8:src/components/ProductFilter/productBanner.tsx

interface ProductBannerProps {
  itemsPerPageFromBanner: (items: number) => void;
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}

<<<<<<< HEAD:src/Pages/ProductFilter/productBanner.tsx
const ProductBanner: React.FC<ProductBannerProps> = ({
  itemsPerPageFromBanner,
  viewMode,
  setViewMode,
}) => {
  // Устанавливаем начальное состояние из localStorage, если оно существует, иначе по умолчанию "grid"
  const initialViewMode = localStorage.getItem("viewMode") as "grid" | "list" || "grid";
  
  const [gridViewActive, setGridViewActive] = useState<boolean>(initialViewMode === "grid");
  const [listViewActive, setListViewActive] = useState<boolean>(initialViewMode === "list");
=======


const ProductBanner: React.FC<ProductBannerProps> = ({ itemsPerPageFromBanner, viewMode, setViewMode}) => {
  const [gridViewActive, setGridViewActive] = useState<boolean>(true);
  const [listViewActive, setListViewActive] = useState<boolean>(false);
>>>>>>> 1102cde112e8afc3e52b4bf11c8b550bc49a6fe8:src/components/ProductFilter/productBanner.tsx

  const toast = useToast()
  const proccess = () => {
    toast.toast({
      description: 'Jarayonda',
      variant: "warning",
      duration: 1000
    });
  };

  
  useEffect(() => {
    // Сохраняем состояние viewMode в localStorage
    localStorage.setItem("viewMode", viewMode);

    // Обновляем активные состояния кнопок
    if (viewMode === "grid") {
      setGridViewActive(true);
      setListViewActive(false);
    } else if (viewMode === "list") {
      setGridViewActive(false);
      setListViewActive(true);
    }
  }, [viewMode]);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
<<<<<<< HEAD:src/Pages/ProductFilter/productBanner.tsx
      <div className="flex items-center gap-4">
        <button
          onClick={() => setViewMode("grid")}
          className={`${
            gridViewActive
              ? "bg-secondary text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`${
            listViewActive
              ? "bg-secondary text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
        >
          <ImList />
        </button>
      </div>
=======
 
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`${
              gridViewActive
                ? "bg-secondary text-white"
                : "border-[1px] border-gray-300 text-[#737373]"
            } w-8 h-8 rounded-sm text-lg flex items-center justify-center cursor-pointer gridView`}
          >
            <BsGridFill />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`${
              listViewActive
                ? "bg-secondary text-white"
                : "border-[1px] border-gray-300 text-[#737373]"
            } w-8 h-8 rounded-sm text-base flex items-center justify-center cursor-pointer listView`}
          >
            <ImList />
          </button>
        </div>

>>>>>>> 1102cde112e8afc3e52b4bf11c8b550bc49a6fe8:src/components/ProductFilter/productBanner.tsx

      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0 text-secondary">
        <div className="flex items-center gap-2  relative">
          <label className="block">Ko'rsatish</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            id="countries"
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="9">9</option>
            <option value="18">18</option>
            <option value="27">27</option>
            <option value="36">36</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

        <div 
        onClick={proccess}
        className="flex items-center gap-2 text-base  relative">
          <label className="block">Saralash</label>
          <select
            id="countries"
            className="w-32 md:w-52 border-[1px] text-sm border-gray-200 py-1 px-4 cursor-pointer text-primeColor block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
           <option value="Best Sellers" disabled>Eng yangilari</option>
            <option value="New Arrival" disabled>Eng ko'p ko'rilganlari</option>
            <option value="Featured" disabled>Featured</option>
            <option value="Final Offer" disabled>Final Offer</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
