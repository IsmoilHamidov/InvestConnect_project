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
import { MdOutlineFileUpload } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Interfeyslarni aniqlash
interface PrivateInformation {
  kampanya_egasi: string;
  kontact: string;
  campany_name: string;
  oylik_daromadi: string;
  soff_foydasi: string;
}

interface FormData {
  user: number;
  name: string;
  rendement: string;
  location: string;
  image?: string;
  description: string;
  category: number;
  price: string;
  product_file?: string;
  private_information: PrivateInformation;
}

function ProjectForm() {
  const [formData, setFormData] = useState<FormData>({
    user: 42,
    name: "real",
    rendement: "23",
    location: "dsfsdfsfs",
    image: "",
    description: "sdsfsf",
    category: 1,
    price: "1234545.00",
    product_file: "",
    private_information: {
        kampanya_egasi: "asdasda",
        kontact: "sds",
        campany_name: "sdfsadf",
        oylik_daromadi: "1234567.00",
        soff_foydasi: "12345677.00"
    }
});

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: getUserId } = useGetUsersQuery(undefined);
  const { data: getCategories } = useGetCategoriesQuery(undefined);
  const [createProduct, { isLoading, isSuccess, isError }] = useCreateProductMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Foydalanuvchi ma'lumotlarini o'rnatish
  useEffect(() => {
    if (getUserId) {
      setFormData((prev) => ({ ...prev, user: getUserId.id || 0 }));
    }
  }, [getUserId]);

  // Toifani birinchi qiymat sifatida tanlash
  useEffect(() => {
    if (getCategories?.length) {
      setFormData((prev) => ({ ...prev, category: getCategories[0].id || 0 }));
    }
  }, [getCategories]);

  // Muvaffaqiyatli yoki muvaffaqiyatsiz xabarlarni ko'rsatish
  useEffect(() => {
    if (isSuccess) {
      toast({ description: "Loyiha muvaffaqiyatli qo'shildi!", variant: "success" });
      navigate("/profile");
    } else if (isError) {
      toast({ description: "Loyihani yaratishda xatolik yuz berdi.", variant: "destructive" });
    }
  }, [isSuccess, isError, navigate, toast]);

  // Ma'lumotlarni o'zgartirishni boshqarish
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.private_information) {
      setFormData((prev) => ({
        ...prev,
        private_information: {
          ...prev.private_information,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Faylni tanlashni boshqarish
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ description: "Fayl hajmi 2 MB dan oshmasligi kerak.", variant: "destructive" });
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast({ description: "Faqat JPEG yoki PNG formatdagi fayllar qabul qilinadi.", variant: "destructive" });
        return;
      }
      setSelectedFile(file);
    }
  };

  // Formani yuborish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Majburiy maydonlarni tekshirish
    if (!formData.name || !formData.price || !formData.category) {
      toast({ description: "Barcha majburiy maydonlarni to'ldiring.", variant: "destructive" });
      return;
    }

    // FormData obyekti bilan ma'lumotlarni tayyorlash
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "private_information") {
        Object.entries(value as PrivateInformation).forEach(([subKey, subValue]) => {
          payload.append(`private_information[${subKey}]`, subValue);
        });
      } else {
        payload.append(key, value as string);
      }
    });

    if (selectedFile) {
      payload.append("image", selectedFile);
    }

    try {
      await createProduct(payload).unwrap();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };
  
  return (
    <div className="min-h-[100vh] py-14 bg-gray-100">
      <div className="max-w-7xl m-auto">
        <h1 className="text-2xl font-bold mb-8 text-custom-gray">
          Yangi loyiha qo'shish
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-12"
        >
          <div>
            <h2 className="font-medium text-xl mb-4">Shaxsiy ma'lumotlar</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="kampanya_egasi" className="text-sm font-medium">
                  Kampanya egasi
                </Label>
                <Input
                  id="kampanya_egasi"
                  name="kampanya_egasi"
                  value={formData.private_information.kampanya_egasi}
                  onChange={handleChange}
                  placeholder="Kampanya egasi ismi"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="kontact" className="text-sm font-medium">
                  Kontakt ma'lumotlari
                </Label>
                <Input
                  id="kontact"
                  name="kontact"
                  value={formData.private_information.kontact}
                  onChange={handleChange}
                  placeholder="Kontakt ma'lumotlarini kiriting"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="campany_name" className="text-sm font-medium">
                  Kampanya nomi
                </Label>
                <Input
                  id="campany_name"
                  name="campany_name"
                  value={formData.private_information.campany_name}
                  onChange={handleChange}
                  placeholder="Kampanya nomini kiriting"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="oylik_daromadi" className="text-sm font-medium">
                  Oylik daromadi
                </Label>
                <Input
                  id="oylik_daromadi"
                  name="oylik_daromadi"
                  value={formData.private_information.oylik_daromadi}
                  onChange={handleChange}
                  placeholder="Oylik daromadini kiriting"
                  className="mt-3"
                  type="number"
                />
              </div>
              <div>
                <Label htmlFor="soff_foydasi" className="text-sm font-medium">
                  Kompaniya foydasi
                </Label>
                <Input
                  id="soff_foydasi"
                  name="soff_foydasi"
                  value={formData.private_information.soff_foydasi}
                  onChange={handleChange}
                  placeholder="Soff foydasini kiriting"
                  className="mt-3"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl mb-4 text-[57737d]">
              Loyiha tafsilotlari
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="projectName" className="text-sm font-medium">
                  Loyiha nomi
                </Label>
                <Input
                  id="projectName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Loyiha nomini kiriting"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="projectType" className="text-sm font-medium">
                  Loyiha turi
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: Number(value) }) // Convert value to number
                  }
                >
                  <SelectTrigger className="mt-3">
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCategories &&
                      getCategories.map((category: CategoryType) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

              </div>
              <div>
                <Label htmlFor="rendement" className="text-sm font-medium">
                  Samaradorlik
                </Label>
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
                <Label htmlFor="price" className="text-sm font-medium">
                  Loyiha narxi
                </Label>
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
                <Label htmlFor="location" className="text-sm font-medium">
                  Joylashuv
                </Label>
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
                <Label htmlFor="description" className="text-sm font-medium">
                  Loyihaning qisqacha tavsifi
                </Label>
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
                <Label htmlFor="image" className="text-sm font-medium">
                  Loyiha rasmi
                </Label>
                <div className="flex items-center mt-3">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center px-4 py-2 bg-[#749BA9] hover:bg-[#81a9b8] text-white text-sm font-medium rounded cursor-pointer"
                  >
                    <MdOutlineFileUpload className="mr-2" />
                    Rasm yuklash
                  </label>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-green-600">
                    {selectedFile.name} tanlandi
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#749BA9] hover:bg-[#81a9b8] text-white py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda..." : "Loyihani qo'shish"}
            </Button>
            {isError && (
              <p className="mt-4 text-sm text-red-600">
                Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
