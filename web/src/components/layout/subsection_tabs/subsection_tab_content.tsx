import { TabContentProps } from "./subsection_tab_props";

const SubsectionTabContent: React.FC<TabContentProps> = ({
  isActive,
  children,
}) => (
  <div
    className={`
       bg-primary-50/70 transform transition-all duration-300
        ${
          isActive
            ? "relative translate-x-0 opacity-100"
            : "absolute inset-0 translate-x-8 opacity-0 pointer-events-none"
        }
      `}
  >
    {children}
  </div>
);

export default SubsectionTabContent;
