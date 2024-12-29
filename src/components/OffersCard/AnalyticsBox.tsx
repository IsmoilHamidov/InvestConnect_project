import { FaChartBar } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";


export default function AnalyticsBox() {
  return (
    <div className="w-full bg-white shadow-xl border-[1px] rounded-[15px] p-6 py-8">
      <h2 className="text-xl font-bold mb-4 text-custom-gray">Analytics</h2>
      <div className="text-sm text-gray-500 mb-6">Private to you</div>
      <div className="grid grid-cols-2 gap-4">
       
        <div className="flex  flex-col items-center justify-center bg-gray-100 rounded-lg p-3 
         shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default">
          <HiUsers  className="text-[#B29C6F] text-4xl mb-2" />
          <div className="text-md font-semibold text-gray-800">1 Project View</div>
          <div className="text-[12px] text-gray-500 text-center mt-1">
            Discover who's viewed your profile.
          </div>
        </div>

        {/* Post Impressions */}
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3
         shadow-sm hover:shadow-md transition-shadow duration-300">
          <FaChartBar className="text-[#749BA9] text-4xl mb-2" />
          <div className="text-md font-semibold text-gray-800">
            0 Post Impressions
          </div>
          <div className="text-[12px] text-gray-500 text-center mt-1">
            Start a post to increase engagement.
          </div>
        </div>
      </div>
    </div>
  );
}
