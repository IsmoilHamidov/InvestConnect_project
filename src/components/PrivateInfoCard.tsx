import { usePrivateInfoStore } from "@/store/privateInfoData";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useGetPrivateInfoQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";
import { Download, EyeOff } from "lucide-react";
import PaymentAndCheck from "./PaymentAndCheck";
import { FaStar } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateInfoCard = (productId: any) => {
  const { data } = usePrivateInfoStore();
  const { data: getPrivateInfo, isSuccess } = useGetPrivateInfoQuery(productId.productId);
  const [isInfo, setInfo] = useState(data);
  const {
    company_name,
    kampanya_egasi,
    kontact,
    oylik_daromadi,
    soff_foydasi,
    status,
  } = isInfo;

  useEffect(() => {
    if (getPrivateInfo) {
      console.log(getPrivateInfo);
      
      setInfo({ ...getPrivateInfo.private_info });
    }
    
  }, [isSuccess]);

  return (
    <div>
      {isInfo.company_name === "***" ? (
        <div className="mt-11 p-4 bg-red-50 border rounded-md flex items-center justify-between gap-10">
          <EyeOff size={50} />
          <p className="text-sm font-semibold text-gray-600">
            Ma'lumotlarni ko'rish uchun siz to'lashingiz kerak. 
          </p>
          <PaymentAndCheck productId={productId.productId} amount={10} />
        </div>
      ) 
      : (
          <div className="w-full mt-14">
            <div className="mx-auto bg-white rounded-xl shadow-xl p-8 pb-9 border border-gray-200">
              <>
                <div className="flex justify-between items-center">
                  <div className="flex text-xl gap-x-1 text-[#B29C6F]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  <Badge
                    variant="outline"
                    className={cn(
                      status === "aktiv"
                        ? "bg-custom-blue-gray text-white px-6 py-1 rounded-full shadow-sm"
                        : "bg-red-600 text-white px-3 py-1 rounded-full shadow-sm"
                    )}
                  >
                    {status}
                  </Badge>
                </div>
                <h3 className="text-[21px] text-center font-semibold text-custom-gray tracking-wide mb-8 mt-5">
                  Loyihaga oid shaxsiy ma'lumotlar
                </h3>

                <div className="grid grid-cols-3 gap-5 gap-x-10 mb-5">
                  {[
                    { label: "Loyiha egasi", value: kampanya_egasi || "Default Owner" },
                    { label: "Kontakt", value: kontact || "Default Contact" },
                    { label: "Linked In", value: '' || "Default User" },
                    { label: "Kompaniya", value: company_name || "Default Company" },
                    { label: "Kompaniya", value: company_name || "Default Company" },
                    { label: "Kompaniya", value: company_name || "Default Company" },
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg w-full p-4">
                      <span className="font-medium text-gray-700">{item.label}:</span> {item.value}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-x-10">
                  {[
                    { label: "Oylik daromadi", value: `$${oylik_daromadi}`, colorClass: "text-[#B29C6F]" },
                    { label: "Soff foydasi", value: `$${soff_foydasi}`, colorClass: "text-[#443B3A]" },
                    { label: "Soff foydasi", value: `$${soff_foydasi}`, colorClass: "text-[#B29C6F]" },
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                      <p className="text-sm text-custom-gray">{item.label}</p>
                      <p className={`leading-10 text-2xl font-semibold ${item.colorClass}`}>{item.value}</p>
                    </div>
                  ))}
                </div>


                <button
                  className="mt-11 m-auto px-8 py-3 bg-gradient-to-r
                            from-[#749BA9] to-[#5d717e] 
                            hover:from-[#627D8A] hover:to-[#3A4D56] 
                            text-white font-semibold text-base rounded-3xl 
                            flex justify-center items-center gap-x-5 
                            shadow-lg duration-200 ease-in-out"
                >
                  To‘liq ma’lumotlarni yuklab olish
                  <Download size={20} />
                </button>
              </>
            </div>
          </div>
      )}

    </div>
  );
};

export default PrivateInfoCard;
