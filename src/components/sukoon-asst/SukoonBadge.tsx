import React from "react";

const SukoonBadge = () => {
  return (
    <span
      style={{
        position: "absolute",
        top: -8,
        right: 20,
        zIndex: 100,
      }}
    >
      <svg
        width="42"
        height="46"
        viewBox="0 0 42 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 8L9 0L8.25 8H0Z" fill="url(#paint0_linear_177_17921)" />
        <path
          d="M8 1C8 0.447715 8.44772 0 9 0H41C41.5523 0 42 0.447715 42 1V44.5119C42 45.2223 41.28 45.7062 40.6222 45.4378L25.3778 39.2176C25.1356 39.1188 24.8644 39.1188 24.6222 39.2176L9.37779 45.4378C8.72002 45.7062 8 45.2223 8 44.5119V9.49206V1Z"
          fill="url(#paint1_linear_177_17921)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_177_17921"
            x1="8.25"
            y1="4.61539"
            x2="-0.00184252"
            y2="4.36955"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFC629" />
            <stop offset="1" stopColor="#FFE18D" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_177_17921"
            x1="25"
            y1="0"
            x2="25"
            y2="46"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFE18E" />
            <stop offset="1" stopColor="#FFC629" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
};

export default SukoonBadge;
