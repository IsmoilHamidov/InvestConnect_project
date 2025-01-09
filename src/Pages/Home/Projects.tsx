import property1 from "../../assets/images/property.jpg";
import property2 from "../../assets/images/property (1).jpg";
import property3 from "../../assets/images/property (2).jpg";
import star from "../../assets/images/Star 1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthModalStore } from "@/store/authModalStore";

const cardData = [
  {
    id: 1,
    image: property1,
    location: "MACHELEN",
    description: "Shahar Darvozasi",
    type: "Kvartiralar",
    rendement: "4,22 %",
    price: "€ 160 000 dan",
    label: "Top joylashuv",
  },
  {
    id: 2,
    image: property2,
    location: "BRUSSEL",
    description: "Shahar Markazi",
    type: "Lofts",
    rendement: "3,75 %",
    price: "€ 200 000 dan",
    label: "Yangi qurilish",
  },
  {
    id: 3,
    image: property3,
    location: "ANTWERPEN",
    description: "Ochiq Osmon Minoralari",
    type: "Pentxaus",
    rendement: "5,10 %",
    price: "€ 300 000 dan",
    label: "Yuqori Darajadagi",
  },
];

function Projects() {
  const { openModal } = useAuthModalStore();
  const navigate = useNavigate()

  const checkUser = () => {
    const user = localStorage.getItem("token")
    user ? navigate("/products") : openModal("registration")
  }

  return (
    <div  className="relative min-h-[60rem] mt-8">
      <div 
        className="w-full z-10 h-[45rem] bg-[#443B3A] rounded-br-none py-12"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 75%)",
        }}
      ></div>

      <div id="Project" className="flex flex-col justify-center items-center z-20 absolute top-[120px] left-1/2 transform -translate-x-1/2">
        <h3 className="text-center text-[2.5rem] font-light text-white">
          Top Loyhalar
        </h3>
        <div className="flex justify-between items-center mt-20 w-[80rem]">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="relative overflow-visible w-[30%] border border-[#443B3A] shadow-lg mx-4 "
            >
              <div className="relative overflow-visible">
                <img
                  src={card.image}
                  alt={card.location}
                  className="w-full h-[22rem] "
                />
                <div className="absolute top-3 left-3 z-30">
                  <img src={star} alt="star" />
                </div>
              </div>

              <div
                className="absolute top-3 z-20 -right-5
                          bg-[#B29C6F] text-white text-md px-3 py-1"
              >
                {card.label}
              </div>

              <div className="px-3 py-5 bg-white ">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-custom-blue-gray">
                    {card.location}
                  </h2>
                  <p className="text-2xl font-semibold text-custom-gray">
                    {card.rendement}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1 mb-2">
                  <p className="text-md text-custom-gray font-medium">
                    {card.description}
                  </p>
                  <p className="text-xs text-custom-gray">Yalpi Hosildorlik</p>
                </div>
                <p className="text-sm text-custom-gray">{card.type}</p>

                <div className="flex items-center justify-between mt-7">
                  <p className="text-xl font-medium text-gray-900">
                    {card.price}
                  </p>
                  <Link to={`/product/${card.location}`}>
                    <button className="Blue_button bg-custom-blue-gray text-white text-sm font-medium py-1 px-4 rounded-2xl">
                     Ko'proq bilib oling
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

          <button onClick={checkUser} className="Brown_button rounded-3xl p-3 px-12 text-base text-white bg-custom-gray mt-16 ">
            Bizning taklifimizni ko'ring
          </button>
      </div>
    </div>
  );
}

export default Projects;
