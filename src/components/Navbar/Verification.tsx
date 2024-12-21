import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthModalStore } from "@/store/authModalStore";
import { useGetVerificationCodeQuery, useVerifyUserMutation } from "@/store/slice/apiSlice";

export const Verification: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string[]>(new Array(6).fill(""));

  const { data, error, refetch } = useGetVerificationCodeQuery(userId, {
    skip: !userId, // Skip query until userId is set
  });

  const { closeModal } = useAuthModalStore();
  const { toast } = useToast();

  const [verifyUser, { isLoading: isVerifying, isSuccess }] = useVerifyUserMutation();

  const handleResendCode = async () => {
    try {
      const response = await refetch({ userId });

      if (response.data) {
        toast({
          description: `Your new verification code is ${response.data.verification_code}`,
          variant: "success",
        });
      } else {
        throw new Error("No verification code returned");
      }
    } catch (err) {
      console.error("Failed to resend code:", err);
      toast({
        description: "Failed to resend verification code.",
        variant: "destructive",
      });
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      const updatedCode = [...verificationCode];
      updatedCode[index] = value;
      setVerificationCode(updatedCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`verification-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !verificationCode[index]) {
      // Move focus to the previous input field if current field is empty
      if (index > 0) {
        const prevInput = document.getElementById(`verification-input-${index - 1}`);
        prevInput?.focus();
        const updatedCode = [...verificationCode];
        updatedCode[index - 1] = ""; // Clear the previous input
        setVerificationCode(updatedCode);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleVerify = async () => {
    const code = verificationCode.join("");
    if (!userId || code.length !== 6) {
      alert("Please enter the complete verification code.");
      return;
    }

    try {
      const response = await verifyUser({ user: userId, code }).unwrap();
      toast({
        description: `Verification successful!`,
        variant: "success",
      });
      closeModal();
      console.log("token", response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("isVerified", "true");
      window.location.reload();
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("user_id") || "");
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Verification code received:", data);
      toast({
        duration: 13000,
        description: `Your verification code is ${data.verification_code}`,
        variant: "success",
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching verification code:", error);
      toast({
        description: `Failed to fetch code: ${String(error)}`,
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-5">Verification Code</h2>
      <div className="grid gap-8">
        <div className="mb-3 grid gap-3">
          <label className="block text-gray-700 mb-2">Enter Verification Code</label>
          <div className="flex space-x-2.5">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`verification-input-${index}`}
                className="w-10 h-11 text-center border border-gray-300 rounded-lg text-xl"
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={handleFocus}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-5">
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="Blue_button text-center font-semibold h-10 w-[47%] bg-custom-blue-gray text-white p-2 rounded-lg "
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>

            <button
              onClick={handleResendCode}
              className="Blue_button text-center font-semibold h-10 w-[47%] border-2 border-custom-blue-gray hover:text-white hover:border-0 text-custom-blue-gray p-2 rounded-lg "
            >
              Resend Code
            </button>
          </div>
        </div>
        {isSuccess && <p style={{ color: "green" }}>User verified successfully!</p>}
      </div>
    </div>
  );
};
