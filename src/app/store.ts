import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "./services/apiSlice";
export const store = configureStore({
  reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>getDefaultMiddleware().concat(apiSlice.middleware)
})
setupListeners(store.dispatch);