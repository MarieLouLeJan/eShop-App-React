import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
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
    tagTypes: ['Adresses', 'Order'],
    endpoints: ( builder ) => ({

        getAllAdressesByUser: builder.query({
            query: (userId) => `/adresses/getByUser/${userId}`,
            providesTags: ['Adresses']
        }),
        getOneAdress: builder.query({
            query: (id) => `/adresses/getOne/${id}`,
            providesTags: ['Adresses']
        }),
        createOneAdress: builder.mutation({
            query: (body) => ({
                url: '/adresses/createOne',
                method: 'post',
                body,
            }),
            invalidatesTags: ['Adresses'],
        }),
        updateAdressPatch: builder.mutation({
            query: (o) => ({
                url: `/adresses/updateOnePatch/${o.id}`,
                method: 'PATCH',
                body: o.body,
            }),
            invalidatesTags: ['Adresses'],
        }),
    })
})

export const {
    useGetAllAdressesByUserQuery,
    useGetOneAdressQuery, 
    useCreateOneAdressMutation,
    useUpdateAdressPatchMutation,
} = userApi
