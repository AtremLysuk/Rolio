import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import  msgReducer  from "./messageSlice";
import itemsSlice from "./itemsSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    message: msgReducer,
    items: itemsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
