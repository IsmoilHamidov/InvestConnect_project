import React from 'react'
import image1 from "../../../assets/images/Dimitri.png"
import image2 from "../../../assets/images/Nico.png"
import image3 from "../../../assets/images/Dave.png"



const cardInfo = [
  {
    id: 1,
    image: image1,
    name: "Dimitri Raemdonck",
    specialist: "Specialist investeringsvastgoed",
  },
  {
    id: 2,
    image: image2,
    name: "Nico Di Tarantok",
    specialist: "Specialist investeringsvastgoed",
  },
  {
    id: 3,
    image: image3,
    name: "Dave Bracke",
    specialist: "Zaakvoerder",
  }
]


function Professionals() {
  return (
    <div className='py-32'>
        <div className='max-w-7xl m-auto '>
          <div className='w-full flex justify-center'>
            <h3 className="w-3/5 text-center text-[2.5rem] font-light text-custom-gray">
              Een gespecialiseerd team met een persoonlijke aanpak
            </h3>
          </div>

          <div className='flex justify-between items-center mt-16'> 
              {cardInfo.map((newCards)=>(
                  <div key={newCards.id} className='w-[30%] flex flex-col  justify-center items-center gap-y-4'>
                      <div className='w-[24rem] h-[24rem] rounded-full'>
                        <img src={newCards.image} alt={newCards.name} />
                      </div>
                       <p className='text-xl font-medium'>{newCards.name}</p>
                       <p className='font-light text-custom-blue-gray'>{newCards.specialist}</p>
                       <div className='flex  gap-x-3 text-sm '>
                            <a  href='#' className='w-8 h-8 text-[#756E6E] flex justify-center items-center rounded-full border border-custom-gray'>
                              <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href='#' className='w-8 h-8 text-[#756E6E] flex justify-center items-center rounded-full border border-custom-gray'>
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href='#' className='w-8 h-8 text-[#756E6E] flex justify-center items-center rounded-full border border-custom-gray'>
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                            <a href='#' className='w-8 h-8 text-[#756E6E] flex justify-center items-center rounded-full border border-custom-gray'>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                       </div>
                  </div>
              ))}
          </div>

          <div className='w-full flex justify-center items-center mt-12'>
              <button className='Blue_button mt-5 rounded-3xl p-3 px-10 text-base text-white bg-custom-blue-gray'>CONTACTEER</button>
          </div>
        </div>
    </div>
  )
}

export default Professionals
