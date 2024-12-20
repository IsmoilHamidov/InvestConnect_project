import { useToast } from "@/hooks/use-toast";
import {
  useGetVerificationCodeQuery,
  useVerifyUserMutation,
} from "@/Pages/UserPage/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React, { useEffect, useState } from "react";

export const Verification: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { data, error } = useGetVerificationCodeQuery(userId, {
    skip: !userId, // Пропустить запрос, пока userId не установлен
  });
  const { closeModal, isOpen } = useAuthModalStore();

  const { toast } = useToast();

  const [verifyUser, { isLoading: isVerifying, isSuccess }] =
    useVerifyUserMutation();

  const handleVerify = async () => {
    if (!userId || !verificationCode) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await verifyUser({
        user: userId,
        code: verificationCode,
      }).unwrap();
      toast({
        description: `Verification successful!`,
        variant: "success",
      });
      closeModal();
      console.log("Verification response:", response);
      localStorage.setItem("token", response.token);
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Данные успешно получены:", data);
      toast({
        description: `your verifivation code is ${data.verification_code}`,
        variant: "success",
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Произошла ошибка:", error);
      toast({
        description: `Failed to fetch code: ${String(error)}`,
        variant: "destructive",
      });
    }
  }, [error]);

  console.log("Modal open:", isOpen);

  return (
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-lg font-bold mb-4">Verification</h2>
      <div className="grid gap-8">
        <div className="mb-3 grid gap-3">
          <label className="block text-gray-700 mb-2">
            Enter Verification Code
          </label>{" "}
          <input
            className="w-full border border-gray-300 rounded-lg p-2"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>
        </div>

        {isSuccess && (
          <p style={{ color: "green" }}>User verified successfully!</p>
        )}
      </div>
    </div>
  );
};
