import { useGetPrivateInfoQuery } from "@/store/slice/products";
import { FaStar } from "react-icons/fa";

const baseUrl = "https://bakirali007.pythonanywhere.com/"

const PrivateInfoCard = ({ productId }: { productId: number }) => {
  const {
    data: getPrivateInfo,
    isLoading,
    error,
  } = useGetPrivateInfoQuery(productId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Данные для отображения секций
  const sections = [
    {
      title: "Tuzilgan sana",
      value: getPrivateInfo?.created_at ? formatDate(getPrivateInfo.created_at) : null,
    },
    {
      title: "Kontakt",
      value: getPrivateInfo?.contact_info?.replace(/\r\n/g, ", "),
    },
    {
      title: "Biznes-reja",
      value: getPrivateInfo?.business_plan,
    },
    {
      title: "Moliyaviy prognozlar",
      value: getPrivateInfo?.financial_forecasts,
    },
    {
      title: "Bozor tahlili",
      value: getPrivateInfo?.market_analysis,
    },
    {
      title: "Jamoa haqida",
      value: getPrivateInfo?.team_info,
    },
    {
      title: "Investitsiya ishlatilishi",
      value: getPrivateInfo?.use_of_investment,
    },
  ];

  return (
    <div className="w-full mt-8">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : getPrivateInfo ? (
        <div className="rounded-xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-x-1 text-[#B29C6F]">
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div
              className={`${
                getPrivateInfo.is_active ? "bg-green-200 text-green-700" : "bg-red-700 text-red-200"
              } py-1 px-4 rounded-xl shadow-sm`}
            >
              {getPrivateInfo.is_active ? "Active" : "Inactive"}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Loyihaga oid shaxsiy ma'lumotlar
          </h3>

          {/* Dynamic Sections */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            {sections.map(
              (section, index) =>
                section.value && (
                  <div key={index} className="bg-background p-4 rounded-md">
                    <h4 className="font-medium text-gray-600">{section.title}:</h4>
                    <p className="text-gray-600">{section.value}</p>
                  </div>
                )
            )}
          </div>

          {/* Prototype Demo */}
          {getPrivateInfo.prototype_demo && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Mahsulot prototipi
              </h4>
              <img
                src={`${baseUrl}${getPrivateInfo.prototype_demo}`}
                alt="Prototype Demo"
                className="rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Download Section */}
          {getPrivateInfo.legal_documents && (
            <div className="text-center">
              <a
                href={`${baseUrl}${getPrivateInfo.legal_documents}`}
                download
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Hujjatlarni yuklab olish
              </a>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PrivateInfoCard;
