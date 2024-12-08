import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Product, ProductCard } from "@/components/ui/ProductCard";

const ProductListPage = () => {
  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <main className="pl-[270px]">
        <div className="flex gap-3 pt-36 pb-24 justify-center bg-[#f4f4f5]">
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
        <div className="products grid grid-cols-3 -mt-[50px]">
          {productlist.map((product) => (
            <>
              <ProductCard key={product.id} product={product} />
            </>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductListPage;

export const productlist: Product[] = [
  {
    id: 6,
    title: "MACHELEN",
    percentage: "4,22 %",
    subtitle: "City Gate",
    description: "BRUTO RENDEMENT",
    type: "Appartementen",
    price: "Vanaf € 160 000",
    image: "/src/assets/images/property.jpg",
  },
  {
    id: 5,
    title: "BRUSSEL",
    percentage: "3,5 %",
    subtitle: "Central Park",
    description: "NETTO RENDEMENT",
    type: "Kantoren",
    price: "Vanaf € 200 000",
    image: "/src/assets/images/property%20(1).jpg",
  },
  {
    id: 4,
    title: "ANTWERPEN",
    percentage: "5,0 %",
    subtitle: "Diamond Square",
    description: "BRUTO RENDEMENT",
    type: "Appartementen",
    price: "Vanaf € 180 000",
    image: "/src/assets/images/property%20(2).jpg",
  },
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
    image: "/src/assets/images/property%20(1).jpg",
  },
  {
    id: 3,
    title: "ANTWERPEN",
    percentage: "5,0 %",
    subtitle: "Diamond Square",
    description: "BRUTO RENDEMENT",
    type: "Appartementen",
    price: "Vanaf € 180 000",
    image: "/src/assets/images/property%20(2).jpg",
  },
];
