import TextImage from "../../assets/images/Group 524.png"

function IntroductionText() {
  return (
    <div className='relative min-h-[64rem] -z-10'>
        <div className='w-full h-[55rem] bg-custom-blue-gray rounded-br-none py-12'
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)'
            }}>

            <div className='flex flex-col justify-center items-center max-w-7xl m-auto text-white font-light'>
                <h3 className='mb-5 text-3xl'>Siz to'g'ri joyga keldingiz.</h3>
                <div className='flex text-center flex-col items-center justify-center  w-10/12'>
                    <p className='leading-8'>Har doim ko'chmas mulkka sarmoya kiritmoqchimisiz? Yil davomida,
                     ko'chmas mulk qattiq-kasb sizning pennies to'lash qilish uchun 
                     xavfsiz yo'llaridan biri bo'lishi uchun isbotlangan. Chunki siz tirishqoqlik bilan
                     tejaganingizda, inflyatsiyaning ko'tarilishi tufayli jamg'armalaringiz qiymati har yili kamayadi. Xarid qilish qobiliyatining pasayishi 
                     sizning pulingizga siz hozir olgan 0,11% foizdan ko'ra ko'proq ta'sir qiladi.
                    </p>
                    <span className='mt-4 mb-6'>
                    Shunday qilib, odamlar ko'pincha pul topish uchun alternativalarni izlaydilar: fond birjasida spekulyatsiya qilishdan obligatsiyalar, mablag'lar yoki sug'urtaga sarmoya kiritishgacha.
                    </span>
                    <span>
                     Lekin siz hech ko'chmas mulk investitsiya haqida o'ylab ko'rganmisiz?
                    </span>
                </div>       
                <button className='Brown_button relative z-40 rounded-3xl p-3 px-12 text-base text-white bg-custom-gray mt-16 '>ALOQA</button>
            </div>
        </div>
        <img className='absolute top-[480px] z-10 left-1/2 transform -translate-x-1/2 z-5 w-[53rem]  object-contain' 
            src={TextImage} alt="TextImage" />
                
    </div>
  )
}

export default IntroductionText
