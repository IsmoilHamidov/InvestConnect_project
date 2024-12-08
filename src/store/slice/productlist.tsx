import React from 'react';
import { useGetProductsQuery } from '../slice/products';

const ProductsList: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {JSON.stringify(error)}</p>;

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Degree: {product.degree}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
