interface TabsContainerProps {
  children: React.ReactNode;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({ children }) => (
  <div
    className="flex flex-col sm:flex-row flex-wrap gap-2 mb-6 p-2 bg-white/50 backdrop-blur-lg shadow-md border-[1.15px] border-primary-400/60 rounded-xl"
    role="tablist"
    aria-label="Student Profile Sections"
  >
    {children}
  </div>
);
