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

      const calculateRemainingTime = (expTime) => {
        const currentTime = new Date().getTime();
        const adjTime = new Date(expTime).getTime();

        const remainingDuration = adjTime - currentTime;

        return remainingDuration;
      };

      const remainingTime = calculateRemainingTime(action.payload.expTime);

      // setTimeout(() => {
      //   state.token = "";
      //   state.isLoggedIn = false;
      //   localStorage.removeItem("token");
      // }, 3000);
    },

    logoutHandler(state) {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
