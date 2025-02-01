import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri"

// Define PaginationProps type
interface PaginationProps {
  itemsPerPage: number;
  items: any[];
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, items, onPageChange }) => {
  const [, setItemOffset] = useState<number>(0);
  
  // Calculate number of pages
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    onPageChange(event.selected);
  };

  const visiblePageNumbers = 3;
 

  return (
    <div>
      <ReactPaginate
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        nextLabel={<RiArrowRightDoubleFill size={23} className="text-secondary ms-3" />}
        previousLabel={<RiArrowLeftDoubleFill size={23} className="text-secondary me-3"/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={visiblePageNumbers}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        containerClassName="flex gap-5 justify-center items-center"
        activeClassName="w-12 h-10 flex items-center justify-center bg-secondary text-white 
        rounded-md shadow-lg transform transition-all duration-300 hover:scale-100"
        pageClassName="w-12 h-10 rounded-md flex items-center justify-center text-gray-700 font-semibold cursor-pointer border border-gray-300 hover:border-secondary transform transition-all duration-300"
        previousClassName="text-gray-700 font-semibold cursor-pointer"
        nextClassName="text-gray-700 font-semibold hover:text-blue-600 cursor-pointer"
        pageLinkClassName="px-4 py-2 rounded-md transition duration-200"
        previousLinkClassName="py-2 rounded-md transition duration-200"
        nextLinkClassName="py-2 rounded-md transition duration-200"
      />
    </div>
  );
};

export default Pagination;
