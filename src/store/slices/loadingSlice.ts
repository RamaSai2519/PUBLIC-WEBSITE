import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface loadingInterface {
    isLoading: boolean;
    isVideoPlaying?: boolean;
    isCallPrompt?: boolean;
    packagePricing?: string;
}

const initialState: loadingInterface = {
    isLoading: false,
    isVideoPlaying: false,
    packagePricing:'1999'
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        resetLoading: (state) => {
            state.isLoading = false;
        },
        setVideoStatus: (state, action: PayloadAction<boolean>) => {
            state.isVideoPlaying = action.payload;
        },
        setEnableCallPrompt: (state, action: PayloadAction<boolean>) => {
            state.isCallPrompt = action.payload;
        },
        setDisableCallPrompt: (state, action: PayloadAction<boolean>) => {
            state.isCallPrompt = false;
        },
        setPacakgePricing: (state, action: PayloadAction<string>) => {
            state.packagePricing = action.payload
        },
        getPackgingPrice:(state) => {
            state.packagePricing
        }
    },
});


export const { setLoading, resetLoading, setVideoStatus, setEnableCallPrompt, setDisableCallPrompt, setPacakgePricing,getPackgingPrice } = loadingSlice.actions;
export default loadingSlice.reducer;