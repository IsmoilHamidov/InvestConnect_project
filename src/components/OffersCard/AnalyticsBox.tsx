import { FaChartBar } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

const analyticsItems = [
  {
    id: 1,
    icon: <HiUsers className="text-[#749BA9] text-3xl mb-4" />,
    title: "1 Loyiha Ko'rinishi",
    description: "Loyihalardan qay biri koʻrilganligini bilish",
  },
  {
    id: 2,
    icon: <FaChartBar className="text-[#B29C6F] text-3xl mb-4" />,
    title: "0 Post taassurotlari",
    description: "Faollikni oshirish uchun postni boshlang",
  },
];

export default function AnalyticsBox() {
  return (
    <div className="w-full bg-white shadow-md border-[1px] rounded-[15px] p-6 py-8">
      <h2 className="text-xl font-bold mb-4 tex-secondary">Analitika</h2>
      <div className="text-sm text-gray-500 mb-5">Sizga shaxsiy bo'lganlar</div>
      <div className="grid grid-cols-2 gap-4">
        {analyticsItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3 
             shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default"
          >
            {item.icon}
            <div className="text-md font-semibold text-gray-800">{item.title}</div>
            <div className="text-[12px] text-gray-500 text-center mt-1">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
