import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart.js";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')) :
    { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { user, rating, numReviews, reviews, ...item } = action.payload;
            const existItem = state.cartItems.find(cartItem => cartItem._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => x.id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state, item);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== action.payload);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
        resetCart: (state) => {
            state = initialState;
        },
    }
});


export const { addToCart, removeFromCart, savePaymentMethod, saveShippingAddress, clearCartItems, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
