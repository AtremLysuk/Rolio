import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Color } from '@/sections/Hero/Hero';

export type ItemImages = {
  title: string;
  imgSrc?: string;
  width?: string | number;
  height?: string | number;
};

export type ItemType = {
  id: number;
  title: string;
  cartImgSrc: string;
  price: number;
  subtitle: string;
  text: string;
  images: ItemImages[];
  color: Color;
};

type Status = 'pending' | 'rejected' | 'fulfilled' | 'idle';

type InitialItemsState = {
  items: ItemType[];
  status: Status;
  error: null | FetchError;
};

interface FetchError {
  message: string;
  status?: number;
  details?: string;
}

const FETCH_URL = 'src/data.json';

const initialItemsState: InitialItemsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchItems = createAsyncThunk<
  ItemType[],
  void,
  { rejectValue: FetchError }
>('items/fetchItems', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(FETCH_URL);
    if (!res.ok) {
      return rejectWithValue({
        message: 'Fetch is Fail',
        status: res.status,
      });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue({
      message: 'Something wrong',
      details: (error as Error).message
    });
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: initialItemsState,

  reducers: {
    updateItems: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || {message : 'Fetch is failed'};
      })
      .addCase(
        fetchItems.fulfilled,
        (state, action: PayloadAction<ItemType[]>) => {
          state.status = 'fulfilled';
          state.error = null;
          state.items = action.payload;
        }
      );
  },
});

export const { updateItems } = itemsSlice.actions;

export default itemsSlice.reducer;
