import NavbarAdmin from "@/components/navbarAdmin";
import { Product, ProductCard } from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "@/store/slice/products";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import EmptyNone from "../../assets/images/empty-none.svg";
import ProductSidebar from "../../components/ProductFilter/ProductSidebar";
import Pagination from "../../components/ProductFilter/pagination";
import Footer from "@/components/Footer/Footer";
import ProductBanner from "../../components/ProductFilter/productBanner";
import { useProductsFiltersStore } from "@/store/ProductsFiltersStore";

const ProductListPage = () => {
  const [search, setSearch] = useState<string>("");
  const { selectedLocation, selectedCategory, setSelectedCategory, viewMode, itemsPerPage, currentPage, setCurrentPage } = useProductsFiltersStore();
  const [isRefetching, setIsRefetching] = useState(false);
  const { data, error, isLoading, refetch } = useGetProductsQuery(
    `?search=${search}&location=${selectedLocation}&max_price=500000&min_price=0&category=${selectedCategory}`
  );

  // scroll location
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(location.pathname, window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="p-4">
        {viewMode === "grid" ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={350} />
            <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
            <Skeleton variant="text" width="40%" />
          </>
        ) : (
          <div className="flex justify-between items-center gap-4 border rounded-xl p-4">
            <div className="w-10/12 ps-2 flex items-center flex-row gap-x-5">
              <Skeleton variant="rectangular" width={80} height={80} className="rounded-lg" />
              <Skeleton variant="text" width="20%" height={30} />
            </div>
            <div className="w-1/3 flex justify-end">
              <Skeleton variant="text" width="50%" height={32} />
            </div>
          </div>
        )}
      </div>
    ));
  };
  

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    if (search || selectedCategory || selectedLocation) {
      setIsRefetching(true);
      refetch()
        .finally(() => {
          setIsRefetching(false);
        });
    }
  }, [search, selectedCategory, selectedLocation, refetch]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedLocation, selectedCategory, setCurrentPage]);

  useEffect(() => {
  setIsRefetching(true);
  refetch().finally(() => {
    setIsRefetching(false);
  });
}, [itemsPerPage, viewMode, refetch]);

  return (
    <>
      <NavbarAdmin search={search} setSearch={setSearch} />
      <main className="pt-20">
        <div className="max-w-7xl m-auto mb-20">
          <div className="mt-12 mb-11 flex justify-between items-center">
            <h2 className="w-[18%] font-bold text-3xl text-secondary">
              Loyihalar
            </h2>
            <div className="w-[76%] ">
              <ProductBanner />
            </div>
          </div>
          <div className="flex justify-between gap-x-10 ">
            <div className="w-[18%]">
              <ProductSidebar
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  setIsRefetching(true);
                  refetch().finally(() => {
                    setIsRefetching(false);
                  });
                }}
              />
            </div>

            <div
              className={`${viewMode === "grid"
                ? "w-[76%] pr-4 products grid grid-cols-[30%,30%,30%] justify-between gap-y-14"
                : "w-[76%] flex flex-col gap-y-5 "
                }`}
            >
              {error ? (
                <p className="text-red-500">Xatolik yuz berdi</p>
              ) : isLoading || isRefetching ? (
                renderSkeletons()
              ) : paginatedData.length > 0 ? (
                <>
                  {paginatedData.map((product: Product) => (
                    <div key={product.id}>
                      <ProductCard product={product} viewMode={viewMode} />
                    </div>
                  ))}

                  <div
                    className={`col-span-3 flex justify-center items-center ${viewMode === 'list' ? 'mt-14' : ''}`}
                  >
                    {data && data.length > itemsPerPage && (
                      <Pagination
                        itemsPerPage={itemsPerPage}
                        items={data}
                        onPageChange={(selectedPage: number) =>
                          setCurrentPage(selectedPage)
                        }
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-y-5 items-center mt-24 col-span-3 text-center">
                  <p className="text-gray-600 font-semibold text-xl">Hech narsa topilmadi!</p>
                  <img src={EmptyNone} className="h-72" alt="No products found" />
                </div>
              )}


            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default ProductListPage;
