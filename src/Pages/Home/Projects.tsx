
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/store/slice/products";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

function Projects() {
  const { data, error, isLoading } = useGetProductsQuery("");

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
          {limitedData.map((card: { id: Key | null | undefined; image: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; category: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <div key={card.id} className="border border-[#B29C6F] rounded-md product grid ">
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
                  to={`/product/${card.id}`}
                  className="absolute inset-0 bg-primary bg-opacity-60 opacity-0 z-20 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span className="text-white text-xl font-medium z-40">Batafsil</span>
                </Link>
                <div className="absolute text-red-50 z-20 top-4 -right-[16px] grid justify-items-end">
                  <div className="bg-[#B29C6F]  px-4 py-3">
                      <p className="font-normal text-white text-[14px] leading-3 ">
                          Topligging
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

              <div className="bg-white grid px-4 py-6 gap-3 rounded-b-md">
                <div className="flex justify-between">
                  <span className="title  text-custom-gray text-xl font-medium">
                    {card.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="title">{card.category.name}</div>
                </div>
                <div>{card.description}</div>
                <div className="flex justify-between pt-5">
                  <div className="text-2xl">{card.price} UZS</div>
                  <Link
                    to={`/product/${card.id}`}
                    onClick={() => {
                      sessionStorage.setItem("scrollPosition", String(window.scrollY));}}
                  >
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
              <button
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
