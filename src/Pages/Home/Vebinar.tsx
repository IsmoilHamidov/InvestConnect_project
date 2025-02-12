import rectangle from "../../assets/images/vebunar_image.png"


function Vebinar() {
  return (
      <div className='full mt-5'>
        <div className='flex justify-between m-auto border border-secondary border-b-0
             max-w-7xl p-8 relative rounded-t-xl'>
            <div>
                <img className='h-[31rem] object-contain' src={rectangle} alt="vebinar image" />
            </div>

            <div className="flex flex-col  justify-between w-[53%] pt-12">
                <div className='self-start px-12 py-5 gap-x-3 flex flex-wrap justify-center items-end  
                      top-20 left-[520px] bg-[#D6D5D5] text-secondary'>
                  <h2 className='text-6xl font-semibold'>28 Mart</h2>
                  <p className='text-5xl font-medium ms-2'>2025 yil</p>
                </div>

                <h2 className='font-semibold text-[2.5rem] leading-[60px] text-primary'>
                    Vebinar-biznes muvaffaqiyati uchun Inqirozga qarshi strategiya
                </h2>
                <button className='self-start Brown_button rounded-3xl p-3 px-12 text-base text-white bg-secondary mt-16'>
                    Ro'yxatdan o'tish
                </button>

            </div>

        </div>
      </div> 
  )
}



export default Vebinar
