import Banner from "@/components/Banner";
import CategoriesModal from "@/components/Category";
import DonationForm from "@/components/DonationForm";
import NavbarAdmin from "@/components/navbarAdmin";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Product, ProductCard } from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";

const ProductListPage = () => {
  const [search, setSearch] = useState("");
  const [degree, setDegree] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [category, setCategory] = useState("");
  const { data, error, isLoading } = useGetProductsQuery(
    `?search=${search}&degree=${degree}&category__name=${category}`
  );

  useEffect(() => {
    console.log("category" ,category)
  }, [category])

  return (
    <>
      <NavbarAdmin />
      <Sidebar />
      <main className="pl-[270px]">
        <Banner>
          <div>
            <div className="flex gap-3 pt-36 pb-24 justify-center items-center">
              <Button variant="secondary" onClick={() => setModalOpen(true)} className="px-6 py-3 text-sm text-white">
                Показать категории
              </Button>
              <CategoriesModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelectCategory={(selectedCategory) => setCategory(selectedCategory)}
              />
              <select
                className="border bg-background px-6 py-3 border-black rounded-[75px] text-primary"
                value={degree} // Привязка состояния к select
                onChange={(e) => setDegree(e.target.value)} // Обновление состояния Degree
              >
                <option value="">---</option>
                <option value="bronze">bronze</option>
                <option value="silver">silver</option>
                <option value="gold">gold</option>
              </select>
              <input
                className="border bg-background px-6 py-3 border-black rounded-[75px]"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </Banner>
        <div className="products grid grid-cols-3 pt-44 pr-5">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              {console.log(data)}
              {data?.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
              ))}
            </>
          ) : null}
        </div>
      </main>
      <DonationForm />
    </>
  );
};

export default ProductListPage;
