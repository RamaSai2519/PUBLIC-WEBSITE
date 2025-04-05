import { useAppDispatch } from "@/store/hooks";
import { disableLoginModal } from "@/store/slices/loginModalSlice";
import { useAppSelector } from "@/store/store";
import { Modal } from "antd";
import React, { useId } from "react";
import { CustomModalProps } from "./modal.interface";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Logo from "../logo";
import BottomSheet from "../bottomsheet";
import useDeviceType from "@/hooks/useDeviceType";
import GenModal from "../GenericModal/GenericModal";

const SigninModal: React.FC<CustomModalProps> = ({ children, ...props }) => {
  const dispatcher = useAppDispatch();
  const { isMobile } = useDeviceType();
  const uniqueId = useId();
  const {
    open = false,
    onClose = () =>
      // console.log("Please pass onClose"),
      (children = <></>),
    name = "no-name-passed",
    titleColor = "black",
    modalTitle = "",
    bgColor = "primaryYellow",
    closable = true,
  } = props;

  const closeModal = useAppSelector((state) => state.loginModal.showLoginModal);
  const handleClose = () => {
    dispatcher(disableLoginModal());
    onClose();
  };
  return !isMobile ? (
    <GenModal onClose={handleClose} show={closeModal ? true : false}>
      <div className="flex justify-between items-center">
        <span className="w-16">
          <Logo />
        </span>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>

      <div key={uniqueId} className={`bg-${bgColor} modal-content `}>
        {open && (
          <div key={uniqueId} className="modal-inner-content">
            <div key={uniqueId}>{children}</div>
          </div>
        )}
      </div>
    </GenModal>
  ) : (
    <BottomSheet isOpen={closeModal} onClose={handleClose}>
      <div className="flex justify-between items-center">
        <span className="w-16">
          <Logo />
        </span>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>

      <div key={uniqueId} className={`bg-${bgColor} modal-content `}>
        {open && (
          <div key={uniqueId} className="modal-inner-content">
            <div key={uniqueId}>{children}</div>
          </div>
        )}
      </div>
    </BottomSheet>
  );
};

export default SigninModal;
