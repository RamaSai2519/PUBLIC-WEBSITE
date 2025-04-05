import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SaarthiList } from "../api/interface";

interface SaarthiState {
  selectedSaarthi: SaarthiList | undefined;
  callDialog: "now" | "schedule" | null;
}

const initialState: SaarthiState = {
  selectedSaarthi: undefined,
  callDialog: null,
};
const saarthiSlice = createSlice({
  name: "saarthi",
  initialState,
  reducers: {
    setSelectedSaarthi: (state, action) => {
      state.selectedSaarthi = action.payload;
    },
    setCallDialog: (
      state,
      action: PayloadAction<"now" | "schedule" | null>
    ) => {
      state.callDialog = action.payload;
    },
  },
});

export const { setSelectedSaarthi, setCallDialog } = saarthiSlice.actions;
export default saarthiSlice.reducer;
