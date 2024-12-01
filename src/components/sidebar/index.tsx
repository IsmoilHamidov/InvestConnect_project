import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, LayoutDashboard, Calendar, Activity, Users, ContactIcon as ContactsIcon, HelpCircle, Building2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { SidebarItemProps } from "@/interface"
import SidebarLogo from "../../assets/images/altro-logo.svg"
import UserImg from "../../assets/images/user-img.svg"

function SidebarItem({ icon, label, isActive }: SidebarItemProps) {
    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-accent"
            )}
        >
            {icon}
            <span>{label}</span>
        </Button>
    )
}

export default function Sidebar() {
    return (
        <div className="flex  fixed z-50 flex-col   left-0 items-center w-[270px] min-h-screen  border-r bg-white">
            <div className="pt-4  ">
                <img
                    src={SidebarLogo}
                    alt="Altro"
                    className="h-8"
                />
            </div>

            <div className="flex flex-col items-center  border-b p-6 ">
                <Avatar className="h-16 w-16 mb-4 ">
                    <AvatarImage src={UserImg} alt="Profile picture" />
                    <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="font-semibold text-base ">Anton De Clercq</h2>
                    <p className="text-sm text-[#749BA9]">Immovis</p>
                </div>
                <div className="flex gap-2 mt-4 mb-8 ">
                    <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Users className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Activity className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 space-y-1 p-2">
                <SidebarItem
                    icon={<LayoutDashboard className="h-4 w-4" />}
                    label="Dashboard"
                />
                <SidebarItem
                    icon={<Building2 className="h-4 w-4" />}
                    label="Aanbod"
                    isActive
                />
                <SidebarItem
                    icon={<Calendar className="h-4 w-4" />}
                    label="Kalender"
                />
                <SidebarItem
                    icon={<Activity className="h-4 w-4" />}
                    label="Activiteiten"
                />
                <SidebarItem
                    icon={<Users className="h-4 w-4" />}
                    label="Community"
                />
                <SidebarItem
                    icon={<ContactsIcon className="h-4 w-4" />}
                    label="Mijncontacten"
                />
            </div>

            <div className="mt-auto border-t p-2">
                <SidebarItem
                    icon={<HelpCircle className="h-4 w-4" />}
                    label="Altro Support"
                />
            </div>
        </div>
    )
}

