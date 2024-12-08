import rectangle from "../../assets/images/vebunar_image.png"


function Vebinar() {
  return (
      <div className='full mt-5'>
        <div className='flex justify-between items-end relative m-auto border border-custom-gray
             max-w-7xl p-8'>
          <img className='h-[31rem] object-contain' src={rectangle} alt="vebinar image" />
          <div className='w-[53%]'>
            <h2 className='font-semibold text-5xl leading-[60px] text-custom-blue-gray'>Webinar - Anti-Crisis Strategy for Business Success</h2>
            <button className='Brown_button rounded-3xl p-3 px-12 text-base text-white bg-custom-gray mt-16'>SCHRIJF IN</button>
          </div>

          <div className=' px-12 py-5 gap-x-3 flex flex-wrap justify-center items-end  
                absolute top-20 left-[520px] bg-[#D6D5D5] text-custom-gray'>
            <h2 className='text-6xl font-bold'>28</h2>
            <p className='text-5xl font-medium'>March 2024</p>
          </div>
        </div>
      </div> 
  )
}



export default Vebinar
