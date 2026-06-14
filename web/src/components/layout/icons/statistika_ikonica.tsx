import React from "react";

export const StatistikaIkonica: React.FC<{ className: string }> = ({
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        .a {\n          fill: none;\n          stroke: currentColor;\n          stroke-linecap: round;\n          stroke-linejoin: round;\n          stroke-width: 1.5px;\n        }\n      ",
            }}
          />
        </defs>
        <line className="a" x1={2} x2={22} y1={20} y2={20} />
        <path
          className="a"
          d="M5,20V8.2A.2.2,0,0,1,5.2,8H7.8a.2.2,0,0,1,.2.2V20"
        />
        <path
          className="a"
          d="M11,20V4.26667C11,4.11939,11.08954,4,11.2,4h2.6c.11046,0,.2.11939.2.26667V20"
        />
        <path
          className="a"
          d="M17,20V11.15c0-.08284.08954-.15.2-.15h2.6c.11046,0,.2.06716.2.15V20"
        />
      </g>
    </svg>
  );
};
