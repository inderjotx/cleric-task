import { useState, useEffect } from "react";
const SCROLL_THRESHOLD = 50;

export function useScrollDetection(threshold: number = SCROLL_THRESHOLD) {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > threshold);
      };
  
      // Check initial scroll position
      handleScroll();
  
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);
  
    return isScrolled;
  }