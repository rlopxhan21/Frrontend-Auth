import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthSlice";

const redux = configureStore({
  dispatch: {
    auth: AuthSlice.reducer,
  },
});

export default redux;
