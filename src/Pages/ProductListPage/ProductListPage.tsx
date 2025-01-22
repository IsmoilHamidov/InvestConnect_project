import Banner from "@/components/Banner";
import CategoriesModal from "@/components/Category";
import NavbarAdmin from "@/components/navbarAdmin";
import { Button } from "@/components/ui/button";
import { Product, ProductCard } from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { normalize } from "path";

const ProductListPage = () => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="p-4">
        <Skeleton variant="rectangular" width="100%" height={450} />
        <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
        <Skeleton variant="text" width="40%" />
      </div>
    ));
  };

  return (
    <>
      <NavbarAdmin />
      <main className="pb-4 bg-gray-100">
        <Banner>
          <div>
            <div className=" flex gap-8 pt-36 pb-32 justify-center items-center">
              <Button
                variant="secondary"
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center px-5 py-5 text-sm text-white rounded-xl"
              >
                <TbCategory />
                Kategoriyalarni ko'rsatish
              </Button>
              <CategoriesModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelectCategory={(selectedCategory) =>
                  setCategory(selectedCategory)
                }
              />
              <div
                className="flex justify-center items-center gap-x-3 border bg-background
               w-[24.2rem] px-4 py-3 border-custom-gray rounded-[75px] text-custom-gray"
              >
                <IoSearch size={22} />
                <input
                  className="bg-background w-[24rem] border-black rounded-e-[75px]"
                  type="text"
                  value={search}
                  placeholder="Izlash"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Banner>
        <div className="products grid grid-cols-3 gap-6 pt-48 max-w-7xl m-auto">
          {error ? (
            <>Xatolik yuz berdi</>
          ) : isLoading ? (
            renderSkeletons()
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
