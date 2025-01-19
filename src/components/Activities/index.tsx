import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetInvestorProductsQuery } from "@/store/slice/apiSlice";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
const ActivityCard: React.FC<{ id: any, name: string; price: string; month: string; image: string }> = ({ id, name, price, month, image }) => {
    return (
        <Card className="flex w-full justify-between items-center bg-gray-100 rounded-lg px-4 py-1">
            <Card className="border-none bg-transparent shadow-none">
                <div className="flex items-center gap-x-2">
                    <img
                        src={image}
                        alt={name}
                        className="w-28 h-20 rounded-md object-cover shadow-sm"
                    />
                    <CardHeader>
                        <p className="text-sm text-custom-gray uppercase">{month}</p>
                        <Link to={`/product/${id}`}>
                            <CardTitle className="text-lg font-medium text-custom-gray">{name}</CardTitle>
                        </Link>
                    </CardHeader>
                </div>
            </Card>
            <Link to={`/product/${id}`} onClick={() => {
                sessionStorage.setItem("scrollPosition", String(window.scrollY));
            }}
                className="flex px-4 min-w-64 py-[12px] items-center 
                 justify-between font-normal bg-gray-700 text-white rounded-2xl">
                <span className="text-[22px] font-normal tracking-wide">$ {price}</span>
                <div className="bg-gray-100  text-gray-700 h-full
                 px-3 py-[1.7px] rounded-lg text-sm font-medium">
                    Ko'rish
                </div>
            </Link>
        </Card>
    );
};

const Activities = () => {
    const [reloading, setReloading] = useState(false); // Track reloading state
    const { data, error, isLoading, refetch } = useGetInvestorProductsQuery(undefined);
    console.log(data);


    const handleRefresh = async () => {
        setReloading(true);
        await refetch();
        setReloading(false);
    };

    return (
        <div className="w-full mx-auto bg-white py-7 px-7 rounded-2xl mt-10 mb-3 shadow-lg border">
            <div className="flex flex-row justify-between items-center mb-4">
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

            {isLoading && !reloading && (
                <div className="flex flex-col gap-4">
                    {Array(2)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center gap-4 border rounded-lg p-4"
                            >
                                <Skeleton
                                    variant="rectangular"
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                                <div className="flex flex-col flex-1">
                                    <Skeleton variant="text" width="50%" height={30} />
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

            {data?.length === 0 && (
                <div className="flex items-start justify-start h-full">
                    <p className="italic text-[17px]">Sizda xarid qilgan loyihalar mavjud emas.</p>
                </div>
            )}

            {data?.length > 0 && (
                <div className="flex flex-col gap-[15px]">
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
