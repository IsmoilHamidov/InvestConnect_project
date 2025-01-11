import DonationForm from "@/components/DonationForm";
import NavbarAdmin from "@/components/navbarAdmin";
import { useGetProductQuery } from "@/store/slice/products";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";


export const ProductDetailsPage = () => {
  const { productid } = useParams<{ productid: string | any }>();
  const { data, error, isLoading } = useGetProductQuery(productid);

   console.log(data)
  const [isPaid, setIsPaid] = useState(false);

  const salesData = [
    ["01.11.2024 - 30.11.2024", "килограмм", "133 805 688 749 сум"],
  ];
  const priceData = [
    ["01.11.2024 - 30.11.2024", "36 591 сум", "0 сум", "7 440 сум"],
  ];
  const sellersData = [["01.11.2024 - 30.11.2024", "1 277"]];

  const maskedData = (data: (string | number)[][]) =>
    data.map((row) => row.map(() => "*******"));

  return (
    <>
      <NavbarAdmin />

      <main className="max-w-7xl mx-auto p-10 ">
          <div className="mt-16 mb-5 flex gap-8 items-center">
            <h1 className="text-4xl font-semibold text-custom-gray capitalize">{data?.name}</h1>
            <div className="bg-green-200 py-1 px-4 rounded-xl text-green-700">активный</div>
          </div>
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (

              <div className="p-4 py-8 pl-0 bg-white  flex justify-between">
                <ImageSlider/>
                <div className="flex flex-col w-[48%] gap-y-10 justify-between">
                    <div className="w-[70%] p-5 rounded-xl shadow-md border border-gray-200 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-custom-gray text-base font-medium">Narxi:</span>
                        <p className="font-semibold text-[22px] ">${data.price}</p>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-custom-gray text-base font-medium">Samaradorlik:</span>
                        <p className="0 font-semibold">{data.rendement}%</p>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-custom-gray text-base font-medium">Ulush:</span>
                        <p className="font-semibold ">50%</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-custom-gray text-base font-medium">Sotuvdan Daromad:</span>
                        <p className="font-semibold">$100/oy</p>
                      </div>
                  </div>


                    <div className="rounded-xl bg-white capitalize">
                      <p className="text-sm text-custom-gray font-medium">ИКТУ: 00806001001000000</p>
                      <div className="mt-5 space-y-5">

                        <div className="flex justify-between items-center text-custom-gray text-[14px]">
                          <div className="">Loyiha nomi</div>
                          <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                          <span className="font-medium ">{data.name}</span>
                        </div>

                        <div className="flex justify-between items-center text-custom-gray text-[14px]">
                          <div className="">Kategoriya</div>
                          <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                          <span className=" font-medium">{data.category}</span>
                        </div>


                        <div className="flex justify-between items-center text-custom-gray text-[15px]">
                          <div className="">Joylashuv</div>
                          <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                          <span className=" font-medium">{data.location}</span>
                        </div>

                        <div className="flex justify-between items-center text-custom-gray text-[15px]">
                          <div className="">Oxirgi yangilangan vaqti</div>
                          <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                          <span className="font-medium ">{data.created_at}</span>
                        </div>

                        <div className="flex justify-between items-center text-custom-gray text-[15px]">
                          <div className="">Qo‘shimcha holat</div>
                          <div className="flex-grow border-t border-dotted border-gray-800 mx-2"></div>
                          <span className="font-medium">Yangi uzilgan uzum</span>
                        </div>
                      </div>
                    </div>
                </div>

              </div>
            ) : null}
            {data ? <p className="py-5">{data.description}</p> : null}

            {!isPaid ? (
              <div className="p-4 bg-red-50 border rounded-md flex items-center justify-between gap-10">
                <EyeOff size={60} />
                <p className="text-sm text-gray-600">
                  Для просмотра данных необходимо произвести оплату.
                </p>
                <DonationForm
                  price={100000}
                  id={data?.id}
                  onPaymentSuccess={() => setIsPaid(true)} // Обновляем состояние
                />
              </div>
            ) : null}
            <div>
              <h2 className="mt-6 text-lg font-medium">Объем реализации</h2>
              <Table
                headers={["ПЕРИОД", "ЕД. ИЗМ", "СУММА"]}
                data={isPaid ? salesData : maskedData(salesData)} // Меняем данные
              />

              <h2 className="mt-6 text-lg font-medium">Цена</h2>
              <Table
                headers={[
                  "ПЕРИОД",
                  "МАКСИМАЛЬНАЯ ЦЕНА",
                  "МИНИМАЛЬНАЯ ЦЕНА",
                  "СРЕДНЯЯ ЦЕНА",
                ]}
                data={isPaid ? priceData : maskedData(priceData)} // Меняем данные
              />

              <h2 className="mt-6 text-lg font-medium">Продавцы</h2>
              <Table
                headers={["ПЕРИОД", "КОЛИЧЕСТВО"]}
                data={isPaid ? sellersData : maskedData(sellersData)} // Меняем данные
              />
            </div>
      </main>
    </>
  );
};

// Table Component
const Table: React.FC<TableProps> = ({ data, headers }) => {
  return (
    <table className="w-full border-collapse border border-gray-200 mt-4">
      <thead>
        <tr className="bg-primary">
          {headers.map((header, index) => (
            <th
              key={index}
              className="border p-2 text-left text-sm text-primary-foreground font-medium"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border p-2 text-sm">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface TableProps {
  headers: string[];
  data: (string | number)[][];
}
