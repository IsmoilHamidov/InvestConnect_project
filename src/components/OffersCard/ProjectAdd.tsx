import { useForm } from "react-hook-form";
import { useCreateProductMutation, useGetCategoriesQuery, useGetUsersQuery } from "@/store/slice/products";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { fields } from "./projectAddRequires";
import { CategoryType } from "../Category";
import NavbarAdmin from "../navbarAdmin";

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createProduct, { isLoading, isSuccess, isError, }] =
    useCreateProductMutation();

  const { data: getUserId } = useGetUsersQuery(undefined);
  const { data: getCategories } = useGetCategoriesQuery(undefined);

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [selectedDoc, setSelectedDoc] = useState<File | undefined>();
  const [selectedDemo, setSelectedDemo] = useState<File | undefined>();
  const { toast } = useToast();


  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedDoc(e.target.files[0]);
    }
  };

  const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedDemo(e.target.files[0]);
    }
  };

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("user", getUserId?.id || "");
    formData.append("category", data.category);
    formData.append("rendement", `${data.rendement}%`);
    formData.append("price", parseFloat(data.price).toFixed(2));
    formData.append("short_description", data.short_description);
    formData.append("investment_range", data.investment_range);
    formData.append("team_info", data.team_info);
    formData.append("business_plan", data.business_plan);
    formData.append("use_of_investment", data.use_of_investment);
    formData.append("financial_forecasts", data.financial_forecasts);
    formData.append("team_details", data.team_details);
    formData.append("market_analysis", data.market_analysis);
    formData.append("contact_info", data.contact_info);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    if (selectedDoc) {
      formData.append("legal_documents", selectedDoc);
    }
    if (selectedDemo) {
      formData.append("prototype_demo", selectedDemo);
    }

    try {
      await createProduct(formData).unwrap();
      toast({
        description: "Product successfully created!",
        variant: "success",
        duration: 3000,
      });
      reset();
      navigate("/profile");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        description: "Failed to create the product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>

        <NavbarAdmin/>
    
      <div className="bg-gray-100 mx-auto border border-red-500 pb-9 pt-24 shadow-md rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-7">Loyiha qo'shing</h2>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-7xl m-auto grid content-center justify-items-center grid-cols-2 gap-4 gap-x-14 text-custom-gray"
        >
          {fields.map((field) => (
            <div key={field.name} className="w-full flex flex-col justify-center">
              <label className="block text-sm font-medium capitalize leading-9">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...register(field.name, { required: true })}
                  rows={3}
                  placeholder={field.placeholder || ""}
                  className="w-full border-gray-300 p-2 px-3 rounded-xl resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  required
                  step={field.step || undefined}
                  placeholder={field.placeholder || ""}
                  {...register(field.name, { required: true })}
                  className="w-full p-2 border-gray-300 rounded-xl"
                />
              )}

            </div>
          ))}

          


          <div className="w-full grid">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Turkum
            </label>
            <select
              {...register("category", { required: true })} // Bind category to react-hook-form
              className="w-full bg-background rounded-md p-2 focus:outline-none"
            >
              {getCategories &&
                getCategories.map((category: CategoryType) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full grid">
            <label htmlFor="image" className="text-sm">
            Rasm
            </label>
            <input
              className="p-2 border-gray-300 rounded-xl"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full grid">
            <label htmlFor="legal_documents" className="text-sm">
            Yuridik hujjat
            </label>
            <input
              className="p-2 border-gray-300 rounded-xl"
              type="file"
              name="legal_documents"
              accept=".pdf, .doc, .docx, .txt"
              onChange={handleDocChange}
            />
          </div>
          <div className="w-full grid">
            <label htmlFor="prototype_demo" className="text-sm">
            Demo prototipi
            </label>
            <input
              className="p-2 border-gray-300 rounded-xl"
              type="file"
              name="prototype_demo"
              accept="image/*"
              onChange={handleDemoChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full Blue_button y mt-5 py-2 px-4 text-white font-medium rounded-xl shadow-sm ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Yuborilmoqda..." : "Yuborish"}
          </button>
          {isSuccess && (
            <p className="text-green-600 mt-2">Loyiha muvaffaqiyatli qo'shildi!</p>
          )}
          {isError && (
            <p className="text-red-600 mt-2">Loyiha qo'shilmadi.</p>
          )}
        </form>
      </div>
    </>
  );
};

export default ProductForm;