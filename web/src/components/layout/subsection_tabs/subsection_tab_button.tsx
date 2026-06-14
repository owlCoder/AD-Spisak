import { TabButtonProps } from "./subsection_tab_props";

const SubsectionTabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  icon,
  children,
  fullWidth,
}) => (
  <button
    onClick={onClick}
    className={`
        py-2 px-4 text-sm font-medium duration-700 transition-opacity
        rounded-lg flex items-center gap-2 mb-0.5 relative
        ${fullWidth ? "w-full justify-center" : ""}
        ${
          isActive
            ? "text-primary-700"
            : "text-primary-600 hover:bg-primary-100"
        }
        after:absolute after:bottom-0 after:left-0 after:w-full 
        after:h-0.5 after:bg-primary-700 
        ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
      `}
    type="button"
    role="tab"
    aria-selected={isActive}
  >
    {icon && (
      <span
        className={`w-5 h-5 ${
          isActive ? "text-primary-700" : "text-primary-600"
        }`}
      >
        {icon}
      </span>
    )}
    {children}
  </button>
);

export default SubsectionTabButton;
