import { useToast } from "@/hooks/use-toast";
import { useRegisterUserMutation } from "@/Pages/UserPage/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React from "react";
import { useForm } from "react-hook-form";

interface RegistrationFormValues {
  username: string;
  phone: string;
  role: string;
  password: string;
}

export const Registration: React.FC = () => {
  const { isOpen, openModal } = useAuthModalStore();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>();
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log("otvet: ", response);
      localStorage.setItem("user_id", response.user);

      toast({
        description: `Registration successful!`,
        variant: "success",
      });
      openModal("verification");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
      <h2 className="text-lg font-bold mb-4">Registration</h2>
      <div>
        <label className="block text-gray-700 mb-2">Username</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label>Phone</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2"
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div className="mb-3 relative">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg p-2"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className="flex gap-x-7 my-6">
        <div>
          <label className="flex items-center">
            <input
              type="radio"
              className="Modal_radio"
              value="investor"
              {...register("role", { required: "Role is required" })}
            />
            Investor
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="radio"
              className="Modal_radio"
              value="startup"
              {...register("role", { required: "Role is required" })}
            />
            Startup Funder
          </label>
        </div>
        {errors.role && (
          <span className="text-red-500">{errors.role.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-lg"
      >
        Register
      </button>
      <p className="mt-4 text-center font-normal text-base">
        Already have an account?
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => openModal("login")}
        >
          Login
        </span>
      </p>

      {isError && <p>Registration failed: {JSON.stringify(error)}</p>}
      {isSuccess && <p>Registration successful!</p>}
    </form>
  );
};
