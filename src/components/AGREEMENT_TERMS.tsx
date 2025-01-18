
const AGREEMENT_TERMS = () => {
  return (
    <>
      <p className="text-sm mb-4 leading-relaxed">
  <strong className="text-primary">Shartnoma bo‘yicha kelishuvlar:</strong> Har bir 
  ishtirokchi quyida keltirilgan shartlarni o‘qib, to‘liq qabul qilgan holda o‘z faoliyatini amalga oshiradi.
</p>
<ul className="list-disc pl-6 mb-4 max-h-[26rem] overflow-y-auto text-lg leading-8 text-black 
                      whitespace-pre-line scrollbar-thin scrollbar-thumb-gray-400 
                      scrollbar-track-gray-200 pe-4">
  <li className="mb-3">
    <strong className="text-primary">Sarmoya kiritish:</strong>
    <p className="mt-1">
      Siz tomonidan kiritilgan sarmoya qaytarilmas xususiyatga ega bo‘lib, mazkur mablag‘ startapning maqsadlariga muvofiq foydalaniladi. 
      Sarmoyadan kelib chiqadigan daromad sizga faqat belgilangan foyda taqsimoti asosida taqdim etiladi.
    </p>
  </li>
  <li className="mb-3">
    <strong className="text-primary">Xarid qilish:</strong>
    <p className="mt-1">
      Startapdan mahsulot yoki xizmat sotib olish faqat oldindan to‘lov amalga oshirilganidan keyin rasmiylashtiriladi. 
      Har bir mahsulot yoki xizmat haqida batafsil ma’lumot taqdim etiladi.
    </p>
  </li>
  <li className="mb-3">
    <strong className="text-primary">Xavf va javobgarlik:</strong>
    <p className="mt-1">
      Har qanday sarmoya kiritish moliyaviy yo‘qotishlar xavfi bilan bog‘liqdir. Startap barcha jarayonlarni ochiq va shaffof olib borish majburiyatini oladi, 
      ammo kutilmagan holatlar yuzaga kelishi mumkinligini inobatga olish zarur.
    </p>
  </li>
  <li className="mb-3">
    <strong className="text-primary">Qonunchilikka muvofiqlik:</strong>
    <p className="mt-1">
      Barcha operatsiyalar O‘zbekiston Respublikasi qonunchiligi doirasida amalga oshiriladi. Har bir ishtirokchi qonun va qoidalarni buzmaslik majburiyatini oladi.
    </p>
  </li>
  <li className="mb-3">
    <strong className="text-primary">Nizolarni hal qilish:</strong>
    <p className="mt-1">
      Mazkur kelishuv yuzasidan yuzaga keladigan nizolar tomonlar o‘rtasida muzokaralar orqali hal qilinadi. Agar kelishuvga erishilmasa, nizo qonunchilikda belgilangan tartibda ko‘rib chiqiladi.
    </p>
  </li>
</ul>

    </>
  );
};

export default AGREEMENT_TERMS;


export const Paymentfields: { name: "message" | "cardNumber" | "expiryDate"; label: string; placeholder: string; rows?: number; maxLength?: number; type: "input" | "textarea" }[] = [
  {
    name: "message",
    label: "To'lov uchun xabar qoldirish",
    placeholder: "Xabaringizni kiriting",
    rows: 2,
    type: "textarea",
  },
  {
    name: "cardNumber",
    label: "Karta raqami",
    placeholder: "Karta raqamini kiriting",
    type: "input",
  },
  {
    name: "expiryDate",
    label: "Kartaning amal qilish muddati",
    placeholder: "MM/YY",
    type: "input",
  },
];
