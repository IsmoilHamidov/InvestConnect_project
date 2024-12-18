import React, { useState } from 'react';
import { useUpdateProfileDetailMutation } from './apiSlice'; // Путь к вашему API slice
import { Button } from '@/components/ui/button';

const ProfileUpdateForm: React.FC = () => {
  const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileDetailMutation();

  const [formData, setFormData] = useState({
    id: 113, // Пример значения
    firstname: '',
    lastname: '',
    phone: '+998',
    email: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ id: formData.id, data: formData });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='grid gap-2'>
      <input
        className='border-2 p-3'
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="Firstname"
        required
      />
      <input
        className='border-2 p-3'
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="Lastname"
        required
      />
      <input
        className='border-2 p-3'
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        className='border-2 p-3'
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        className='border-2 p-3'
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
      {error && <p>Error updating profile</p>}
      {isSuccess && <p>Profile updated successfully!</p>}
    </form>
  );
};

export default ProfileUpdateForm;
