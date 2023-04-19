import { createSlice } from "@reduxjs/toolkit";
import { setTTCFilter } from "../../services/setTTCPrice";

const initialState = {
  filteredProducts: [],
  minPrice: null,
  maxPrice: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products } = action.payload;
      const search = action.payload.search;
      const tempProducts = products.filter(
        (prod) =>
          prod.title.toLowerCase().includes(search.toLowerCase()) ||
          prod.categories.title.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCT(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      switch (sort) {
        case "latest":
          tempProducts = products.slice().sort(function (a, b) {
            const date1 = new Date(a.created_at);
            const date2 = new Date(b.created_at);

            return date2 - date1;
          });
          break;
        case "lowest-price":
          tempProducts = products.slice().sort((a, b) => {
            return (
              setTTCFilter(a.priceHT, a.tva.value) -
              setTTCFilter(b.priceHT, b.tva.value)
            );
          });
          break;
        case "highest-price":
          tempProducts = products.slice().sort((a, b) => {
            return (
              setTTCFilter(b.priceHT, b.tva.value) -
              setTTCFilter(a.priceHT, a.tva.value)
            );
          });
          break;
        case "a-z":
          tempProducts = products.slice().sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
          break;
        case "z-a":
          tempProducts = products.slice().sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
          break;
        default:
          tempProducts = products;
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category.title === "All") {
        tempProducts = products;
      } else {
        tempProducts = category.products;
      }
      state.filteredProducts = tempProducts;
    },
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;
      const myArray = [];
      products.map((prod) => {
        const price = setTTCFilter(prod.priceHT, prod.tva.value);
        return myArray.push(price);
      });
      state.minPrice = Math.min(...myArray);
      state.maxPrice = Math.max(...myArray);
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      state.filteredProducts = products.filter(
        (prod) => setTTCFilter(prod.priceHT, prod.tva.value) < price
      );
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  FILTER_BY_CATEGORY,
  GET_PRICE_RANGE,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const selectMinPrice = (state) => state.filter.minPrice;
export const selectMaxPrice = (state) => state.filter.maxPrice;

export default filterSlice.reducer;
