import { Button } from "../ui/button";
import { ImagePickerButton } from "../ui/imagePickerButton";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useGetUserProfileQuery, useUpdateProfileDetailMutation } from "@/store/slice/products";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast'



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
                    .then((res) => res.blob()) // Преобразуем blob в файл
                    .then(
                        (blob) =>
                            new File([blob], "profile_picture.png", { type: "image/png" })
                    );
    
                const formDataImage = new FormData();
                formDataImage.append("file", file);
    
                // Отправляем изображение на сервер
                const imageResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataImage,
                });
    
                if (!imageResponse.ok) {
                    throw new Error("Failed to upload image");
                }
    
                const imageData = await imageResponse.json();
                uploadedImageUrl = imageData.url; // Получаем URL изображения
            }
    
            // Добавляем URL изображения в formData перед отправкой
            const updatedFormData = {
                ...formData,
                profile_image: uploadedImageUrl,
            };
    
            await updateProfileDetail({ id: data?.id, data: updatedFormData }).unwrap();
            toast({
                description: `Saved!`,
                variant: "success",
            })
            closeModal();
            setTimeout(() => {

                window.location.reload();
            }, 800); 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast({
                description: `Failed to update profile!`,
                variant: "destructive",
            });
        }
    };
    

    useEffect(() => {
        if (error) {
            console.error("Error fetching user data:", error);
            toast({
                description: `Failed to fetch profile data.`,
                variant: "destructive",
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

  
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    const handleImagePick = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setSelectedImage(reader.result as string); // Преобразуем в base64 строку
            };
    
            reader.readAsDataURL(file); // Читаем файл как base64 строку
        }
    };
    


    

    return (
        <Card className="w-full h-full">
            <CardContent className="grid mt-6 ">
                <h2 className="mb-7 font-semibold text-[21px] text-center">Profil tafsilotlari</h2>
                    {/* <div className="flex flex-col items-center relative mb-3">
                    <FaUserCircle   size={'68'} className="text-black mb-2 " />
                        {error ? (
                            <>Oh no, there was an error</>
                        ) : isLoading ? (
                            <>Loading...</>
                        ) : data ? (
                            <h2 className="text-lg font-medium">
                                {data?.firstname || "Unknown"} {data?.lastname || "User"}
                            </h2>
                        ) : null}
                    </div> */}

                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                        {[
                            { label: "First Name", field: "firstname" },
                            { label: "Last Name", field: "lastname" },
                            { label: "Email", field: "email" },
                            { label: "Username", field: "username" },
                            { label: "Phone", field: "phone" },
                        ].map(({ label, field }) => (
                            <div key={field}>
                                <Input
                                    placeholder={label}
                                    {...register(field, {
                                        required: `${label} is required`,
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
                            <div  className="w-[45%]">
                                <ImagePickerButton
                                    type="button" 
                                    className="w-full h-10 m-auto text-base font-normal 
                                    Brown_button  hover:bg-[#7497a7]/90 rounded-3xl"
                                    variant="default"
                                    size="default"
                                    onImagePick={handleImagePick}
                                >
                                
                                </ImagePickerButton>
                                {selectedImage && (
                                    <div className="mt-4">
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            className=" h-40 object-cover rounded-md"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="w-[45%]"> 
                                <Button
                                    type="submit" // Explicitly define as submit
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
    );
}

export default ProfileForm;