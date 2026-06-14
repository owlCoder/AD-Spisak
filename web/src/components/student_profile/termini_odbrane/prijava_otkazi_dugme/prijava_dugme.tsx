export const PrijavaOdjavaButton = ({
  onClick,
  variant = "primary",
  icon,
  children,
}: {
  onClick: () => void;
  variant?: "primary" | "danger";
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const baseClasses =
    "flex items-center gap-2 py-1.5 px-3 md:py-2 md:px-4 text-white text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl hover:translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-300 focus:outline-hidden focus:ring-2 text-wrap";
  const variantClasses = {
    primary: "bg-primary-700/85 hover:bg-primary-700/95 focus:ring-primary-700",
    danger: "bg-red-700/85 hover:bg-red-700/95 focus:ring-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {icon}
      {children}
    </button>
  );
};
