import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ROOT_URL}),

    endpoints: ( builder ) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/users/login',
                method: 'post',
                body,
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/users/register',
                method: 'post',
                body
            }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: '/resetPassword',
                method: 'PATCH',
                body
            }) 
        }),
        setNewPassword: builder.mutation({
            query: (body, token) => ({
                url: `/resetPassword/${token}`,
                method: 'PATCH',
                body
            })
        })
    })
})

export const {
    useLoginMutation, useRegisterMutation, useResetPasswordMutation, useSetNewPasswordMutation
} = authApi