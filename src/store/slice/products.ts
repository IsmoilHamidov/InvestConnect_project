import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bakirali007.pythonanywhere.com/api/v1/app',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('authorization', 'Basic Kzk5ODkwMTIzNDU2NzoxMjM='); // Ваш токен
      headers.set('X-CSRFToken', 'EODuSlbs2MpRFHKcsfVIkPVYW3mzqdF7iD6yG4zmPUCNYoPzQRnxFmL5Cr4KJfVf'); // CSRF токен
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/products/list/',
    }),
  }),
});

export const { useGetProductsQuery } = api;
