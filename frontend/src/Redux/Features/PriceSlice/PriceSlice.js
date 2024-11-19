import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  productTotalPrice: 0,
};

const priceSlice = createSlice({
  name: "price",
  initialState, // Use the initialState defined above
  reducers: {
    setItemsPrice(state, action) {
      state.itemsPrice = action.payload;
    },
    setShippingPrice(state, action) {
      state.shippingPrice = action.payload;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    setProductTotalPrice(state, action) {
      state.productTotalPrice = action.payload;
    },
  },
});

// Export actions
export const {
  setItemsPrice,
  setShippingPrice,
  setTotalPrice,
  setProductTotalPrice,
} = priceSlice.actions;

// Export selectors
export const selectItemsPrice = (state) => state.price.itemsPrice;
export const selectShippingPrice = (state) => state.price.shippingPrice;
export const selectTotalPrice = (state) => state.price.totalPrice;
export const selectProductTotalPrice = (state) => state.price.productTotalPrice;

// Export reducer
export default priceSlice.reducer;
