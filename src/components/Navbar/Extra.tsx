
import React, { useState } from 'react';
import { useNavbarContext } from './SignUp_Context';
import { HiX } from 'react-icons/hi';

const SignUpModals: React.FC = () => {
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

  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setCurrentStep(1);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (!username || !phone || !password || !selectedOption) {
        setErrorMessage('Please fill in all fields.');
        return;
      }

      // Registration API call
      try {
        const response = await fetch(
          'https://bakirali007.pythonanywhere.com/api/v1/app/users/register/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              username,
              phone,
              password,
              role: selectedOption,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setIsSignedUp(true);
          localStorage.setItem('username', username);
          localStorage.setItem('selectedOption', selectedOption);
          setIsModalOpen(false);
        } else {
          setErrorMessage('Signup failed. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Signup failed. Please try again.');
      }
    } else if (currentStep === 2) {
      if (!username || !password) {
        setErrorMessage('Please fill in all fields.');
        return;
      }

      // Login API call
      try {
        const response = await fetch(
          'https://bakirali007.pythonanywhere.com/api/v1/app/users/login/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setIsSignedUp(true); // Consider this as logged in
          localStorage.setItem('username', username);
          setIsModalOpen(false);
        } else {
          setErrorMessage(data.detail || 'Login failed. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  const handleOptionChange = (option: 'investor' | 'startup') => {
    setSelectedOption(option);
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
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {currentStep === 1 && (
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-600"
              >
                <HiX size={24} />
              </button>
            )}

            <h2 className="text-lg font-bold mb-4">
              {currentStep === 1 ? 'Sign Up' : 'Login'}
            </h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone number</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='flex gap-x-7 my-6'>
                      <div>
                        <label className="flex items-center">
                          <input
                            id='Modal_radio'
                            type="radio"
                            name="userType"
                            checked={selectedOption === 'investor'}
                            onChange={() => handleOptionChange('investor')}
                          />
                          Investor
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            id='Modal_radio'
                            type="radio"
                            name="userType"
                            checked={selectedOption === 'startup'}
                            onChange={() => handleOptionChange('startup')}
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
                    <span
                      onClick={handleLoginClick}
                      className="text-blue-500 cursor-pointer"
                    >
                      Login
                    </span>
                  </p>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="Blue_button w-full bg-[#749BA9] text-white p-2 rounded-lg"
                  >
                    Login
                  </button>
                  <p className="mt-4 text-center font-normal text-base">
                    Don't have an account?{' '}
                    <span
                      onClick={() => setCurrentStep(1)}
                      className="text-blue-500 cursor-pointer"
                    >
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

export default SignUpModals;
