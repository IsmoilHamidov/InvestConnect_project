import { Button } from "../ui/button";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetUsersQuery,
} from "@/store/slice/products";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../Category";

function ProjectForm() {
  const [createProduct, { isLoading, isError, isSuccess, error }] =
    useCreateProductMutation();
  
  const { data: getUserId } = useGetUsersQuery(undefined);

  const { data: getCategories } = useGetCategoriesQuery(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 3000);
    }
  }, [isSuccess, navigate]);

  
  const [formData, setFormData] = useState({
    user: getUserId?.id,
    name: "",
    rendement: "",
    location: "",
    description: "",
    category: "1",
    contract: "1",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const debugFormData = (formData: FormData) => {
    // eslint-disable-next-line prefer-const
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setFormData((prev) => ({ ...prev, user: getUserId }));
    e.preventDefault();

    const payload = new FormData();
    payload.append("user", formData.user);
    payload.append("name", formData.name);
    payload.append("rendement", formData.rendement);
    payload.append("location", formData.location);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("contract", formData.contract);
    payload.append("price", formData.price);

    if (selectedFile) {
      payload.append("image", selectedFile);
    }

    debugFormData(payload); // Optional: Logs FormData content for debugging.

    try {
      const result = await createProduct(payload).unwrap();
      console.log("Product created:", result);
      // onClose();
      toast({
        description: "Product created successfully!",
        variant: "success",
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to create product:", err);
      toast({
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[100vh] py-14 bg-gray-100">
      <div className="max-w-7xl m-auto ">
        <h1 className="text-2xl font-bold mb-6 text-custom-gray">
          Add New Project
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-12"
        >
          {/* Personal Details Section */}
          <div>
            <h2 className="font-medium text-xl mb-4">Personal Details</h2>
            <div className="flex flex-wrap justify-between items-center gap-y-5">
              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  User Name
                </label>
                <input
                  placeholder="User Name"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  placeholder="Enter LinkedIn URL"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Location
                </label>
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div>
            <h2 className="font-medium text-xl mb-4 text-[57737d]">
              Project Details
            </h2>
            <div className="flex flex-wrap justify-between items-center gap-y-5">
              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Project Name"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>
              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Category
                </label>
                <select className="w-full bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none">
                  {getCategories
                    ? getCategories?.map((category: CategoryType) => (
                        <option
                          value={category.id}
                          key={category.id}
                          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        >
                          <span>{category.name}</span>
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Rendement
                </label>
                <input
                  name="rendement"
                  type="number"
                  placeholder="Rendement"
                  value={formData.rendement}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Product Price
                </label>
                <input
                  name="price"
                  placeholder="Price"
                  type="number" 
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex justify-between items-center">
            <div className="w-[48%]">
              <label className="block text-md font-medium text-gray-600 mb-3">
                Description
              </label>
              <textarea
                style={{ resize: "none" }}
                className="w-full outline-none border border-custom-gray rounded-md p-3 h-36"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="w-[48%]">
              <label className="block text-md font-medium text-gray-600 mb-3">
                Additional Information
              </label>
              <textarea
                style={{ resize: "none" }}
                className="w-full outline-none border border-custom-gray rounded-md p-3 h-36"
                placeholder="Any additional details"
              ></textarea>
            </div>
          </div>

          {/* <div>
              <ImageUpload/>
          </div> */}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          {/* Submit Button */}
          <div className="flex items-center justify-between ">
            <Button type="submit" className="Brown_button" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
            {isError && (
              <p className="text-red-600">
                Error creating product: {JSON.stringify(error)}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
