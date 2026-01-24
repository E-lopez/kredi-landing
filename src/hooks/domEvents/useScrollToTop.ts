export const useScrollToTop = () => {
  if (window && window !== undefined) {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default useScrollToTop;