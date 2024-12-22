// Login Modal Component
import { useToast } from "@/hooks/use-toast";
import { useLoginUserMutation } from "@/store/slice/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const LoginModal: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { closeModal, openModal } = useAuthModalStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ phone, password }).unwrap();

      toast({
        className: "top-center",
        description: `Login successful`,
        variant: "success",
      });
      localStorage.setItem("token", response.token);
      console.log("Login successful! Token:", response);
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
      toast({
        className: "top-center bg-red-500",
        description: `Login failed. Please check your credentials and try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Login</h2>
      <form onSubmit={handleLogin} className="mb-3 grid gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Phone number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 focus:border-2 
            focus:border-custom-blue-gray ease-out delay-150
            rounded-xl py-2 px-3"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 focus:border-2 
                focus:border-custom-blue-gray ease-out delay-150
                rounded-xl py-2 px-3"
                placeholder="Enter password"
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
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-center font-normal text-base">
          Don't have an account?
          <span
            className="text-blue-500 cursor-pointer ms-2"
            onClick={() => openModal("registration")}
          >
            Sign Up
        </span>
        </p>
      </form>
    </div>
  );
};
