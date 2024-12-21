import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // Уникальное имя для вашего slice
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bakirali007.pythonanywhere.com/api/v1/app/users/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken":
            "5bGK88tlnKhTIegNs15t6LP4bAkQSV0qEeCOycG4SsKWthtO2BW3XJNNFsjHSt5D", // Укажите токен
        },
        body: credentials,
        invalidatesTags: ["User"], // Указывает, что после изменения данные с тегом "User" становятся неактуальными
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `users/${user.id}/`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"], // Указывает, что после изменения данные с тегом "User" становятся неактуальными
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users/profile/",
        method: "GET",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token") || ""}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation, // Хук для выполнения loginUser
  useUpdateUserMutation, // Хук для выполнения updateUser
  useGetUsersQuery, // Хук для выполнения getUsers
} = apiSlice;
