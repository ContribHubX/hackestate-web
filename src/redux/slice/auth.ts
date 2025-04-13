import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null
}

const tokenKey = "authToken";

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ admin: User, token: string }>) => {
            state.user = action.payload.admin;
            localStorage.setItem(tokenKey, action.payload.token);
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem(tokenKey);
            window.location.href = "/auth/login";
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
