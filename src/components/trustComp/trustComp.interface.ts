import { ReactNode } from "react";

export interface TrustCompTypes {
  icon: () => JSX.Element;
  title: string;
  description: string;
  subDescription?:string;
}
