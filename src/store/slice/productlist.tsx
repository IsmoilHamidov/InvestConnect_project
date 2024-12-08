import React from 'react';
import { useGetProductListQuery } from './productApiSlice';

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useGetProductListQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error instanceof Error ? error.message : 'Error occurred'}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.name}</li> // Замените `id` и `name` на реальные поля из API
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
