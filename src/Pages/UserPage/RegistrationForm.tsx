import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from './apiSlice';

interface RegistrationFormValues {
  username: string;
  phone: string;
  role: string;
  password: string;
}

export const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>();
  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log("otvet: ", response)
      localStorage.setItem("user_id", response.user)
      alert('Registration successful!');
    } catch (err) {
      console.error('Failed to register:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Registration</h1>
      <div>
        <label>Username</label>
        <input className='border-2' {...register('username', { required: 'Username is required' })} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label>Phone</label>
        <input className='border-2' {...register('phone', { required: 'Phone is required' })} />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div>
        <label>Role</label>
        <input className='border-2' {...register('role', { required: 'Role is required' })} />
        {errors.role && <span>{errors.role.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          className='border-2'
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isLoading}>Register</button>

      {isError && <p>Registration failed: {JSON.stringify(error)}</p>}
      {isSuccess && <p>Registration successful!</p>}
    </form>
  );
};
