import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
  className?: string;
  text?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "primary",
  className = "",
  text,
}) => {
  // Size mappings
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  // Variant mappings
  const variantClasses = {
    primary: "border-primary-200 border-t-primary-600",
    white: "border-white/30 border-t-white",
  };

  return (
    <div className={`flex flex-col items-center py-2 gap-3 ${className}`}>
      <div
        className={`
          animate-spin rounded-full
          ${sizeClasses[size]}
          ${variantClasses[variant]}
        `}
      />
      {text && (
        <span
          className={`
          text-sm font-medium
          ${variant === "white" ? "text-white" : "text-primary-700"}
        `}
        >
          {text}
        </span>
      )}
    </div>
  );
};

// Loading overlay component for full-screen or container loading states
interface LoadingOverlayProps {
  text?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  text = "Učitavanje...",
  fullScreen = false,
}) => {
  const containerClasses = fullScreen ? "fixed inset-0" : "absolute inset-0";

  return (
    <div
      className={`
      ${containerClasses}
      flex items-center justify-center
      bg-black/5 backdrop-blur-xs
      z-50
    `}
    >
      <Spinner size="lg" variant="primary" text={text} />
    </div>
  );
};
