import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_ROOT_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.JWT
            if (token) {
              headers.set('authorization', `Bearer ${token}`)  
              return headers
            }
          },
    }),
    endpoints: ( builder ) => ({
        getCategoriesAdmin: builder.query({
            query: () => '/categories/getAllAdmin'
        }),
        getProductsAdmin: builder.query({
            query: () => '/products/getAllAdmin'
        }),
        getTvaAdmin: builder.query({
            query: () => '/TVA/getAllAdmin'
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/products/createOne',
                method: 'post',
                body,
            })         
        }),
        updateProduct: builder.mutation({
            query: (o) => ({
                url: `/products/updateOnePut/${o.id}`,
                method: 'PUT',
                body: o.body,

            }) 
        })
    })
})



export const {
    useGetCategoriesAdminQuery, useGetTvaAdminQuery, useGetProductsAdminQuery, useAddProductMutation, useUpdateProductMutation
} = adminApi
