export const scrollToTop = () => {
  const container = document.querySelector(".ScrollbarsCustom-Scroller");

  if (container) {
    container.scrollTo({ top: 0, behavior: "smooth" });
  }
};
