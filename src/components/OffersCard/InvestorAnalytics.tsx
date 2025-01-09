import { AiFillLike } from "react-icons/ai";
import { FaEnvelopeOpen } from "react-icons/fa";


const analyticsData = [
  {
    id: 1,
    icon: <FaEnvelopeOpen className="text-[#749BA9] text-3xl mb-3" />,
    title: "0 Ochilgan loyiha",
    description: "Barcha ochilgan loyihalarni ko'rish uchun bosing",
  },
  {
    id: 2,
    icon: <AiFillLike className="text-[#B29C6F] text-3xl mb-4" />,
    title: "0 Yoqtirilgan loyiha",
    description: "Click to see all liked projects",
  },
];

export default function InvestorAnalytics() {
  return (
    <div className="w-full min-h-[16rem] bg-white shadow-md border-[1px] rounded-[15px] p-6 py-8">
      <h2 className="text-xl font-bold mb-4 text-custom-gray">Analitika</h2>
      <div className="text-sm text-gray-500 mb-5">Sizga shaxsiy bo'lganlar</div>
      <div className="grid grid-cols-2 gap-4">
        {analyticsData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center  bg-gray-100 rounded-lg px-2 py-3
             shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default"
          >
            {item.icon}

            <div>
              <div className="text-md font-semibold text-gray-800 text-center">{item.title}</div>
              <div className="text-[12px] text-gray-500 text-center mt-1">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
