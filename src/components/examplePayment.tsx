import { useToast } from "@/hooks/use-toast";
import { usePaymentAndcheckMutation } from "@/store/slice/products";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePrivateInfoStore } from "@/store/privateInfoData";
import { useAuthModalStore } from "@/store/authModalStore";
import AGREEMENT_TERMS, { Paymentfields } from "./AGREEMENT_TERMS";

interface PaymentFormData {
  message?: string;
  cardNumber: string;
  expiryDate: string;
}

interface PaymentAndCheckProps {
  productId: number;
  amount: number;
}

const PaymentAndCheck: React.FC<PaymentAndCheckProps> = ({
  productId,
  amount,
}) => {
  const { toast } = useToast();
  const [createPaymentCheck, { isLoading }] = usePaymentAndcheckMutation();
  const setPrivateInfoData = usePrivateInfoStore(
    (state) => state.setPrivateInfo
  );
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      message: "",
      cardNumber: "",
      expiryDate: "",
    },
    resolver: yupResolver(
      yup.object({
        message: yup.string().max(200, "Maksimal 200 ta belgi").optional(),
        cardNumber: yup
          .string()
          .required("Введите номер карты")
          .matches(/^[0-9]{4}([ ]?[0-9]{4}){3}$/, "Noto'g'ri karta raqami formati"),
        expiryDate: yup
          .string()
          .required("Kartaning amal qilish muddatini kiriting")
          .matches(
            /^(0[1-9]|1[0-2])\/\d{2}$/,
            "Noto'g'ri amal qilish muddati formati (MM / YY bo'lishi kerak)"
          ),
      })
    ),
  });
  

  const auth = localStorage.getItem("token");
  const { openModal } = useAuthModalStore();


  const handlePaymentCheck = async (data: PaymentFormData) => {
    try {
      const response = await createPaymentCheck({
        product_id: productId,
        amount,
        message: data.message,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
      }).unwrap();

      setPrivateInfoData(response.private_info);
      toast({
        title: "Tolov muvofaqiyatli amalga oshdi!",
        description: `Siz ${amount} USD Toladingiz`,
        variant: "success",
      });
      if (triggerRef.current) {
        triggerRef.current.click();
        window.location.reload();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    }
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "") // Удаляем все нецифровые символы
      .replace(/(\d{4})(?=\d)/g, "$1 "); // Добавляем пробел каждые 4 цифры
  };
  
  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, "") // Удаляем все нецифровые символы
      .replace(/^(\d{2})(\d{1,2})?/, (_, m1, m2) => (m2 ? `${m1}/${m2}` : m1)); // Добавляем слэш после первых двух цифр
  };
  

  return (
    <>
      <Dialog
              open={showAgreementDialog}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setShowAgreementDialog(false);
                } else if (!auth) {
                  openModal("login");
                } else {
                  setShowAgreementDialog(true);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button ref={triggerRef} className="border rounded-[40px] px-5 py-2">
                  To'lov qilish
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <h1 className="text-xl font-bold mb-4">Shartlar</h1>
                <AGREEMENT_TERMS />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAgreementDialog(false)}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAgreementDialog(false);
                      setShowPaymentDialog(true);
                    }}
                  >
                    Roziman
                  </Button>
                </div>
              </DialogContent>
            </Dialog>



      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <h1 className="text-xl font-semibold mb-3">To'lov qilish</h1>
          <span className="bg-[#1212] py-2 mb-2 text-center rounded-md">
            Bu mahsulotni korish narxi : <span className="font-semibold">{amount} $</span>
          </span>
          <form
            className="flex flex-col gap-y-5"
            onSubmit={handleSubmit(handlePaymentCheck)}
          >
            {/* Сообщение к оплате */}
            {Paymentfields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => {
                    const handleChange = (
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      const value = e.target.value;
                      if (field.name === "cardNumber") {
                        controllerField.onChange(formatCardNumber(value));
                      } else if (field.name === "expiryDate") {
                        controllerField.onChange(formatExpiryDate(value));
                      } else {
                        controllerField.onChange(value);
                      }
                    };

                    return field.type === "textarea" ? (
                      <textarea
                        {...controllerField}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={field.rows}
                        maxLength={field.maxLength}
                        className="w-full px-3 py-2 border border-custom-blue-gray rounded-lg resize-none outline-none"
                      />
                    ) : (
                      <input
                        {...controllerField}
                        onChange={handleChange}
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 mt-1 border border-custom-blue-gray rounded-lg"
                      />
                    );
                  }}
                />
                {errors[field.name as keyof typeof errors] && (
                  <p className="text-red-500 text-sm">
                    {
                      (
                        errors[field.name as keyof typeof errors] as {
                          message: string;
                        }
                      )?.message
                    }
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="Blue_button text-white w-full rounded-2xl px-4 py-2 mt-1"
            >
              {isLoading ? "Jarayonda..." : "To`lash"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentAndCheck;
