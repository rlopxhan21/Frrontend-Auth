import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;
