import About_long_image from "../../../assets/images/quote-img.jpg"
import quotes from "../../../assets/images/quote-icon.png"
import aboutLogo from '../../../assets/images/Altro Logo Icon.png'


function AboutImage() {
  return (
    <div className="w-full flex justify-center items-center mt-32">
        <div className='relative  max-w-7xl w-full h-[24rem] flex justify-center items-center'
            style={{
                backgroundImage: `url(${About_long_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>

            <img className="absolute left-20 top-16 w-24 h-20 " src={quotes} alt="quotes" />
            <h3 className=" left-28 w-8/12 top-14 text-6xl font-medium leading-[64px] text-white">Investeer in vastgoed met een helder plan	</h3>
            <img className="absolute -bottom-24 -right-16 h-[12.5rem]" src={aboutLogo} alt="aboutLogo" />
        </div>
    </div>
  )
}

export default AboutImage
