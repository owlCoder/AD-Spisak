import React from "react";

export const ChecklistaIkonica: React.FC<{ className: string }> = ({
  className,
}) => {
  return (
    <>
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M2 5.5L3.21429 7L7.5 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M2 12.5L3.21429 14L7.5 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M2 19.5L3.21429 21L7.5 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M22 12H17M12 12H13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />{" "}
          <path
            d="M12 19H17M20.5 19H22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />{" "}
          <path
            d="M22 5L12 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />{" "}
        </g>
      </svg>
    </>
  );
};
