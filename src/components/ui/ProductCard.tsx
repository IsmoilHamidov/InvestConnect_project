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
  rendement: number,
  price: number;
  location:string
}


interface ProductCardProps {
  product: Product;
}


export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product grid px-4 pt-3">
    <div className="border bg-white border-[#B29C6F] rounded-md flex flex-col min-h-[500px]">
      <div className="relative group flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[368px] object-cover z-20 rounded-t-md"
          style={{ objectPosition: "center" }} // Центрирование изображения
        />

        <Link to={`/products/${product.id}`} className="absolute inset-0 bg-primary bg-opacity-90 opacity-0 z-20 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xl font-medium z-40">Batafsil</span>
        </Link>

        <div className="absolute text-red-50 z-20 top-4 -right-[16px] grid justify-items-end">
            <div className="bg-[#B29C6F] px-4 py-3  overflow-hidden">
            <p
              className="font-normal text-white text-[14px] leading-3 truncate max-w-[200px] overflow-hidden"
              title={product.location} 
            >
              {product.location}
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

      <div className="grid px-4 py-5 gap-3 rounded-b-md flex-1">
        <div className="flex justify-between min-h-10">
          <span className="title text-custom-gray text-lg font-medium">
            {product.name}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="title font-medium text-lg">{product.category.name}</div>
          <p className="flex flex-col items-end text-base font-medium"> 
            {product.rendement}
            <span className="text-sm font-light">samaradorlik</span>
          </p>
        </div>
        <div>{product.description}</div>
        <div className="flex justify-between pt-3">
          <div className="text-[22px] font-medium">${product.price} </div>
          <Link to={`/products/${product.id}`}
            onClick={() => {
              sessionStorage.setItem("scrollPosition", String(window.scrollY));
            }}>
            <Button className="Blue_button border rounded-[40px] px-4 py-2">
             Ko'proq bilib olish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
