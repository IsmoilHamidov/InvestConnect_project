import { FeedBack } from "@/components/FeedBack";
import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import UnitCard from "@/components/ui/UnitCard";
import { useGetProductQuery } from "@/store/slice/products";
import { useParams } from "react-router-dom";

export const ProductDetailsPage = () => {
  const { productid } = useParams<{ productid: string | any }>();
  console.log("product id:", productid);
  const { data, error, isLoading } = useGetProductQuery(productid);

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <main className="pl-[270px] mb-10 grid gap-24">
        <div className=" mt-12 grid gap-8 text-center text-white h-screen bg-[url('https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg')] bg-cover bg-no-repeat bg-center">
        {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
            <h1>{data.name}</h1>
            <h2 className="text-6xl">{data.degree}</h2>
            </>
          ) : null}
          <div className="flex gap-36 justify-center">
            <div className="grid">
              <span>Ligging</span>
              <span>Leiestraat 10</span>
            </div>
            <div className="grid">
              <span>Bouwjaar </span>
              <span>2021</span>
            </div>
            <div className="grid">
              <span>Referentie</span>
              <span>4633457</span>
            </div>
          </div>
          <span className="text-xl">Deel</span>
          {/*ПРИНАЖАТИИ НА КНОПКУ СКРОЛ ДО ФОРМА */}
          <Button className="text-xl max-w-52 rounded-[40px] m-auto py-4 px-9">
            Afspraak maken
          </Button>
        </div>
        <section className="grid gap-8 product-details items-center">
          <h1 className="product-details__a">
            Investeren in woonkwaliteit te Lauwe!
          </h1>
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              <p className="product-details__c">{data.description}</p>
            </>
          ) : null}
          <img
            className="product-details__b"
            src="https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg"
            alt="Parkresidentie Bernice"
          />
        </section>
        <section className="rounded-xl border-2 border-black flex mx-20 bg-white shadow-custom">
          <FeedBack />

          <div className="w-1/2 flex items-center justify-center">
            <img
              className="object-cover w-full"
              src="https://masterpiecer-images.s3.yandex.net/5ff2ab7ee7cfbbc:upscaled"
              alt="Beautiful Residence"
              style={{ borderRadius: "50% 10px 10px 50%" }}
            />
          </div>
        </section>
        <section>
          <h2 className="text-5xl text-center mb-6">Type units</h2>
          <div className="flex gap-6">
            <UnitCard />
            <UnitCard />
            <UnitCard />
          </div>
          <Button
            className="block m-auto my-3 py-4 px-10 text-white"
            variant="secondary"
          >
            Ontdek het volledige aanbod
          </Button>
        </section>
      </main>
    </>
  );
};
