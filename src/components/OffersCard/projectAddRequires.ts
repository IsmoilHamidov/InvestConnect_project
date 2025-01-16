export const fields = [
  { 
    name: "name", 
    label: "Loyiha Nomi", 
    type: "text", 
    placeholder: "Loyiha Nomi",
    requirement: 10
  },
  {
    name: "location",
    label: "Joylashuvni",
    type: "text",
    placeholder: "Joylashuvingizni kiriting",
  },
  {
    name: "business_plan",
    label: "Biznes-reja",
    type: "text",
    placeholder: "Biznes-rejani kiriting",
  },
  {
    name: "use_of_investment",
    label: "Investitsiyalardan foydalanish",
    type: "text",
    placeholder: "Investitsiyalarni qanday ishlatishni yozing",
  },
  {
    name: "price",
    label: "narxi",
    type: "number",
    step: "0.01",
    placeholder: "Narxni kiriting",
    requirement: 14
  },
  {
    name: "financial_forecasts",
    label: "Moliyaviy prognozlar",
    type: "text",
    placeholder: "Moliyaviy prognozlarni kiriting",
  },
  {
    name: "rendement",
    label: "samaradorlik (%)",
    type: "number",
    placeholder: "Samaradorlikni kiriting (%)",
  },
  {
    name: "investment_range",
    label: "Sotuvdan Daromad",
    type: "number",
    placeholder: "Sotuvdan tushumni kiriting",
  },
  {
    name: "short_description",
    label: "kompaniyaning qisqacha tavsifi",
    type: "text",
    placeholder: "Kompaniya haqida qisqacha ma'lumot yozing",
  },
  {
    name: "team_info",
    label: "Jamoa haqida ma'lumot",
    type: "text",
    placeholder: "Jamoa haqida qisqacha yozing",
  },
  {
    name: "team_details",
    label: "Jamoa tafsilotlar",
    type: "text",
    placeholder: "Jamoaning tafsilotlarini yozing",
  },
  {
    name: "contact_info",
    label: "Kompaniyaning aloqa ma'lumotlari",
    type: "text",
    placeholder: "Aloqa ma'lumotlarini kiriting",
  },
  {
    name: "market_analysis",
    label: "Bozor tahlili",
    type: "text",
    placeholder: "Bozor tahlilini yozing",
  },
  {
    name: "description",
    label: "Tavsif",
    type: "textarea",
    placeholder: "Loyiha haqida batafsil tavsif yozing",
  },
];

export const errorTranslations: Record<string, string> = {
  "Ensure that there are no more than 10 digits in total.": "Raqamlar soni 10 tadan oshmasligi kerak.",
  "Ensure this field has no more than 5 characters.": "Bu maydonda 5 ta belgidan ko‘p bo‘lishi mumkin emas.",
  // Добавь другие ошибки сюда
};

