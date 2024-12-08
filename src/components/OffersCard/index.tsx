import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OfferCardProps } from "@/interface";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import ProductModal from "../productModal";

const ProperyCard: React.FC<OfferCardProps> = ({
  image,
  title,
  location,
  type,
  price,
  isTopLocation,
}) => {
  return (
    <Card className="flex relative border-[#C5C3C3]  items-center p-4 mb-4">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 rounded object-cover mr-4"
      />
      <div className="flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold text-[#749BA9] uppercase">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-row items-center gap-2 mt-1">
          <div>
            <p className="text-sm text-[#948F8F] font-light ">
              {location} ·{" "}
              <span className="font-normal text-[#443B3A] text-xs  ">
                {type}
              </span>
            </p>
          </div>
          <div>
            <p className="text-base font-semibold mt-2">{price}</p>
          </div>
        </CardContent>
      </div>
      {isTopLocation && (
        <div className="bg-[#B29C6F] absolute top-0 right-0   px-3 py-1">
          <p className="font-normal text-white text-[10px] leading-3 ">
            Topligging
          </p>
        </div>
      )}
      <Link to={`/product/${title}`}>
        <Button
          variant="outline"
          className=" bg-[#749BA9] rounded-[40px] text-xs text-white "
        >
          Ontdek meer!
        </Button>
      </Link>
    </Card>
  );
};

const Offers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navBtn = () => {
    setIsModalOpen(true);
  };
  const closeBtn = () => {
    setIsModalOpen(false);
  };
  const offers = [
    {
      image: "https://via.placeholder.com/150",
      title: "Machelen",
      location: "City Gate",
      type: "Apartment",
      price: "Vanaf € 160 000",
      isTopLocation: true,
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Machelen",
      location: "City Gate",
      type: "Apartment",
      price: "Vanaf € 160 000",
      isTopLocation: true,
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Machelen",
      location: "City Gate",
      type: "Apartment",
      price: "Vanaf € 160 000",
      isTopLocation: true,
    },
  ];

  return (
    <>
      <div className="p-6 w-full mx-auto shadow-xl border-[1px]  rounded-[15px]  ">
        <div className="flex flex-row items-center justify-between mb-5 ">
          <h1 className="text-base font-semibold mb-4">Aanbod</h1>
          <Button
            className="rounded-full p-7 text-white bg-[#749BA9] hover:bg-[#52717c]  "
            onClick={navBtn}
          >
            <AiOutlinePlus />
          </Button>
        </div>
        {offers.map((offer, index) => (
          <ProperyCard key={index} {...offer} />
        ))}
        <div className="flex justify-end">
          <Link
            to={"#"}
            className=" text-end  text-[#443B3A] font-normal hover:underline"
          >
            Het aanbod
          </Link>
        </div>
      </div>
      <ProductModal isOpen={isModalOpen} onClose={closeBtn} />
    </>
  );
};

export default Offers;
