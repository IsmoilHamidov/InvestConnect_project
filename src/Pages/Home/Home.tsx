import About from "./About"
import AboutImage from "./AboutImage"
import Introduction_Image from "./Introduction"
import IntroductionText from "./IntroductionText"
import InfoCard from "./InfoCard"
import Projects from "./Projects"
import Service from "./Service"
// import Vebinar from "./Vebinar"
import Professionals from "./Professionals"
import Footer from "../../components/Footer/Footer"
import { NavbarStep } from "@/components/Navbar/NavbarStep"
import ScrollPositionManager from "@/components/Loading/ScrollPosition/SaveScroll"
import Example from "@/components/OffersCard/example"


function Home() {
 
  return (
    <>
      <ScrollPositionManager />
      <NavbarStep />
      <Introduction_Image/>
      <IntroductionText/>
      <Projects/>
      <About/>
      <AboutImage/>
      <Service/>
      {/* <Vebinar/> */}
      <InfoCard/>
      <Professionals/>
      <Footer/>
      <Example/>
    </>
  )
}

export default Home
