import { LogOut } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useGetUserProfileQuery, useUpdateProfileDetailMutation } from "@/store/slice/products";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export function ProfileForm() {
    const { toast } = useToast();
    const { data, error, isLoading } = useGetUserProfileQuery(null);
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
            await updateProfileDetail({ id: data?.id, data: formData }).unwrap();
            toast({
                description: `Saved!`,
                variant: "success",
            });
            setTimeout(() => {
                window.location.reload();
            }, 500);
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
    }, [error]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 200);
        navigate('/');
    };

    return (
        <Card className="w-full pt-10 rounded-2xl h-[1036px]">
            <CardContent className="grid gap-14">
                <div className="flex flex-col items-center relative">
                    <div className="absolute top-1 right-1">
                        <Dialog>
                            <DialogTrigger>
                                <LogOut className="hover:text-custom-blue-gray text-2xl ease-in" />
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

                    <div className="flex items-center justify-center bg-[#B29C6F] text-white p-1 w-[83px] h-[80px] rounded-full text-4xl font-medium mb-4">
                        {data?.username?.charAt(0).toUpperCase() || ""}
                    </div>

                    {error ? (
                        <>Oh no, there was an error</>
                    ) : isLoading ? (
                        <>Loading...</>
                    ) : data ? (
                        <h2 className="text-xl font-semibold">
                            {data?.firstname || "Unknown"} {data?.lastname || "User"}
                        </h2>
                    ) : null}
                </div>
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
                                    className="rounded-[75px] w-full p-5"
                                />
                                {errors[field] && (
                                    <p className="text-red-500 text-sm mt-2 ms-2">
                                        {errors[field]?.message as string}
                                    </p>
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
