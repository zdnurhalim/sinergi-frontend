import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas setiap kali route berubah
    window.scrollTo({ top: 0, behavior: "auto" }); // "auto" = langsung, tanpa smooth
  }, [pathname]);

  return null;
};

export default ScrollToTop;
