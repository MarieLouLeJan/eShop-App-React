import { createSlice } from '@reduxjs/toolkit';
import setTTC from '../../services/setTTCPrice'

const initialState = {
    filteredProducts: [],
    minPrice: null,
    maxPrice: null
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            const { products } = action.payload;
            const search = action.payload.search
            const tempProducts = products.filter(prod => 
                prod.title.toLowerCase().includes(search.toLowerCase())
                || prod.categories.title.toLowerCase().includes(search.toLowerCase())
            )
            state.filteredProducts = tempProducts
        },
        SORT_PRODUCT(state, action) {
            const { products } = action.payload
            let tempProducts = []
            switch (action.payload.sort) {
                case 'latest':
                    tempProducts = products.slice().sort(function(a, b){
                        const date1 = new Date(a.created_at)
                        const date2 = new Date(b.created_at)
                        
                        return date2 - date1;
                    })
                    break
                case 'lowest-price':
                    tempProducts = products.slice().sort((a, b) => {
                        return setTTC(a.priceHT, a.tva.value) - setTTC(b.priceHT, b.tva.value) 
                    })
                    break
                case 'highest-price':
                    tempProducts = products.slice().sort((a, b) => {
                        return setTTC(b.priceHT, b.tva.value) - setTTC(a.priceHT, a.tva.value) 
                    })
                    break
                case 'a-z':
                    tempProducts = products.slice().sort((a, b) => {
                        return a.title.localeCompare(b.title)
                    })
                    break
                case 'z-a':
                    tempProducts = products.slice().sort((a, b) => {
                        return b.title.localeCompare(a.title)
                    })
                    break
                default:
                    tempProducts = products
            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_CATEGORY(state, action) {
            const { products, category } = action.payload;
            let tempProducts = []
            if(category.title === 'All') {
                tempProducts = products
            } else {
                tempProducts = category.products
            }
            state.filteredProducts = tempProducts
        },
        GET_PRICE_RANGE(state, action) {
            const { products } = action.payload;
            const myArray = [];
            products.map(prod => {
                const price = setTTC(prod.priceHT, prod.tva.value)
                return myArray.push(price)
            })
            state.minPrice = Math.min(...myArray)
            state.maxPrice = Math.max(...myArray)
        },
        FILTER_BY_PRICE(state, action) {
            const { products, price } = action.payload;
            state.filteredProducts = products.filter(prod => setTTC(prod.priceHT, prod.tva.value) <= price)
        }
    }
})

export const { FILTER_BY_SEARCH, SORT_PRODUCT, FILTER_BY_CATEGORY, GET_PRICE_RANGE, FILTER_BY_PRICE } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts
export const selectMinPrice = (state) => state.filter.minPrice
export const selectMaxPrice = (state) => state.filter.maxPrice


export default filterSlice.reducer;