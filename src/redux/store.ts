import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import  msgReducer  from "./messageSlice";
import orderSlice from "./orderSlice";
import itemsSlice from "./itemsSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    message: msgReducer,
    order: orderSlice,
    items: itemsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch