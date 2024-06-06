import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  id: number;
  username: string;
  email: string;
  token: string;
}

const initialState: IAuthState = {
  id: 0,
  username: "",
  email: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IAuthState>) => {
      return (state = {
        ...action.payload,
      });
    },

    clearUser: (state) => {
      return (state = {
        id: 0,
        username: "",
        email: "",
        token: "",
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
