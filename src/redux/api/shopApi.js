import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const shopApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ROOT_URL}),
    endpoints: ( builder ) => ({
        getCategories: builder.query({
            query: () => '/categories/getAllShop'
        }),

    })
})

export const {
    useGetCategoriesQuery
} = shopApi