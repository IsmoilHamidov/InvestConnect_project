import { useCreateProductMutation } from "@/store/slice/products";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { ModalProps } from "@/interface";

const CreateProductForm: React.FC<ModalProps> = ({onClose}) => {
  const [createProduct, { isLoading, isError, isSuccess, error }] =
    useCreateProductMutation();

  const [formData, setFormData] = useState({
    user: 1,
    name: "",
    rendement: "",
    location: "",
    description: "",
    category: 1,
    contract: 1,
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const {toast} = useToast()
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("user", 6);
    payload.append("name", formData.name);
    payload.append("rendement", formData.rendement);
    payload.append("location", formData.location);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("contract", formData.contract);
    payload.append("price", formData.price);

    if (selectedFile) {
      payload.append("image", selectedFile); // Добавляем файл изображения
    }

    console.log("payload: ", payload);
    try {
      const result = await createProduct(payload).unwrap();
      console.log("Product created:", result);
      onClose()
      toast({
        description: `Product created`,
        variant: "success",
      });
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="grid gap-4"
    >
      <input
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        name="rendement"
        placeholder="Rendement"
        value={formData.rendement}
        onChange={handleChange}
        required
      />
      <input
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <textarea
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Product"}
      </Button>
      {isSuccess && <p>Product created successfully!</p>}
      {isError && <p>Error creating product: {JSON.stringify(error)}</p>}
    </form>
  );
};

export default CreateProductForm;
