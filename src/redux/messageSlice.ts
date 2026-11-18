import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type ThanksType = 'message' | 'order';

type Thanks = {
	userName: string;
	type: ThanksType;
};

interface MessageState {
	isMessageOpen: boolean;
	isTnxMessageOpen: boolean;
	thanks: Thanks;
}

const initialState: MessageState = {
	isMessageOpen: false,
	isTnxMessageOpen: false,
	thanks: {
		userName: '',
		type: 'message',
	},
};

export const msgSlice = createSlice({
	name: 'msg',
	initialState,

	reducers: {
		msgModalToggle: (state) => {
			state.isMessageOpen = !state.isMessageOpen;
		},

		msgModalClose: (state) => {
			state.isMessageOpen = false;
		},

		openThanks: (state, action: PayloadAction<Thanks>) => {
			state.thanks = action.payload;
			state.isTnxMessageOpen = true;
		},

		tnxModalClose: (state) => {
			state.isTnxMessageOpen = false;
		},
	},
});

export const {msgModalToggle, msgModalClose, openThanks, tnxModalClose} = msgSlice.actions;

export default msgSlice.reducer;
