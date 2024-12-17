import React, { useState } from 'react';

const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ phone, password }).unwrap();
      console.log('Login successful:', result); // Успешный результат
    } catch (err) {
      console.error('Failed to login:', err); // Ошибка
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isError && <p style={{ color: 'red' }}>Error: {error?.data?.detail || 'Failed to login'}</p>}
      {isSuccess && <p style={{ color: 'green' }}>Login successful!</p>}
    </form>
  );
};

export default LoginForm;
