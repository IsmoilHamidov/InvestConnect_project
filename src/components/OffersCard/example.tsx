/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useCreateProductMutation, useGetCategoriesQuery, useGetUsersQuery } from "@/store/slice/products";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { errorTranslations, fields } from "./projectAddRequires";
import { CategoryType } from "../Category";
import NavbarAdmin from "../navbarAdmin";


const Example = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();
  const { data: getUserId } = useGetUsersQuery(undefined);
  const { data: getCategories } = useGetCategoriesQuery(undefined);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [selectedDoc, setSelectedDoc] = useState<File | undefined>();
  const [selectedDemo, setSelectedDemo] = useState<File | undefined>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic"); // Tabs state

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
          description: "Loyiha muvaffaqiyatli qoshildi!",
          variant: "success",
          duration: 3000,
        });
        reset();
        navigate("/profile");
      } catch (error) {
        console.error("Error creating product:", error);
      
        if ((error as any).data) {
          Object.entries((error as any).data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => {
                toast({
                  description: `${
                    fields.find((f) => f.name === field)?.label || field
                  }: ${errorTranslations[msg] || msg}`,
                  variant: "destructive",
                });
              });
            }
          });
        } else {
          toast({
            description: "Noma'lum xatolik yuz berdi.",
            variant: "destructive",
          });
        }
      }
      
    };
  return (
    <>
      <NavbarAdmin />
      <div className="bg-gray-100 mx-auto pb-9 pt-24 shadow-md rounded-lg">

    <div className="flex items-center justify-center  space-x-6">
        <div
            className={`w-12 h-12 flex items-center justify-center rounded-full border-4 transition-all duration-300 ease-in-out 
            ${activeTab === "basic" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-600 scale-110" : "bg-gray-200 text-gray-500 border-gray-300"}
            `}
        >
            <span className="text-xl font-semibold">{activeTab === "basic" ? "1" : ""}</span>
        </div>

        <div className="text-2xl text-gray-500">
            <span>→</span>
        </div>

        <div
            className={`w-12 h-12 flex items-center justify-center rounded-full border-4 transition-all duration-300 ease-in-out 
            ${activeTab === "details" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-600 scale-110" : "bg-gray-200 text-gray-500 border-gray-300"}
            `}
        >
            <span className="text-xl font-semibold">{activeTab === "details" ? "2" : ""}</span>
        </div>
        </div>
        
        <h2 className="text-2xl text-center font-bold mt-12 mb-12">Loyiha qo'shish</h2>


        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-7xl m-auto flex flex-wrap justify-between items-center gap-y-7  text-custom-gray"
        >
          {activeTab === "basic" && (
            <>
            <div className="w-[48%] grid">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Turkum
                </label>
                <select
                {...register("category", { required: true })} 
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

            {fields
                .filter((field) => field.type !== "textarea") 
                .map((field) => (
                    <div key={field.name} className="w-[48%] flex flex-col justify-center">
                    <label className="block text-sm font-medium capitalize leading-9">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        required
                        step={field.step || undefined}
                        placeholder={field.placeholder || ""}
                        {...register(field.name, { required: true })}
                        className="w-full p-3 px-3  border-gray-300 rounded-xl"
                    />
                    </div>
                ))}
              
                    <div className="w-full flex justify-center items-center mt-8">
                        <button
                            className="w-1/6 py-2 rounded-full Blue_button text-lg  font-medium text-white"
                            onClick={() => {
                            const tabs = ["basic", "details"]; // List of available tabs
                            const currentIndex = tabs.indexOf(activeTab);
                            const nextIndex = (currentIndex + 1) % tabs.length; // Loop to the first tab if at the end
                            setActiveTab(tabs[nextIndex]);
                            }}
                        >
                            Oldinga
                        </button>
                    </div>

            </>
          )}


          {activeTab === "details" && (
            <>
              {fields
                .filter((field) => field.type === "textarea") 
                .map((field) => (
                    <div key={field.name} className="w-full flex flex-col justify-center">
                    <label className="block text-sm font-medium capitalize leading-9">
                        {field.label}
                    </label>
                    <textarea
                        {...register(field.name, { required: true })}
                        rows={6}
                        placeholder={field.placeholder || ""}
                        className="w-full border-gray-300 p-3 px-3 rounded-xl resize-none"
                    />
                    </div>
                ))}


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
                        className="px-4 py-2 text-lg font-medium text-gray-500"
                        onClick={() => {
                        const tabs = ["basic", "details"]; // List of available tabs
                        const currentIndex = tabs.indexOf(activeTab);
                        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length; // Loop to the last tab if at the first
                        setActiveTab(tabs[prevIndex]);
                        }}
                    >
                        Previous
                    </button>

                <button
                    type="submit"
                    className={`w-full Blue_button mt-5 py-2 px-4 text-white font-medium rounded-xl shadow-sm ${
                    isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Yuborilmoqda..." : "Yuborish"}
                </button>
            </>
          )}

        </form>
      </div>
    </>
  );
};

export default Example;
