export const SearchIkonica:React.FC<{className?: string}> = ({className}) => {
  return (
    <>
      <svg 
      className={className ?? "absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5"}
      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracurrentColorerCarrier"
          stroke-linecurrentcap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_icurrentColoronCarrier">
          {" "}
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="currentColor"
            strokeWidth={2}
            stroke-linecurrentcap="round"
            strokeLinejoin="round"
          />{" "}
        </g>
      </svg>
    </>
  );
};
