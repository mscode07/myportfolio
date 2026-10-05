import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "../projects.js";

export function ProjectList() {
  return (
    <div className="mt-6">
      {projects.map((project, index) => (
        <a
          key={project.url}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-row grid gap-4 border-b border-line py-7 last:border-0 sm:grid-cols-[2rem_1fr_auto] sm:gap-6"
          aria-label={`${project.name} (opens in a new tab)`}
        >
          <span className="pt-1 font-mono text-xs text-muted" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="eyebrow">{project.category}</p>
            <h3 className="mt-2 font-display text-4xl tracking-tight">{project.name}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            {project.technologies && (
              <p className="mt-3 text-xs leading-relaxed text-muted">{project.technologies}</p>
            )}
          </div>
          <ArrowUpRight className="project-arrow mt-1" size={23} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
