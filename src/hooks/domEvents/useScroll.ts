import { useEffect, useRef, useState } from "react";

export function useScroll() {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrolledProp, setScrolledProp] = useState<number>(0);
  const [scrollDir, setScrollDir] = useState<boolean>(false);

  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const threshold = 0;

  // Debounced scroll handler
  const handleScroll = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    }, 10); // 20ms debounce, adjust as needed
  };

  // Animation frame update
  const updateScroll = () => {
    const scrollY = window.scrollY;
    const { height: bodyHeight } = document.body.getBoundingClientRect();

    setScrollTop(scrollY);
    setScrolledProp(scrollY / bodyHeight);

    if (Math.abs(scrollY - lastScrollY.current) > threshold) {
      setScrollDir(scrollY < lastScrollY.current);
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    }
    ticking.current = false;
  };

  // Smooth scroll speed adjustment
  const scrollSpeed = 0.5;
  const adjustSpeed = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const scrollPosition = window.scrollY + delta * scrollSpeed;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", adjustSpeed, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", adjustSpeed);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return {
    scrollTop,
    scrollDir,
    scrolledProp,
  };
}