import { Box, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { InputProps } from "./input.interface";
import Label from "../label";
import appTheme from "@/theme";

const Input: React.FC<InputProps> = ({
  label,
  labelColor = "#fff",
  labelSize,
  //   variant = "filled",
  ...props
}) => {
  return (
    <Box width={"100%"}>
      <Label labelColor={labelColor} labelSize={labelSize}>
        {label}
      </Label>
      <TextField
        {...props}
        variant="outlined"
        size="small"
        fullWidth
        inputProps={{
          style: { fontSize: 18 },
        }}
        sx={{
          bgcolor: "#fff",
          borderRadius: "12px",
          //   bgcolor: variant === "filled" ? "gray.white" : "transparent",

          "& .MuiOutlinedInput-root": {
            height: props.multiline ? null : 45,
            "& fieldset": {
              borderRadius: "12px",
              borderColor: appTheme.colors.lightGray,
              fontSize: 18,
            },
            "&:hover fieldset": {
              borderColor: appTheme.colors.lightGray,
            },
            "&.Mui-focused fieldset": {
              border: "2px solid",
              borderColor: appTheme.colors.yellow,
            },
            "&.Mui-error fieldset": {
              borderColor: "red",
              backgroundColor: "red",
            },
          },

          "& input::placeholder": {
            fontSize: "18px",
            fontWeight: "500",
          },
        }}
      />
    </Box>
  );
};

export default Input;
