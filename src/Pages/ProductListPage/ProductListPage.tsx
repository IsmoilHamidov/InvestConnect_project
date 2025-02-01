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
import EmptyNone from "../../assets/images/empty-none.svg";
import ProductSidebar from "../ProductFilter/ProductSidebar";
import Pagination from "../ProductFilter/pagination";
import Footer from "@/components/Footer/Footer";
import ProductBanner from "../ProductFilter/productBanner";
import { useProductsFiltersStore } from "@/store/ProductsFiltersStore";

const ProductListPage = () => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { selectedLocation } = useProductsFiltersStore();


  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const [isRefetching, setIsRefetching] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data, error, isLoading, refetch } = useGetProductsQuery(
    `?search=${search}&location=${selectedLocation}&max_price=500000&min_price=0&category__name=${category}`,
    );

  console.log(data);

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
        <Skeleton variant="rectangular" width="100%" height={350} />
        <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
        <Skeleton variant="text" width="40%" />
      </div>
    ));
  };

  // Pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex) || [];

  const itemsPerPageFromBanner = (items: number) => {
    setItemsPerPage(items);
    setIsRefetching(true);
    setCurrentPage(0);
    refetch().then(() => {
      setIsRefetching(false);
    });
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setIsRefetching(true);
    refetch().finally(() => {
      setIsRefetching(false);
    });
  };

  return (
    <>
      <NavbarAdmin />
      <main className="pt-12">
        <div className="py-11 bg-gray-100 ">
          <div className="max-w-7xl m-auto flex gap-8 justify-between items-center">
            <Button
              variant="secondary"
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center px-4 py-5 text-sm text-white rounded-md"
            >
              <TbCategory className="mr-2" />
              Kategoriyalarni ko'rsatish
            </Button>
            <CategoriesModal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              onSelectCategory={handleCategorySelect}
            />

            <div
              className="flex justify-between items-center gap-x-3 bg-background
                     w-[33rem] h-[48px] px-5 py-2 rounded-2xl text-custom-gray"
            >
              <input
                className="bg-background w-[90%] border-black 
                      placeholder-gray-400 placeholder:text-[14px] placeholder:not-italic"
                type="text"
                value={search}
                aria-label="Mahsulot izlash"
                placeholder="Loyihalarni bu erda qidiring"
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoSearch size={22} />
            </div>

            <p>New Item</p>
          </div>
        </div>
        <div className="max-w-7xl m-auto mb-20">
          <div className="mt-12 mb-11 flex justify-between items-center">
            <h2 className="w-[18%] font-bold text-3xl text-custom-gray">
              Loyihalar
            </h2>
            <div className="w-[76%] ">
              <ProductBanner
                itemsPerPageFromBanner={itemsPerPageFromBanner}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>
          </div>
          <div className="flex justify-between gap-x-10 ">
            <div className="w-[18%]">
              <ProductSidebar
                onSelectCategory={(selectedCategory) => {
                  setCategory(selectedCategory);
                  
                  setIsRefetching(true);
                  refetch().finally(() => {
                    setIsRefetching(false);
                  });
                }}
              />
            </div>

            <div
              className={`${
                viewMode === "grid"
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
                    className={`col-span-3 flex justify-center items-center ${
                      viewMode === "list" ? "mt-14" : ""
                    }`}
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
                <div className="flex flex-col gap-y-5 items-center mt-24 col-span-3  text-center">
                  <p className="text-gray-600 font-semibold text-xl ">
                    Hech narsa topilmadi!
                  </p>
                  <img
                    src={EmptyNone}
                    className="h-72"
                    alt="No products found"
                  />
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
