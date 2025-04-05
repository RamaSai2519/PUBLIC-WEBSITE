/**
 * Button component that renders a customizable button.
 *
 * @component
 * @example
 * // Usage:
 * <Btn
 *   color="goldDark"
 *   isDisabled={false}
 *   isShadow={false}
 *   isRounded={false}
 *   isFullWidth={false}
 *   textColor="black"
 *   onClick={() => // console.log('Button clicked')}
 *   text="Submit"
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} [props.color='goldDark'] - The background color of the button.
 * @param {boolean} [props.isDisabled=false] - Whether the button is disabled.
 * @param {boolean} [props.isShadow=false] - Whether the button has a shadow.
 * @param {boolean} [props.isRounded=false] - Whether the button has rounded corners.
 * @param {boolean} [props.isFullWidth=false] - Whether the button should take up the full width.
 * @param {string} [props.textColor='black'] - The text color of the button.
 * @param {Function} [props.onClick=() => console.log('Button clicked')] - The click event handler for the button.
 * @param {string} [props.text='Submit'] - The text to display on the button.
 * @returns {JSX.Element} The rendered Button component.
 */

"use client";
import React, {  useEffect } from "react";
import Button from "@mui/material/Button";
import { sendGTMEvent } from "@next/third-parties/google";
import ReactGA from "react-ga4";
import appTheme from "@/theme";
import { ButtonProps } from "./button.interface";
import { sendGAEvent } from "@next/third-parties/google";
import { useAppSelector } from "@/store/hooks";
import ErrorBoundary from "../errorBoundry";
import cn from "classnames";
import { alpha } from "@/utils/helpers";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { BorderBottom } from "@mui/icons-material";

const Btn: React.FC<ButtonProps> = (props) => {
  const userInfo = useAppSelector((state) => state.authUserReducer.data);
  const {
    children,
    color = "goldDark",
    isDisabled = false,
    isShadow = false,
    isRounded = true,
    border,
    borderType,
    isFullWidth = false,
    textColor = "black",
    onClick = () => {
      trackEvent('button-clicked', { text: text })
      // console.log("Button clicked",text)
    },
    onFocus = () => console.log("Button Focus"),
    text = "Submit",
    fontSize,
    starIcon,
    endIcon,
    customClass,
    size = "medium",
    blur = false,
  } = props;

  // useEffect(() => {
  //   sendGTMEvent({
  //     event: "buttonClicked",
  //     value: `${text} - ${
  //       userInfo?._id
  //         ? userInfo?.name + " " + userInfo?.phoneNumber?.slice(6, 10)
  //         : "guest"
  //     }`,
  //   });
  //   ReactGA.event({
  //     category: "Button",
  //     action: "Clicked",
  //     dimension1: color,
  //     dimension2:text,
  //     label: `${text} ${color} button clicked`,
  //   });
  //   sendGAEvent("button", "Clicked", `${text} ${color} button clicked`);
  // }, []);

  const sizeClass = {
    "px-3 py-1 text-sm": size === "small",
    "px-5 py-2 text-[15px]": size === "medium",
    "px-7 py-3 text-base": size === "large",
    "backdrop-blur-lg": blur,
  };

  const styles = {
    backgroundColor: isDisabled
      ? appTheme.colors["lightGray"]
      : appTheme.colors[color],
    borderColor: border ||"#000",
    borderWidth: 2,
   
    borderLeftWidth: borderType === 'rounded'? "2px":  "0px",
    borderTopWidth: borderType === 'rounded'? "2px":  "0px",
    borderBottomWidth:borderType === 'rounded'? "2px":  "4px",
    borderRightWidth: borderType === 'rounded'? "2px":  "4px",
    borderBottomColor: border || "#000",
    borderRightColor: border ||  "#000",
    color: appTheme.colors[textColor],
    boxShadow: isShadow ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none",
    // borderRadius: "5px",
    ...(isRounded && { borderRadius: "10px" }),
    width: isFullWidth ? "100%" : "auto",
    fontSize: fontSize || 16,
    ...(blur && {
      backdropFilter: "blur(30px)",
      backgroundColor: alpha(appTheme.colors[color], 0.1),
      color: appTheme.colors[color],
      border: `1px solid ${appTheme.colors[color]}`,
    }),
  };

  const onClickAction = (e: any) => {
    try {
      sendGTMEvent({
        event: "buttonClicked",
        value: `${text} - ${userInfo?._id
          ? userInfo?.name + " " + userInfo?.phoneNumber?.slice(6, 10)
          : "guest"
          }`,
      });
      ReactGA.event(
        {
          category: 'Button',
          action: 'Clicked',
          label: `${text} ${color} button clicked`,
        },
        'button-clicked'
      );
      sendGAEvent("button", "Clicked", `${text} ${color} button clicked`);
    } catch (error) {

    }
    //@ts-ignore
    onClick(e);
  }

  return (
    <ErrorBoundary>
      <button
        disabled={isDisabled}
        className={cn("text-lg normal-case", sizeClass, customClass)}
        style={styles}
        onClick={(e: any) => onClickAction(e)}
      >
        {children ? children : <span className="flex items-center gap-2 text-sm justify-center">
          {starIcon}
          <span className={`font-normal  ${fontSize || 'text-base'}`} dangerouslySetInnerHTML={{ __html: text }} />
          {endIcon}
        </span>}
      </button>
    </ErrorBoundary>
  );
};

export default Btn;
