import { useGetProductsCategoryQuery } from "@/store/slice/products";
import React from "react";

interface Category {
  name: string;
  image?: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Category: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { data, error, isLoading } = useGetProductsCategoryQuery();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-6 rounded-lg grid grid-cols-3 gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative" key={index}>
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              {data?.map((ctg, index) => (
                <div key={index}>
                  <img
                    src="/src/assets/images/property.jpg"
                    alt={ctg.name}
                    className="w-full h-60 object-cover rounded-lg"
                    style={{ filter: "blur(5px)" }}
                  />
                  {/* Название категории поверх изображения */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
                    {ctg.name}
                  </div>
                </div>
              ))}
            </>
          ) : null}
          {/* Блюр на фоне изображения */}
        </div>
        {/* Кнопка закрытия модалки */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black p-2 rounded-full hover:bg-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Category;
