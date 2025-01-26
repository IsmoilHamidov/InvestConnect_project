import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetInvestorProductsQuery } from "@/store/slice/apiSlice";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { RxDragHandleDots2 } from "react-icons/rx";


const ActivityCard: React.FC<{ id: any, name: string; price: string; month: string; image: string }> = ({ id, name, price, month, image }) => {
    return (
        <Card className="flex w-full justify-between items-center border border-gray-200 rounded-none 
             px-4 py-1 cursor-grab duration-200 ease-in-out hover:bg-[#c5c5c53e]">
            <Card className="border-none bg-transparent shadow-none ">
                <div className="flex items-center gap-x-2">
                    <RxDragHandleDots2 size={22} className="me-3 text-custom-gray"/>
                    <img
                        src={image}
                        alt={name}
                        className="w-24 h-16 rounded-md object-cover shadow-sm"
                    />
                    <CardHeader>
                        <p className="text-sm text-custom-gray uppercase">{month}</p>
                        <Link to={`/products/${id}`}>
                            <CardTitle className="text-md font-medium text-custom-gray">{name}</CardTitle>
                        </Link>
                    </CardHeader>
                </div>
            </Card>

            <div className="flex items-center justify-between min-w-60">
                <span className="text-[22px] font-normal  tracking-wide">$ {price}</span>

                <Link to={`/products/${id}`} onClick={() => {
                    sessionStorage.setItem("scrollPosition", String(window.scrollY));
                }} className="bg-custom-blue-gray text-white 
                    px-4 py-1 h-full rounded-xl text-sm font-medium ">
                    Ko'rish
                </Link>
            </div>
        </Card>
    );
};

const Activities = () => {
    const [reloading, setReloading] = useState(false); // Track reloading state
    const { data, error, isLoading, refetch } = useGetInvestorProductsQuery(undefined);
    console.log(data);

    const showSkeleton = isLoading || reloading ; 

    const handleRefresh = async () => {
        setReloading(true);
        await refetch();
        setReloading(false);
    };

    return (
        <div className="w-full mx-auto bg-white py-7 px-7 rounded-2xl mt-10  shadow-lg border">
            <div className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Ochilgan loyihalar</h2>
                <button
                    className={`flex items-center gap-x-2 p-2 rounded-full  ${reloading ? 'animate-spin' : 'bg-transparent'}`}
                    onClick={handleRefresh}
                    disabled={isLoading || reloading}
                >
                    {reloading ? (
                        <span
                            className="animate-spin"
                            style={{
                                transition: 'transform .3s ease-in-out'
                            }}
                        >
                            <RefreshCcw size={22} />
                        </span>

                    ) : (
                        <>
                            <span className="text-base font-medium">
                                Yangilash
                            </span>
                            <RefreshCcw size={22} />
                        </>
                    )}
                </button>
            </div>


            {showSkeleton && (
                <div className="flex flex-col gap-4">
                    {Array(data?.length || 1)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center gap-4 border rounded-lg p-4"

                            >  <div className="w-10/12 ps-7 flex items-center flex-row  gap-x-5">

                                    <Skeleton
                                        variant="rectangular"
                                        width={80}
                                        height={60}
                                        className="rounded-lg"
                                    />

                                    <Skeleton variant="text" width="30%" height={30} />
                                </div>
                                
                                <div className="w-1/3 flex justify-end">
                                    <Skeleton variant="text" width="50%" height={32} />
                                </div>
                            </div>
                        ))}
                </div>
            )}

         

            {error && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-[17px]">Loyihalarni yuklashda xatolik yuz berdi... Keyinroq qayta urinib ko‘ring.</p>
                </div>
            )}

            {data?.length === 0 && !showSkeleton && (
                <div className="flex items-start justify-start h-full">
                    <p className="italic text-[17px]">Sizda xarid qilgan loyihalar mavjud emas.</p>
                </div>
            )}

            {data?.length > 0 && !showSkeleton && (
                <div className="flex flex-col ">
                    {data.map((activity: { id: any; name: string; price: string; month: string; image: any; }, index: any) => (
                        <ActivityCard
                            key={activity.id || index}
                            name={activity.name}
                            id={activity.id}
                            price={activity.price}
                            month={activity.month}
                            image={activity.image || "/path/to/default/image.jpg"}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Activities;
