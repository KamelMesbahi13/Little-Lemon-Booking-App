/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cartUtils";

// Load cart from local storage or set initial state
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "PayPal",
      shippingPrice: 0, // Add shippingPrice to initial state
      totalPrice: 0, // Add totalPrice to initial state
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Destructure and exclude unwanted fields
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state, item);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Add setShippingPrice reducer
    setShippingPrice: (state, action) => {
      state.shippingPrice = action.payload; // Save shipping price
      localStorage.setItem("cart", JSON.stringify(state)); // Update localStorage
    },

    // Add setTotalPrice reducer
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload; // Save total price
      localStorage.setItem("cart", JSON.stringify(state)); // Update localStorage
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: (state) => {
      state = initialState; // Reset the cart to initial state
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
  setShippingPrice, // Export setShippingPrice action
  setTotalPrice, // Export setTotalPrice action
} = cartSlice.actions;

export default cartSlice.reducer;
