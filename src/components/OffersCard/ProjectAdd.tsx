import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetUserProfileQuery,
} from "@/store/slice/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MdOutlineFileUpload } from "react-icons/md";

interface FormData {
  user: number;
  name: string;
  rendement: string;
  location: string;
  description: string;
  category: number;
  price: string;
  product_images: string[]; // Fayllar nomlari yoki URL'larini saqlash uchun string array
}

const ProjectAdd: React.FC = () => {
  const { data: users } = useGetUserProfileQuery(undefined);
  const userId = Number(localStorage.getItem("user_id"));
  const [formData, setFormData] = useState<FormData>({
    user: userId,
    name: "",
    rendement: "",
    location: "",
    description: "",
    category: 2,
    price: "",
    product_images: [], // Fayllar nomlarini yoki URL'larini saqlash uchun string array
  });
  const { data: categories } = useGetCategoriesQuery(undefined);
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (users && users.length > 0) {
      setFormData((prev) => ({ ...prev, user: users[0].id }));
    }
  }, [users]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setFormData((prev) => ({ ...prev, category: categories[0].id }));
    }
  }, [categories]);

  useEffect(() => {
    if (isSuccess) {
      toast({ description: "Loyiha muvaffaqiyatli qo'shildi!", variant: "success" });
      navigate("/profile");
    } else if (isError) {
      toast({ description: "Loyihani yaratishda xatolik yuz berdi.", variant: "destructive" });
    }
  }, [isSuccess, isError, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter(file => !["image/jpeg", "image/png"].includes(file.type));
      const oversizedFiles = fileArray.filter(file => file.size > 2 * 1024 * 1024);

      if (invalidFiles.length > 0) {
        toast({ description: "Faqat JPEG yoki PNG formatdagi fayllar qabul qilinadi.", variant: "destructive" });
        return;
      }

      if (oversizedFiles.length > 0) {
        toast({ description: "Fayl hajmi 2 MB dan oshmasligi kerak.", variant: "destructive" });
        return;
      }

      // Fayl nomlarini olish
      const fileNames = fileArray.map(file => file.name);

      setFormData((prev) => ({ ...prev, product_images: fileNames })); // Fayl nomlarini saqlaymiz
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.price || !formData.category || formData.product_images.length === 0) {
      toast({
        description: "Barcha majburiy maydonlarni to'ldiring.",
        variant: "destructive",
      });
      return;
    }
  
    const formPayload = new FormData();
    
    // Append all form data to the FormData object
    formPayload.append("user", formData.user.toString());
    formPayload.append("name", formData.name);
    formPayload.append("rendement", formData.rendement);
    formPayload.append("location", formData.location);
    formPayload.append("description", formData.description);
    formPayload.append("category", formData.category.toString());
    formPayload.append("price", formData.price);
  
    // Append images
    formData.product_images.forEach((imageName, index) => {
      formPayload.append(`product_images[${index}]`, imageName);
    });
  
    try {
      await createProduct(formPayload).unwrap();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };
  

  return (
    <div className="min-h-[100vh] py-14 bg-gray-100">
      <div className="max-w-7xl m-auto">
        <h1 className="text-2xl font-bold mb-8 text-custom-gray">Yangi loyiha qo'shish</h1>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <h2 className="font-medium text-xl mb-4">Shaxsiy ma'lumotlar</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Kampanya egasi</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Kampanya egasi ismi"
                  className="mt-3"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl mb-4 text-[57737d]">Loyiha tafsilotlari</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="projectType" className="text-sm font-medium">Loyiha turi</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, category: Number(value) })}
                >
                  <SelectTrigger className="mt-3">
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rendement" className="text-sm font-medium">Samaradorlik</Label>
                <Input
                  id="rendement"
                  name="rendement"
                  type="number"
                  value={formData.rendement}
                  onChange={handleChange}
                  placeholder="Samaradorlik"
                  className="mt-3"
                  maxLength={5}
                  minLength={1}
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-sm font-medium">Loyiha narxi</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Loyiha narxini kiriting"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm font-medium">Joylashuv</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Joylashuvni kiriting"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Loyihaning qisqacha tavsifi</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Loyihaning qisqacha tavsifini kiriting"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="image" className="text-sm font-medium">Loyiha rasmi</Label>
                <div className="flex items-center mt-3">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center px-4 py-2 bg-[#749BA9] hover:bg-[#81a9b8] text-white text-sm font-medium rounded cursor-pointer"
                  >
                    <MdOutlineFileUpload className="mr-2" />
                    Rasm yuklash
                  </label>
                </div>
                <div className="mt-2">
                  {formData.product_images.length > 0 && (
                    <ul className="space-y-1">
                      {formData.product_images.map((file, index) => (
                        <li key={index} className="text-sm text-green-600">{file}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#749BA9] hover:bg-[#81a9b8] text-white py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Yaratilyapti..." : "Loyihani qo'shish"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdd;
