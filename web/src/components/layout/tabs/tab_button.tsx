import React from "react";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  children,
  icon,
  fullWidth = false,
}) => (
  <button
    onClick={onClick}
    className={`
      py-2 px-4 text-sm font-medium transition-all duration-200
      rounded-lg flex items-center gap-2
      ${fullWidth ? "w-full justify-center" : ""}
      ${
        isActive
          ? "bg-primary-700/85 text-white shadow-md"
          : "text-primary-600 hover:bg-primary-100"
      }
    `}
    type="button"
    role="tab"
    aria-selected={isActive}
  >
    {icon && (
      <span
        className={`w-5 h-5 ${isActive ? "text-white" : "text-primary-600"}`}
      >
        {icon}
      </span>
    )}
    {children}
  </button>
);
