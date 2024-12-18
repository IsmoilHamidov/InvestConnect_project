import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProfileDetail {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
}

interface UpdateProfileDetailArgs {
  id: number;
  data: ProfileDetail;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bakirali007.pythonanywhere.com/api/v1/app",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      void,
      { username: string; phone: string; role: string; password: string }
    >({
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
    verifyUser: builder.mutation<void, { user: string; code: string }>({
      query: (data) => ({
        url: "/users/verify/",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<
      { token: string, user: number | string },
      { phone: string; password: string }
    >({
      query: (credentials) => ({
        url: "/users/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserProfile: builder.query({
      query: (userId: string) => `/profile-detail/${userId}/`,
    }),
    updateProfileDetail: builder.mutation<ProfileDetail, UpdateProfileDetailArgs>({
      query: ({ id, data }) => ({
        url: `/profile-detail/${id}/`,
        method: 'PATCH',
        body: data,
      }),
    })
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useGetVerificationCodeQuery,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useUpdateProfileDetailMutation,
} = userApi;