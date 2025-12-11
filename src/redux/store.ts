import someReducer from "@/reducers/someReducer";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    someFeature: someReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
