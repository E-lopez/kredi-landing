import { mediaQuery } from "@/models/types/mediaQuerie";
import { useMemo } from "react";

export function useMatchMedia() {
  const query: mediaQuery = useMemo(() => {
    const viewportWidth = window.innerWidth;
    switch(true) {
      case viewportWidth <= 320:
        return 'xs';
      case viewportWidth > 320 && viewportWidth <= 425 :
        return 'sm';
      case viewportWidth > 425 && viewportWidth <= 768:
        return 'md';
      case viewportWidth > 768 && viewportWidth <= 1024:
        return 'lg';
      case viewportWidth > 1024:
        return 'xl';
       default:
        return 'sm' 
    }
  }, [window.innerWidth])
  
  return {
    query,
  }
}