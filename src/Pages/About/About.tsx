import about_image from "../../assets/images/img01.jpg"

function About() {
  return (
    <div className='bg-white w-full mt-20 '>
        <div className='max-w-7xl m-auto flex justify-between'>
            <div className='w-[57%]'>
                <h2 className='text-[2.85rem] leading-[65px] font-normal text-custom-gray'>Waarom kiezen voor Altro Invest? </h2>
                <p className='my-8 leading-7 text-custom-gray'>Centraal aan de oprichting van Altro Invest is onze overtuiging dat dienstverlening met betrekking tot beleggen in woonvastgoed beter kan én moet. Geen gefragmenteerd advies, maar een onafhankelijke totaalaanpak over geheel Vlaanderen én Brussel. </p>
                <p className='leading-7 text-custom-gray'>Door zowel kopers (vraag) als verkopers (aanbod) te adviseren en te verbinden streeft Altro Invest naar een lange termijnrelatie met zijn klanten volgens het one-stop-shop principe: wij beschikken over een brede waaier aan expertise en diensten om een investeringsbeslissing in residentieel vastgoed te onderbouwen.</p>
            </div>
            <img className='w-[31rem] h-[29rem] object-contain' src={about_image} alt="" />
        </div>
    </div>
  )
}

export default About
