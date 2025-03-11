import { Button } from "../ui/button";
import { ImagePickerButton } from "../ui/imagePickerButton";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useGetUserProfileQuery, useUpdateProfileDetailMutation } from "@/store/slice/products";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast'
import ModalWrapper from "../ModalWrapper";
import { IoMdClose } from "react-icons/io";

interface ProfileFormProps {
    closeModal: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ closeModal }) => {
    const { toast } = useToast();
    const { data, error } = useGetUserProfileQuery(null);
    const [updateProfileDetail] = useUpdateProfileDetailMutation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (data) {
            Object.keys(data).forEach((key) => {
                const typedKey = key as keyof typeof data;
                setValue(typedKey as string, data[typedKey]);
            });
        }
    }, [data, setValue]);

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const onSubmit = async (formData: Record<string, string>) => {
        try {
            let uploadedImageUrl = selectedImage;

            if (selectedImage && selectedImage.startsWith("blob:")) {
                const file = await fetch(selectedImage)
                    .then((res) => res.blob())
                    .then(
                        (blob) =>
                            new File([blob], "profile_picture.png", { type: "image/png" })
                    );

                const formDataImage = new FormData();
                formDataImage.append("file", file);

                const imageResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataImage,
                });

                if (!imageResponse.ok) {
                    throw new Error("Failed to upload image");
                }
                const imageData = await imageResponse.json();
                uploadedImageUrl = imageData.url;
            }
            const updatedFormData = {
                ...formData,
                profile_image: uploadedImageUrl,
            };
            await updateProfileDetail({ id: data?.id, data: updatedFormData }).unwrap();
            toast({
                description: `Saqlandi!`,
                variant: "success",
            });
            closeModal();
            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch (err) {
            toast({
                description: `Profilni yangilab bo‘lmadi!`,
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (error) {
            console.error("Foydalanuvchi maʼlumotlarini olishda xatolik yuz berdi:", error);
            toast({
                description: `Profil maʼlumotlarini olib boʻlmadi.`,
                variant: "destructive",
            });
        }
    }, [error]);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImagePick = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            setSelectedImage(null);

            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                toast({
                    description: "Surat qo'shildi",
                    variant: "success"
                })
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ModalWrapper>
            <Card className="w-full relative max-w-lg shadow-lg z-[1010] bg-white p-6 rounded-lg">
                <button onClick={closeModal}  className="absolute top-6 right-6 text-2xl  " >
                    <IoMdClose />
                </button>
                <CardContent className="grid relative mt-6 w-full ">
                    <h2 className="mb-7 font-semibold text-[21px] text-center">Profil tafsilotlari</h2>
                    <div className="w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                            {[
                                { label: "Ism", field: "firstname" },
                                { label: "Familiya", field: "lastname" },
                                { label: "Elektron pochta", field: "email" },
                                { label: "Foydalanuvchi nomi", field: "username" },
                            ].map(({ label, field }) => (
                                <div key={field}>
                                    <Input
                                        placeholder={label}
                                        {...register(field, {
                                            required: `${label} kiritilishi shart`,
                                            onChange: (e) => {
                                                if (field === "firstname" || field === "lastname") {
                                                    e.target.value = capitalizeFirstLetter(e.target.value);
                                                }
                                            },
                                        })}
                                     className="rounded-[75px] w-full p-5 shadow"
                                    />
                                    {errors[field] && (
                                        <p className="text-red-500 text-sm mt-2 ms-2">
                                            {errors[field]?.message as string}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <div className="w-full items-center flex justify-between pt-4 pb-1">
                                <div className="w-[45%]">
                                    <ImagePickerButton
                                        type="button"
                                        className="w-full h-10 m-auto text-base font-normal Brown_button hover:bg-[#7497a7]/90 rounded-3xl"
                                        variant="default"
                                        size="default"
                                        onImagePick={handleImagePick}
                                    >
                                    </ImagePickerButton>
                                </div>
                                <div className="w-[45%]">
                                    <Button
                                        type="submit"
                                        className="w-full h-10 m-auto font-normal text-base
                                        bg-[#7497a7] hover:bg-[#7497a7]/90 rounded-3xl"
                                    >
                                        Saqlash
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </ModalWrapper>
    );
};

export default ProfileForm;
