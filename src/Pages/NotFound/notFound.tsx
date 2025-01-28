import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-center space-y-6 bg-gray-100  p-6">
                <AlertTriangle className="w-16 h-16 text-red-500" />
                <h1 className="text-4xl font-bold text-gray-800 ">
                    404 - Sahifa topilmadi
                </h1>
                <p className="text-gray-600 ">
                    Kechirasiz, siz noto‘g‘ri manzilga tashrif buyurdingiz.
                </p>
                <Button asChild className="mt-4">
                    <Link to="/">Bosh sahifaga qaytish</Link>
                </Button>
            </div>
        </>
    );
};

export default NotFound;
