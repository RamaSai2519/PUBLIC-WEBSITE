import React, { useState } from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";

interface DropdownOption {
  key: string;
  title: string;
}

interface CustomDropdownProps {
  selectedCat: DropdownOption;
  setSelectedCat: (cat: DropdownOption) => void;
  options: DropdownOption[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ selectedCat, setSelectedCat, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (cat: DropdownOption) => {
    setSelectedCat(cat);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <button
        className="flex items-center px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedCat.title} <ArrowDropDownOutlined className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <ul className="py-1">
            {options.map((cat) => (
              <li
                key={cat.key}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(cat)}
              >
                {cat.title}
              </li>
            ))}
            <li
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect({ key: "all", title: "All" })}
            >
              ALL
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
