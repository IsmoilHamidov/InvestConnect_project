import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
    

type ProperyCardProps = {
    id: number;
    image: string;
    title: string;
    location: string;
    type: string;
    price: string;
    category:string
  };
  

  const ProperyCard: React.FC<ProperyCardProps> = ({
    id,
    image,
    title,
    location,
    type,
    price,
    // category,
  }) => (

    
    <Card className="flex  relative border border-[#C5C3C3] items-center 
        px-4 py-4 mb-5 ">
        <img
            src={`https://bakirali007.pythonanywhere.com/${image}`}
            alt={title}
            className="w-28 h-20 rounded object-cover mr-4"
            onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150';
            }}
            />

        <div className="flex-1">
            <CardHeader className="p-0">
            <CardTitle className="text-lg font-bold text-[#749BA9] uppercase">
                {title}
            </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-1 ">
         
            <span className="font-normal text-[#443B3A] text-xs">
                {type}
            </span>
    
            <div>
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


        <Link to={`/product/${id}`} onClick={() => {
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
  );
  
  export default ProperyCard;
  