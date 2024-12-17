import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useNavbarContext } from './SignUp_Context';
import { Alert } from '@/components/ui/alert'; // Assuming Alert component is in the same directory

const SignUpModal: React.FC = () => {
  const {
    isModalOpen, setIsModalOpen, currentStep, setCurrentStep,
    username, setUsername, phone, setPhone, password, setPassword,
    setIsSignedUp, selectedOption, setSelectedOption
  } = useNavbarContext();

  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setCurrentStep(1);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint =
      currentStep === 1
        ? 'https://bakirali007.pythonanywhere.com/api/v1/app/users/register/'
        : 'https://bakirali007.pythonanywhere.com/api/v1/app/users/login/';

    const payload =
      currentStep === 1
        ? { username, phone, password, role: selectedOption }
        : { phone, password };

    if (!phone || !password || (currentStep === 1 && (!username || !selectedOption))) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        if (currentStep === 1) {
          setIsSignedUp(true);
          localStorage.setItem('username', username);
          localStorage.setItem('selectedOption', selectedOption!);
          setSuccessMessage('Signup successful!');
        } else {
          setIsSignedUp(true);
          localStorage.setItem('username', data.username);
          localStorage.setItem('selectedOption', data.role);
          setUsername(data.username);
          setSelectedOption(data.role);
          setSuccessMessage('Login successful!');
        }

        // Close the modal after a brief moment
        setIsModalOpen(false);

        // Show alert in center for 3 seconds
        // Show alert in center for 3 seconds
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds

        // Refresh the page after the alert is hidden
        window.location.reload();
      }, 2000);
 
      } else {
        setErrorMessage(data.detail || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Failed to connect to the server.');
    }
  };

  const handleLoginClick = () => {
    setCurrentStep(2);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  return (
    <>
      {/* Success Alert Message in the center, outside of modal */}
      {showAlert && successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          
          <div className="h-24 rounded-lg w-96">
            <Alert className='mt-4' type="success" title="Success" description={successMessage} />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {currentStep === 1 && (
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-600"
              >
                <HiX size={24} />
              </button>
            )}

            <h2 className="text-lg font-bold mb-4">{currentStep === 1 ? 'Sign Up' : 'Login'}</h2>

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      placeholder='UserName'
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Phone number</label>
                    <input
                      type="text"
                      placeholder='+998'
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 relative">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
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
                      <label className="flex items-center">
                        <input
                          className="Modal_radio"
                          type="radio"
                          name="userType"
                          checked={selectedOption === 'investor'}
                          onChange={() => setSelectedOption('investor')}
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
                          checked={selectedOption === 'startup'}
                          onChange={() => setSelectedOption('startup')}
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
                    Already have an account?{' '}
                    <span onClick={handleLoginClick} className="text-blue-500 cursor-pointer ms-1">
                      Login
                    </span>
                  </p>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Phone number</label>
                    <input
                      type="text"
                      placeholder='+998'
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 relative">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
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
                    Don't have an account?{' '}
                    <span onClick={() => setCurrentStep(1)} className="text-blue-500 cursor-pointer ms-1">
                      Sign Up
                    </span>
                  </p>
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
