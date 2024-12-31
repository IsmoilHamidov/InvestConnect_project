import { FaChartBar } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

const analyticsItems = [
  {
    id: 1,
    icon: <HiUsers className="text-[#749BA9] text-3xl mb-4" />,
    title: "1 Project View",
    description: "Discover who's viewed your profile",
  },
  {
    id: 2,
    icon: <FaChartBar className="text-[#B29C6F] text-3xl mb-4" />,
    title: "0 Post Impressions",
    description: "Start a post to increase engagement",
  },
];

export default function AnalyticsBox() {
  return (
    <div className="w-full bg-white shadow-md border-[1px] rounded-[15px] p-6 py-8">
      <h2 className="text-xl font-bold mb-4 text-custom-gray">Analytics</h2>
      <div className="text-sm text-gray-500 mb-5">Private to you</div>
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
