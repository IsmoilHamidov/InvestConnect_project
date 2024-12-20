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
import { NavbarSaid } from "@/components/Navbar/NavbarSaid"
import { useAuthModalStore } from "@/store/authModalStore"


function Home() {
  const { openModal } = useAuthModalStore();

  return (
    <>
      <button onClick={() => openModal('registration')}>
        Открыть модалку регистрации
      </button>
      <button onClick={() => openModal('verification')}>
        Открыть модалку входа
      </button>
      <NavbarSaid />
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
