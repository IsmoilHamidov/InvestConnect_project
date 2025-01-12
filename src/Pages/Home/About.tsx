import about_image from "../../assets/images/img01.jpg"

function About() {
  return (
    <div className='bg-white w-full mt-20'>
        <div className='max-w-7xl m-auto flex justify-between' id="about_us">
            <div className='w-[57%]'>
                <h2 className='text-[2.85rem] leading-[65px] font-normal text-custom-gray'>Nima uchun Invest Connect ni tanlashingiz kerak? </h2>
                <p className='my-8 leading-7 text-custom-gray'>Invest Connect kompaniyasini tashkil etishning markazida turar joy ko'chmas mulkiga sarmoya kiritish bo'yicha xizmatlar yaxshilanishi va yaxshilanishi kerakligiga ishonchimiz komil. Parchalangan maslahat yo'q, lekin Flandriya va Bryussel bo'ylab mustaqil kompleks yondashuv. </p>
                <p className='leading-7 text-custom-gray'>Xaridorlarga (talab) va sotuvchilarga (ta'minot) maslahat berish va bog'lash orqali Invest Connect o'z mijozlari bilan "yagona oyna" tamoyiliga muvofiq uzoq muddatli munosabatlarga intiladi: bizda investitsiyalarni qo'llab-quvvatlash bo'yicha keng ko'lamli tajriba va xizmatlar mavjud. ko'chmas mulkni asoslash uchun turar-joyda qaror.</p>
            </div>
            <img className='w-[31rem] h-[29rem] object-contain' src={about_image} alt="" />
        </div>
    </div>
  )
}

export default About
