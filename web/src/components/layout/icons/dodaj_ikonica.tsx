export const DodajIkonica: React.FC<{ className: string }> = ({
  className,
}) => {
  return (
    <>
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>
      </svg>
    </>
  );
};
