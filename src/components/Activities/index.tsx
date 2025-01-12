import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetInvestorProductsQuery } from "@/store/slice/apiSlice";
import { Key } from "react";

const ActivityCard: React.FC<{ title: string; price: string; month: string; image: string }> = ({ title, price, month, image }) => {
    return (
        <Card className="flex w-full justify-between items-center bg-gray-100 rounded-lg px-4 py-1">
            <Card className="border-none bg-transparent shadow-none">
                <div className="flex items-center gap-x-2">
                    <img
                        src={image}
                        alt={title}
                        className="w-28 h-20 rounded-md object-cover shadow-sm"
                    />
                    <CardHeader>
                        <p className="text-sm text-custom-gray uppercase">{month}</p>
                        <CardTitle className="text-lg font-medium text-custom-gray">{title}</CardTitle>
                    </CardHeader>
                </div>
            </Card>
            <div className="flex px-3 min-w-48 h-auto min-h-16 items-center justify-center font-normal bg-gray-800 text-white rounded-xl">
                <span className="text-xl font-normal">{price}</span>
            </div>
        </Card>
    );
};

const Activities = () => {
    const { data, error, isLoading } = useGetInvestorProductsQuery(undefined);

    return (
        <div className="w-full mx-auto bg-white py-7 px-7 rounded-2xl mt-7 shadow-lg border">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ochilgan loyihalar</h2>
            </div>
            {isLoading && (
                <div className="flex items-center justify-center h-full text-base">
                    <p>Loyihalar yuklanmoqda...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-[17px]">Loyihalarni yuklashda xatolik yuz berdi... Keyinroq qayta urinib ko‘ring.</p>
                </div>
            )}

            {data?.length === 0 && (
                <div className="flex items-start justify-start h-full">
                    <p className="italic text-[17px]">Sizda xarid qiligan loyihalar mavjud emas.</p>
                </div>
            )}


            {data?.length > 0 && (
                <>
                    <div className="flex flex-col gap-[15px]">
                        {data.map((activity: { id: any; title: string; price: string; month: string; image: any; }, index: any) => (
                            <ActivityCard
                                key={activity.id || index} 
                                title={activity.title}
                                price={activity.price}
                                month={activity.month}
                                image={activity.image || "/path/to/default/image.jpg"} 
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Activities;
