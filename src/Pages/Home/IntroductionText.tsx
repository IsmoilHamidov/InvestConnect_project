import { useTranslation } from "@/components/LanguageTriger";
import TextImage from "../../assets/images/profile_sample.jpg";
import profilLofo from "../../assets/images/profile_sample_logo.png";

function IntroductionText() {
  const { homePage } = useTranslation();

  return (
    <div className="relative min-h-[64rem] ">
      <div
        className="w-full h-[55rem]  bg-primary rounded-br-none py-12 -z-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 0% 100%)",
        }}
      >
        <div className="flex flex-col justify-center items-center max-w-7xl m-auto text-white font-light">
          <h3 className="mb-5 text-3xl" data-aos="fade-down">
            {homePage.introductionText.title}
          </h3>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex text-center flex-col items-center justify-center  w-10/12"
          >
            <p className="leading-8">
            {homePage.introductionText.paragraph1}
            </p>
            <span className="mt-4 mb-6">
            {homePage.introductionText.paragraph2}
            </span>
            <span>
            {homePage.introductionText.paragraph3}
            </span>
          </div>
          <a
            href="tel:+998902798892"
            className="cursor-pointer Brown_button relative rounded-3xl p-3 px-12 text-base text-white bg-secondary mt-16 "
          >
            {homePage.introductionText.button}
            </a>
        </div>
      </div>

      <div className="absolute w-[54rem] h-[31rem] top-[480px] left-1/2 transform -translate-x-1/2 ">
        <div
          className="absolute top-[395px] -left-[35px] border-2 border-white  drop-shadow-2xl
                 flex justify-center items-center rounded-full   bg-primary w-20 h-20 p-2"
        >
          <img
            src={profilLofo}
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <img
          className="rounded-2xl border border-primary h-full w-full object-contain shadow-lg "
          src={TextImage}
          alt="TextImage"
        />
      </div>
    </div>
  );
}

export default IntroductionText;
