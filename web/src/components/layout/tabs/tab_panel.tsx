interface TabPanelProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ isActive, children }) => (
  <div
    className={`
        transition-opacity duration-700 
        ${isActive ? "block opacity-100" : "hidden opacity-0"}
      `}
    role="tabpanel"
    aria-hidden={!isActive}
  >
    {children}
  </div>
);
