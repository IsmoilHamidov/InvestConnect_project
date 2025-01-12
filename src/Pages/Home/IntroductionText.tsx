import TextImage from "../../assets/images/Group 524.png"

function IntroductionText() {
  return (
    <div className='relative min-h-[64rem] '>
        <div className='w-full h-[55rem] bg-custom-blue-gray rounded-br-none py-12'
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)'
            }}>

            <div className='flex flex-col justify-center items-center max-w-7xl m-auto text-white font-light'>
                <h3 className='mb-5 text-3xl'>Siz to'g'ri joyga keldingiz.</h3>
                <div className='flex text-center flex-col items-center justify-center  w-10/12'>
                    <p className='leading-8'>Har doim sarmoya kiritish uchun innovatsion va barqaror loyihalar izlayapsizmi?
                    InvestConnect – bu investorlar va g‘oya egalari uchun mo‘ljallangan global platforma. Bizning maqsadimiz – yangi startaplarni, kreativ biznes g‘oyalarni va rivojlanayotgan loyihalarni qo‘llab-quvvatlash uchun samarali bog‘lovchi bo‘lish.
                    </p>
                    <span className='mt-4 mb-6'>
                    Hozirgi kunda inflyatsiya tufayli jamg‘armalaringizning qiymati pasaymoqda, va an’anaviy saqlash usullari ko‘pincha foydasiz bo‘lib qolmoqda
                    </span>
                    <span>
                    Shu bois ko‘plab odamlar pul topish va sarmoya kiritishning ishonchli yo‘llarini izlashadi.
                    </span>
                </div>       
                <button className='Brown_button relative rounded-3xl p-3 px-12 text-base text-white bg-custom-gray mt-16 '>ALOQA</button>
            </div>
        </div>
        <img className='absolute top-[480px] left-1/2 transform -translate-x-1/2 z-5 w-[53rem]  object-contain' 
            src={TextImage} alt="TextImage" />
                
    </div>
  )
}

export default IntroductionText
