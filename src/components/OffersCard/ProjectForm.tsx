import React from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/store/slice/products";
import PersonalDetails from "./PersonalDetails";
import ProjectDetails from "./ProjectDetails";
import DescriptionSection from "./DescriptionSection";
import ImageUpload from "../ui/imageUpload";

// Define the type for formData
type FormData = {
  projectName: string;
  description: string;
  linkedIn: string;
  location: string;
  experience: string;
  category: string;
  rendement: string;
  phoneNumber: string;
  email: string;
  additionalInfo?: string;
  image?: string;
};

function ProjectForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [createProduct, { isLoading, isError, isSuccess, error }] =
    useCreateProductMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createProduct(data).unwrap();
      console.log("Product created successfully:", result);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="min-h-[100vh] py-14">
      <div className="max-w-7xl m-auto">
        <h1 className="text-2xl font-bold mb-6 text-custom-gray">
          Add New Project
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <PersonalDetails register={register} errors={errors} />
          <ProjectDetails register={register} errors={errors} />
          <DescriptionSection register={register} errors={errors} />
          <ImageUpload />
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              disabled={isLoading}
              className={`Brown_button text-white px-6 py-2 rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Project"}
            </Button>
            {isError && (
              <span className="text-red-500">
                Error: {error?.data?.message || "Submission failed"}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
