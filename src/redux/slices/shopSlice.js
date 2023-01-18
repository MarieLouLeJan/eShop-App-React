import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    products: [],
    tva: []
}

const shopSlice = createSlice ({
    name: "shop",
    initialState,
    reducers: {
        STORE_CATEGORIES(state, action) {
            state.categories = action.payload.categories
        },
        STORE_PRODUCTS(state, action) {
            state.products = action.payload.prods
        },
    }
})


export const { STORE_CATEGORIES, STORE_PRODUCTS } = shopSlice.actions

export const selectCategories = (state) => state.shop.categories

export const selectProducts = (state) => state.shop.products

export default shopSlice.reducer