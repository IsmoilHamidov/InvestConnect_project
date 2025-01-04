import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/interface";
import property1 from "../../assets/images/property.jpg";
import property2 from "../../assets/images/property (1).jpg";
import property3 from "../../assets/images/property (2).jpg";


const ActivityCard: React.FC<Activity> = ({ title, price, month, image }) => {
    return (
        <Card className="flex w-full justify-between items-center bg-gray-100
         rounded-lg px-4 py-1  ">
            <Card className="border-none bg-transparent shadow-none">
                <div className="flex items-center gap-x-2 ">
                    <img
                        src={image}
                        alt={title}
                        className="w-28 h-20 rounded-md object-cover shadow-sm"
                    />
                    <CardHeader>
                        <p className="text-sm text-custom-gray uppercase">{month}</p>
                        <CardTitle className="text-lg font-medium  text-custom-gray ">{title}</CardTitle>
                    </CardHeader>
                </div>
            </Card>
            <div className="flex px-3  min-w-48 h-auto min-h-16  items-center
             justify-center font-normal bg-gray-800 text-white rounded-xl ">
                <span className="text-xl font-normal">{price}</span>
            </div>
        </Card>
    );
};

const Activities = () => {
   
    const activities: Activity[] = [
        {
            title: "City Gate",
            price: "€ 160 000 ",
            month: "April",
            image: property1,
        },
        {
            title: "Urban Living",
            price: "€ 200 000",
            month: "March",
            image: property2,
        },
        {
            title: "Sky Towers",
            price: "€ 300 000",
            month: "May",
            image: property3,
        },
    ];

    return (
        <>
            <div className="w-full mx-auto bg-white py-7 px-7 rounded-2xl mt-7
             shadow-lg border    ">
                <div className="flex flex-row justify-between items-center mb-5" >

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Opened Projects</h2>
                   
                </div>

                <div className="flex flex-col gap-[15px]">
                    {activities.map((activity, index) => (
                        <ActivityCard
                            key={index}
                            title={activity.title}
                            price={activity.price}
                            month={activity.month}
                            image={activity.image}
                        />
                    ))}
                </div>

                <div className="text-right mt-4">
                    {/* <Button variant="link" className="text-sm font-medium text-gray-700">
                        Alle activiteiten
                    </Button> */}
                </div>
            </div>


        </>
    );
};

export default Activities;
