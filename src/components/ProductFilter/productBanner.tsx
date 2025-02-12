import React, { useEffect } from 'react';
import { BsGridFill } from 'react-icons/bs';
import { ImList } from 'react-icons/im';
import { GoTriangleDown } from 'react-icons/go';
import { useToast } from '@/hooks/use-toast';
import { useProductsFiltersStore } from '@/store/ProductsFiltersStore';

const ProductBanner: React.FC = () => {
  const { refetch, setRefetch } = useProductsFiltersStore();
  const { viewMode, setViewMode, itemsPerPage, setItemsPerPage, setCurrentPage  } = useProductsFiltersStore();
  const toast = useToast();

  const handleRefetch = () => {
    console.log('Loading...');
    refetch(); 
  };
  
  useEffect(() => {
    const savedItemsPerPage = sessionStorage.getItem('itemsPerPage');
    console.log("Retrieved itemsPerPage:", savedItemsPerPage); 
    if (savedItemsPerPage) {
      setItemsPerPage(Number(savedItemsPerPage));
    }
  }, [setItemsPerPage]);
  

  const proccess = () => {
    toast.toast({
      description: 'Jarayonda',
      variant: 'warning',
      duration: 1000,
    });
  };

  const gridViewActive = viewMode === 'grid';
  const listViewActive = viewMode === 'list';

  useEffect(() => {
    handleRefetch(); 
  }, [viewMode]); 

  useEffect(() => {
    setRefetch(() => handleRefetch); 
  }, [setRefetch]);

  
  useEffect(() => {
    if (viewMode === 'grid') {
      setViewMode('grid');
    } else if (viewMode === 'list') {
      setViewMode('list');
    }
  }, [viewMode, setViewMode]);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setViewMode('grid')}
          className={`${
            gridViewActive ? 'bg-secondary text-white' : 'border-[1px] border-gray-300 text-[#737373]'
          } w-8 h-8 rounded-sm text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`${
            listViewActive ? 'bg-secondary text-white' : 'border-[1px] border-gray-300 text-[#737373]'
          } w-8 h-8 rounded-sm text-base flex items-center justify-center cursor-pointer listView`}
        >
          <ImList />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0 text-secondary">
        <div className="flex items-center gap-2 relative">
          <label className="block">Ko'rsatish</label>
          <select
              value={itemsPerPage} 
              onChange={(e) => {
                const newItemsPerPage = Number(e.target.value);
                sessionStorage.setItem('itemsPerPage', newItemsPerPage.toString());
                setItemsPerPage(newItemsPerPage);
                setCurrentPage(0);
                handleRefetch();
              }}
            id="countries"
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="9">9</option>
            <option value="18">18</option>
            <option value="27">27</option>
            <option value="36">36</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

        <div onClick={proccess} className="flex items-center gap-2 text-base relative">
          <label className="block">Saralash</label>
          <select
            className="w-32 md:w-52 border-[1px] text-sm border-gray-200 py-1 px-4 cursor-pointer text-primeColor block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="Best Sellers" disabled>
              Eng yangilari
            </option>
            <option value="New Arrival" disabled>
              Eng ko'p ko'rilganlari
            </option>
            <option value="Featured" disabled>
              Featured
            </option>
            <option value="Final Offer" disabled>
              Final Offer
            </option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
