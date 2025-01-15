import NavbarAdmin from "@/components/navbarAdmin";
import { useGetProductQuery } from "@/store/slice/products";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import PrivateInfoCard from "@/components/PrivateInfoCard";

export const ProductDetailsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { productid } = useParams<{ productid: string | any }>();
  const { data, error, isLoading } = useGetProductQuery(productid);

  return (
    <>
      <NavbarAdmin />

      <main className="max-w-7xl mx-auto p-10 ">
        <div className="mt-16 mb-5 flex gap-8 items-center">
          <h1 className="text-4xl font-semibold text-custom-gray capitalize">
            {data?.name}
          </h1>
        </div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <div className="p-4 py-8 pl-0 bg-white  flex justify-between">
            {/* <div className="w-1/2 h-auto border flex flex-row gap-y-3">
                  <img src={data.image} alt="product image" 
                  className="h-[22rem] w-full object-cover rounded-xl" />
                </div> */}

            <ImageSlider />
            <div className="flex flex-col w-[48%] gap-y-10 justify-between">
              <div className="w-[70%] p-5 rounded-xl shadow-md border border-gray-200 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-custom-gray text-base font-medium">
                    Narxi:
                  </span>
                  <p className="font-semibold text-[22px] ">${data.price}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-custom-gray text-base font-medium">
                    Samaradorlik:
                  </span>
                  <p className="0 font-semibold">{data.rendement}%</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-custom-gray text-base font-medium">
                    Ulush:
                  </span>
                  <p className="font-semibold ">50%</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-custom-gray text-base font-medium">
                    Sotuvdan Daromad:
                  </span>
                  <p className="font-semibold">$100/oy</p>
                </div>
              </div>

              <div className="rounded-xl bg-white capitalize">
                <p className="text-sm text-custom-gray font-medium">
                  ИКТУ: 00806001001000000
                </p>
                <div className="mt-5 space-y-5">
                  <div className="flex justify-between items-center text-custom-gray text-[14px]">
                    <div className="">Loyiha nomi</div>
                    <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                    <span className="font-medium ">{data.name}</span>
                  </div>

                  <div className="flex justify-between items-center text-custom-gray text-[14px]">
                    <div className="">Kategoriya</div>
                    <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                    <span className=" font-medium">{data.category}</span>
                  </div>

                  <div className="flex justify-between items-center text-custom-gray text-[15px]">
                    <div className="">Joylashuv</div>
                    <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                    <span className=" font-medium">{data.location}</span>
                  </div>

                  <div className="flex justify-between items-center text-custom-gray text-[15px]">
                    <div className="">Oxirgi yangilangan vaqti</div>
                    <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                    <span className="font-medium ">{data.created_at}</span>
                  </div>

                  <div className="flex justify-between items-center text-custom-gray text-[15px]">
                    <div className="">Qo‘shimcha holat</div>
                    <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                    <span className="font-medium">Yangi uzilgan uzum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <PrivateInfoCard productId={productid} />
      </main>
    </>
  );
};
