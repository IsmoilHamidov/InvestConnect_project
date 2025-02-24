import About_long_image from "../../assets/images/quote-img.jpg";
import quotes from "../../assets/images/quote-icon.png";
import aboutLogo from "../../assets/images/Altro Logo Icon.png";
import { useTranslation } from "@/store/useTransition";

function AboutImage() {
  const { homePage } = useTranslation();

  return (
    <div className="w-full flex justify-center items-center mt-32">
      <div
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="350"
        data-aos-offset="0"
        className="relative  max-w-7xl w-full h-[24rem] flex justify-center items-center"
        style={{
          backgroundImage: `url(${About_long_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          data-aos="fade-right"
          data-aos-offset="400"
          data-aos-easing="ease-in-sine"
          className="absolute left-20 top-16 w-24 h-20 "
          src={quotes}
          alt="quotes"
        />
        <h3
          data-aos="fade-right"
          data-aos-offset="500"
          data-aos-easing="ease-in-sine"
          className=" left-28 w-8/12 top-14 text-5xl font-medium leading-[64px] text-white"
        >
          {homePage.financialGoals}
        </h3>
        <img
          id="our_service"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1400"
          data-aos-delay="800"
          className="absolute -bottom-24 -right-16 h-[12.5rem]"
          src={aboutLogo}
          alt="aboutLogo"
        />
      </div>
    </div>
  );
}

export default AboutImage;
