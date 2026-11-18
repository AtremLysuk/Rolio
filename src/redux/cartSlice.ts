import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getCartItemsFromStorage} from '@/scripts/getCartItemsFromStorage';
import type {RootState} from './store';

export type CartItem = {
	id: number;
	title: string;
	price: number;
	cartImgSrc: string;
	count: number;
};

export interface CartState {
	cartItems: CartItem[];
	isCartOpen: boolean;
}

const initialState: CartState = {
	cartItems: getCartItemsFromStorage(),
	isCartOpen: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,

	reducers: {
		openCartToggle: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},

		addItem: (state, action: PayloadAction<CartItem>) => {
			if (action.payload.count < 1) return;

			const itemInCart = state.cartItems.find(
				(el) => el.id === action.payload.id
			);

			if (itemInCart) {
				itemInCart.count += action.payload.count;
			} else {
				state.cartItems.push(action.payload);
			}
		},

		minusItem: (state, action: PayloadAction<number>) => {
			const itemInCart = state.cartItems.find((el) => el.id === action.payload);
			if (!itemInCart) return;

			if (itemInCart.count > 1) {
				itemInCart.count--;
			} else {
				state.cartItems = state.cartItems.filter((el) => el.id !== action.payload);
			}
		},

		plusItem: (state, action: PayloadAction<number>) => {
			const itemInCart = state.cartItems.find((el) => el.id === action.payload);
			if (itemInCart) itemInCart.count++;
		},

		removeItem: (state, action: PayloadAction<number>) => {
			state.cartItems = state.cartItems.filter((el) => el.id !== action.payload);
		},

		clearCart: (state) => {
			state.cartItems = [];
		},
	},
});

export const selectCartTotalPrice = (state: RootState): number =>
	state.cart.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

export const selectCartTotalCount = (state: RootState): number =>
	state.cart.cartItems.reduce((sum, item) => sum + item.count, 0);

export const {
	addItem,
	openCartToggle,
	minusItem,
	removeItem,
	plusItem,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
