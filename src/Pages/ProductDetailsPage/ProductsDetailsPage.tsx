import { Button } from "@/components/ui/button";
import { Product } from "@/components/ui/ProductCard";
import UnitCard from "@/components/ui/UnitCard";
import { useParams } from "react-router-dom";

const products: Product[] = [
  {
    id: 1,
    title: "MACHELEN",
    percentage: "4,22 %",
    subtitle: "City Gate",
    description: "BRUTO RENDEMENT",
    type: "Appartementen",
    price: "Vanaf € 160 000",
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
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

export const ProductDetailsPage = () => {
  const { productName } = useParams<{ productName: string }>();

  const product = products.find(p => p.title === productName);

  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <main className="grid gap-24">
      <div className="grid gap-8 text-center text-white h-screen w-screen bg-[url('https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg')] bg-cover bg-no-repeat bg-center">
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
        <span className="text-xl">Share</span>
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
          volgens uw eigen smaak en noden. Voor onze investeerders is dit uniek
          woonconcept een mooie opportuniteit door zijn royale woonbeleving die
          klaar is voor de toekomst!
        </p>
        <img
          className="product-details__b"
          src="https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg"
          alt=""
        />
      </section>
      <section className="rounded-xl border-2 border-black flex mx-48">
        <form className="flex flex-col justify-center gap-4 p-8 w-1/2">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Voornam"
              className="border border-black rounded-[75px] px-6 py-4 w-full"
            />
            <input
              type="text"
              placeholder="Familien"
              className="border border-black rounded-[75px] px-6 py-4 w-full"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Email"
              className="border border-black rounded-[75px] px-6 py-4 w-full"
            />
            <input
              type="text"
              placeholder="Telephone"
              className="border border-black rounded-[75px] px-6 py-4 w-full"
            />
          </div>
          <select className="border bg-background px-6 py-4 border-black rounded-[75px] text-primary w-full">
            <option className="text-gray-700">Kies een straal</option>
            <option className="text-gray-700">Kies een straal</option>
            <option className="text-gray-700">Kies een straal</option>
          </select>
          <textarea
            className="border border-black rounded-[30px] px-4 py-2 w-full h-28"
            placeholder="Bericht"
          ></textarea>
          <Button variant="secondary" className="self-start px-6 py-3">
            Verzenden
          </Button>
        </form>

        {/* Правая часть - Изображение */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            className="rounded-s-full object-cover w-full"
            src="https://masterpiecer-images.s3.yandex.net/5ff2ab7ee7cfbbc:upscaled"
            alt="Background"
          />
        </div>
      </section>
      <section>
        <h2 className="text-5xl text-center mb-6" >Type units</h2>
        <div className="flex gap-6">
          <UnitCard />
          <UnitCard />
          <UnitCard />
          <UnitCard />
        </div>
        <Button className="block m-auto my-3 py-4 px-10" variant="secondary">Ontdek het volledige aanbod</Button>
      </section>
    </main>
  );
};
