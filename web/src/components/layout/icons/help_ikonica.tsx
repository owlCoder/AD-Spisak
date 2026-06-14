export const HelpIkonica:React.FC<{className?: string}> = ({className}) => {
    return (
      <>
        <svg 
        className={className ?? "absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5"}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M12 20H12.01"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M7 9C7 7.87439 7.37194 6.83566 7.99963 6C8.91184 4.78555 10.3642 4 12 4C14.7614 4 17 6.23858 17 9C17 11.4212 15.279 13.4405 12.9936 13.9013C12.4522 14.0104 12 14.4477 12 15V15V16"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />{" "}
  </g></svg>
      
      </>
    );
  };
  