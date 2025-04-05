import {
  Autocomplete,
  Checkbox,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import appTheme from "@/theme";
import { Close } from "@mui/icons-material";

interface CheckDropDownProps {
  data: string[];
  placeholder?: string;
}

const CheckDropDown: React.FC<CheckDropDownProps> = (props) => {
  const { data = [], placeholder } = props;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div>
      <Autocomplete
        multiple
        options={data}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props} className="font-lightFont pb-4 cursor-pointer">
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                sx={{
                  color: "lightgray",
                  "&.Mui-checked": {
                    color: appTheme.colors.primaryYellow,
                  },
                }}
              />
              {option}
              <hr className="w-[97%] mx-auto h-[1px] border-none bg-gray-200" />
            </li>
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const tagProps = getTagProps({ index });
            return (
              <span
                
                {...tagProps}
                className="flex items-center gap-1 bg-primaryYellow/20 border border-primaryYellow rounded-lg pl-4 pr-1 py-0.5 mr-2"
                key={index}
              >
                {option}
                <IconButton size="small" onClick={tagProps?.onDelete}>
                  <Close sx={{ width: 20, height: 20 }} />
                </IconButton>
              </span>
            );
          })
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={placeholder || "Placeholder"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "gray",
                  },
                input: {
                  "&::placeholder": {
                    fontWeight: 200,
                    opacity: 0.3,
                  },
                },
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default CheckDropDown;
