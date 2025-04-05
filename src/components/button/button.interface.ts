import appTheme from "@/theme";

export interface ButtonProps {
  onClick?: () => void;
  onFocus?: () => void;
  color?: keyof typeof appTheme.colors;
  text?: string;
  textColor?: keyof typeof appTheme.colors;
  isShadow?: boolean;
  isRounded?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  href?: string;
  fontSize?: 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl | any';
  starIcon?: JSX.Element;
  endIcon?: JSX.Element;
  customClass?: string;
  border?: keyof typeof appTheme.colors;
  borderType?: "rounded" | "3d";
  size?: "small" | "medium" | "large";
  blur?: boolean;
  children?: React.ReactNode;
}
