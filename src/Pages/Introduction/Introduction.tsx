<<<<<<< HEAD
import Navbar from "../Navbar/Navbar";
import intro_image from "../../assets/images/Head_image.png";
import Intro_logo from "../../assets/images/Altro icon.png";
=======
import Navbar from '../Navbar/Navbar'
import intro_image from "../../assets/images/Head_image.png"
import Intro_logo from "../../assets/images/Altro icon.png"
import IntroductionText from './IntroductionText'
>>>>>>> f49036fb1c6773676e901c395aeeecb1764fea5c

function Introduction_Image() {

<<<<<<< HEAD
  return (
    <div
      className=" intro_box relative h-[55rem] w-full  py-5"
      style={{
        backgroundImage: `url(${intro_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      
      <div
        style={{
          position: "absolute",
          top: "57%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="w-full flex justify-center items-center"
      >
        <img className="h-[26rem] object-contain" src={Intro_logo} alt="" />
      </div>
    </div>
  );
=======
        <div
            className='intro_box relative h-[55rem] w-full  py-5'
            style={{
                backgroundImage: `url(${intro_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
             
            <Navbar/>
          
                <div 
                style={{position: 'absolute', top: '57%', left: '50%', transform: 'translate(-50%, -50%)'}}
                className='w-full flex justify-center items-center'>
                    <img className='h-[26rem] object-contain' src={Intro_logo} alt="" />
                </div>
        </div>
  )
>>>>>>> f49036fb1c6773676e901c395aeeecb1764fea5c
}

export default Introduction_Image;
