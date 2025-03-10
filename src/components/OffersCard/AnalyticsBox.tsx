import { FaChartBar } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

const analyticsItems = [
  {
    id: 1,
    icon: <HiUsers className="text-[#749BA9] text-3xl sm:text-4xl mb-3 sm:mb-4" />,
    title: "1 Loyiha Ko'rinishi",
    description: "Loyihalardan qay biri koʻrilganligini bilish",
  },
  {
    id: 2,
    icon: <FaChartBar className="text-[#B29C6F] text-3xl sm:text-4xl mb-3 sm:mb-4" />,
    title: "0 Post taassurotlari",
    description: "Faollikni oshirish uchun postni boshlang",
  },
];

export default function AnalyticsBox() {
  return (
    <div className="w-full bg-white shadow-md border rounded-2xl p-4 sm:p-6 md:p-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-secondary">
        Analitika
      </h2>
      <div className="text-xs sm:text-sm text-gray-500 mb-5">
        Sizga shaxsiy bo'lganlar
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {analyticsItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 sm:p-5 shadow-sm 
             hover:shadow-md transition-shadow duration-300 cursor-default w-full sm:w-auto"
          >
            {item.icon}
            <div className="text-sm sm:text-md font-semibold text-gray-800 text-center">
              {item.title}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 text-center mt-1">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
