import { useToast } from "@/hooks/use-toast";
import { usePaymentAndcheckMutation } from "@/store/slice/products";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePrivateInfoStore } from "@/store/privateInfoData";

interface PaymentFormData {
  message: string;
  cardNumber: string;
  expiryDate: string;
}

interface PaymentAndCheckProps {
  productId: number;
  amount: number;
}

const PaymentAndCheck: React.FC<PaymentAndCheckProps> = ({ productId, amount }) => {
  const { toast } = useToast();
  const [createPaymentCheck, { isLoading, isError, error }] = usePaymentAndcheckMutation();
  const setPrivateInfoData = usePrivateInfoStore((state) => state.setPrivateInfo);

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
        message: yup.string().max(200, 'Максимум 200 символов').optional(),
        cardNumber: yup.string().required('Введите номер карты').matches(/^[0-9]{16}$/, 'Неверный формат номера карты'),
        expiryDate: yup.string().required('Введите срок действия карты').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Неверный формат срока действия'),
      })
    ),
  });

  const triggerRef = useRef<HTMLButtonElement>(null);


  const handlePaymentCheck = async (data: PaymentFormData) => {
    try {
      const response = await createPaymentCheck({
        product_id: productId,
        amount: amount,
        message: data.message,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
      }).unwrap();
      setPrivateInfoData(response.private_info)
      console.log("Success:", response);
      toast({
        title: "Оплата прошла успешно!",
        description: `Вы перевели ${amount} USD`,
        variant: "success",
      });
      if (triggerRef.current) {
        triggerRef.current.click();
        window.location.reload()
      }

    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={triggerRef} className="border rounded-[40px] px-4 py-2">Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <h1 className="text-xl font-bold mb-4">Payment and Check</h1>
        <span className="bg-[#1212] py-2 text-center rounded-md">
          Bu mahsulotni korish narxi : {amount}
        </span>
        <form className="space-y-4" onSubmit={handleSubmit(handlePaymentCheck)}>

          {/* Сообщение к оплате */}
          <div>
            <label className="block text-sm font-medium mb-1">Сообщение к оплате</label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  rows={2}
                  maxLength={200}
                  placeholder="Введите сообщение"
                  {...field}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              )}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Номер карты */}
          <div>
            <label className="block text-sm font-medium mb-1">Номер карты</label>
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Введите номер карты"
                  {...field}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              )}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
            )}
          </div>

          {/* Срок действия карты */}
          <div>
            <label className="block text-sm font-medium mb-1">Срок действия карты</label>
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="MM/ГГ"
                  {...field}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              )}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
          >
            {isLoading ? "Processing..." : "Create Payment"}
          </button>
        </form>

        {isError && (
          <p className="text-red-500 mt-2">
            Error occurred: {error?.data?.error || "Unknown error"}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentAndCheck;
