import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  country: string;
  areaCode: string;
  phone: string;
  isPhoneVerify: boolean;
}

const initialState: UserState = {
  country: "HK",
  areaCode: "",
  phone: "",
  isPhoneVerify: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      state.phone = action.payload.phone;
      state.country = action.payload.country;
      state.areaCode = action.payload.areaCode;
      state.isPhoneVerify = action.payload.isPhoneVerify;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;
