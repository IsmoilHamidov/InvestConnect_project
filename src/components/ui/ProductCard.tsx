import { Star } from "lucide-react";
import { Link } from "react-router-dom";
// import { Button } from "./button";



interface Category {
  name: string; 
}

export interface Product {
  category: Category; 
  degree?: "bronze" | "silver" | "gold"; // Уровень продукта (Enum: "bronze", "silver", "gold")
  id: number; // Уникальный идентификатор продукта (readOnly)
  image: string; // Описание продукта (обязательно, от 1 символа)
  name: string; // Название продукта (обязательно, от 1 до 50 символов)
  rendement: number,
  price: number;
  location:string
}


interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}




export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => (
  <>
       {viewMode === "grid" ?(

        <div className="product grid">
          <div className="bg-white shadow-sm rounded-xl flex flex-col h-full hover:shadow-md duration-200 ease-in-out">
            <div className="relative group flex-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full border h-[19rem] object-cover  rounded-xl  border-gray-200"
                style={{ objectPosition: "center" }}
              />

              <Link to={`/products/${product.id}`} className="absolute inset-0 rounded-xl bg-primary bg-opacity-70 opacity-0 
                 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium ">Batafsil</span>
              </Link>

              <div className="absolute text-red-50 z-20 top-4 -right-[16px] grid justify-items-end">
                  <div className="bg-[#B29C6F] px-4 py-1 overflow-hidden">
                    <p
                      className="font-normal text-white text-[15px]  truncate max-w-[130px] overflow-hidden"
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
                className="cursor-pointer absolute top-5 left-5 scale-105 z-10  fill-white text-[#B29C6F] focus:fill-[#B29C6F] focus:text-gray-800 focus:scale-30 outline-none"
              />
            </div>

            <div className="px-2 pt-4 -200 pb-6 border-gray border-b  rounded-b-xl flex-1 bg-white flex flex-col justify-between">
              <div>
                  <div className="flex h-14 mb-2">
                    <span className="text-secondary text-base leading-6 font-medium">
                      {product.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p className="flex flex-col text-md font-medium"> 
                      {product.rendement}
                      <span className="text-xs font-light">samaradorlik</span>
                    </p>

                    <p className="text-end font-normal text-xs text-wrap h-auto max-w-[150px] break-words">
                      Turkum: {product.category.name} 
                    </p>
                  </div>
              </div>

              <div className="flex justify-between  mt-7">
                <div className="text-[22px] text-gray-900 font-medium">${product.price} </div>
                <Link to={`/products/${product.id}`}
                  onClick={() => {
                    sessionStorage.setItem("scrollPosition", String(window.scrollY));
                  }}>
                  <button className="text-sm bg-blue-50 text-secondary hover:bg-primary hover:text-white 
                  border border-primary rounded-xl px-3 py-1 transition-all duration-300">
                    Ko'rish
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
       )

      //  list
      :
      (
        <div className="product border list  w-full py-4 px-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
          <div className="flex items-center gap-5">
            <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-24 object-cover rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
                />
            </Link>

            <div className="flex-1">
              <Link to={`/products/${product.id}`}>
                  <h3 className="text-lg font-medium text-gray-800 transition-colors duration-300">
                    {product.name}
                  </h3>
              </Link>
              <p className="text-sm text-secondary mt-1">{product.location}</p>
              <p className="text-sm text-gray-500 mt-1">
                Turkum: <span className="font-medium">{product.category.name}</span>
              </p>
            </div>

       
                <p className="flex flex-col justify-between gap-y-1 mr-5 items-center text-secondary text-md text-2xl font-medium">
                    ${product.price}
                    <span className="text-sm">{product.rendement}</span> 
                </p>
  

            <Link
              to={`/products/${product.id}`}
              onClick={() => {
                sessionStorage.setItem("scrollPosition", String(window.scrollY));
              }}
            >
              <button className="text-sm bg-blue-50 text-secondary hover:bg-primary hover:text-white
               border border-primary rounded-2xl px-4 py-2 transition-all duration-300">
                Ko'rish
              </button>
            </Link>
          </div>
        </div>
      )}
  </>    
);
