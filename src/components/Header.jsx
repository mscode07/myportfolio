import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sun, Moon, List, X } from "@phosphor-icons/react";

const navigation = [
  ["Work", "/#work"],
  ["Blog", "/blog/"],
  ["Videos", "/#videos"],
  ["Podcast", "/#podcast"],
  ["About", "/#about"],
];
export function Header({ path }) {
  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);
  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  const toggle = () => {
    const value = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = value;
    setTheme(value);
    try {
      localStorage.setItem("portfolio-theme", value);
    } catch {}
  };
  return (
    <header className="site-header border-b border-transparent">
      <div className="shell flex min-h-24 items-center justify-between gap-5">
        <a
          href="/"
          className="brand py-3 text-sm font-bold tracking-[0.25em]"
          aria-label="mscode07, home"
        >
          mscode07
        </a>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {navigation.map(([title, href]) => (
              <a
                key={title}
                href={href}
                className="nav-link"
                aria-current={
                  path.startsWith("/blog") && title === "Blog"
                    ? "page"
                    : undefined
                }
              >
                {title}
              </a>
            ))}
          </nav>
          <button
            onClick={toggle}
            className="theme-button grid size-11 place-items-center rounded-full"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Moon size={20} weight="fill" />
            ) : (
              <Sun size={22} />
            )}
          </button>
          <button
            ref={menuButton}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={25} /> : <List size={25} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="shell border-t border-line pb-5 md:hidden"
        >
          {navigation.map(([title, href]) => (
            <a
              key={title}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between border-b border-line text-base"
            >
              {title}
              <ArrowUpRight size={16} className="text-muted" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
