import { useCreateProductMutation } from "@/store/slice/products";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ProductFormInputs {
  user: number;
  name: string;
  rendement: string;
  location: string;
  description: string;
  category: number;
  contract: number;
  price?: string;
  image?: File;
}

const AddProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormInputs>();

  const [createProduct, { isLoading, isError, isSuccess }] =
    useCreateProductMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    console.log("form clicked");
    console.log("Submitted data:", data); // Логируем данные формы

    const formData = new FormData();
    formData.append("user", data.user.toString());
    formData.append("name", data.name);
    formData.append("rendement", data.rendement);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("category", data.category.toString());
    formData.append("contract", data.contract.toString());
    if (data.price) formData.append("price", data.price);

    if (data.image) {
      formData.append("image", data.image);
    } else {
      alert("Please upload an image.");
      return;
    }

    try {
      await createProduct(formData).unwrap();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Selected file:", file); // Логируем выбранный файл
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // предотвращаем стандартную отправку формы
          console.log("Form submitted manually");
          handleSubmit(onSubmit)(e); // вручную вызываем onSubmit
        }}
        className="space-y-4"
      >
        {/* Поля формы */}
        <div>
          <label className="block text-sm font-medium">User ID</label>
          <input
            type="number"
            {...register("user", { required: true })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.user && (
            <p className="text-red-500 text-sm">User ID is required.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 50 })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              Name is required and must be 1-50 characters.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Rendement</label>
          <input
            type="text"
            {...register("rendement", { required: true, maxLength: 5 })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.rendement && (
            <p className="text-red-500 text-sm">
              Rendement is required and must be 1-5 characters.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true, maxLength: 100 })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">
              Location is required and must be 1-100 characters.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", { required: true, minLength: 1 })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="number"
            {...register("category", { required: true })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">Category is required.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Contract</label>
          <input
            type="number"
            {...register("contract", { required: true })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.contract && (
            <p className="text-red-500 text-sm">Contract is required.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Price (optional)</label>
          <input
            type="text"
            {...register("price")}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* Поле для загрузки изображения */}
        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleFileChange}
            className="w-full border rounded px-2 py-1"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Add Product"}
        </button>
      </form>

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          An error occurred while adding the product.
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 text-sm mt-2">
          Product added successfully!
        </p>
      )}
    </div>
  );
};

export default AddProduct;
