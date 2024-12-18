import React, { useEffect, useState } from "react";
import { useGetVerificationCodeQuery, useVerifyUserMutation } from "./apiSlice";

const VerificationPage: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { data, error, isLoading } = useGetVerificationCodeQuery(userId, {
    skip: !userId, // Пропустить запрос, пока userId не установлен
  });

  const [verifyUser, { isLoading: isVerifying, isSuccess }] =
    useVerifyUserMutation();

  const handleGetCode = () => {
    if (!userId) {
      alert("Please enter user ID.");
      return;
    }
    console.log("Fetching verification code...");
  };

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
      alert("Verification successful!");
      console.log("Verification response:", response);
      localStorage.setItem("token", response.token)
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, [localStorage.getItem("user_id")]);

  return (
    <div>
      <h1>Verification</h1>
      <div className="grid gap-8">
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={handleGetCode} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Verification Code"}
          </button>
        </div>

        {data && (
          <div>
            <p>Verification Code: {data.verification_code}</p>
            {console.log("Ваш код для верификации: ", data.verification_code)}
            <button onClick={() => setVerificationCode(data.verification_code)}>
              Use this code
            </button>
          </div>
        )}

        {error && (
          <p style={{ color: "red" }}>Failed to fetch code: {String(error)}</p>
        )}

        <div>
          <label>Verification Code:</label>
          <input
            className="border-2"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerify} disabled={isVerifying}>
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

export default VerificationPage;
