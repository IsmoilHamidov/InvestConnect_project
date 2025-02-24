import { useTranslation } from "@/store/useTransition";
import about_image from "../../assets/images/img01.jpg";

function About() {
  const { homePage } = useTranslation();

  return (
    <div className="bg-white w-full mt-20">
      <div className="max-w-7xl m-auto flex justify-between">
        <div className="w-[57%]">
          <h2
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            className="text-[2.85rem] leading-[65px] font-normal text-secondary"
          >
            {homePage.about.title}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay={250}
            className="my-8 leading-7 text-secondary"
          >
            {homePage.about.paragraph1}
          </p>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay={300}
            className="leading-7 text-secondary"
          >
            {homePage.about.paragraph2}
          </p>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay={350}
            className="leading-7 text-secondary"
          >
            {homePage.about.paragraph3}
          </p>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay={400}
            className="leading-7 text-secondary"
          >
            {homePage.about.paragraph4}
          </p>
        </div>
        <img
          data-aos="fade-left"
          data-aos-delay={350}
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="w-[31rem] h-[29rem] object-contain"
          src={about_image}
          alt=""
        />
      </div>
    </div>
  );
}

export default About;
