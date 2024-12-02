import About from "../About/About"
import AboutImage from "../About/AboutImage"
import Introduction_Image from "../Introduction/Introduction"
import IntroductionText from "../Introduction/IntroductionText"
import InfoCard from "../OurService/InfoCard"
import Projects from "../OurService/Projects"
import Service from "../OurService/Service"
import Vebinar from "../OurService/Vebinar"


function Home() {


  return (
    <>
      <Introduction_Image/>
      <IntroductionText/>
      <About/>
      <AboutImage/>
      <Service/>
      <Projects/>
      <Vebinar/>
      <InfoCard/>
    </>
  )
}

export default Home
