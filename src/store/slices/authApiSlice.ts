
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authReducer";

const initialState: User = {
    _id: "",
    birthDate: "",
    city: "",
    name: "",
    phoneNumber: ""
} as User;
export const scoreBallByBallSlice = createSlice({
    name: "scoreBallByBall",
    initialState,
    reducers: {
        setScoreBallByBall: (state, action: PayloadAction<User>) => {
            return {
                ...action.payload,
            };
        },
    },
});

export const { setScoreBallByBall } = scoreBallByBallSlice.actions;
export default scoreBallByBallSlice.reducer;