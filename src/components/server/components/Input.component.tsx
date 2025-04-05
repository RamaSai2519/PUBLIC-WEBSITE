import React from 'react';

interface AnimatedInputProps {
  type: 'text' | 'tel'; // Specifies the type of input
  label: string; // Label for the input field
  name: string; // Name attribute for the input field
  prefix?: string; // Optional prefix (e.g., "+91" for phone numbers)
  value?: string; // Default value for the input field
  required?: boolean; // Whether the input is required
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  type,
  label,
  name,
  prefix,
  value = '',
  required = false,
}) => {
  return (
    <div className="relative w-full">
      Label
      <label
        htmlFor={name}
        className={`absolute left-3 top-3 text-gray-500 transition-all duration-200 ${
          value
            ? 'text-sm -top-2.5 bg-white px-1 text-gray-700'
            : 'text-base top-3'
        }`}
      >
        {label}
      </label>

      {/* Input container */}
      <div
        className={`flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50 focus-within:border-black focus-within:ring-1 focus-within:ring-black`}
      >
        {prefix && (
          <span className="text-gray-500 font-medium text-sm px-2 border-r border-gray-300">
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          id={name}
          defaultValue={value}
          required={required}
          className="flex-1 outline-none px-3 bg-transparent text-black text-base font-medium"
        />
      </div>
    </div>
  );
};

export default AnimatedInput;
