import { LogOut, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { ProfileFormProps } from '@/interface';
import { useGetUserProfileQuery, useUpdateProfileDetailMutation } from "@/store/slice/products";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

import UserImg from "../../assets/images/user-img.svg";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogHeader } from '../ui/dialog';
import { useNavigate } from 'react-router-dom';

export function ProfileForm({ defaultValues }: ProfileFormProps) {
    const { toast } = useToast();
    const { data, error, isLoading } = useGetUserProfileQuery();
    const [updateProfileDetail] = useUpdateProfileDetailMutation();

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstname: '', 
            lastname: '',
            email: '',
            username: '',
            phone: '',
            role: 'investor',
        },
    });

    const onSubmit = async (formData: any) => {
        try {
            await updateProfileDetail({ id: data?.id, data: formData }).unwrap();
            toast({
                description: `Saved!`,
                variant: "success",
            });
            window.location.reload()
        } catch (err) {
            toast({
                description: `Failed to update profile!`,
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (data) {
            Object.keys(data).forEach((key) => {
                setValue(key as keyof typeof data, data[key]);
            });
        }
    }, [data, setValue]);

    useEffect(() => {
        if (error) {
            console.error("Error fetching user data:", error);
            toast({
                description: `Failed to fetch profile data.`,
                variant: "destructive",
            });
        }
    }, [error]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear(); 
        setTimeout(() => {
            window.location.reload();
        }, 200);
        navigate('/')
      };

    return (
        <Card className="w-full pt-10  rounded-2xl h-[1036px]">
            <CardContent className="grid gap-14">
        
                <div className="flex flex-col items-center relative">
                    <div className='absolute top-1 right-1'>
                        <Dialog >
                            <DialogTrigger> 
                                <LogOut className='hover:text-custom-blue-gray text-2xl ease-in'/>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>You want to log out of the account?</DialogTitle>
                                <div className="flex justify-center gap-10 pt-5">
                                    <DialogTrigger>No</DialogTrigger>
                                    <Button onClick={handleSignOut}>Yes</Button>
                                </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex items-center justify-center bg-[#B29C6F] text-white 
                        p-1 w-[53px] h-[50px] rounded-full text-xl font-medium mb-4">
                        {data?.username.charAt(0).toUpperCase() || ""}
                    </div>

                    {error ? (
                        <>Oh no, there was an error</>
                        ) : isLoading ? (
                        <>Loading...</>
                        ) : data ? (
                        <>
                            <h2 className="text-xl font-semibold"> {data?.firstname || "Unknown"} {data?.lastname || "User"}</h2>
                        </>
                        ) : null}
                </div>
                <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                    {[
                        { label: "First Name", field: "firstname", required: "First name is required" },
                        { label: "Last Name", field: "lastname", required: "Last name is required" },
                        { label: "Email", field: "email", required: "Email is required" },
                        { label: "Username", field: "username", required: "Username is required" },
                        { label: "Phone", field: "phone", required: "Phone number is required" },
                    ].map(({ label, field, required }, index) => (
                        <div key={index} className="relative w-full">
                            <Input
                                placeholder={label}
                                {...register(field, {
                                required,
                                onChange: (e) => {
                                if (field === "firstname" || field === "lastname") {
                                    e.target.value = capitalizeFirstLetter(e.target.value);
                                        }
                                    },
                                })}
                                className="rounded-[75px] w-full p-5"
                            />
                            
                            {errors[field] && (
                                <span className="text-red-500 text-sm mt-2">
                                    {errors[field]?.message}
                                </span>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-center items-center pt-3">
                        <Button
                            type="submit"
                            className="w-36 h-10 m-auto text-md bg-[#7497a7] hover:bg-[#7497a7]/90 rounded-3xl"
                        >
                            Save
                        </Button>
                    </div>
                </form>


                </div>
            </CardContent>
        </Card>
    );
}
