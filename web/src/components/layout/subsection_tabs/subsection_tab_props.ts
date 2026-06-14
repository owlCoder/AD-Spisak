export interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export interface TabContentProps {
  isActive: boolean;
  children: React.ReactNode;
}
