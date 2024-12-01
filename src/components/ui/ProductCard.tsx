import { Star } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};
export type Product = {
  id: number;
  title: string;
  percentage: string;
  subtitle: string;
  description: string;
  type: string;
  price: string;
  image: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product grid px-4 py-6">
    <div className="relative group">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover"
      />

      <div className="absolute inset-0 bg-primary bg-opacity-50 opacity-0 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">Подробнее</span>
      </div>

      <div className="px-4 py-2 bg-yellow-600 absolute top-3.5 -right-[25px] text-red-50">
        Topligging
      </div>

      <Star className="absolute top-3.5 left-4 fill-white" />
    </div>

    {/* Контент карточки */}
    <div className="border-2 border-black grid px-4 py-6 gap-3">
      <div className="flex justify-between">
        <span className="title text-2xl text-primary font-semibold">
          {product.title}
        </span>
        <span className="text-3xl">{product.percentage}</span>
      </div>
      <div className="flex justify-between">
        <div className="title">{product.subtitle}</div>
        <div>{product.description}</div>
      </div>
      <div>{product.type}</div>
      <div className="flex justify-between pt-5">
        <div className="text-2xl">{product.price}</div>
        <Link to={`/product/${product.title}`}>
          <Button className="border rounded-[40px] px-4 py-2">
            Ontdek meer
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
