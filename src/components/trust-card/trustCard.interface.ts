import appTheme from "@/theme";
import React, { ReactElement, ReactNode } from "react";

export type TrustCardProps = {
  title: string;
  Icon: ReactNode;
  description: string;
  variant?: "vertical" | "horizontal";
  isFullWidth?: boolean;
  color?: keyof typeof appTheme.colors;
  isShadow?: boolean;
};
