import About from "./About/About"
import AboutImage from "./About/AboutImage"
import Introduction_Image from "./Introduction/Introduction"
import IntroductionText from "./Introduction/IntroductionText"
import InfoCard from "./Info_group/InfoCard"
import Projects from "./Info_group/Projects"
import Service from "./Info_group/Service"
import Vebinar from "./Info_group/Vebinar"
import Professionals from "./Info_group/Professionals"


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
      <Professionals/>
    </>
  )
}

export default Home
