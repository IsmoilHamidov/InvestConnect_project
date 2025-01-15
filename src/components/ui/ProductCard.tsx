import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";


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
    <div className="border bg-white border-[#B29C6F] rounded-md flex flex-col min-h-[500px]">
      <div className="relative group flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[368px] object-cover z-20 rounded-t-md"
          style={{ objectPosition: "center" }} // Центрирование изображения
        />

        <Link to={`/product/${product.id}`} className="absolute inset-0 bg-primary bg-opacity-90 opacity-0 z-20 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xl font-medium z-40">Batafsil</span>
        </Link>

        <div className="absolute text-red-50 z-20 top-4 -right-[16px] grid justify-items-end">
            <div className="bg-[#B29C6F] px-4 py-3">
                <p className="font-normal text-white text-[14px] leading-3">
                    Topligging
                </p>
            </div>
            <div className="bg-[#443B3A] w-4 h-3" style={{ clipPath: "polygon(0 0, 0 100%, 100% 0)" }} />
        </div>

        <Star
          role="button"
          tabIndex={0}
          className="cursor-pointer absolute top-5 left-5 scale-125 fill-white text-[#B29C6F] focus:fill-[#B29C6F] focus:text-gray-800 focus:scale-30 outline-none z-30"
        />
      </div>

      <div className="grid px-4 py-6 gap-3 rounded-b-md flex-1">
        <div className="flex justify-between">
          <span className="title text-custom-gray text-xl font-medium">
            {product.name}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="title">{product.category.name}</div>
        </div>
        <div>{product.description}</div>
        <div className="flex justify-between pt-5">
          <div className="text-[22px]">{product.price} Uzs</div>
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
  </div>
);
