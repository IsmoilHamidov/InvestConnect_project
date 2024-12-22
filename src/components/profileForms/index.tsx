import { Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import { ProfileFormProps } from '@/interface'
import { useGetUserProfileQuery, useUpdateProfileDetailMutation, } from "@/store/slice/products"

import UserImg from "../../assets/images/user-img.svg"
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export function ProfileForm({ defaultValues }: ProfileFormProps) {

    const { toast } = useToast()

    const { data, error, isLoading } = useGetUserProfileQuery();
    const [updateProfileDetail] = useUpdateProfileDetailMutation(); // Mutation hook

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: "",
        phone: "",
        role: "investor"
    });

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData({ ...formData, [field]: e.target.value });
    }

    // Handle form submission
    const handleSave = async () => {
        
        try {
            const updatedData = { ...formData };
            await updateProfileDetail({ id: data?.id, data: updatedData }).unwrap(); // Dispatch mutation
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile!");
        }
    }

    useEffect(() => {
        if (data) {
            console.log("In get users slice: ", data);

            setFormData({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                username: data.username,
                phone: data.phone,
                role: data.role
            })


            toast({
                duration: 13000,
                description: `Your username is ${data.username}`,
                variant: "success",
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.error("Error fetching verification code:", error);
            toast({
                description: `Failed to fetch code: ${String(error)}`,
                variant: "destructive",
            });
        }
    }, [error]);


    return (
        <Card className="w-full pt-8 pr-7 rounded-2xl h-[1036px]">
            <CardContent className="flex gap-x-14">
                <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage src={UserImg} alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">John Doe</h2>
                </div>
                <div className='w-full'>
                    <div className="space-y-4 relative">
                        {error ? (
                            <>Oh no, there was an error</>
                        ) : isLoading ? (
                            <>Loading...</>
                        ) : data ? (
                            <>
                                {[
                                    { label: "First Name", value: formData.firstname, field: 'firstname' },
                                    { label: "Last Name", value: formData.lastname, field: 'lastname' },
                                    { label: "Email", value: formData.email, field: 'email' },
                                    { label: "Username", value: formData.username, field: 'username' },
                                    { label: "Phone", value: formData.phone, field: 'phone' },
                                    { Rolelabel: "Role", value: formData.role, field: 'role' },
                                ].map((field) => (
                                    <div key={field.label} className="relative">
                                        <Input
                                            placeholder={field.label}
                                            value={field.value}
                                            onChange={(e) => handleInputChange(e, field.field)}
                                            className="pr-10 rounded-[75px]"
                                        />
                    
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute rounded-[52px] -right-8 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                                        >
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">Edit {field.label}</span>
                                        </Button>
                                    </div>
                                ))}
                            </>
                        ) : null}
                    </div>

                    <Button
                        onClick={handleSave} // Call save function on button click
                        className="w-[203px] mt-8 bg-[#7497a7] hover:bg-[#7497a7]/90"
                    >
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
