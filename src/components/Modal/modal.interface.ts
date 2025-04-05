import appTheme from "@/theme";
import { ReactNode } from "react";

export interface CustomModalProps {
  open: boolean;
  onClose?: () => void;
  fullScreen: boolean;
  children?: React.ReactNode;
  modalTitle?: string | ReactNode;
  name?: string;
  closable?: boolean;
  bgColor?: keyof typeof appTheme.colors;
  titleColor?: keyof typeof appTheme.colors;
  isFullWidth?: boolean;
  modalWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}
