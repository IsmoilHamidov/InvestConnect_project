import { FeedBack } from "@/components/FeedBack";
import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/ui/ProductCard";
import UnitCard from "@/components/ui/UnitCard";
import { useParams } from "react-router-dom";


export const ProductDetailsPage = () => {
  const { productName } = useParams<{ productName: string }>();

  const product = products.find((p) => p.title === productName);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <main className="pl-[270px] mb-10 grid gap-24">
        <div className=" mt-12 grid gap-8 text-center text-white h-screen bg-[url('https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg')] bg-cover bg-no-repeat bg-center">
          <h1>Parkresidentie Bernice</h1>
          <h2 className="text-6xl">Lauwe</h2>
          <div className="flex gap-36 justify-center">
            <div className="grid">
              <span>Ligging</span>
              <span>Leiestraat 10</span>
            </div>
            <div className="grid">
              <span>Ligging</span>
              <span>Leiestraat 10</span>
            </div>
            <div className="grid">
              <span>Ligging</span>
              <span>Leiestraat 10</span>
            </div>
          </div>
          <span className="text-xl">Deel</span>
          <Button className="text-xl max-w-52 rounded-[40px] m-auto py-4 px-9">
            Afspraak maken
          </Button>
        </div>
        <section className="grid gap-8 product-details items-center">
          <h1 className="product-details__a">
            Investeren in woonkwaliteit te Lauwe!
          </h1>
          <p className="product-details__c">
            Parkresidentie Bernice staat voor een prachtige architectuur met oog
            voor grote en lichtrijke appartementen met maximaal wooncomfort. De
            appartementen bieden straat-of parkzicht met 1 of 2 slaapkamers en
            worden afgewerkt met een volledig ingerichte keuken en badkamer
            volgens uw eigen smaak en noden. Voor onze investeerders is dit
            uniek woonconcept een mooie opportuniteit door zijn royale
            woonbeleving die klaar is voor de toekomst!
          </p>
          <img
            className="product-details__b"
            src="https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg"
            alt="Parkresidentie Bernice"
          />
        </section>
        <section className="rounded-xl border-2 border-black flex mx-20">
          <FeedBack />

          <div className="w-1/2 flex items-center justify-center">
            <img
              className="rounded-s-full object-cover w-full"
              src="https://masterpiecer-images.s3.yandex.net/5ff2ab7ee7cfbbc:upscaled"
              alt="Beautiful Residence"
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
          <Button className="block m-auto my-3 py-4 px-10" variant="secondary">
            Ontdek het volledige aanbod
          </Button>
        </section>
      </main>
    </>
  );
};

const products: Product[] = [
  {
    id: 1,
    title: "MACHELEN",
    percentage: "4,22 %",
    subtitle: "City Gate",
    description: "BRUTO RENDEMENT",
    type: "Appartementen",
    price: "Vanaf € 160 000",
    image: "/src/assets/images/property.jpg",
  },
  {
    id: 2,
    title: "BRUSSEL",
    percentage: "3,5 %",
    subtitle: "Central Park",
    description: "NETTO RENDEMENT",
    type: "Kantoren",
    price: "Vanaf € 200 000",
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
  },
  {
    id: 3,
    title: "ANTWERPEN",
    percentage: "5,0 %",
    subtitle: "Diamond Square",
    description: "BRUTO RENDEMENT",
    type: "Appartementen",
    price: "Vanaf € 180 000",
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
  },
  {
    id: 4,
    title: "GHENT",
    percentage: "3,8 %",
    subtitle: "City Center",
    description: "NETTO RENDEMENT",
    type: "Kantoren",
    price: "Vanaf € 220 000",
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
  },
  {
    id: 5,
    title: "GHENT",
    percentage: "3,8 %",
    subtitle: "City Center",
    description: "NETTO RENDEMENT",
    type: "Kantoren",
    price: "Vanaf € 220 000",
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
  },
  {
    id: 6,
    title: "GHENT",
    percentage: "3,8 %",
    subtitle: "City Center",
    description: "NETTO RENDEMENT",
    type: "Kantoren",
    price: "Vanaf € 220 000",
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
  },
];