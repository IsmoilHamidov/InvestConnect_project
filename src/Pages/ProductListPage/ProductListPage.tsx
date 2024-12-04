import { Button } from "@/components/ui/button";
import { Product, ProductCard } from "@/components/ui/ProductCard";

const ProductListPage = () => {
  return (
    <main className="px-44 grid gap-20">
      <div className="flex gap-3 justify-center">
        <select className="border bg-background px-6 py-3 border-black rounded-[75px] text-primary">
          <option className="text-gray-700">Waar wil je investeren?</option>
          <option className="text-gray-700">Waar wil je investeren?</option>
          <option className="text-gray-700">Waar wil je investeren?</option>
        </select>
        <select className="border bg-background px-6 py-3 border-black rounded-[75px] text-primary">
          <option className="text-gray-700">Kies een straal</option>
          <option className="text-gray-700">Kies een straal</option>
          <option className="text-gray-700">Kies een straal</option>
        </select>

        <Button variant="secondary" className="rounded-[75px] p-6">
          Investeringsaanbod
        </Button>
      </div>
      <div className="products grid grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductListPage;

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
