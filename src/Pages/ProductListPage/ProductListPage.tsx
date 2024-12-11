import Banner from "@/components/Banner";
import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "@/store/slice/products";

const ProductListPage = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <main className="pl-[270px]">
        <Banner>
          <div className="flex gap-3 pt-36 pb-24 justify-center">
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

            <Button
              variant="secondary"
              className="rounded-[75px] p-6 text-white"
            >
              Investeringsaanbod
            </Button>
          </div>
        </Banner>
        <div className="products grid grid-cols-3 pt-44 pr-5">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              {data?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default ProductListPage;