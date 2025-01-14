import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bakirali007.pythonanywhere.com/api/v1/app",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");

      headers.set(
        "X-CSRFToken",
        "NsBgsgNCHjopnvKGkTMzJPkz3vH99oGYyU7SeHFc9iA6seh2MCrnQff7JrLffxvI"
      ); // CSRF токен
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
        url: "/products/information-list/",
        params,
      }),
    }),

    paymentAndcheck: builder.mutation({
      query: (data) => ({
        url: "/payment-and-check/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),

    createProduct: builder.mutation<void, FormData>({
      query: (data) => ({
        url: "/products/create/",
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
    createProductInvest: builder.mutation<void, FormData>({
      query: (data) => ({
        url: "/create-product_1/",
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Token ${localStorage.getItem("token") || ""}`,
        },

      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "/profile-detail/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
    getPrivateInfo: builder.query({
      query: (id) => ({
        url: `/products/information-detail/${id}`,
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users/profile/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),

    getUserProductsList: builder.query({
      query: () => ({
        url: "/users/products/list",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),

    updateProfileDetail: builder.mutation({
      query: ({ data }) => ({
        url: `/profile-detail/`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsInformationListQuery,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useCreateProductMutation,
  useUpdateProfileDetailMutation,
  useGetUserProductsListQuery,
  usePaymentAndcheckMutation,
  useGetPrivateInfoQuery,
  useCreateProductInvestMutation,
} = api;

export interface ProductInformation {
  id: number;
  product: {
    name: string;
  };
  key: string;
  value: string;
}

// interface CreateProductRequest {
//   user: number;
//   name: string;
//   rendement: string;
//   location: string;
//   description: string;
//   category: number;
//   contract: number;
//   price: string;
//   image: File;
// }
