import DonationForm from "@/components/DonationForm";
import NavbarAdmin from "@/components/navbarAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProductQuery } from "@/store/slice/products";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";


export const ProductDetailsPage = () => {
  const { productid } = useParams<{ productid: string | any }>();
  const { data, error, isLoading } = useGetProductQuery(productid);

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

      <main className="max-w-7xl mx-auto p-10 pt-32">
        <Tabs defaultValue="free">
          <TabsList>
            <TabsTrigger value="free">Umumiy ma'lumot</TabsTrigger>
            <TabsTrigger value="paid">Shaxsiy ma'lumot</TabsTrigger>
          </TabsList>
          <div className="mt-16 mb-5 flex gap-8 items-center">
            <h1 className="text-4xl font-semibold text-custom-gray">{data?.name}</h1>
            <div className="bg-green-200 py-1 px-4 rounded-xl text-green-700">активный</div>
          </div>
          <TabsContent value="free">
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <div className="p-4 pl-0 border-b bg-white flex items-center gap-5">
                <img src={data.image} alt="" className="h-44 w-[391px] object-cover" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    ИКТУ: 00806001001000000
                  </p>
                  <div className="mt-2 grid gap-5">
                    <div className="flex gap-2 text-sm">
                      <div className="text-muted-foreground w-32">Группа:</div>
                      <span>ФРУКТЫ И ОРЕХИ</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-muted-foreground w-32">Класс:</div>
                      <span>{data.created_at}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-muted-foreground w-32">Позиция:</div>
                      <span>{data.location}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-muted-foreground w-32">
                        Подпозиция:
                      </div>
                      <span>Виноград свежий</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {data ? <p className="py-5">{data.description}</p> : null}
          </TabsContent>
          <TabsContent value="paid">
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
          </TabsContent>
        </Tabs>
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
