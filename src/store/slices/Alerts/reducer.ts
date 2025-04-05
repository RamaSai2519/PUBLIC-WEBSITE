import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoMessage: "",
  successMessage: "",
  warningMessage: "",
  errorMessage: "",
};
const AlertsReducer = createSlice({
  name: "Alerts",
  initialState,
  reducers: {
    setInfoMessage: (state, action) => {
      state.infoMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export default AlertsReducer.reducer;
export const { actions: alertsActions } = AlertsReducer;
