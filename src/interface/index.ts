export interface SidebarItemProps {
    icon: React.ReactNode
    label: string
    isActive?: boolean
}
export interface ProfileFormProps {
    defaultValues?: {
        firstName: string
        lastName: string
        email: string
        phone: string
        company: string
        city: string
        state: string
        country: string
        twitter: string
        facebook: string
        instagram: string
        linkedin: string
        youtube: string
    }
}

export interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}
export interface AanbodCardProps {
    image: string
    location: string
    development: string
    propertyType: string
    price: string
    topLocation?: boolean
}
export interface OfferCardProps {
    image: string;
    title: string;
    location: string;
    type: string;
    price: string;
    isTopLocation?: boolean;
}

export  interface Activity {
    title: string;
    date: string;
    month: string;
    image: string;
}
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }