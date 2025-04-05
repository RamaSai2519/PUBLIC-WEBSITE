import { useDispatch } from "react-redux";
import { alertsActions } from "./reducer";
import { useCallback } from "react";

export const useAlerts = () => {
  const dispatch = useDispatch();

  const setInfoMessage = useCallback(
    (message = "") => {
      dispatch(alertsActions.setInfoMessage(message));
    },
    [dispatch]
  );
  const setSuccessMessage = useCallback(
    (message = "") => {
      dispatch(alertsActions.setSuccessMessage(message));
    },
    [dispatch]
  );
  const setWarningMessage = useCallback(
    (message = "") => {
      dispatch(alertsActions.setWarningMessage(message));
    },
    [dispatch]
  );
  const setErrorMessage = useCallback(
    (message = "") => {
      dispatch(alertsActions.setErrorMessage(message));
    },
    [dispatch]
  );

  return {
    setInfoMessage,
    setSuccessMessage,
    setWarningMessage,
    setErrorMessage,
  };
};
