import { useToast } from "@/hooks/use-toast";
import { useLoginUserMutation } from "@/store/slice/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { INavbarStepProps } from "./NavbarStep";

export const LoginModal: React.FC<INavbarStepProps> = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { closeModal, openModal } = useAuthModalStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const validateFields = () => {
    if (!phone || phone.length < 11 || !password) {
      setHasErrors(true);
      return false;
    }
    setHasErrors(false);
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const formattedPhone = `+998${phone.replace(/\D/g, "")}`; 
      const response = await loginUser({ phone: formattedPhone, password }).unwrap();

      toast({
        className: "top-center",
        description: `Xisobga muvaffaqiyatli kirildi`,
        variant: "success",
      });
      localStorage.setItem("token", response.token);
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error("Kirish muvaffaqiyatsiz tugadi:", err);
      toast({
        className: "top-center bg-red-500",
        description: `Telefon raqami yoki parol noto'g'ri.`,
        variant: "destructive",
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d-]/g, '');
    value = value
        .replace(/(\d{2})(\d{3})(\d{2})(.*)/, '$1-$2-$3');

    setPhone(value.slice(0, 11));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5 ">Kirish</h2>

      {hasErrors && (
        <p className="text-red-500 text-[15px] mb-3">
          Kirish uchun telefon raqami va parolni kiriting
        </p>
      )}

      <form onSubmit={handleLogin} className="mb-3 grid gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Telefon raqami</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-600">+998</span>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder=""
              className="w-full pl-14 border border-gray-300 focus:border-2 
              focus:border-custom-blue-gray ease-out delay-150
              rounded-xl py-2 px-3"
              maxLength={12} 
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Parol</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 focus:border-2 
              focus:border-custom-blue-gray ease-out delay-150
              rounded-xl py-2 px-3"
              placeholder="Parolni kiriting"
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
        <button
          type="submit"
          disabled={isLoading}
          className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-2xl mt-2"
        >
          {isLoading ? "Kirilmoqda..." : "Kirish"}
        </button>

        <p className="flex justify-center flex-wrap mb-0 mt-3 text-center font-normal text-base">
          Ro'yxaydan o'tmaganmsiz?
          <span
            className="text-[#ce8f11] ms-2 text-base font-medium cursor-pointer text-center "
            onClick={() => openModal("registration")}
          >
            Ro'yxatdan o'tish
          </span>
        </p>
      </form>
    </div>
  );
};
