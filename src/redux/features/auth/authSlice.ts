import { authKey } from "@/constants/storageKey";
import { createSlice } from "@reduxjs/toolkit";

import { setToLocalStorage } from "@/lib/local-storage";

type IState = {
    accessToken: string | null;
};

const initialState: IState = {
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        userLoggedOut: (state) => {
            state.accessToken = null;

            localStorage.removeItem(authKey);
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
