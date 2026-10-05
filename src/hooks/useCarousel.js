import { useEffect, useRef, useState } from "react";

// Browsers round scroll positions, so allow two pixels at the end of the track.
const SCROLL_TOLERANCE = 2;

function measureTrack(track) {
  const firstCard = track.firstElementChild;
  const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return {
    step: cardWidth + gap,
    maxScroll: Math.max(0, track.scrollWidth - track.clientWidth),
  };
}

export function useCarousel(items) {
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    function updatePosition() {
      const { step, maxScroll } = measureTrack(element);
      const lastPage = step > 0 && maxScroll >= SCROLL_TOLERANCE
        ? Math.ceil((maxScroll - SCROLL_TOLERANCE) / step)
        : 0;

      setPages(lastPage + 1);
      setPage(lastPage === 0 ? 0 : Math.min(Math.round(element.scrollLeft / step), lastPage));
    }

    const observer = new ResizeObserver(updatePosition);
    observer.observe(element);
    element.addEventListener("scroll", updatePosition, { passive: true });
    updatePosition();

    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", updatePosition);
    };
  }, [items]);

  function goToPage(index) {
    const element = track.current;
    if (!element) return;

    const { step, maxScroll } = measureTrack(element);
    element.scrollTo({
      left: Math.max(0, Math.min(index * step, maxScroll)),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return { track, page, pages, goToPage };
}
