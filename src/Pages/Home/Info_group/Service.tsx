import { ServiceArr } from '@/constants/service';


function Service() {
  return (
    <div className="py-16 mt-20 flex flex-col justify-center items-center">
     <h2 className='text-center text-[2.5rem] font-light mb-7'>Onze diensten</h2>
      {ServiceArr.map((service, index) => (
        <div
          key={service.id}
          className={` max-w-7xl mb-8 m-auto flex flex-wrap justify-between items-center gap-8 ${
            index % 2 !== 0 ? 'flex-row-reverse' : ''
          }`}
        >
          <div className="w-[62%]  h-auto p-2 py-4">
            <h3 className="text-custom-blue-gray text-2xl font-semibold 
                mb-1 first-letter:text-4xl ">
                {service.title}
            </h3>

            <div className='flex gap-x-4 mt-4'>
                <div className="px-[7px] h-[full]  bg-custom-blue-gray "></div>
                <p className='text-custom-gray leading-7' >{service.text}</p>
            </div>
          </div>

          <div
            className={`w-[30%] mt-4 flex ${
              index % 2 !== 0 ? 'justify-start' : 'justify-end'
            }`}>
          
            <img
              src={service.img}
              alt={`Image for ${service.title}`}
              className="w-[20rem] h-[15rem] object-contain"
            />
          </div>

        </div>
      ))}
      <button className='Brown_button rounded-3xl p-3 px-12 text-base text-white bg-custom-gray mt-16 '>NEEM CONTACT OP</button>
    </div>
  );
}

export default Service;
