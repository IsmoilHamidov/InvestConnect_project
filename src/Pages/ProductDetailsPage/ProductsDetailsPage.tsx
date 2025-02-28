import NavbarAdmin from "@/components/navbarAdmin";
import { useGetProductQuery } from "@/store/slice/products";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import PrivateInfoCard from "@/components/PrivateInfoCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

export const ProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { productid } = useParams<{ productid: string | any }>();
  const { data, error, isLoading } = useGetProductQuery(productid);

  const renderSkeletonsId = () => {
    return (
      <>
        <Skeleton variant="text" width="50%" height={50} sx={{ marginBottom: 5 }} />
        <div className="flex gap-8">
          <div className="w-[50%]">
            <Skeleton variant="rounded" width="100%" height={350} sx={{marginBottom:8}} />
            <Skeleton variant="rounded" width="15%" height={70} />

          </div>
          <div className="w-[50%] flex flex-col gap-6">
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="70%" height={30} />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="90%" height={50} />
            <Skeleton variant="text" width="100%" height={100} />
          </div>
        </div>
      </>
    );
  };

  const [search, setSearch] = useState("");

  return (
    <>
      <NavbarAdmin search={search} setSearch={setSearch} />
      <main className="max-w-7xl mx-auto px-4 pb-10 pt-32">
        <div className="mb-3 flex gap-8 items-center">
          <h1 className="text-4xl font-semibold text-secondary capitalize">
            {data?.name}
          </h1>
        </div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          renderSkeletonsId()
        )
          : data ? (
            <div className="py-8 bg-white max-md:flex-col flex justify-between">
              <ImageSlider />
              <div className="flex flex-col max-sm:flex-col max-md:flex-row md:w-[48%] gap-y-10 gap-x-5 max-lg:justify-between">
                <div className="md:w-full w-full sm:w-1/2 sm:max-w-[400px] lg:min-w-[70%] p-5 rounded-xl shadow-md border border-gray-200 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-secondary text-base font-medium">
                      Narxi:
                    </span>
                    <p className="font-semibold text-[22px] ">${data.price}</p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-secondary text-base font-medium">
                      Samaradorlik:
                    </span>
                    <p className="0 font-semibold">{data.rendement}</p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-secondary text-base font-medium">
                      Ulush:
                    </span>
                    <p className="font-semibold ">50%</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-secondary text-base font-medium">
                      Sotuvdan Daromad:
                    </span>
                    <p className="font-semibold">{data.investment_range}</p>
                  </div>
                </div>

                <div className="md:w-full w-full sm:w-1/2 sm:max-w-[400px] rounded-xl bg-white capitalize">
                  <p className="text-sm text-secondary font-medium">
                    ИКТУ: 00806001001000000
                  </p>
                  <div className="mt-5 space-y-5">
                    <div className="flex justify-between items-center text-secondary text-[14px]">
                      <div className="">Loyiha nomi</div>
                      <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                      <span className="font-medium ">{data.name}</span>
                    </div>

                    <div className="flex justify-between items-center text-secondary text-[14px]">
                      <div className="">Turkum</div>
                      <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                      <span className=" font-medium">{data.category}</span>
                    </div>

                    <div className="flex justify-between items-center text-secondary text-[15px]">
                      <div>Joylashuv</div>
                      <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                      <span className="font-medium truncate max-w-[450px]">{data.location}</span>
                    </div>

                    <div className="flex justify-between items-center text-secondary text-[15px]">
                      <div className="self-start">Qisqacha tavsif</div>
                      <div className="self-start mt-[12px] flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                      <span
                        className="font-medium max-w-[70%]  overflow-hidden text-ellipsis"
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          lineHeight: '1.5rem',
                        }}
                      >
                        {data.short_description}
                      </span>

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
