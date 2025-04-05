import React from "react";
import { MaxWidthWrapperProps } from "./maxWidthWrapper.interface";

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = (props) => {
  const { children } = props;
  return <div className="w-full md:max-w-7xl mx-auto">{children}</div>;
};

export default MaxWidthWrapper;
