import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

export function TextLink({ href, children, external = false, className = "", ...props }) {
  return (
    <a
      href={href}
      className={`text-link ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
    </a>
  );
}
