import React from 'react'
import logo from "../../assets/images/Altro Invest Logo.png"
import bigLogo from "../../assets/images/Altro Logo.png"


function Footer() {
  return (
    <>
        <div className='w-full bg-[#F0F3F4] py-24 relative'>
                <div className='max-w-7xl  m-auto flex justify-between relative z-40'>
                    <div className='w-[35%]  flex flex-col'>
                        <img src={logo} className='w-[11rem] h-[5rem] object-contain' alt="logo" />
                        <a href="#" className='text-custom-blue-gray mt-8 '>
                            <i className="fa-solid fa-phone me-2"></i>
                            09 / 279 88 92
                        </a>
                        <a href="#" className='text-custom-blue-gray mt-4'>
                            <i className="fa-solid fa-envelope me-2"></i>
                            info@altro-invest.be
                        </a>
                        <div className='flex mt-8 gap-x-3 text-[13px] '>
                                <a  href='#' className='w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-custom-gray'>
                                <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href='#' className='w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-custom-gray'>
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href='#' className='w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-custom-gray'>
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                                <a href='#' className='w-7 h-7 text-[#443B3A] flex justify-center items-center rounded-full border border-custom-gray'>
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                        </div>
                    </div>

                    <div className='w-[25%] flex flex-col 
                        gap-y-2 text-[#756E6E] font-medium'>
                        <h4 className='text-custom-gray text-lg mb-2'>SITEMAP </h4>
                        <a href='#'>Aanbod</a>
                        <p>Invest platform</p>
                        <a href='#'>Onze diensten</a>
                        <a href='#'>Events</a>
                        <a href='#'>Partners</a>
                    </div>
                    <div className='w-[25%] flex flex-col 
                        gap-y-2 text-[#756E6E] font-medium'>
                        <h4 className='text-custom-gray text-lg mb-2'>COMMUNICATE </h4>
                        <a href='#'>Blog</a>
                        <a href='#'>Podcasts</a>
                        <a href='#'>Pers</a>
                        <a href='#'>Contact</a>
                    </div>
                    <div className='w-[25%] flex flex-col 
                        gap-y-2 text-[#756E6E] font-medium'>
                        <h4 className='text-custom-gray text-lg mb-2'>LEGAL </h4>
                        <a href='#'>Algemene voorwaarden</a>
                        <a href='#'>Privacy policy</a>
                        <a href='#'>Cookie policy</a>
                        <a href='#'>Contact</a>
                    </div>


                </div>
                <div className='absolute top-0 right-20 z-20'>
                    <img className='w-[26rem] h-full' src={bigLogo} alt="" />
                </div>
        </div>
        
        <div className='w-full bg-custom-blue-gray py-4 relative z-40'>
            <p className='max-w-7xl m-auto text-white'>Copyright © 2022 Altro Invest. All Rights Reserved.</p>
        </div>
    </>
  )
}

export default Footer
