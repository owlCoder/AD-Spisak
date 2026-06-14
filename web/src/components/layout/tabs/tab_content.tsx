interface TabContentProps {
  children: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ children }) => (
  <div className="bg-white/50 backdrop-blur-lg shadow-md border-[1.15px] border-primary-400/60 rounded-xl">
    {children}
  </div>
);
