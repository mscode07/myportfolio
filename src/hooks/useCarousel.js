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

export function useCarousel(items, autoPlay = false, circular = false) {
  const looping = circular && items.length > 1;
  const track = useRef(null);
  const region = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    function updatePosition() {
      const { step, maxScroll } = measureTrack(element);
      if (looping && step > 0) {
        setPages(items.length);
        setPage(((Math.round(element.scrollLeft / step) % items.length) + items.length) % items.length);
        return;
      }
      const lastPage = step > 0 && maxScroll >= SCROLL_TOLERANCE
        ? Math.ceil((maxScroll - SCROLL_TOLERANCE) / step)
        : 0;

      setPages(lastPage + 1);
      setPage(lastPage === 0 ? 0 : Math.min(Math.round(element.scrollLeft / step), lastPage));
    }

    // Three identical sets let the last episode slide into the first. Recenter
    // only after scrolling settles, on visually identical cards (no rewind).
    function recenter() {
      if (!looping) return;
      const { step } = measureTrack(element);
      const span = step * items.length;
      if (span && (element.scrollLeft < span || element.scrollLeft >= span * 2)) {
        element.scrollTo({ left: span + ((element.scrollLeft % span) + span) % span, behavior: "instant" });
      }
    }
    let settleTimer;
    const settle = () => { clearTimeout(settleTimer); settleTimer = setTimeout(recenter, 150); };
    function resize() {
      if (looping) element.scrollTo({ left: measureTrack(element).step * items.length, behavior: "instant" });
      updatePosition();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    element.addEventListener("scroll", updatePosition, { passive: true });
    element.addEventListener("scroll", settle, { passive: true });
    resize();

    return () => {
      observer.disconnect();
      clearTimeout(settleTimer);
      element.removeEventListener("scroll", settle);
      element.removeEventListener("scroll", updatePosition);
    };
  }, [items, looping]);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = track.current;
    const container = region.current;
    if (!autoPlay || paused || reducedMotion || pages < 2 || !element || !container) return;

    let visible = false;
    let hovered = false;
    let timer;
    const stop = () => clearTimeout(timer);
    const schedule = () => {
      stop();
      if (!visible || hovered || document.hidden || container.contains(document.activeElement)) return;
      timer = setTimeout(() => {
        const { step, maxScroll } = measureTrack(element);
        element.scrollTo({
          left: looping ? element.scrollLeft + step : element.scrollLeft >= maxScroll - SCROLL_TOLERANCE
            ? 0
            : Math.min(element.scrollLeft + step, maxScroll),
          behavior: "smooth",
        });
        schedule();
      }, 5000);
    };
    const enter = (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = true;
      stop();
    };
    const leave = () => { hovered = false; schedule(); };
    // Keyboard and touch interaction stop rotation until explicitly resumed.
    const interact = () => setPaused(true);
    const focus = (event) => {
      stop();
      if (element.contains(event.target)) setPaused(true);
    };
    const blur = () => queueMicrotask(schedule);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }, { threshold: 0.25 });
    observer.observe(element);
    container.addEventListener("pointerenter", enter);
    container.addEventListener("pointerleave", leave);
    element.addEventListener("pointerdown", interact);
    container.addEventListener("focusin", focus);
    container.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      stop();
      observer.disconnect();
      container.removeEventListener("pointerenter", enter);
      container.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointerdown", interact);
      container.removeEventListener("focusin", focus);
      container.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [autoPlay, paused, reducedMotion, pages, items, looping]);

  function goToPage(index) {
    const element = track.current;
    if (!element) return;

    const { step, maxScroll } = measureTrack(element);
    const current = Math.round(element.scrollLeft / step);
    const logical = ((current % items.length) + items.length) % items.length;
    element.scrollTo({
      left: looping ? (current + index - logical) * step : Math.max(0, Math.min(index * step, maxScroll)),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return { track, region, page, pages, goToPage, paused, setPaused, reducedMotion };
}
