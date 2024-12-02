import image1  from '../../../assets/images/Rectangle 409 (1).png'
import image2  from '../../../assets/images/Rectangle 409.png'
import image3  from '../../../assets/images/Rectangle 410.png'
import AltroLogo from "../../../assets/images/Altro Logo.png"

const cardData = [
    {
      date: "February 28, 2022",
      title: "Renteloos renovatiekrediet voor uw",
      description: "Een degelijke administratieve en technische opvolging blijven de sleutel tot succes van iedere vastgoedinvestering.",
      image: image1,
    },
    {
      date: "February 28, 2022",
      title: "Wijzigingen verkooprecht vanaf 1 januari 2022!",
      description: "Een degelijke administratieve en technische opvolging blijven de sleutel tot succes van iedere vastgoedinvestering.",
      image: image2,
    },
    {
      date: "February 28, 2022",
      title: "14 Inpaktips bij het verhuizen!",
      description: "Een degelijke administratieve en technische opvolging blijven de sleutel tot succes van iedere vastgoedinvestering.",
      image: image3,
    },
  ];

  
function InfoCard() {
  return (
    <div className="bg-[#88A8B5]  pb-40 pt-[18rem] relative">

      <div className="max-w-7xl mx-auto px-4 z-50 relative">
        <div className="flex flex-col  md:flex-row justify-between items-center mb-8">
          <div className="w-full md:w-1/4 ">
            <h2 className="text-white text-[42px] font-semibold leading-[50px] mb-4">Investerings nieuws <span className='text-[#CED6D9]'>& artikels</span></h2>
            <p className="text-white font-light text-lg mb-8">
              Lees de laatste trends over investeren in vastgoed
            </p>

            <div className="flex gap-3 text-white text-xl">
              <button className="w-11 h-11 bg-[#CED6D9] rounded-full flex justify-center items-center">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="w-11 h-11 bg-custom-gray rounded-full flex justify-center items-center">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="w-[72%] flex justify-between gap-6">
            {cardData.map((card, index) => (
              <div key={index} className="bg-white shadow-md overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full object-cover" />
                <div className="p-5 text-custom-gray">
                  <p className=" text-sm font-semibold mb-2">{card.date}</p>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className=" text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>

        <div className='w-full flex justify-end'>
           <button className='Brown_button mt-5 rounded-3xl p-3 px-12 text-base text-white bg-custom-gray'>Lees meer</button>
        </div>
      </div>

        <div className='absolute bottom-32 right-20 z-20'>
              <img src={AltroLogo} alt="" />
        </div>
    </div>
  )
}

export default InfoCard
