import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Типизация данных продукта
interface Product {
  id: number; // Замените на реальное поле id
  name: string; // Замените на реальные поля из API
  [key: string]: any; // Для остальных полей
}

// Создаем API slice
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bakirali007.pythonanywhere.com/api/v1/app/',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('authorization', 'Basic Kzk5ODkwMTIzNDU2NzoxMjM=');
      headers.set('X-CSRFToken', 'eQP8QoQxaXAn16goJ3jemOz9106Cje8HSFicE7erX5NjkNlL7FL3HlpgHoONCgoP');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProductList: builder.query<Product[], void>({
      query: () => 'product-list/', // Укажи эндпоинт
    }),
  }),
});

export const { useGetProductListQuery } = productApi;
