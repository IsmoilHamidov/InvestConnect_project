import Banner from "@/components/Banner";
import CategoriesModal from "@/components/Category";
import NavbarAdmin from "@/components/navbarAdmin";
import { Button } from "@/components/ui/button";
import { Product, ProductCard } from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductListPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, error, isLoading } = useGetProductsQuery(
    `?search=${search}&degree=&category__name=${category}`
  );

  const location = useLocation();
  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [location]);

  return (
    <>
      <NavbarAdmin />
      <main className="pb-4 bg-gray-100">
        <Banner>
          <div>
            <div className=" flex gap-5 pt-36 pb-32  justify-center items-center">
              <Button
                variant="secondary"
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 text-sm text-white"
              >
                Показать категории
              </Button>
              <CategoriesModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelectCategory={(selectedCategory) =>
                  setCategory(selectedCategory)
                }
              />
              <input
                className="border bg-background w-[20rem] px-5 py-3 border-black rounded-[75px]"
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </Banner>
        <div className="products grid grid-cols-3 pt-48  max-w-7xl m-auto">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              {[...data]?.reverse().map((product: Product, index: number) => (
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
