import { useToast } from "@/hooks/use-toast";
import { useRegisterUserMutation } from "@/store/slice/apiSlice";
import { useAuthModalStore } from "@/store/authModalStore";
import React, { useState } from "react";
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
  const [formError, setFormError] = useState(false); // State for "Fill all fields"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>();

  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (data: RegistrationFormValues) => {
    if (!data.username || !data.phone || !data.role || !data.password) {
      setFormError(true); // Show error message
      return;
    }
    setFormError(false); // Clear error message
    try {
      const response = await registerUser(data).unwrap();
      localStorage.setItem("user_id", response.user);
      localStorage.setItem("username", data.username);
      localStorage.setItem("selectedOption", data.role);

      toast({
        description: `Registration successful!`,
        variant: "success",
      });

      openModal("verification");
    } catch (err) {
      toast({
        className: "bg-red-500",
        description: `Failed to register`,
        variant: "destructive",
      });
      console.error("Failed to register:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
      <h2 className="text-xl font-bold mb-6">Sign Up</h2>

      {/* "Fill all fields" message */}
      {formError && (
        <p className="text-red-500 text-center mb-4">Fill all fields</p>
      )}

      <div className="mt-4">
        <label className="block text-custom-gray mb-2">Username</label>
        <input
          placeholder="UserName"
          className="w-full border border-gray-300 focus:border-2 
           focus:border-custom-blue-gray ease-out delay-150
           rounded-xl py-2 px-3"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-custom-gray mb-2">Phone</label>
        <input
          placeholder="+998"
          className="w-full border border-gray-300 focus:border-2 
          focus:border-custom-blue-gray ease-out delay-150
          rounded-xl py-2 px-3"
          {...register("phone", { required: "Phone number is required" })}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="mb-3 mt-4 relative">
        <label className="block text-custom-gray mb-2">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 focus:border-2 
          focus:border-custom-blue-gray ease-out delay-150
          rounded-xl py-2 px-3"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex gap-x-7 my-6">
        <div>
          <label className="flex items-center">
            <input
              type="radio"
              className="Modal_radio"
              value="investor"
              {...register("role", { required: "Role selection is required" })}
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
              {...register("role", { required: "Role selection is required" })}
            />
            Startup Funder
          </label>
        </div>
        {errors.role && (
          <span className="text-red-500 text-sm">
            {errors.role.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="Blue_button font-semibold w-full bg-[#749BA9] text-white p-2 rounded-2xl"
      >
        Register
      </button>
      <p className="mt-4 text-center font-normal text-base">
        Already have an account?
        <span
          className="text-blue-500 ms-2 cursor-pointer"
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
