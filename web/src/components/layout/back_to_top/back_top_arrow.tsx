import { useState, useEffect } from "react";
import { StrelicaGore } from "../icons/strelica_gore_ikonica";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-primary-700 hover:bg-primary-700 text-white 
                       rounded-full p-2.5 shadow-lg transition-all duration-300 
                       hover:scale-110 hover:shadow-xl focus:outline-hidden"
          aria-label="Scroll to top"
        >
          <StrelicaGore className="w-6 h-6 rounded-full -mt-1 md:-mt-2 inline" />
        </button>
      )}
    </>
  );
};
