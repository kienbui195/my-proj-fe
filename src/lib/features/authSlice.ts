import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  id: number;
  username: string;
  email: string;
  token: string;
  role?: 'admin' | 'user'
}

export interface IAuthPayloadAction {
  fieldName: "id" | "username" | "email" | "token" | "role";
  value: any;
}

const initialState: IAuthState = {
  id: 0,
  username: "",
  email: "",
  token: "",
  role: undefined
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IAuthPayloadAction[]>) => {
      let newState: IAuthState = { ...state };
      for (let i = 0; i < action.payload.length; i++) {
        newState = {
          ...newState,
          [action.payload[i].fieldName]: action.payload[i].value,
        };
      }

      return (state = newState);
    },

    clearUser: (state) => {
      return (state = {
        id: 0,
        username: "",
        email: "",
        token: "",
        role: undefined
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
