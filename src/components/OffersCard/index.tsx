import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OfferCardProps } from "@/interface";
import { Link } from "react-router-dom";
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
    <Card className="flex  relative border border-[#C5C3C3] items-center 
    px-4 py-3 mb-5 ">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded object-cover mr-4"
      />
      <div className="flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold text-[#749BA9] uppercase">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 mt-1 ">
          <div>
            <p className="text-sm text-[#948F8F] font-light ">
              {location} ·{" "}
              <span className="font-normal text-[#443B3A] text-xs  ">
                {type}
              </span>
            </p>
          </div>
          <div>
            <p className="text-base font-medium text-custom-gray">{price}</p>
          </div>
        </CardContent>
      </div>
      {isTopLocation && (
        <div className="absolute top-1 -right-3 grid justify-items-end">
          <div className="bg-[#B29C6F]  px-2 py-2">
            <p className="font-normal text-white text-[12px] leading-3 ">
              Topligging
            </p>
          </div>
          <div
            className="bg-[#443B3A] w-3 h-3"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 0)",
            }}
          ></div>
        </div>
      )}
      <Link to={`/product/${title}`}>
        <Button
          variant="outline"
          className=" Blue_button hover:text-white mt-5 rounded-[40px] text-xs text-white "
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
      <div className="p-6 w-full mx-auto shadow-xl border-[1px] rounded-[15px]  ">
        <div className="flex flex-row items-center justify-between mb-9 ">
          <h1 className="text-base font-semibold">Aanbod</h1>

          <Link to={'/ProjectAdd'}>
              <button className="rounded-full text-[15px] py-[7px] px-5 text-white Blue_button" >
                <i className="fa-solid fa-plus  me-3"></i>
                Add Project
              </button>
          </Link>


          {/* <Button
            className="rounded-full py-4 px-6 text-white bg-[#B29C6F] Brown_button  "
            onClick={navBtn}
          >
            <i className="fa-solid fa-plus text-[15px]"></i>
          </Button> */}

          
        </div>
        {offers.map((offer, index) => (
          <ProperyCard key={index} {...offer} />
        ))}
       
      </div>
      <ProductModal isOpen={isModalOpen} onClose={closeBtn} />
    </>
  );
};

export default Offers;
