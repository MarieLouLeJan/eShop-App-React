import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ROOT_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.JWT;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: `/orders/createOne`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: (o) => ({
        url: `/orders/updateOnePatch/${o.id}`,
        method: "PATCH",
        body: o.body,
      }),
      invalidatesTags: ["Order"],
    }),
    createOrderProduct: builder.mutation({
      query: (body) => ({
        url: `/orderProduct/createOne`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    createOrderTypeAdress: builder.mutation({
      query: (body) => ({
        url: `/orderTypeAdress/createOne`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderByUser: builder.query({
      query: (userId) => `/orders/getByUserId/${userId}`,
      providesTags: ["Order"],
    }),
    getOneOrder: builder.query({
      query: (id) => `/orders/getOne/${id}`,
      providesTags: ["Order"],
    }),
    getProductsOrder: builder.query({
      query: (id) => `/orderProduct/getByOrder/${id}`,
      providesTags: ["Order"],
    }),
    getAllOrdersAdmin: builder.query({
      query: () => `/orders/getAllAdmin`,
      providesTags: ["Order"],
    }),
    getAllOrderStates: builder.query({
      query: () => `/orderStates/getAllAdmin`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateOrderProductMutation,
  useCreateOrderTypeAdressMutation,
  useGetOrderByUserQuery,
  useGetOneOrderQuery,
  useGetProductsOrderQuery,
  useGetAllOrdersAdminQuery,
  useGetAllOrderStatesQuery,
  useUpdateOrderMutation,
} = orderApi;
