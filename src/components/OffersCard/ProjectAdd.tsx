import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ImageUpload from "../ui/imageUpload";
import { useForm } from "react-hook-form";

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
  additionalInfo?: string; // Optional field
  image?: string; // Optional field for image
};

function ProjectForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-[100vh] py-14 bg-gray-100">
      <div className="max-w-7xl m-auto ">
        <h1 className="text-2xl font-bold mb-6 text-custom-gray">
          Add New Project
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div>
            <h2 className="font-medium text-xl mb-4">Personal Details</h2>
            <div className="flex flex-wrap justify-between items-center gap-y-5">
              {/* Form fields for personal details */}
              {[
                { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "Enter phone number" },
                { label: "Email", name: "email", type: "email", placeholder: "Enter email address" },
                { label: "LinkedIn Profile", name: "linkedIn", type: "url", placeholder: "Enter LinkedIn URL" },
                { label: "Location", name: "location", type: "text", placeholder: "Enter location" },
              ].map((field) => (
                <div className="w-[48%]" key={field.name}>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name as keyof FormData, { required: `${field.label} is required` })}
                    className="w-full border-gray-300 rounded-lg px-2 h-10"
                  />
                  {errors[field.name as keyof FormData] && (
                    <span className="text-red-500 text-sm">{errors[field.name as keyof FormData]?.message}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-medium text-xl mb-4 text-[57737d]">Project Details</h2>
            <div className="flex flex-wrap justify-between items-center gap-y-5">
      
              {[
                { label: "Project Name", name: "projectName", type: "text", placeholder: "Enter Project Name" },
                { label: "Category", name: "category", type: "select", placeholder: "Select Category", options: ["Web Development", "Mobile Development", "Design", "Marketing"] },
                { label: "Rendement", name: "rendement", type: "number", placeholder: "Enter Rendement" },
                { label: "Product Price", name: "experience", type: "number", placeholder: "Enter Product Price" },
              ].map((field) => (
                <div className="w-[48%]" key={field.name}>
                  <label className="block text-sm font-medium text-gray-600 mb-2 ">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      {...register(field.name as keyof FormData, { required: `${field.label} is required` })}
                      className="w-full bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name as keyof FormData, { required: `${field.label} is required` })}
                      className="w-full border-gray-300 rounded-lg px-2 h-10 "
                    />
                  )}
                  {errors[field.name as keyof FormData] && (
                    <span className="text-red-500 text-sm">{errors[field.name as keyof FormData]?.message}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex  justify-between items-center">
              <div className="w-[48%]">
                <label className="block text-md font-medium text-gray-600 mb-3 ">
                  Description
                </label>
                <textarea
                  style={{resize: "none"}}
                  {...register("description", { required: "Description is required" })}
                  className="w-full outline-none border border-custom-gray rounded-md p-3 h-36"
                  placeholder="Include description"
                ></textarea>
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description?.message}</span>
                )}
              </div>
              
              <div className="w-[48%]">
                <label className="block text-md font-medium text-gray-600 mb-3 ">
                  Additional Information
                </label>
                <textarea
                  style={{resize: "none"}}
                  {...register("additionalInfo")}
                  className="w-full outline-none border border-custom-gray rounded-md p-3 h-36"
                  placeholder="Any additional details"
                ></textarea>
              </div>
          </div>


          <div>
            {/* Image Upload (Optional) */}
            <ImageUpload />
          </div>

       
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="Brown_button text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Submit Project
            </Button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
