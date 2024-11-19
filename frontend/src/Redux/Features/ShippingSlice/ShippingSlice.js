import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingRate: 0,
  selectedWilaya: "",
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingRate: (state, action) => {
      state.shippingRate = action.payload;
    },
    setSelectedWilaya: (state, action) => {
      state.selectedWilaya = action.payload;
    },
    clearShippingInfo: (state) => {
      state.shippingRate = 0;
      state.selectedWilaya = "";
    },
  },
});

export const { setShippingRate, setSelectedWilaya, clearShippingInfo } =
  shippingSlice.actions;
export default shippingSlice.reducer;
