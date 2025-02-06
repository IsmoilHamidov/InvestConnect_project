import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



type ProperyCardProps = {
    id: number;
    image: string;
    title: string;
    location: string;
    type: string;
    price: string;
    category: string;
};


const ProperyCard: React.FC<ProperyCardProps> = ({
    id,
    image,
    title,
    location,
    price,
    category,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id.toString(),
      });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return(

    <Card 
      
        
        className="flex  relative border border-[#C5C3C3] items-center 
        px-4 py-4 ">
        <img
           src={image ? `https://bakirali007.pythonanywhere.com/${image}` : "https://via.placeholder.com/150"}
            alt={title}
            className="w-24 h-16 rounded object-cover mr-4"
            onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150';
            }}
            />

        <div className="flex-1 border-red-500">
            <CardHeader className="p-0">
            <CardTitle className="w-[90%] text-md font-medium text-[#749BA9] capitalize">
                {title}
            </CardTitle>
            </CardHeader>

            <CardContent >
                <div className="flex items-center gap-x-3 mt-2">
                    <span className="font-normal text-[#443B3A] text-base">
                        {category}
                    </span>
                    <p className="text-base font-medium text-custom-gray">{price}</p>
                </div>
            </CardContent>
        </div>
    
        <div className="absolute top-2 -right-3 grid justify-items-end">
            <div className="bg-[#B29C6F]  px-3 py-2">
                <p className="font-normal text-white text-[12px] leading-3 ">
                    {location}
                </p>
            </div>
            <div
                className="bg-[#443B3A] w-3 h-3"
                style={{
                clipPath: "polygon(0 0, 0 100%, 100% 0)",
                }}>
            </div>
        </div>


        <Link to={`/products/${id}`} onClick={() => {
            sessionStorage.setItem("scrollPosition", String(window.scrollY));
            }}>
           <Button
            variant="outline"
            className="Blue_button hover:text-white mt-7 px-6 rounded-[40px] font-medium text-sm text-white"
             >
            Ko'rish
             </Button>
        </Link>

    </Card>
  )};
  
  export default ProperyCard;
  