import React, { useState } from 'react';
import { useNavbarContext } from './SignUp_Context';

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

  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setCurrentStep(1);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (currentStep === 1) {
      if (!username || !phone || !password) {
        setErrorMessage('Please fill in all fields.');
        return;
      }
      setCurrentStep(2);
    } else {
      if (!selectedOption) {
        setErrorMessage('Please select an option.');
        return;
      }
  
      try {
        const response = await fetch(
          'https://bakirali007.pythonanywhere.com/api/v1/app/users/register/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({ phone, password, username }),
          }
        );
  
        const data = await response.json();
        if (response.ok) {
          setIsSignedUp(true);
          localStorage.setItem('username', username);
          localStorage.setItem('selectedOption', selectedOption); // Save selectedOption to localStorage
          setIsModalOpen(false);
          console.log(data);
        } else {
          setErrorMessage('Signup failed. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Signup failed. Please try again.');
      }
    }
  };
  

  const handleOptionChange = (option: 'investor' | 'startup') => {
    setSelectedOption(option);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
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
                  <button
                    type="submit"
                    className="w-full bg-[#749BA9] text-white p-2 rounded-lg"
                  >
                    Next
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        className="mr-2"
                        checked={selectedOption === 'investor'}
                        onChange={() => handleOptionChange('investor')}
                      />
                      Investor
                    </label>
                  </div>
                  <div className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        className="mr-2"
                        checked={selectedOption === 'startup'}
                        onChange={() => handleOptionChange('startup')}
                      />
                      Startup Funder
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#749BA9] text-white p-2 rounded-lg"
                  >
                    Submit
                  </button>
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
