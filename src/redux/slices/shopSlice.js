import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    products: []
}

const adminSlice = createSlice ({
    name: "shop",
    initialState,
    reducers: {
        STORE_CATEGORIES(state, action) {
            state.categories = action.payload.categories
        },
        STORE_PRODUCTS(state, action) {
            state.products = action.payload.products
        },
    }
})


export const { STORE_CATEGORIES, STORE_PRODUCTS } = adminSlice.actions

export const selectCategories = (state) => state.admin.categories

export const selectProducts = (state) => state.admin.products

export default adminSlice.reducer