import React, { useState } from "react";
import { useNavbarContext } from "./SignUp_Context";
import { HiX } from "react-icons/hi";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignUpModal: React.FC = () => {
    const {
        isModalOpen,
        setIsModalOpen,
        currentStep,
        setCurrentStep,
        username,
        setUsername,
        phone,
        setPhone,
        password,
        setPassword,
        setIsSignedUp,
        selectedOption,
        setSelectedOption,
    } = useNavbarContext();

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userId, setUserId] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
        setCurrentStep(1);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint =
            currentStep === 1
                ? "https://bakirali007.pythonanywhere.com/api/v1/app/users/register/"
                : "https://bakirali007.pythonanywhere.com/api/v1/app/users/login/";
        const payload = currentStep === 1
            ? { username, phone, password, role: selectedOption }
            : { phone, password };

        // Check for empty fields before proceeding
        if (!phone || !password || (currentStep === 1 && (!username || !selectedOption))) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("API Response Data:", data); // Log the entire response data

            if (response.ok) {
                if (currentStep === 1) {
                    setIsSignedUp(true);
                    setSuccessMessage("Signup successful! Please verify your account.");
                    setCurrentStep(3); // Move to the verification step
                } else {
                    const userId = data.user_id;
                    if (userId) {
                        localStorage.setItem("user_id", userId); // Save user_id in localStorage
                        setSuccessMessage("Login successful!");
                    } else {
                        setErrorMessage("User ID is missing in the response.");
                    }
                }
            } else {
                setErrorMessage(data.detail || "An error occurred. Please try again.");
            }
        } catch (err) {
            console.error("Error occurred:", err);
            setErrorMessage("Failed to connect to the server.");
        }
    };

    const handleOptionChange = (option: "investor" | "startup") => {
        setSelectedOption(option);
    };

    const handleLoginClick = () => {
        setCurrentStep(2);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentStep(1);
    };

    const handleSendVerificationCode = async () => {
        if (!userId) {
            setErrorMessage("User ID is required to send the verification code.");
            return;
        }
    
        try {
            // Send the verification code request including the userId in the URL
            const response = await fetch(
                `https://bakirali007.pythonanywhere.com/api/v1/app/verification-code/${userId}/`, // Include the userId in the URL
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                        "X-CSRFToken": "L3emqPlDs7gmw9Ss6DdqCfXzPYc79Njtk6aqQTymXPJphc5tGd40tdVijQbY9loG", // Ensure the CSRF token is correct
                    },
                }
            );
    
            const data = await response.json();
            console.log("API Response Data:", data); // Log the response for debugging
    
            if (response.ok) {
                if (data.verification_code) {
                    setIsCodeSent(true);
                    setSuccessMessage(`Verification code sent: ${data.verification_code}`);
                } else {
                    setErrorMessage("Unexpected response: Verification code not found.");
                }
            } else {
                setErrorMessage("Failed to send verification code.");
            }
        } catch (err) {
            setErrorMessage("Error sending verification code.");
        }
    };
    

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            setErrorMessage("Please enter the verification code.");
            return;
        }

        try {
            const response = await fetch("https://bakirali007.pythonanywhere.com/api/v1/app/users/verify/", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "X-CSRFToken": "L3emqPlDs7gmw9Ss6DdqCfXzPYc79Njtk6aqQTymXPJphc5tGd40tdVijQbY9loG", // Ensure the CSRF token is correct
                },
                body: JSON.stringify({
                    user: userId, // Include the userId here
                    code: verificationCode, // Include the verification code entered by the user
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage("Account verified successfully!");
                setCurrentStep(1); // Go back to the first step (sign up)
                setIsModalOpen(false);
            } else {
                setErrorMessage(data.detail || "Verification failed.");
            }
        } catch (err) {
            setErrorMessage("Failed to verify the account.");
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                        {currentStep !== 1 && (
                            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600">
                                <HiX size={24} />
                            </button>
                        )}

                        <h2 className="text-lg font-bold mb-4">{currentStep === 1 ? "Sign Up" : currentStep === 2 ? "Login" : "Verify Account"}</h2>

                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <>
                                    {/* Sign up form */}
                                    <div className="mb-3">
                                        <label className="block text-gray-700 mb-2">Username</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-gray-700 mb-2">Phone number</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 relative">
                                        <label className="block text-gray-700 mb-2">Password</label>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="absolute right-3 bottom-0 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        >
                                            {passwordVisible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                        </span>
                                    </div>
                                    <div className="flex gap-x-7 my-6">
                                        <div>
                                            <label className=" flex items-center">
                                                <input
                                                    className="Modal_radio"
                                                    type="radio"
                                                    name="userType"
                                                    checked={selectedOption === "investor"}
                                                    onChange={() => handleOptionChange("investor")}
                                                />
                                                Investor
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center">
                                                <input
                                                    className="Modal_radio"
                                                    type="radio"
                                                    name="userType"
                                                    checked={selectedOption === "startup"}
                                                    onChange={() => handleOptionChange("startup")}
                                                />
                                                Startup Funder
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
                                    >
                                        Sign Up
                                    </button>
                                    <p className="mt-4 text-center font-normal text-base">
                                        Already have an account?{" "}
                                        <span onClick={handleLoginClick} className="text-blue-500 cursor-pointer">
                                            Login
                                        </span>
                                    </p>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    {/* Login form */}
                                    <div className="mb-3">
                                        <label className="block text-gray-700 mb-2">Phone number</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 relative">
                                        <label className="block text-gray-700 mb-2">Password</label>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="absolute right-3 bottom-0 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        >
                                            {passwordVisible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                        </span>
                                    </div>
                                    <button
                                        type="submit"
                                        className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
                                    >
                                        Login
                                    </button>
                                    <p className="mt-4 text-center font-normal text-base">
                                        Don't have an account?{" "}
                                        <span onClick={() => setCurrentStep(1)} className="text-blue-500 cursor-pointer">
                                            Sign Up
                                        </span>
                                    </p>
                                </>
                            )}

                            {currentStep === 3 && (
                                <>
                                    {/* Verification Step */}
                                    <div className="mb-3">
                                        <label className="block text-gray-700 mb-2">Enter User ID</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-gray-700 mb-2">Enter Verification Code</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                        />
                                    </div>
                                    {!isCodeSent && (
                                        <button
                                            onClick={handleSendVerificationCode}
                                            className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
                                        >
                                            Send Verification Code
                                        </button>
                                    )}
                                    {isCodeSent && (
                                        <button
                                            onClick={handleVerifyCode}
                                            className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
                                        >
                                            Verify Account
                                        </button>
                                    )}
                                </>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUpModal;
