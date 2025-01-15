import { EyeOff, Users, LineChart, Target, Briefcase, Phone, Download } from "lucide-react";
import PaymentAndCheck from "./PaymentAndCheck";
import { useGetPrivateInfoQuery } from "@/store/slice/products";

const baseUrl = "https://bakirali007.pythonanywhere.com/";

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

  if (error) {
    return (
      <div className="mt-11 p-4 bg-red-50 border rounded-md flex items-center justify-between gap-10">
        <EyeOff size={50} />
        <p className="text-sm font-semibold text-gray-600">
          Ma'lumotlarni ko'rish uchun siz to'lashingiz kerak.
        </p>
        <PaymentAndCheck productId={productId} amount={10} />
      </div>
    );
  }

  if (isLoading) {
    return <div className="w-full mt-8 p-4 text-center">Loading...</div>;
  }

  if (!getPrivateInfo) {
    return null;
  }

  const sections = [
    { 
      title: "Biznes-reja", 
      value: getPrivateInfo.business_plan, 
      icon: Target 
    },
    { 
      title: "Jamoa haqida", 
      value: getPrivateInfo.team_info, 
      icon: Users 
    },
    { 
      title: "Bozor tahlili", 
      value: getPrivateInfo.market_analysis, 
      icon: LineChart 
    },
    { 
      title: "Investitsiya ishlatilishi", 
      value: getPrivateInfo.use_of_investment, 
      icon: Briefcase 
    },
  ];

  return (
    <div className="w-full mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-64">
        <img
          src={`${baseUrl}${getPrivateInfo.prototype_demo}`}
          alt="Loyiha tasviri"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 ${getPrivateInfo.is_active ? "bg-emerald-500" : "bg-red-500"} rounded-full text-sm`}>
                {getPrivateInfo.is_active ? "Active" : "Inactive"}
              </span>
              <span className="text-sm opacity-75">
                {formatDate(getPrivateInfo.created_at)}
              </span>
            </div>
            <h2 className="text-3xl font-bold">Loyiha ma'lumotlari</h2>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map(({ title, value, icon: Icon }) => (
            <div key={title} className="border-l-4 border-primary pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon className="text-primary" />
                <h3 className="font-semibold text-gray-800">{title}</h3>
              </div>
              <p className="text-gray-600">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t">
          <div className="flex items-center gap-3">
            <Phone className="text-primary" />
            <div>
              <p className="font-medium text-gray-800">Kontakt ma'lumotlari</p>
              {getPrivateInfo.contact_info.split('\r\n').map((line: string, index: number) => (
                <p key={index} className="text-gray-600">{line}</p>
              ))}
            </div>
          </div>
          {getPrivateInfo.legal_documents && (
            <a
              href={`${baseUrl}${getPrivateInfo.legal_documents}`}
              download
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg  transition"
            >
              <Download size={20} />
              Hujjatlarni yuklab olish
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateInfoCard;