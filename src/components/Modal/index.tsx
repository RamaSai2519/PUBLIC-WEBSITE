import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { CustomModalProps } from "./modal.interface";
import LazyLoad from "../lazyLoad";
import { Close } from "@mui/icons-material";

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const {
    open = false,
    onClose = () => console.log("Please pass onClose"),
    fullScreen = false,
    children = <></>,
    name = "no-name-passed",
    titleColor = "black",
    modalTitle = "",
    bgColor = "primaryYellow",
    isFullWidth = false,
    modalWidth: width = "md",
  } = props;
  const [isFullScreen, setIsFullScreen] = useState(fullScreen);

  const handleClose = () => {
    onClose();
  };
  
  return (
    <LazyLoad>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isFullScreen}
        fullWidth={isFullWidth}
        maxWidth={width}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <Close />
        </IconButton>
        <div onClick={handleClose} className={
          `flex justify-center items-center text-${titleColor} bg-${bgColor}`}>
          <h3 className="text-xl sm:text-2xl font-bold"> {modalTitle}</h3>
        </div>
        <div
          className={
            `bg-${bgColor} modal-content ${isFullScreen ? "fullscreen" : ""
            }`}
        >
          {open && (
            <div className="modal-inner-content">
              {fullScreen ? (
                <div className="fullscreen-content">
                  {isFullScreen ? <div>{children}</div> : <div>{children}</div>}
                </div>
              ) : (
                <div>{children}</div>
              )}
            </div>
          )}
        </div>
      </Dialog>
    </LazyLoad>
  );
};

export default CustomModal;
