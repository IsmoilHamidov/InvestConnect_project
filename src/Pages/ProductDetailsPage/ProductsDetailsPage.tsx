import InformationList from "@/components/InformationList";
import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import { useGetProductQuery } from "@/store/slice/products";
import { useParams } from "react-router-dom";

export const ProductDetailsPage = () => {
  const { productid } = useParams<{ productid: string | any }>();
  console.log("product id:", productid);
  const { data, error, isLoading } = useGetProductQuery(productid);

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <main className="pl-[270px] pt-12 mb-10 flexf">


        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <div className="px-2 grid gap-4">
            <div className="">
              <h1>{data.name}</h1>
            </div>
            <img src={data.image} className="w-[70vw]" alt="w-[80vw]" />
            <ul className="flex gap-20 style list-disc">
              <li>{data.location}</li>
              <li>{data.created_at}</li>
            </ul>
            <p>{data.description}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo sapiente voluptates facere molestiae nihil id similique nam, consequuntur quam placeat a totam! Doloribus delectus totam accusantium excepturi sit, consequatur rem.
            </p>
          </div>
        ) : null}
        <InformationList />
      </main>
    </>
  );
};
