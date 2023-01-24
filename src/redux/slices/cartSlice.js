import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import setTTC from '../../services/setTTCPrice'


class OrderProduct {
    constructor(product_id, order_id, quantity, priceHT, TVA_title, TVA_value, title) {
        this.product_id = product_id;
        this.order_id = order_id;
        this.quantity = quantity;
        this.priceHT = priceHT;
        this.TVA_title = TVA_title;
        this.TVA_value = TVA_value
        this.title = title
    }
}

const initialState = {
    cartItem: {
        totalHT: 0,
        tax: 0,
        totalTTC: 0,
        quantity: 0,
        order_states_id: 0
    },
    products: [],
    adresses: [],
    previousURL: '',
    shippingAdress: {},
    billingAdress: {},
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {

            // state.products = []
            // state.cartItem = {
            //     totalHT: 0,
            //     tax: 0,
            //     totalTTC: 0,
            //     quantity: 0,
            //     order_states_id: 0
            // }

            const { myProduct, quantity } = action.payload

            const cart = {...state.cartItem}
            cart.totalHT += myProduct.priceHT 
            cart.quantity += quantity
            state.cartItem = cart

            const prods = [...state.products]
            const prodExist = prods.find(prod => prod.product_id === myProduct.id)
            if( prodExist ) {
                prodExist.quantity += quantity
                toast.info(`${myProduct.title} increased by ${quantity}`, {position: 'top-left'})
            } else {
                const newProduct = new OrderProduct (
                    myProduct.id,
                    0,
                    quantity,
                    myProduct.priceHT,
                    myProduct.TVA_title,
                    myProduct.TVA_value,
                    myProduct.title
                );
                prods.push(newProduct)
                toast.success(`${myProduct.title} added to the cart`, {position: 'top-left'})
            }
            state.products = prods
        },
        INCREASE_PRODUCT(state, action) {
            const prods = [...state.products]
            const prod = prods.find(prod => prod.product_id === action.payload.id)
            prod.quantity += 1
            state.products = prods
            const cart = {...state.cartItem}
            cart.totalHT += action.payload.priceHT 
            cart.quantity += 1
            state.cartItem = cart             
        },
        DECREASE_PRODUCT(state, action) {
            const prods = [...state.products]
            const prod = prods.find(prod => prod.product_id === action.payload.id)
            if(prod.quantity === 1) {
                const index = prods.indexOf(prod)
                prods.splice(index, 1);
            } else {
                prod.quantity -= 1
            }
            state.products = prods
            const cart = {...state.cartItem}
            cart.totalHT -= action.payload.priceHT
            cart.quantity -= 1
            // if(cart.quantity === 0) {
            //     const adresses = [...state.adresses]
            //     adresses.splice(0, adresses.length)
            //     state.adresses = adresses
            // }
            state.cartItem = cart
        },
        DELETE_PRODUCT(state, action) {
            const prods = [...state.products]
            const prod = prods.find(prod => prod.product_id === action.payload.id)
            const index = prods.indexOf(prod)
            const prodTotalHT = prod.quantity * prod.priceHT
            prods.splice(index, 1);
            state.products = prods;
            const cart = {...state.cartItem}
            cart.quantity -= prod.quantity
            cart.totalHT -= prodTotalHT
            // if(cart.quantity === 0) {
            //     const adresses = [...state.adresses]
            //     adresses.splice(0, adresses.length)
            //     state.adresses = adresses
            // }
            state.cartItem = cart
        },
        DELETE_CART(state, action) {
            const prods = [...state.products]
            prods.splice(0, prods.length);
            state.products = prods
            state.cartItem = {
                totalHT: 0,
                tax: 0,
                totalTTC: 0,
                quantity: 0,
                order_states_id: 0
            }
            const adresses = [...state.adresses]
            adresses.splice(0, adresses.length)
            state.adresses = adresses
        },
        CALCULATE_CART_TOTAL(state, action) {
            const prods = [...state.products]
            let totalTTCCart = 0
            for(const prod of prods){
                const totalTTC = setTTC(prod.priceHT, prod.TVA_value) * prod.quantity
                totalTTCCart += totalTTC
            }
            state.cartItem.tax = (totalTTCCart - state.cartItem.totalHT).toFixed(2)
            state.cartItem.totalTTC = totalTTCCart.toFixed(2)
        },
        SAVE_URL(state, action) {
            state.previousURL = action.payload
        },
        SET_ADRESSES(state, action) {
            const { shipping, billing } = action.payload
            state.shippingAdress = shipping
            state.billingAdress = billing
        },
        RESET_ALL(state, action) {
            state.cartItem = {
                totalHT: 0,
                tax: 0,
                totalTTC: 0,
                quantity: 0,
                order_states_id: 0
            };
            state.products = [];
            state.adresses = [];
            state.previousURL = '';
            state.shippingAdress = {};
            state.billingAdress = {}
        }
    }

})

export const { 
    ADD_TO_CART, 
    INCREASE_PRODUCT, 
    DECREASE_PRODUCT, 
    DELETE_PRODUCT, 
    DELETE_CART, 
    CALCULATE_CART_TOTAL, 
    SAVE_URL, 
    SET_ADRESSES,
    RESET_ALL 
} = cartSlice.actions;

export const selectCartItem = ( state ) => state.cart.cartItem;
export const selectProducts = ( state ) => state.cart.products;
export const selectAdresses = ( state ) => state.cart.adresses;
export const selectPreviousURL = ( state ) => state.cart.previousURL;
export const selectBilling = (state) => state.cart.billingAdress
export const selectShipping = (state) => state.cart.shippingAdress 

export default cartSlice.reducer
