import { usePrivateInfoStore } from "@/store/privateInfoData";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useGetPrivateInfoQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";
import { Download, EyeOff } from "lucide-react";
import PaymentAndCheck from "./PaymentAndCheck";

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
        <div className="mt-6 p-4 bg-red-50 border rounded-md flex items-center justify-between gap-10">
          <EyeOff size={50} />
          <p className="text-sm font-semibold text-gray-600">
            Для просмотра данных необходимо произвести оплату.
          </p>
          <PaymentAndCheck productId={productId.productId} amount={10} />
        </div>
      ) : (
        <div className="mt-7 border p-6 max-w-sm bg-white rounded-lg shadow-lg">
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-muted-foreground">
                {company_name}
              </h3>
              <Badge
                variant="outline"
                className={cn(
                  status === "aktiv"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                )}
              >
                {status}
              </Badge>
            </div>

            <div className="mb-5">
              <p className="text-sm text-muted-foreground">
                Owner: <span className="font-semibold">{kampanya_egasi}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Contact: <span className="font-semibold">{kontact}</span>
              </p>
            </div>

            <div className="flex justify-between mb-5">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-lg font-semibold text-primary">
                  ${oylik_daromadi}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Software Usage</p>
                <p className="text-lg font-semibold text-primary">
                  {soff_foydasi} GB
                </p>
              </div>
            </div>

            <div className="text-center mt-5">
              <button className="Blue_button w-full flex justify-center items-center gap-x-4 py-2  text-white rounded-lg transition">
                Faylni yuklab olish
                <Download size={18}/>
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default PrivateInfoCard;
