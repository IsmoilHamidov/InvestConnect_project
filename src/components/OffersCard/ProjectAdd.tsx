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
      });
    }
  }, [isSuccess, navigate]);

  
  const [formData, setFormData] = useState({
    user: getUserId?.id,
    name: "",
    rendement: "",
    location: "",
    description: "",
    price: "",
    category: "",
    product_file:"null",
    kampanya_egasi:"",
    kontact: "",
    campany_name: "",
    oylik_daromadi:"",
    soff_foydasi:""

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
    payload.append("price", formData.price);
    payload.append("kampanya_egasi", formData.kampanya_egasi);
    payload.append("campany_name", formData.campany_name);
    payload.append("oylik_daromadi", formData.oylik_daromadi);
    payload.append("soff_foydasi", formData.soff_foydasi);

    if (selectedFile) {
      payload.append("image", selectedFile);
    }

    debugFormData(payload); 

    try {
      const result = await createProduct(payload).unwrap();
      console.log("Mahsulot qo'shildi:", result);
      // onClose();
      toast({
        description: "Loyiha muvaffaqiyatli yaratildi!",
        variant: "success",
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to create product:", err);
      toast({
        description: "Mahsulot yaratilmadi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[100vh] py-14 bg-gray-100">
      <div className="max-w-7xl m-auto ">
        <h1 className="text-2xl font-bold mb-8 text-custom-gray">
        Yangi loyiha qo'shish
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-12"
        >

          <div>
            <div className="flex flex-wrap justify-between items-center gap-y-7">
            <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  kontakt
                </label>
                <input
                  name="kontact"
                  placeholder="kontact"
                  type="text" 
                  value={formData. kontact}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Kampanya Egasi
                </label>
                <input
                  type="text"
                  name="kampanya_egasi"
                  value={formData.kampanya_egasi}
                  onChange={handleChange}
                  placeholder="Loyiha nomini kiriting"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Kompaniya 
                </label>
                <input
                  type="text"
                  name="campany_name"
                  value={formData.campany_name}
                  onChange={handleChange}
                  placeholder="Kompaniyani kiriting"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Loyiha nomi
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Loyiha nomini kiriting"
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Oylik daromadi
                </label>
                <input
                  name="oylik_daromadi"
                  placeholder="Loyiha narxini kiriting"
                  type="number" 
                  value={formData. oylik_daromadi}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              
              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Loyiha turi
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
                Samaradorlik
                </label>
                <input
                  name="rendement"
                  type="number"
                  placeholder="Samaradorlik"
                  value={formData.rendement}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>

              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Loyiha narxi
                </label>
                <input
                  name="price"
                  placeholder="Loyiha narxini kiriting"
                  type="number" 
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>
      
              <div className="w-[48%]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Joylashuv
                </label>
                <input
                  name="location"
                  placeholder="Joylashuvingiz"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg px-2 h-10"
                />
              </div>
                  
                <div className="w-[48%]">
                  <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                </div>

            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-[48%]">
              <label className="block text-md font-medium text-gray-600 mb-3">
              Tavsif
              </label>
              <textarea
                style={{ resize: "none" }}
                className="w-full outline-none border border-custom-gray rounded-md p-3 h-36"
                name="description"
                placeholder="Tavsif qo'shing"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

          
          </div>

          {/* <div>
              <ImageUpload/>
          </div> */}

       

          {/* Submit Button */}
          <div className="flex items-center justify-between ">
            <Button type="submit" className="Brown_button" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
            {isError && (
              <p className="text-red-600">
              Mahsulot yaratishda xatolik yuz berdi: {JSON.stringify(error)}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;