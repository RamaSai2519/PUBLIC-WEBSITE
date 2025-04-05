import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Data {
    _id?: string;
    name?: string;
    phoneNumber?: string;
    city?: string;
    isBusy?: boolean;
    isPaidUser?: boolean;
    active?: boolean;
    birthDate?: string;
    createdDate?: string;
    numberOfCalls?: number;
    CustomerPersona?: string;
    profileCompleted?: boolean;
    refCode?: string;
}

export interface userAuthResponse {
    success?: boolean;
    data?: Data;
    error?: {};
}

const initialState: userAuthResponse = {
    success: false,
    data: {},
    error: {}
};

const userInfoAuthSlice = createSlice({
    name: "userInfoAuthSlice",
    initialState,
    reducers: {
        setAuthUserDetail: (state, action: PayloadAction<Data>) => {
            state.data = action.payload;
        },
        getAuthUserDetail: (state) => {
            state.data;
        },
        resetAuthUser: () => {
            initialState
        }
    },
});

export const { setAuthUserDetail, resetAuthUser, getAuthUserDetail } = userInfoAuthSlice.actions;
export default userInfoAuthSlice.reducer;