"use client";
import {
  Alert as MuiAlert,
  Slide,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useAlerts } from "../../store/slices/Alerts/action";
import { useAppSelector } from "@/store/store";

const Alert = () => {
  const state = useAppSelector((state: any) => state.alerts);
  const anchorOrigin: SnackbarOrigin = {
    horizontal: "right",
    vertical: "bottom",
  };
  const {
    setInfoMessage,
    setSuccessMessage,
    setWarningMessage,
    setErrorMessage,
  } = useAlerts();
  return (
    <>
      {/* INFO */}
      <Slide
        direction="up"
        in={Boolean(state.infoMessage)}
        mountOnEnter
        unmountOnExit
      >
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={Boolean(state.infoMessage)}
          autoHideDuration={3000}
          onClose={() => {
            setInfoMessage("");
          }}
        >
          <MuiAlert
            onClose={() => {
              setInfoMessage("");
            }}
            severity="info"
            variant="standard"
          >
            {state.infoMessage}
          </MuiAlert>
        </Snackbar>
      </Slide>
      {/* SUCCESS */}
      <Slide
        direction="up"
        in={Boolean(state.successMessage)}
        mountOnEnter
        unmountOnExit
      >
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={Boolean(state.successMessage)}
          autoHideDuration={3000}
          onClose={() => {
            setSuccessMessage("");
          }}
        >
          <MuiAlert
            onClose={() => {
              setSuccessMessage("");
            }}
            severity="success"
            variant="standard"
          >
            {state.successMessage}
          </MuiAlert>
        </Snackbar>
      </Slide>
      {/* WARNING */}
      <Slide
        direction="up"
        in={Boolean(state.warningMessage)}
        mountOnEnter
        unmountOnExit
      >
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={Boolean(state.warningMessage)}
          autoHideDuration={3000}
          onClose={() => {
            setWarningMessage("");
          }}
        >
          <MuiAlert
            onClose={() => {
              setWarningMessage("");
            }}
            severity="warning"
            variant="standard"
          >
            {state.warningMessage}
          </MuiAlert>
        </Snackbar>
      </Slide>
      {/* ERROR */}
      <Slide
        direction="up"
        in={Boolean(state.errorMessage)}
        mountOnEnter
        unmountOnExit
      >
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={Boolean(state.errorMessage)}
          autoHideDuration={3000}
          onClose={() => {
            setErrorMessage("");
          }}
        >
          <MuiAlert
            onClose={() => {
              setErrorMessage("");
            }}
            severity="error"
            variant="standard"
          >
            {state.errorMessage}
          </MuiAlert>
        </Snackbar>
      </Slide>
    </>
  );
};

export default Alert;
