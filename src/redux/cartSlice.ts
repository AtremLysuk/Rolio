import { createSlice } from '@reduxjs/toolkit';
import { getCartItemsFromStorage } from '@/scripts/getCartItemsFromStorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  cartImgSrc: string;
  count: number;
};
type Status = 'pending' | 'rejected' | 'fulfilled' | 'idle';

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  isCartOpen: boolean;
  status: Status;
  error: null | string;
}

const initialState: CartState = {
  cartItems: getCartItemsFromStorage(),
  totalPrice: 0,
  isCartOpen: false,
  status: 'idle',
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    openCartToggle: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    addItem: (state, action: PayloadAction<CartItem>) => {
      const isInCart: CartItem | undefined = state.cartItems.find(
        (el) => el.id === action.payload.id
      );

      if (!isInCart) {
        state.cartItems.push(action.payload);
      } else {
        isInCart.count += action.payload.count;
      }

      state.totalPrice = state.cartItems.reduce<number>(
        (sum: number, item: CartItem) => {
          return (sum += item.price * item.count);
        },
        0
      );
    },

    minusItem: (state, action: PayloadAction<number>) => {
      const isInCart: CartItem | undefined = state.cartItems.find(
        (el: CartItem) => el.id === action.payload
      );
      if (!isInCart) return;

      if (isInCart?.count > 1) {
        isInCart.count--;
      } else {
        state.cartItems = state.cartItems.filter((el) => el.id !== isInCart.id);
      }

      state.totalPrice = state.cartItems.reduce<number>(
        (sum: number, item: CartItem) => {
          return (sum += item.price * item.count);
        },
        0
      );
    },

    plusItem: (state, action: PayloadAction<number>) => {
      const isInCart = state.cartItems.find((el) => el.id === action.payload);

      if (!isInCart) return;

      isInCart.count++;

      state.totalPrice = state.cartItems.reduce((acc, el) => {
        return (acc += el.price * el.count);
      }, 0);
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (el) => el.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  openCartToggle,
  minusItem,
  removeItem,
  plusItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
