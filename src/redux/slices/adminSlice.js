import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    products: [],
    tva: []
}

const adminSlice = createSlice ({
    name: "admin",
    initialState,
    reducers: {
        STORE_CATEGORIES(state, action) {
            state.categories = action.payload.categories
        },
        STORE_PRODUCTS(state, action) {
            state.products = action.payload.products
        },
        STORE_TVA(state, action) {
            state.tva = action.payload.tva
        }
    }
})


export const { STORE_CATEGORIES, STORE_PRODUCTS, STORE_TVA } = adminSlice.actions

export const selectCategories = (state) => state.admin.categories

export const selectProducts = (state) => state.admin.products

export const selectTva = (state) => state.admin.tva

export default adminSlice.reducer