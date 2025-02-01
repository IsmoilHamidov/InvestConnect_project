
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/store/slice/products";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";


interface Category {
  name: string | number | boolean | React.ReactNode | null;
}

interface Card {
  id: string | number | null;
  image?: string;
  name: string | number | boolean | React.ReactNode | null;
  category: Category;
  description: string | number | boolean | React.ReactNode | null;
  price: string | number | boolean | React.ReactNode | null;
  location?: string;
  rendement: number,
}


function Projects() {
  const { data, error, isLoading } = useGetProductsQuery("");
  console.log(data);
  

  if (isLoading) {
    return <div className="text-center text-gray-500">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500"></div>;
  }


  const limitedData = data?.slice(0, 3) || [];


  return (
    <div className="relative min-h-[60rem] mt-8 ">
      <div
        className="w-full z-10 h-[45rem] bg-[#443B3A] rounded-br-none py-12"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 75%)" }}
      ></div>

      <div
        id="Project"
        className="flex flex-col justify-center items-center  absolute top-[120px] left-1/2 transform -translate-x-1/2"
      >
        <h3 className="text-center text-[2.5rem] font-light text-white">
           Loyihalar
        </h3>

        <div className="flex justify-between items-center mt-16 w-[80rem] px-4 py-6">
        {limitedData.map((card: Card, index: number) => (
            <div key={card.id} 
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-offset="0"
              data-aos-delay={index * 450} 
              className="border border-[#B29C6F] rounded-md product grid ">
              <div>
                
              </div>
              <div className="relative group ">
                <img
                  src={card.image}
                  alt='image'
                  className="w-[391px] h-[368px] object-cover z-20 rounded-t-md"
                  style={{ objectPosition: "center" }}
                />
                <Link
                  to={`/products/${card.id}`}
                  className="absolute inset-0 bg-primary bg-opacity-60 opacity-0 z-20 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span className="text-white text-xl font-medium z-40">Batafsil</span>
                </Link>
                <div className="absolute text-red-50 z-20 top-4 -right-[16px] grid justify-items-end">
                  <div className="bg-[#B29C6F]  px-4 py-3">
                      <p className="font-normal text-white text-[14px] leading-3 truncate max-w-[200px] overflow-hidden">
                         {card.location}
                      </p>
                  </div>
                  <div
                    className="bg-[#443B3A] w-4 h-3"
                    style={{
                    clipPath: "polygon(0 0, 0 100%, 100% 0)",
                    }}>
                </div>
              </div>

                <Star
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer absolute top-5 left-5 scale-125 fill-white text-[#B29C6F] focus:fill-[#B29C6F] focus:text-gray-800 focus:scale-30 outline-none z-30"
                />
              </div>

              <div className="grid px-4 py-5 gap-3 rounded-b-md flex-1 bg-white">
                    <div className="flex justify-between min-h-10">
                      <span className="title text-custom-gray text-lg font-medium">
                        {card.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="title font-medium text-lg">{card.category.name}</div>
                      <p className="flex flex-col items-end text-base font-medium"> 
                        {card.rendement}
                        <span className="text-sm font-light">samaradorlik</span>
                      </p>
                    </div>
                    <div>{card.description}</div>
                    <div className="flex justify-between pt-3">
                      <div className="text-[22px] font-medium">${card.price} </div>
                      <Link to={`/products/${card.id}`}
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
          ))}
        </div>

          <Link to={'/products'} onClick={() => window.scrollTo(0, 0)} >
              <button id="about_us"
                className="Brown_button rounded-3xl p-3 px-12
                 text-base text-white bg-custom-gray mt-5"
              >
                Bizning taklifimizni ko'ring
              </button>
          </Link>

      </div>
    </div>
  );
}

export default Projects;
