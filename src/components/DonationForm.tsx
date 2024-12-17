import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  { id: "uzcard", name: "Uzcard" },
  { id: "humo", name: "Humo" },
  { id: "visa", name: "Visa" },
  { id: "uzum", name: "Uzum" },
];

interface DonationFormProps {
  price: number;
  id: number;
}

interface DonatFormData {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  paymentMethod: string;
}

// Схема валидации с Yup
const schema = yup.object({
  amount: yup
    .number()
    .min(5000, "Минимальная сумма — 5000")
    .required("Сумма обязательна"),
  message: yup.string().max(200, "Сообщение не должно превышать 200 символов"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Номер карты должен содержать 16 цифр")
    .required("Номер карты обязателен"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Формат MM/ГГ")
    .required("Срок действия карты обязателен"),
  paymentMethod: yup.string().required("Выберите способ оплаты"),
});

const DonationForm: React.FC<DonationFormProps> = ({ price, id }) => {
  const { toast } = useToast();
  const navigate = useNavigate(); // Хук для перенаправления

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: price, // Фиксированная сумма      message: "",
      cardNumber: "",
      expiryDate: "",
      paymentMethod: "uzcard",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: DonatFormData) => {
    console.log("id: ", id);

    console.log("Отправленные данные:", data);
    toast({
      title: "Оплата прошла успешно!",
      description: `Вы перевели ${data.amount} UZS`,
      variant: "success",
    });

    // Задержка и перенаправление
    setTimeout(() => {
      navigate(`/product/${id}/`); // Страница перенаправления
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border rounded-[40px] px-4 py-2">Ontdek meer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Оплатить</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Фиксированная Сумма */}
          <div>
            <label className="block text-sm font-medium mb-1">Сумма</label>
            <Controller
              name="amount"
              control={control}
              render={() => (
                <input
                  type="number"
                  value={price}
                  disabled // Поле нельзя редактировать
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              )}
            />
          </div>

          {/* Сообщение */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Сообщение к оплате
            </label>
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

          {/* Методы оплаты */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Способ оплаты
            </label>
            <div className="flex space-x-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setValue("paymentMethod", method.id)}
                  className={`px-4 py-2 border rounded-lg ${
                    paymentMethod === method.id
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {/* Номер карты */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Номер карты
            </label>
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
              <p className="text-red-500 text-sm">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Срок действия карты */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Срок действия карты
            </label>
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
              <p className="text-red-500 text-sm">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          {/* Кнопка */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary"
            >
              Оплатить
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationForm;
