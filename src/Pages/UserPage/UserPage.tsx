import { RegistrationForm } from './RegistrationForm';
import VerificationForm from './VerificationForm';
import LoginForm from './LoginForm';
import UserProfile from './Profilesss';
import ProfileUpdateForm from './ProfileUpdateForm';

const UserPage = () => {
  return (
    <div className='p-11 grid gap-8'>
      <RegistrationForm />
      <VerificationForm />
      <LoginForm />
      <UserProfile />
      <ProfileUpdateForm />
    </div>
  );
};

export default UserPage;