import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },
        logoutUser: (state) => {
            state.user = null;
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;