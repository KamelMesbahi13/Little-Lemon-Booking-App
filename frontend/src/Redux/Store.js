import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./Api/apiSlice";
import authReducer from "./Features/Auth/AuthSlice";

import { getFavoritesFromLocalStorage } from "../Utils/LocalStorage";
import FaviroteSlice from "./Features/Favirotes/FaviroteSlice";
import cartSlice from "./Features/Cart/cartSlice";
import shopSlice from "./Features/Shop/shopSlice";
import PriceSlice from "./Features/PriceSlice/PriceSlice";
import ShippingSlice from "./Features/ShippingSlice/ShippingSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: FaviroteSlice,
    cart: cartSlice,
    shop: shopSlice,
    price: PriceSlice,
    shipping: ShippingSlice,
  },

  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
