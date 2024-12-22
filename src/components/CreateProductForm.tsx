import { useCreateProductMutation } from "@/store/slice/products";
import React, { useState } from "react";

const CreateProductForm = () => {
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
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="rendement"
        placeholder="Rendement"
        value={formData.rendement}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        name="contract"
        placeholder="contract"
        value={formData.contract}
        onChange={handleChange}
        required
      />
      <input
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Product"}
      </button>
      {isSuccess && <p>Product created successfully!</p>}
      {isError && <p>Error creating product: {JSON.stringify(error)}</p>}
    </form>
  );
};

export default CreateProductForm;
