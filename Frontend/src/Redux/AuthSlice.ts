import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

export class UserSliceState {

    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token"); // Restore token from storage.
        if (this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    }
}

const ifTokenAvailableReturnToken = (): string => {
    const token = localStorage.getItem('token');
    return token ? token : null;
}

const ifTokenAvailableReturnUser = (): UserModel => {
    const token = localStorage.getItem('token');
    if (token) {        
        return (jwtDecode(token) as any).user;
    }
    return null;
}

const initialState: UserSliceState = {
    token: ifTokenAvailableReturnToken(),
    user: ifTokenAvailableReturnUser(),
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerAction: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.user = (jwtDecode(state.token) as any).user;
            localStorage.setItem("token", state.token);
        },
        loginAction: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.user = (jwtDecode(state.token) as any).user;
            localStorage.setItem("token", state.token);
        },
        logoutAction: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    }
})

export const { registerAction, loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;