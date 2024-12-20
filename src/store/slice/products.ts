import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bakirali007.pythonanywhere.com/api/v1/app',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      
      headers.set('X-CSRFToken', 'znrEoqzLTYgBvFR8QSOGQafq5YRd8xbDSYnSspeCnzlABl5DfTp6QQGdRNHIEBSE'); // CSRF токен
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (search: string) => `/products/list/${search}`,
    }),
    getProduct: builder.query({
      query: (id: string) => `/products/${id}/`,
    }),
    getCategories: builder.query({
      query: () => `/products/category/`,
    }),
    getProductsInformationList: builder.query<
      ProductInformation[], // Тип ответа
      { key?: string; value?: string; search?: string } // Параметры запроса
    >({
      query: (params) => ({
        url: '/products/information-list/',
        params,
      }),
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductQuery, 
  useGetCategoriesQuery,
  useGetProductsInformationListQuery,
} = api;

export interface ProductInformation {
  id: number;
  product: {
    name: string;
  };
  key: string;
  value: string;
}
