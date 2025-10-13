import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  message: string;
  userName: string;
}

interface MessageState {
  isMessageOpen: boolean;
  isTnxMessageOpen: boolean;
  user: User;
}

const initialState: MessageState = {
  isMessageOpen: false,
  isTnxMessageOpen: false,
  user: {
    message: '',
    userName: '',
  },
};

export const msgSlice = createSlice({
  name: 'msg',
  initialState: initialState,

  reducers: {
    msgModalToggle: (state) => {
      state.isMessageOpen = !state.isMessageOpen;
    },

    msgModalClose: (state) => {
      state.isMessageOpen = false;
    },

    setUserMessage: (state, action: PayloadAction<User>) => {
      state.user = {
        userName: action.payload.userName,
        message: action.payload.message,
      };
    },

    tnxModalToggle: (state) => {
      state.isTnxMessageOpen = !state.isTnxMessageOpen;
    },

    tnxModalClose: (state) => {
      state.isTnxMessageOpen = false;
    },
  },
});

export const { msgModalToggle, msgModalClose, tnxModalToggle, tnxModalClose, setUserMessage } =
  msgSlice.actions;

export default msgSlice.reducer;
