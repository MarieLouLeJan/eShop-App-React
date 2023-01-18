import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_ROOT_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.JWT
            console.log(token)
            if (token) {
                console.log(token)
              headers.set('authorization', `Bearer ${token}`)  
              return headers
            }
        },
    }),
    tagTypes: [ 'Categories', 'Products', 'Tva', 'Product'],
    endpoints: ( builder ) => ({
        
        getCategoriesAdmin: builder.query({
            query: () => '/categories/getAllAdmin',
            providesTags: ['Categories', 'Products']
        }),
        getProductsAdmin: builder.query({
            query: () => '/products/getAllAdmin',
            providesTags: ['Categories', 'Products']
        }),
        getOneProductAdmin: builder.query({
            query: (id) => `/products/getOneAdmin/${id}`,
            providesTags: ['Product']
        }),
        getTvaAdmin: builder.query({
            query: () => '/TVA/getAllAdmin',
            providesTags: ['Tva']
        }),

        getCategoriesShop: builder.query({
            query: () => '/categories/getAllShop',
            providesTags: ['Products', 'Categories']
        }),
        getProductsShop: builder.query({
            query: () => '/products/getAllShop',
            providesTags: ['Products', 'Categories']
        }),
        getOneProductShop: builder.query({
            query: (id) => `/products/getOneShop/${id}`,
            providesTags: ['Product']
        }),

        addProduct: builder.mutation({
            query: (body) => ({
                url: '/products/createOne',
                method: 'post',
                body,
            }),
            invalidatesTags: ['Categories', 'Products'],
        }),
        updateProductPut: builder.mutation({
            query: (o) => ({
                url: `/products/updateOnePut/${o.id}`,
                method: 'PUT',
                body: o.body,
            }),
            invalidatesTags: ['Categories', 'Products', 'Product'],
        }),
        updateProductPatch: builder.mutation({
            query: (o) => ({
                url: `/products/updateOnePatch/${o.id}`,
                method: 'PATCH',
                body: o.body,
            }),
            invalidatesTags: ['Categories', 'Products', 'Product'],
        }),
    })
})

export const {
    useGetCategoriesAdminQuery, 
    useGetTvaAdminQuery, 
    useGetProductsAdminQuery, 
    useAddProductMutation, 
    useUpdateProductPutMutation, 
    useUpdateProductPatchMutation, 
    useGetOneProductAdminQuery,
    useGetCategoriesShopQuery,
    useGetProductsShopQuery,
    useGetOneProductShopQuery
} = shopApi
