import { useEffect, useRef, useState } from "react";
import { useCarousel } from "../hooks/useCarousel.js";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  ImageBroken,
} from "@phosphor-icons/react";

export function Carousel({ items, label, columns = 3 }) {
  const { track, page, pages, goToPage } = useCarousel(items);
  const [failed, setFailed] = useState({});
  const [sample, setSample] = useState(null);
  const closeButton = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    if (!sample) return;
    closeButton.current?.focus();
    const handle = (e) => {
      if (e.key === "Escape") {
        setSample(null);
        opener.current?.focus();
      }
      if (e.key === "Tab") e.preventDefault();
    };
    document.addEventListener("keydown", handle);
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = before;
    };
  }, [sample]);
  const dismiss = () => {
    setSample(null);
    opener.current?.focus();
  };
  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={track}
        className={`video-track ${columns === 2 ? "podcast-track" : ""}`}
        tabIndex={0}
        aria-label={`${label}, scroll to browse`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            goToPage(
              Math.max(
                0,
                Math.min(pages - 1, page + (e.key === "ArrowRight" ? 1 : -1)),
              ),
            );
          }
        }}
      >
        {items.map((item, i) => {
          const id = item.id || item.key;
          const image = item.id
            ? `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`
            : item.image;
          const contents = (
            <>
              <div className="thumbnail relative aspect-video overflow-hidden rounded-md border border-line bg-surface">
                {!failed[id] ? (
                  <img
                    src={image}
                    alt=""
                    width="640"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={
                      item.sample && columns === 3
                        ? { objectPosition: `${25 + i * 20}% center` }
                        : undefined
                    }
                    onError={() => setFailed((s) => ({ ...s, [id]: true }))}
                  />
                ) : (
                  <div className="grid h-full place-items-center text-muted">
                    <ImageBroken size={32} aria-label="Preview unavailable" />
                  </div>
                )}
                <span className="play-button absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-black/35 text-white backdrop-blur-sm">
                  <Play size={19} weight="fill" className="ml-0.5" />
                </span>
                {item.sample && (
                  <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                    Preview
                  </span>
                )}
              </div>
              <span className="mt-3 flex items-start justify-between gap-3 text-[15px] font-medium leading-snug sm:text-base">
                {item.title}
                <ArrowUpRight
                  className="mt-0.5 shrink-0 text-muted"
                  size={17}
                />
              </span>
            </>
          );
          return (
            <div
              className="video-item"
              key={id}
              role="group"
              aria-label={`${i + 1} of ${items.length}`}
            >
              {item.id ? (
                <a
                  href={`https://www.youtube.com/watch?v=${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link group block"
                  aria-label={`Watch ${item.title} on YouTube (opens in a new tab)`}
                >
                  {contents}
                </a>
              ) : (
                <button
                  className="video-link group block w-full text-left"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setSample(item);
                  }}
                  aria-label={`Preview ${item.title}`}
                >
                  {contents}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 grid min-h-11 grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:grid-cols-[1fr_auto_auto]">
        <p className="col-span-2 font-mono text-[10px] leading-relaxed tracking-wide text-muted sm:col-span-1 sm:text-xs">
          {items.every((i) => i.sample)
            ? "Sample previews · your videos will live here"
            : "Select a video to watch on YouTube"}
          <ArrowUpRight size={12} className="ml-1 inline" />
        </p>
        <div className="flex items-center gap-1" aria-label={`${label} slides`}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className="grid size-8 place-items-center"
              aria-label={`Show ${label} position ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
            >
              <span
                className={`size-1.5 rounded-full ${i === page ? "bg-accent" : "bg-muted/40"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goToPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="round-button"
            aria-label={`Previous ${label}`}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => goToPage(Math.min(pages - 1, page + 1))}
            disabled={page >= pages - 1}
            className="round-button"
            aria-label={`Next ${label}`}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      {sample && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={dismiss}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
            className="w-full max-w-md rounded-xl border border-line bg-surface p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow">Design preview</p>
            <h3
              id="preview-title"
              className="mt-3 font-display text-3xl font-bold"
            >
              {sample.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">
              This is a sample thumbnail. Your published video will open
              directly on YouTube when its link is added.
            </p>
            <button
              ref={closeButton}
              onClick={dismiss}
              className="mt-6 min-h-11 rounded-md bg-ink px-5 font-medium text-page"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
