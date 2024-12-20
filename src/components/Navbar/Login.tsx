import { useToast } from "@/hooks/use-toast";
import { useLoginUserMutation } from "@/Pages/UserPage/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React, { useState } from "react";

export const LoginModal: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { closeModal, openModal } = useAuthModalStore();

  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ phone, password }).unwrap();

      toast({
        description: `Login successful`,
        variant: "success",
      });
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user_id", response.user);
      console.log("Login successful! Token:", response);
      closeModal();
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="mb-3 grid gap-5">
        <div>
          <label className="block text-gray-700 mb-2">Phone number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2
        rounded-lg"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center font-normal text-base">
          Don't have an account?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => openModal("registration")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};
