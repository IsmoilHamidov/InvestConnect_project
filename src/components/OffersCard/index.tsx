import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUserProductsListQuery } from '@/store/slice/products';
import ProperyCard from './ProperyCards';

const Offers: React.FC = () => {
  const { data, error, isLoading } = useGetUserProductsListQuery(undefined);
  console.log(data)


  return (
    <div className="p-6 w-full mx-auto shadow-lg border-[1px] rounded-[15px]  ">
    <div className="flex flex-row items-center justify-between mb-9 ">
      <h1 className="text-base font-semibold">Aanbod</h1>
        
      <Link to={'/ProjectAdd'}>
          <button className="rounded-full text-[15px] py-[7px] px-5 text-white Blue_button" >
            <i className="fa-solid fa-plus  me-3"></i>
            Add Project
          </button>
      </Link>
    </div>


      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <p>Loading projects..</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-full">
          <p>Error loading projects... Please try again later.</p>
        </div>
      )}
      
      {data?.length === 0 && (
        <div className="flex items-start justify-start h-full">
          <p className='italic text-base'>You do not have available projects.</p>
        </div>
      )}
    
    <div className="">
      {data?.map((item: {id:number; image: any; name: string; category: string; degree: string; price: any; location: string; }, index: React.Key | null | undefined) => {
        
        return (    
            <ProperyCard
              key={index}
              image={item.image}
              id={item.id}
              title={typeof item.name === 'string' ? item.name : 'Untitled'}
              location={typeof item.location === 'string' ? item.location : 'Topligging'}
              category={typeof item.category === 'string' ? item.category : 'Unknown'}
              type={typeof item.degree === 'string' ? item.degree : 'N/A'}
              price={item.price ? `$${item.price}` : 'N/A'}
            />
        );
      })}
    </div>


   
  </div>
  );
};


export default Offers;
