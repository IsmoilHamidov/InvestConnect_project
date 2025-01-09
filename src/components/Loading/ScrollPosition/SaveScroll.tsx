import { useEffect } from "react";


const ScrollPositionManager = () => {
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition)); 
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString()); 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default ScrollPositionManager;
