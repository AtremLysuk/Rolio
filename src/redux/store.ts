import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import  msgReducer  from "./messageSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    message: msgReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch