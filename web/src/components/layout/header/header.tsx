import { useNavigate } from "react-router-dom";
import { OdjavaIkonica } from "../icons/odjava_ikonica";

interface HeaderProps {
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSignOut }) => {
  const navigate = useNavigate();

  return (
    <div className="flex  justify-between items-center pb-8">
      <div
        className="flex space-x-4 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/uns.png"
          alt="UNS Logo"
          className="h-18 w-auto opacity-80"
        />
        <img
          src="/ftn.png"
          alt="FTN Logo"
          className="h-18 w-auto opacity-80"
        />
      </div>
      <button
        className="bg-primary-800/80 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl 
                 hover:translate-y-0.5 hover:bg-primary-800/90 
                 active:translate-y-0 active:shadow-none 
                 transition-all duration-300 focus:outline-hidden focus:ring-2 
                 focus:ring-primary-400 focus:border-transparent"
        onClick={onSignOut}
      >
        <OdjavaIkonica /> Odjava
      </button>
    </div>
  );
};
