import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./button";
import { IoIosStarOutline } from "react-icons/io";


// Тип для Category
interface Category {
  name: string; 
}

export interface Product {
  category: Category; 
  degree?: "bronze" | "silver" | "gold"; // Уровень продукта (Enum: "bronze", "silver", "gold")
  id: number; // Уникальный идентификатор продукта (readOnly)
  image: string; // Описание продукта (обязательно, от 1 символа)
  name: string; // Название продукта (обязательно, от 1 до 50 символов)
  description: string;
  price: number;
}


interface ProductCardProps {
  product: Product;
}


export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product grid px-4 py-6">
    <div className="relative group">
      <img
        src={product.image}
        alt={product.name}
        className="w-[391px] h-[368px] object-cover z-20"
        style={{ objectPosition: "center" }} // Центрирование изображения
      />

      <Link to={`/product/${product.id}`} className="absolute inset-0 bg-primary bg-opacity-60 opacity-0 z-20 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-semibold z-40">Подробнее</span>
      </Link>

      <div className="px-4 py-2 bg-[#B29C6F] absolute top-3.5 -right-[25px] text-red-50 z-20">
          Topligging
      </div>

      <Star
        role="button"
        tabIndex={0}
        className="cursor-pointer absolute top-5 left-5 scale-125 fill-white text-[#B29C6F] focus:fill-[#B29C6F]  focus:text-gray-800 focus:scale-30 outline-none z-30"
      />
    </div>


    <div className="border-2 border-custom-gray grid px-4 py-6 gap-3">
      <div className="flex justify-between">
        <span className="title text-2xl text-primary font-semibold">
          {product.name}
        </span>
        {/* <span className="text-3xl">{product.name}</span> */}
      </div>
      <div className="flex justify-between">
        <div className="title">{product.category.name}</div>
        {/* <div>{product.name}</div> */}
      </div>
      <div>{product.description}</div>
      <div className="flex justify-between pt-5">
        <div className="text-2xl">{product.price} UZS</div>

        <Link to={`/product/${product.id}`}
           onClick={() => {
            sessionStorage.setItem("scrollPosition", String(window.scrollY));
          }}>
          <Button className="Blue_button border rounded-[40px] px-4 py-2">
            Ontdek meer
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
