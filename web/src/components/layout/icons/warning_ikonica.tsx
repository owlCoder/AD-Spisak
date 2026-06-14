import React from "react";

export const WarningIkonica: React.FC<{ className: string }> = ({ className }) => {
  return (
    <>
      <svg className={className} fill="currentColor" viewBox="0 0 1920 1920">
        <path
          d="M933.974 1477.394c-122.027 0-221.303 99.276-221.303 221.303S811.947 1920 933.974 1920s221.303-99.276 221.303-221.303-99.276-221.303-221.303-221.303zM1227.948 0H640l143.188 1298.171h301.572z"
          fillRule="evenodd"
        />
      </svg>
    </>
  );
};
