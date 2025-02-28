import { FieldError, useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetUsersQuery,
} from "@/store/slice/products";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { errorTranslations, fields } from "./OfferHooks/projectAddRequires";
import { CategoryType } from "../Category";
import NavbarAdmin from "../navbarAdmin";
import { MdOutlineFileUpload, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import folderImage from "../../assets/images/rb_4574.png";

const Example = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: getUserId } = useGetUsersQuery(undefined);
  const { data: getCategories } = useGetCategoriesQuery(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<File | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");

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
        description: "Loyiha muvaffaqiyatli qo'shildi!",
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
                description: `${fields.find((f) => f.name === field)?.label || field
                  }: ${errorTranslations[msg] || msg}`,
                variant: "destructive",
                duration: 10000,
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

  const handleNextStep = handleSubmit((data) => {
    const emptyFields = fields.some(
      (field) => field.type !== "textarea" && !data[field.name]?.trim()
    );
    if (emptyFields) {
      setActiveTab("error");
    } else {
      setActiveTab("details");
    }
  });


  const [search, setSearch] = useState("");

  return (
    <>
      <NavbarAdmin search={search} setSearch={setSearch} />
      <div className="bg-gray-100 mx-auto md:pb-14 lg:pt-32 pt-20 shadow-md rounded-lg px-8 ">
        <div className="flex items-center justify-center lg:mb-11 mb-6">
          <div className="flex items-center">
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out ${activeTab === "basic"
                ? "bg-gradient-to-r from-primary to-gray-500 text-white border-[#57737d] "
                : " bg-gray-200 text-gray-500 border-gray-300"
                }`}
            >
              <span className="text-2xl font-semibold">1</span>
            </div>
          </div>
          <div className="w-36 h-1 bg-gray-400 transition-all duration-300 ease-in-out"></div>
          <div className="flex items-center">
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out ${activeTab === "details"
                ? "bg-gradient-to-r from-primary to-gray-500 text-white border-[#57737d] "
                : "bg-gray-200 text-gray-500 border-gray-300"
                }`}
            >
              <span className="text-2xl font-semibold">2</span>
            </div>
          </div>
        </div>

        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="  lg:max-w-7xl m-auto flex flex-col lg:flex-row  flex-wrap  lg:justify-between items-center gap-y-3 lg:gap-y-7  text-secondary"
        >
          {activeTab === "basic" && (
            <>
              <h2 className="md:text-[1.5rem] text-base w-full text-center font-semibold mb-8">
                Loyiha haqida umumiy ma'lumot kiritish
              </h2>
              <div className="w-[48%] grid">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Turkum
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full bg-background rounded-xl p-3 focus:outline-none "
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
                  <div
                    key={field.name}
                    className="lg:w-[48%] w-full flex flex-col justify-center"
                  >
                    <label className="block text-xs md:text-sm font-medium capitalize leading-9">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      step={field.step || undefined}
                      placeholder={field.placeholder || ""}
                      {...register(field.name, { required: `${field.label} kiritilishi  shart` })}
                      className={`w-full p-3 px-3 text-sm lg:text-base border-gray-300 rounded-xl ${errors[field.name] ? "border-red-500" : ""
                        }`}
                    />

                    {errors[field.name] && (
                      <span className="text-red-500 text-sm mt-2">
                        {(errors[field.name] as FieldError).message}
                      </span>
                    )}
                  </div>
                ))}

              <div className="w-full flex justify-center items-center mt-8 mb-10 md:mb-0">
                <button
                  type="button"
                  className="lg:w-1/6 w-full py-2 flex items-center justify-center rounded-full Blue_button text-lg font-medium text-white"
                  onClick={handleNextStep}
                >
                  Oldinga
                  <MdOutlineNavigateNext size={27} />
                </button>
              </div>
            </>
          )}

          {activeTab === "details" && (
            <>
              <h2 className=" text-base md:text-[1.5rem] w-full text-center font-semibold mb-8">
                Loyiha haqida batafsil ma'lumot yuklash
              </h2>
              <div className=" grid grid-cols-2 w-full gap-x-4 gap-y-2 md:gap-6" >

                {fields
                  .filter((field) => field.type === "textarea")
                  .map((field) => (
                    <div
                      key={field.name}
                      className=" w-full flex flex-col justify-center"
                    >
                      <label className="block text-xs md:text-sm font-medium text-secondary capitalize leading-9">
                        {field.label}
                      </label>
                      <textarea
                        {...register(field.name, { required: true })}
                        placeholder={field.placeholder || ""}
                        className="w-full text-xs md:text-sm border-gray-300 h-[13rem] p-3 rounded-xl resize-none"
                      />
                    </div>
                  ))}

                <div className=" w-full grid  gap-2">
                  <label htmlFor="image" className="text-xs md:text-sm font-medium text-secondary">
                    Rasm
                  </label>
                  <div
                    className="w-full h-[13.2rem] flex flex-col justify-center items-center rounded-xl
                  border-2 border-dotted border-secondary px-4 py-3 text-gray-700 relative overflow-hidden"
                  >
                    <input
                      id="image"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {!selectedFile ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MdOutlineFileUpload size={40} className="text-gray-500" />
                        <p className="text-xs md:text-sm text-gray-500">Rasmni yuklash uchun bu yerni bosing</p>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className=" w-full grid gap-2">
                  <label htmlFor="prototype_demo" className="text-xs md:text-sm font-medium text-secondary">
                    Demo prototipi
                  </label>
                  <div
                    className="w-full h-[13.2rem] flex flex-col justify-center items-center rounded-xl
                  border-2 border-dotted border-secondary px-4 py-3 text-gray-700 relative overflow-hidden"
                  >
                    <input
                      id="prototype_demo"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="file"
                      name="prototype_demo"
                      accept="image/*"
                      onChange={handleDemoChange}
                    />
                    {!selectedDemo ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MdOutlineFileUpload size={40} className="text-gray-500" />
                        <p className="text-xs md:text-sm text-gray-500">Prototip yuklash uchun bu yerni bosing</p>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(selectedDemo)}
                          alt="Selected"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className=" w-full grid gap-2">
                  <label htmlFor="legal_documents" className="text-xs md:text-sm font-medium text-secondary">
                    Yuridik hujjat
                  </label>
                  <div
                    className="w-full h-[13.2rem] flex flex-col justify-center items-center rounded-xl border-2 border-dotted border-secondary px-4 py-3 text-gray-700 relative overflow-hidden"
                  >
                    <input
                      id="legal_documents"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="file"
                      name="legal_documents"
                      accept=".pdf, .doc, .docx, .txt"
                      onChange={handleDocChange}
                    />
                    {!selectedDoc ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MdOutlineFileUpload size={40} className="text-gray-500" />
                        <p className="text-xs md:text-sm text-gray-500">Hujjat yuklash uchun bu yerni bosing</p>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <img
                          src={folderImage}
                          alt="Selected"
                          className="h-[70%] w-auto object-contain rounded-lg"
                        />
                        <p className="mt-2 text-xs md:text-sm text-gray-600 truncate w-full text-center">
                          {selectedDoc.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>


              </div>

              <div className="w-full mb-10 md:mb-0 flex justify-center gap-x-12 items-center mt-7">
                <button
                  className="md:w-1/6 w-1/2 py-2 flex justify-center items-center rounded-full Blue_button text-base md:text-lg  font-medium text-white"
                  onClick={() => setActiveTab("basic")}
                >
                  <GrFormPrevious size={27} />
                  Ortga
                </button>

                <button
                  type="submit"
                  className={`md:w-1/6 w-1/2 py-2 flex justify-center items-center gap-2 rounded-full Brown_button text-base md:text-lg  font-medium text-white ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  disabled={isLoading}
                >
                  <MdOutlineFileUpload  size={25} />
                  {isLoading ? "Yuborilmoqda..." : "Yuborish"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Example;
