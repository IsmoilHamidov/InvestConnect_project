import About from "./About"
import AboutImage from "./AboutImage"
import Introduction_Image from "./Introduction"
import IntroductionText from "./IntroductionText"
import InfoCard from "./InfoCard"
import Projects from "./Projects"
import Service from "./Service"
import Vebinar from "./Vebinar"
import Professionals from "./Professionals"
import Footer from "../../components/Footer/Footer"


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
      <Footer/>
    </>
  )
}

export default Home
