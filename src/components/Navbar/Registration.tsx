import { useToast } from "@/hooks/use-toast";
import { useRegisterUserMutation } from "@/store/slice/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import React Icons for the eye toggle
import { INavbarStepProps } from "./NavbarStep";
import PrivacyPolicy from "../PrivacyPolicy";
import { Button } from "../ui/button";

interface RegistrationFormValues {
  username: string;
  phone: string;
  role: string;
  password: string;
}

export const Registration: React.FC<INavbarStepProps> = () => {
  const { openModal } = useAuthModalStore();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>();
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (data: RegistrationFormValues) => {
    if (!isChecked) return;

    try {
      const response = await registerUser(data).unwrap();

      localStorage.setItem("user_id", response.user);
      localStorage.setItem("username", data.username);
      localStorage.setItem("selectedOption", data.role);

      toast({
        description: `Registration successful!`,
        variant: "success",
      });

      openModal("verification");
    } catch (err) {
      toast({
        className: " bg-red-500",
        description: `Failed to register`,
        variant: "destructive",
      });
      console.error("Failed to register:", err);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
      <h2 className="text-xl font-bold mb-6">Ro'yxatdan O'tish</h2>

      {hasErrors && (
        <p className="text-red-500 text-[15px] mb-4">
          Davom etish uchun barcha maydonlarni to'ldiring.
        </p>
      )}

      <div className="mt-4">
        <label className="block text-custom-gray mb-2">
          Foydalanuvchi nomi
        </label>
        <input
          placeholder="UserName"
          className="w-full border border-gray-300 focus:border-2 
           focus:border-custom-blue-gray ease-out delay-150
           rounded-xl py-2 px-3"
          {...register("username", { required: true })}
        />
      </div>

      <div className="mt-4">
        <label className="block text-custom-gray mb-2">Telefon</label>
        <input
          placeholder="+998"
          className="w-full border border-gray-300 focus:border-2 
          focus:border-custom-blue-gray ease-out delay-150
          rounded-xl py-2 px-3"
          {...register("phone", { required: true })}
        />
      </div>

      <div className="mb-3 mt-4 relative">
        <label className="block text-custom-gray mb-2">Parol</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            className="w-full border border-gray-300 focus:border-2 
            focus:border-custom-blue-gray ease-out delay-150
            rounded-xl py-2 px-3"
            {...register("password", { required: true })}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} color="black" />
            ) : (
              <AiOutlineEye size={20} color="black" />
            )}
          </span>
        </div>
      </div>

      <div className="flex gap-x-7 my-6">
        <div>
          <label className="flex items-center">
            <input
              {...register("role", { required: true })}
              type="radio"
              className="Modal_radio"
              value="investor"
            />
            Investor
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="radio"
              className="Modal_radio"
              value="startup"
              {...register("role", { required: true })}
            />
            Startap asoschisi
          </label>
        </div>
      </div>

      <p className="mt-4 text-center font-normal text-base mb-5">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <PrivacyPolicy />
          <span className="pl-1">va maxfiylik siyosati bilan tanishib chiqdim</span>
        </label>
      </p>

      <Button
        type="submit"
        disabled={isLoading || !isChecked}
        className={`Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-2xl ${
          !isChecked ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Ro'yxatdan o'tish
      </Button>

      <p className="mt-4 text-center font-normal text-base">
        Allaqachon ro'yxatdan o'tganmisiz?
        <span
          className="text-blue-500 ms-2 cursor-pointer"
          onClick={() => openModal("login")}
        >
          Kirish
        </span>
      </p>

      {isError && (
        <p className="text-center text-[15px] text-red-500 mt-2">
          Ro'yxatdan o'tish muvaffaqiyatsiz tugadi: {error?.data.error}
        </p>
      )}
      {isSuccess && <p>Muvaffaqiyatli ro'yxatdan o'tdingiz!</p>}
    </form>
  );
};
