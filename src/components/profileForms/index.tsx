import { Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import { ProfileFormProps } from '@/interface'

import UserImg from "../../assets/images/user-img.svg"

export function ProfileForm({ defaultValues }: ProfileFormProps) {
    return (
        <Card className="w-full  pt-8 pr-7 rounded-2xl h-[1036px]">
            <CardContent className=" flex gap-x-14  ">
                <div className="flex flex-col items-center ">
                    <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage src={UserImg} alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">John Doe</h2>
                </div>
                <div className='w-full' >

                    <div className="space-y-4 relative  ">
                        {[
                            { label: "First Name", value: defaultValues?.firstName || "John" },
                            { label: "Last Name", value: defaultValues?.lastName || "Doe" },
                            { label: "Email", value: defaultValues?.email || "John.Doe@gmail.com" },
                            { label: "Phone", value: defaultValues?.phone || "+1 6566265895" },
                            { label: "Company Name", value: defaultValues?.company || "" },
                            { label: "City Name", value: defaultValues?.city || "" },
                            { label: "State Name", value: defaultValues?.state || "" },
                            { label: "Country Name", value: defaultValues?.country || "" },
                            { label: "Twitter", value: defaultValues?.twitter || "www.twitter.com" },
                            { label: "Facebook", value: defaultValues?.facebook || "www.facebook.com" },
                            { label: "Instagram", value: defaultValues?.instagram || "www.instagram.com" },
                            { label: "LinkedIn", value: defaultValues?.linkedin || "www.linkedin.com" },
                            { label: "YouTube", value: defaultValues?.youtube || "www.youtube.com" },
                        ].map((field) => (
                            <div key={field.label} className="relative">
                                <div>

                                    <Input
                                        placeholder={field.label}
                                        defaultValue={field.value}
                                        className="pr-10 rounded-[75px] "
                                    />
                                </div>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute  rounded-[52px] -right-8 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                                >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit {field.label}</span>
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button
                        className="w-[203px] mt-8 bg-[#7497a7] hover:bg-[#7497a7]/90"
                    >
                        REGISTER
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

