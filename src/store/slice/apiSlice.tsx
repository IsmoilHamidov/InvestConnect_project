import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProfileDetail {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ulugbek100.pythonanywhere.com/api/v1/app",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<{ user: string }, { username: string; phone: string; role: string; password: string }>({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
    }),
    
    getVerificationCode: builder.query<
      { id: string; verification_code: string },
      string
    >({
      query: (userId) => `/verification-code/${userId}/`,
    }),
    verifyUser: builder.mutation<{ token: string }, { user: string; code: string }>({
      query: (data) => ({
        url: "/users/verify/",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<
      { token: string; user: number | string },
      { phone: string; password: string }
    >({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserProfile: builder.query<ProfileDetail, void>({
      query: () => ({
        url: "/users/profile/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    // getInvestorProducts: builder.query<ProfileDetail, void>({
    //   query: () => ({
    //     url: "/investor-products/",
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    // }),
    getInvestorProducts: builder.query({
      query: () => ({
        url: "/investor-products/",
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),


    
    // startup profile uchun
    getUserProductsList: builder.query<any, void>({
      query: () => ({
        url: "/users/products/list",
        method: "GET",
        headers: {
          accept: "application/json",
          "X-CSRFToken": "uL30ziq8sA10mDy97pNjSzsF0J56vpm90aBLkPjgQppWNIR37fzeKpzYT0k9zz4q", 
          "Authorization": `Token ${localStorage.getItem("a9d0d22c4353032a6cd658cfb5f6291e3bf90228") || ""}`
        },
      }),
    }),


  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useGetVerificationCodeQuery,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useGetUserProductsListQuery, 
  useGetInvestorProductsQuery
} = userApi;
