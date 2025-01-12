import about_image from "../../assets/images/img01.jpg"

function About() {
  return (
    <div className='bg-white w-full mt-20'>
        <div className='max-w-7xl m-auto flex justify-between' id="about_us">
            <div className='w-[57%]'>
                <h2 className='text-[2.85rem] leading-[65px] font-normal text-custom-gray'>Nima uchun Invest Connect ni tanlashingiz kerak? </h2>
                <p className='my-8 leading-7 text-custom-gray'>InvestConnect sizga quyidagi imkoniyatlarni taqdim etadi:
                Innovatsion imkoniyatlar: Bizning platformamizda butun dunyodan qiziqarli va istiqbolli loyihalar jamlangan. Bu g‘oya egalari o‘z bizneslarini rivojlantirish uchun mablag‘ izlaydilar, siz esa ulardan daromad olish imkoniyatiga ega bo‘lasiz. </p>
                <p className='leading-7 text-custom-gray'>
                Shaffoflik va ishonch: Har bir loyiha chuqur tahlildan o‘tadi, va siz aniq ma’lumotlarga asoslangan holda qaror qabul qilasiz.
                Birgalikdagi muvaffaqiyat: InvestConnect faqat investorlar uchun emas, balki loyiha egalari uchun ham barqaror o‘sish yaratadi. Biz har bir tomonning manfaatlarini muvozanatda saqlashga intilamiz.
                Foydalanuvchi uchun qulay tizim: Loyihalarni ko‘rib chiqish, sarmoya kiritish va monitoring qilish jarayoni oddiy va tushunarli qilib ishlab chiqilgan.
                </p>
            </div>
            <img className='w-[31rem] h-[29rem] object-contain' src={about_image} alt="" />
        </div>
    </div>
  )
}

export default About
