import { usePrivateInfoStore } from "@/store/privateInfoData";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useGetPrivateInfoQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";
import { EyeOff } from "lucide-react";
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
      setInfo({ ...getPrivateInfo.private_info });
    }
  }, [isSuccess]);

  return (
    <div>
      {isInfo.company_name === "***" ? (
        <div className="p-4 bg-red-50 border rounded-md flex items-center justify-between gap-10">
          <EyeOff size={60} />
          <p className="text-sm text-gray-600">
            Для просмотра данных необходимо произвести оплату.
          </p>
          <PaymentAndCheck productId={productId.productId} amount={10} />
        </div>
      ) : (
        <div className="p-6 max-w-sm bg-white rounded-lg shadow-lg">
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

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Owner: <span className="font-semibold">{kampanya_egasi}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Contact: <span className="font-semibold">{kontact}</span>
              </p>
            </div>

            <div className="flex justify-between mb-4">
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

            <div className="text-center mt-4">
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default PrivateInfoCard;
