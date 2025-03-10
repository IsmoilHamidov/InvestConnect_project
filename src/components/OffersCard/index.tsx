import React from "react";
import { Link } from "react-router-dom";
import { useGetUserProductsListQuery } from "@/store/slice/products";
import ProperyCard from "./ProperyCards";
import emty_box from "../../assets/images/question_9073321.png";
import { Skeleton } from "@mui/material";

const Offers: React.FC = () => {
  const { data, error, isLoading } = useGetUserProductsListQuery(undefined);

  return (
    <div
      className="p-6 py-8 min-h-[17.725rem] w-full mx-auto shadow-md border-[1px] rounded-2xl">
      <div className="flex flex-row items-center justify-between mb-10">
        <h1 className="text-base md:text-xl font-semibold">Loyhalaringiz</h1>
        <Link to={"/ProjectAdd"}>
          <button className="rounded-full text-sm py-[7px] px-5 text-white Blue_button">
            <i className="fa-solid fa-plus me-2"></i>
            Loyiha qo'shish
          </button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-4 border rounded-lg p-4"
              >
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div className="flex flex-col flex-1">
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                </div>
              </div>
            ))}
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-full">
          <p>Loyihalarni yuklashda xatolik yuz berdi... Keyinroq qayta urinib ko‘ring.</p>
        </div>
      )}

      {data?.length === 0 && (
        <div className="flex flex-col items-center justify-start h-full gap-y-5">
          <p className="italic text-[17px]">Sizda yuklangan loyihalar mavjud emas.</p>
          <img className="h-24 object-contain" src={emty_box} alt="emty_box" />
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-y-3">
          {data?.map(
            (
              item: {
                id: number;
                image: any;
                name: string;
                category: { name: string }
                price: any;
                location: string;
              },
              index: React.Key | null | undefined
            ) => {
              return (
                <div className="w-full" >
                  <ProperyCard
                    key={index}
                    image={item.image}
                    id={item.id}
                    title={typeof item.name === "string" ? item.name : "Untitled"}
                    location={typeof item.location === "string" ? item.location : "Topligging"}
                    category={
                      item.category && typeof item.category.name === "string"
                        ? item.category.name
                        : "Unknown"
                    }
                    price={item.price ? `$${item.price}` : "N/A"}
                    type={""}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Offers;
