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
  confirmPassword: string;
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

    if (data.password !== data.confirmPassword) {
      toast({
        description: "Parol va tasdiqlash paroli mos kelmadi.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await registerUser(data).unwrap();

      localStorage.setItem("user_id", response.user);
      localStorage.setItem("username", data.username);
      localStorage.setItem("selectedOption", data.role);

      toast({
        description: `Ro'yxatdan muvaffaqiyatli o'tildi!`,
        variant: "success",
      });

      openModal("verification");
    } catch (err) {
      toast({
        className: " bg-red-500",
        description: `Ro'yxatdan o'tib bo'lmadi`,
        variant: "destructive",
      });
      console.error("Failed to register:", err);
    }
  };
  console.log("isError:", isError);
  console.log("error:", error);
  const hasErrors = Object.keys(errors).length > 0;


  return (
    <form  onSubmit={handleSubmit(onSubmit)} >
      <h2 className="text-xl font-semibold mb-6">Ro'yxatdan O'tish</h2>

      {hasErrors && (
        <p className="text-red-500 text-[15px] mb-4">
          Davom etish uchun barcha maydonlarni to'ldiring.
        </p>
      )}

      <div className="scroll_modal">
        <div className="mr-6">
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
              <label className="block text-custom-gray mb-2">Telefon raqami</label>
              <input
                placeholder="Telefon raqamingizni kiriting"
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
                  placeholder="Parollingizni kiriting"
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

            <div className="mb-3 mt-4 relative">
                <label className="block text-custom-gray mb-2">Parolni Tastiqlash</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolingizni tasdiqlang"
                    className="w-full border border-gray-300 focus:border-2 
                    focus:border-custom-blue-gray ease-out delay-150
                    rounded-xl py-2 px-3"
                    {...register("confirmPassword", { required: "Parolni tasdiqlash shart" })}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

            <div className="flex gap-x-7 mt-8">
              <div>
                <label className="flex items-center">
                  <input
                    {...register("role", { required: true })}
                    type="radio"
                    className="Modal_radio"
                    value="investor"
                  />
                Sarmoya kirituvchi
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
              Loyiha asoschisi
                </label>
              </div>
            </div>

            <div className="mt-9 mb-7 font-normal text-base ">
                  <div className="flex items-center">
                      <input
                        style={{width: '17px', height:"17px", borderRadius:"0px"}}
                        type="checkbox"
                        className="mr-2"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <p className="text-start text-custom-gray text-base">
                          Men <span className="text-blue-500 me-1"><PrivacyPolicy /></span>qabul qilaman
                      </p>
                  </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isChecked}
              className={`Blue_button font-semibold w-full bg-[#749BA9] text-white 
              py-5 rounded-2xl text-base ${
                !isChecked ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              Ro'yxatdan o'tish
            </Button>

            <p className="mt-6 mb-2 text-center font-normal text-base">
              Allaqachon ro'yxatdan o'tganmisiz?
              <span
                className="text-[#ce8f11] text-base font-medium ms-2 cursor-pointer"
                onClick={() => openModal("login")}
              >
                Kirish
              </span>
            </p>
        </div>
      </div>

      {isError && (
        <p className="text-center text-[15px] text-red-500 mt-2">
          Ro'yxatdan o'tish muvaffaqiyatsiz tugadi:{" "}
          {error && "data" in error && Array.isArray((error.data as { phone?: string[] })?.phone)
            ? (error.data as { phone?: string[] })?.phone?.[0]
            : "Noma'lum xato"}
        </p>
      )}

      {isSuccess && <p>Muvaffaqiyatli ro'yxatdan o'tdingiz!</p>}
    </form>
  );
};
