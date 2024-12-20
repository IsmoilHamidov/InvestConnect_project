import React, { useState } from "react";

const Verification = ({
    userId,
    setUserId,
    verificationCode,
    setVerificationCode,
    isCodeSent,
    setIsCodeSent,
    setErrorMessage,
    setSuccessMessage,
    onVerificationSuccess,
}: any) => {
    const [inputCode, setInputCode] = useState("");
    const [errorMessage, setErrorMessageState] = useState<string | null>(null);
    const [successMessage, setSuccessMessageState] = useState<string | null>(null);

    // Function to send the verification code
    const handleSendVerificationCode = async () => {
        if (!userId) {
            setErrorMessageState("User ID is required to send the verification code.");
            return;
        }
    
        try {
            const response = await fetch(
                `https://bakirali007.pythonanywhere.com/api/v1/app/verification-code/${userId}/`,
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                        "X-CSRFToken": "L3emqPlDs7gmw9Ss6DdqCfXzPYc79Njtk6aqQTymXPJphc5tGd40tdVijQbY9loG",
                    },
                }
            );
    
            const data = await response.json();
            console.log("API Response Data:", data); // Log the response for debugging
    
            if (response.ok) {
                if (data.verification_code) {
                    setIsCodeSent(true);
                    setSuccessMessageState(`Verification code sent: ${data.verification_code}`);
                } else {
                    setErrorMessageState("Unexpected response: Verification code not found.");
                }
            } else {
                setErrorMessageState("Failed to send verification code.");
            }
        } catch (err) {
            setErrorMessageState("Error sending verification code.");
            console.error("Error occurred:", err);
        }
    };
    
    // Function to verify the entered verification code
    const handleVerifyCode = async () => {
        if (!inputCode) {
            setErrorMessage("Please enter the verification code.");
            return;
        }
    
        if (!userId) {
            setErrorMessage("User ID is missing. Please provide a valid User ID.");
            return;
        }
    
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(
                `https://bakirali007.pythonanywhere.com/api/v1/app/verification-code/${userId}/verify/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Add the authorization header
                    },
                    body: JSON.stringify({ verification_code: inputCode }),
                }
            );
    
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage("Verification successful!");
                onVerificationSuccess(); // Call the success handler
            } else {
                setErrorMessage(data.detail || "Verification failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred during verification. Please try again.");
        }
    };
    

    return (
        <>
            <div className="mb-3">
                <label className="block text-gray-700 mb-2">Enter User ID</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button
                    onClick={handleSendVerificationCode}
                    className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
                >
                    Send Verification Code
                </button>
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 mb-2">Enter Verification Code</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                />

                <button
                    onClick={handleVerifyCode}
                    className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
                >
                    Verify Account
                </button>
            </div>

            {/* Display messages */}
            {errorMessage && (
                <div className="text-red-500 mt-3">{errorMessage}</div>
            )}

            {successMessage && (
                <div className="text-green-500 mt-3">{successMessage}</div>
            )}
        </>
    );
};

export default Verification;
