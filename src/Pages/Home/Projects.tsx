
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/store/slice/products";
import { Star } from "lucide-react";


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
              className="w-[30%] bg-white shadow-md rounded-xl flex flex-col h-full hover:shadow-lg duration-200 ease-in-out ">
            
              <div className="relative group flex-1">
                <img
                  src={card.image}
                  alt='image'
                  className="w-full border h-[20rem] object-cover z-20 rounded-xl  border-gray-200"
                  style={{ objectPosition: "center" }}
                />
              <Link to={`/products/${card.id}`} className="absolute inset-0 rounded-xl bg-primary bg-opacity-70 opacity-0 
                z-20 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium z-40">Batafsil</span>
              </Link>

              <div className="absolute text-red-50 z-20 top-4 -right-[16px] grid justify-items-end">
                  <div className="bg-[#B29C6F] px-4 py-1 overflow-hidden">
                    <p
                      className="font-normal text-white text-[15px]  truncate max-w-[130px] overflow-hidden"
                      title={card.location} 
                    >
                      {card.location}
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

              <div className="grid px-4 py-5 gap-3 rounded-b-xl flex-1 bg-white ">
                <div>
                    <div className="flex h-14 mb-2">
                      <span className="text-secondary text-base leading-6 font-medium">
                        {card.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex flex-col text-md font-medium"> 
                        {card.rendement}
                        <span className="text-xs font-light">samaradorlik</span>
                      </p>

                      <p className="text-end font-normal text-xs text-wrap h-auto max-w-[150px] break-words">
                        Turkum: {card.category.name} 
                      </p>
                    </div>
                </div>
                
                <div className="flex justify-between  mt-5">
                  <div className="text-[22px] text-gray-900 font-medium">${card.price} </div>
                  <Link to={`/products/${card.id}`}
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
          ))}
        </div>



          <Link to={'/products'} onClick={() => window.scrollTo(0, 0)} >
              <button id="about_us"
                className="Brown_button rounded-3xl p-3 px-12
                 text-base text-white bg-secondary mt-8"
              >
                Bizning taklifimizni ko'ring
              </button>
          </Link>

      </div>
    </div>
  );
}

export default Projects;
