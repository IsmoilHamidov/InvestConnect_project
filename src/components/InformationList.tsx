import { useGetProductsInformationListQuery } from '@/store/slice/products';
import React from 'react';

const InformationList = () => {
  const { data, error, isLoading } = useGetProductsInformationListQuery({
    key: '',
    value: '',
    search: '',
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Произошла ошибка</div>;

  return (
    <div className='m-4'>
      <h1>Список продуктов</h1>
      <ul className='px-5 py-4 border-slate-500 border '>
        {data?.map((item) => (
          <li key={item.id} className='grid gap-3'>
            <h2>{item.product.name}</h2>
            <p>Ключ: {item.key}</p>
            <p>Значение: {item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InformationList;