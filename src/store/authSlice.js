import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("timeRemaining", action.payload.expirationTime);

      // setTimeout(this.logoutHandler, 1);
    },

    logoutHandler(state) {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("timeRemaining");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
