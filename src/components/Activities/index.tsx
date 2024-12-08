import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "@/interface";
const ActivityCard: React.FC<Activity> = ({ title, date, month, image }) => {
    return (
        <Card className="flex w-full justify-between rounded-none  ">
            <Card className="p-[10px] border-none bg-transparent shadow-none">
                <div className="flex items-center ">
                    <img
                        src={image}
                        alt={title}
                        className="w-16 h-16 rounded-md object-cover shadow-sm"
                    />
                    <CardHeader>
                        <CardTitle className="text-base font-light  text-gray-800">{title}</CardTitle>
                    </CardHeader>
                </div>
            </Card>
            <div className="flex flex-col items-center justify-center font-normal bg-gray-800 text-white px-4 py-2">
                <span className="text-3xl">{date}</span>
                <span className="text-sm uppercase">{month}</span>
            </div>
        </Card>
    );
};

const Activities = () => {
   
    const activities: Activity[] = [
        {
            title: "Webinar - Anti-Crisis Strategy for Business Success",
            date: "28",
            month: "March",
            image: "https://via.placeholder.com/64",
        },
        {
            title: "Webinar - Anti-Crisis Strategy for Business Success",
            date: "28",
            month: "March",
            image: "https://via.placeholder.com/64",
        },
        {
            title: "Webinar - Anti-Crisis Strategy for Business Success",
            date: "28",
            month: "March",
            image: "https://via.placeholder.com/64",
        },
    ];

    return (
        <>
            <div className="w-full mx-auto bg-white pt-6 px-7 rounded-2xl shadow-xl">
                <div className="flex flex-row justify-between items-center mb-5" >

                    <h2 className="text-base font-semibold text-gray-800 mb-4">Activiteiten</h2>
                   
                </div>

                <div className="flex flex-col gap-[10px]">
                    {activities.map((activity, index) => (
                        <ActivityCard
                            key={index}
                            title={activity.title}
                            date={activity.date}
                            month={activity.month}
                            image={activity.image}
                        />
                    ))}
                </div>

                <div className="text-right mt-4">
                    <Button variant="link" className="text-sm font-medium text-gray-700">
                        Alle activiteiten
                    </Button>
                </div>
            </div>


        </>
    );
};

export default Activities;
