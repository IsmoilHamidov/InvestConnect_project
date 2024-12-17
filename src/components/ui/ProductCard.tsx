import { Star } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";


// Тип для User
interface User {
  firstname: string; // Имя пользователя (обязательно, от 1 до 30 символов)
  lastname: string;  // Фамилия пользователя (обязательно, от 1 до 50 символов)
  role: "admin" | "user"; // Роль пользователя (Enum: "admin" или "user")
}

// Тип для Contract
interface Contract {
  contract: string; // Название контракта (обязательно, от 1 символа)
}

// Тип для Category
interface Category {
  name: string; // Название категории (обязательно, от 1 до 100 символов)
}

// Тип для Product
export interface Product {
  category: Category;     // Категория продукта
  degree?: "bronze" | "silver" | "gold"; // Уровень продукта (Enum: "bronze", "silver", "gold")
  id: number;             // Уникальный идентификатор продукта (readOnly)
  image: string;    // Описание продукта (обязательно, от 1 символа)
  name: string;           // Название продукта (обязательно, от 1 до 50 символов)
  description: string;
}

interface ProductCardProps {
  product: Product;
}


export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product grid px-4 py-6">
    <div className="relative group">


      {/* ДОБАВИТЬ ФОТО */}

      <img src={product.image} alt={product.name} className="w-full" />

      <div className="absolute inset-0 bg-primary bg-opacity-50 opacity-0 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center">
        <Link to={`/product/${product.id}`}>
          <span className="text-white text-lg font-semibold">Подробнее</span>
        </Link>
      </div>

      <div className="px-4 py-2 bg-yellow-600 absolute top-3.5 -right-[25px] text-red-50">
        Topligging
      </div>

      <Star className="cursor-pointer absolute top-5 left-5 scale-125 fill-white text-yellow-600 active:fill-yellow-600" />
    </div>

    {/* Контент карточки */}
    <div className="border-2 border-black grid px-4 py-6 gap-3">
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
        <div className="text-2xl">{product.degree}</div>
        <Link to={`/product/${product.id}`}>
          <Button className=" border rounded-[40px] px-4 py-2">
            Ontdek meer
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
