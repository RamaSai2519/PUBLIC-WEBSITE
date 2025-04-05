import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoginModal {
  showLoginModal: "now" | "schedule" | boolean;
  isPaid?: boolean,
  modalHeading?: string,
  modalSubHeading?: string,
  modalDescription?: string,
  nextStep?: any
}

const initialState: LoginModal = {
  showLoginModal: false,
  modalHeading: "WELCOME",
  modalSubHeading: "We are happy to see you!",
  modalDescription: "You are one step away from joining India’s most caring and loved community of Seniors. "
};

const loginModalReducer = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    enableLoginModal: (state, action: PayloadAction<LoginModal>) => {

      return {
        showLoginModal: action.payload.showLoginModal,
        isPaid: action.payload.isPaid || false,
        nextStep: action.payload.nextStep || false,
        modalHeading: action.payload.modalHeading || initialState.modalHeading,
        modalSubHeading: action.payload.modalSubHeading || initialState.modalSubHeading,
        modalDescription: action.payload.modalDescription || initialState.modalDescription,
      }

    },
    disableLoginModal: (state) => {
      return {
        showLoginModal: false,
        isPaid: state.isPaid || false,
        nextStep: false
      }
    },
  },
});

export const { enableLoginModal, disableLoginModal } =
  loginModalReducer.actions;
export default loginModalReducer.reducer;
