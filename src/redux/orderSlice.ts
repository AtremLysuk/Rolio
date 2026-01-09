import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {CartItem} from './cartSlice';

const BASE_URL = '/orderData.json';

type Client = {
	name: string;
	phone: string;
};

type MethodInfo = {
	newCity?: string;
	newOffice?: string;
	ukrApartment?: string;
	ukrCity?: string;
	ukrHouse?: string;
	ukrIndex?: string;
	ukrStreet?: string;
};

type Delivery = {
	method: string;
	methodInfo: MethodInfo;
};

export type OrderItem = {
	orderId: number;
	client: Client;
	delivery: Delivery;
	order: CartItem[];
};
type OrderError = {
	message: string;
	status?: number;
	details?: string;
};

interface InitialOrderState {
	orderItems: OrderItem[];
	status: 'pending' | 'rejected' | 'fulfilled' | 'idle';
	error: null | OrderError;
}

export const fetchPostOrder = createAsyncThunk<
	OrderItem,
	OrderItem,
	{ rejectValue: OrderError }
>('order/fetchPostOrder', async (order: OrderItem, {rejectWithValue}) => {
	try {
		const res = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		});

		if (!res.ok) {
			return rejectWithValue({
				message: 'Fetch is Fail',
				status: res.status,
			});
		}
		const data = await res.json() as OrderItem
		return data
	} catch (error) {
		return rejectWithValue({
			message: 'Feth Post Failed',
			details: (error as Error).message,
		});
	}
});

const initialState: InitialOrderState = {
	orderItems: [],
	status: 'idle',
	error: null,
};

const orderSlice = createSlice({
		name: 'order',
		initialState,

		reducers: {
			addOrder: (state, action: PayloadAction<OrderItem>) => {
				state.orderItems.push(action.payload);
			},
		},

		extraReducers: (builder) => {
			builder.addCase(fetchPostOrder.pending, (state) => {
				state.status = 'pending';
			});
			builder.addCase(fetchPostOrder.fulfilled, (state, action: PayloadAction<OrderItem>) => {
					state.status = 'fulfilled'
					state.orderItems.push(action.payload);

				}
			)

			builder.addCase(fetchPostOrder.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload ?? {message: 'Unknown error'};

			})
		},
	})
;

export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;
