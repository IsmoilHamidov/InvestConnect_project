import TextImage from "../../assets/images/Group 524.png"

function IntroductionText() {
  return (
    <div className='relative min-h-[64rem]'>
        <div className='w-full h-[55rem] bg-custom-blue-gray rounded-br-none py-12'
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)'
            }}>

            <div className='flex flex-col justify-center items-center max-w-7xl m-auto text-white font-light'>
                <h3 className='mb-5 text-3xl'>U bent bij ons aan het juiste adres.</h3>
                <div className='flex text-center flex-col items-center justify-center  w-10/12'>
                    <p className='leading-8'>Altijd al willen investeren in vastgoed? Al jaren blijkt vastgoed één van de veiligste manieren om uw 
                        zuurverdiende centjes te laten renderen. Want terwijl u naarstig spaart, slinkt de waarde van uw spaargeld ieder jaar, door de stijgende inflatie.
                        De invloed van de dalende koopkracht heeft een groter effect op uw geld, dan de povere intresten van 0,11% die u nu ontvangt.
                    </p>
                    <span className='mt-4 mb-6'>
                        Dus gaan mensen vaak op zoek naar alternatieven, om hun geld te laten opbrengen: van speculeren op de beurs tot beleggen in obligaties, fondsen of verzekeringen.
                    </span>
                    <span>
                        Maar hebt u al eens aan een investering in vastgoed gedacht?
                    </span>
                </div>       
                <button className='Brown_button relative z-40 rounded-3xl p-3 px-12 text-base text-white bg-custom-gray mt-16 '>NEEM CONTACT OP</button>
            </div>
        </div>
        <img className='absolute top-[480px] z-10 left-1/2 transform -translate-x-1/2 z-5 w-[53rem]  object-contain' 
            src={TextImage} alt="TextImage" />
                
    </div>
  )
}

export default IntroductionText
