<<<<<<< HEAD
import { Outlet } from "react-router-dom"
=======
import About from "../About/About"
import AboutImage from "../About/AboutImage"
>>>>>>> f49036fb1c6773676e901c395aeeecb1764fea5c
import Introduction_Image from "../Introduction/Introduction"
import IntroductionText from "../Introduction/IntroductionText"
import Projects from "../OurService/Projects"
import Service from "../OurService/Service"


function Home() {


  return (
    <>
      <Introduction_Image/>
      <IntroductionText/>
      <About/>
      <AboutImage/>
      <Service/>
      <Projects/>
    </>
  )
}

export default Home
