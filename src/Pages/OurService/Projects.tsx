import React from 'react';
import property1 from "../../assets/images/property.jpg";
import property2 from "../../assets/images/property (1).jpg";
import property3 from "../../assets/images/property (2).jpg";
import star from "../../assets/images/Star 1.png"


const cardData = [
  {
    id: 1,
    image: property1,
    location: "MACHELEN",
    description: "City Gate",
    type: "Apartementen",
    rendement: "4,22 %",
    price: "Vanaf € 160 000",
    label: "Topligging",
  },
  {
    id: 2,
    image: property2,
    location: "BRUSSEL",
    description: "Urban Living",
    type: "Lofts",
    rendement: "3,75 %",
    price: "Vanaf € 200 000",
    label: "Nieuwbouw",
  },
  {
    id: 3,
    image: property3,
    location: "ANTWERPEN",
    description: "Sky Towers",
    type: "Penthouse",
    rendement: "5,10 %",
    price: "Vanaf € 300 000",
    label: "High-End",
  },
];


function Projects() {
  return (
    <div className="relative min-h-[60rem] mt-8">
      <div
        className="w-full z-10 h-[50rem] bg-[#443B3A] rounded-br-none py-12"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 75%)",
        }}
      ></div>

      <div className="z-20 absolute top-[150px] left-1/2 transform -translate-x-1/2">
        <h3 className="text-center text-[2.5rem] font-light text-white">
          Projecten in de kijker
        </h3>
        <div className="flex justify-between items-center mt-16 w-[80rem]">
            {cardData.map((card) => (
                <div
                    key={card.id}
                    className="max-w-sm border rounded-lg overflow-hidden shadow-lg mx-4"
                    >

                    <div className="relative overflow-visible">
                 
                    </div>

                    
                    <div className="p-4 bg-white">
                        <h2 className="text-lg font-bold text-blue-700">
                            {card.location}
                        </h2>
                        <p className="text-sm text-gray-600">{card.description}</p>
                        <p className="text-sm text-gray-500">{card.type}</p>
                        <div className="flex items-center justify-between mt-3">
                            <div>
                                <p className="text-2xl font-semibold text-gray-800">
                                {card.rendement}
                                </p>
                                <p className="text-xs text-gray-500">BRUTO RENDEMENT</p>
                            </div>
                            <p className="text-lg font-semibold text-gray-800">
                                {card.price}
                            </p>
                        </div>
                        <button className="mt-4 w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded">
                        Ontdek meer
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
