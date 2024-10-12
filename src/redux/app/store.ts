import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { baseApi } from "../api/baseApi";
import authSlice from "../features/auth/authSlice";
import openAiSlice from "../features/openAi/openAiSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authSlice,
        openAi: openAiSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
