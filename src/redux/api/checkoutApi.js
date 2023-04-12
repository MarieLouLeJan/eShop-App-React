import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
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
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (body) => ({
        url: `/create-payment-intent`,
        method: "post",
        body: body,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = checkoutApi;
