import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface globalInterface {

    hideHeader: boolean;
    hideFooter: boolean;
    hideShare: boolean;
}



const initialState: globalInterface = {

    hideFooter: false,
    hideHeader: false,
    hideShare: false
}



const globalConfigSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        disableFooter: (state) => {
            state.hideFooter = true;
        },
        disableHeader: (state) => {
            state.hideHeader = true;
        },
        enableFooter: (state) => {
            state.hideFooter = false;
        },
        enableHeader: (state) => {
            state.hideHeader = false;
        },
        hideShare: (state) => {
            state.hideShare = true;
        },
        showShare: (state) => {
            state.hideShare = false;
        }
    }
})

export const { disableFooter, disableHeader, enableFooter, enableHeader, hideShare, showShare } = globalConfigSlice.actions;
export default globalConfigSlice.reducer