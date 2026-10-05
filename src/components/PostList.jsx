import { ArrowRight } from "@phosphor-icons/react";
import { posts } from "../posts.js";

export function PostList({ all = false }) {
  return (
    <div className="mt-6">
      {posts.slice(0, all ? undefined : 3).map((post) => (
        <a
          href={`/blog/${post.slug}/`}
          key={post.slug}
          className="article-row group grid gap-2 border-b border-line py-6 last:border-0 md:grid-cols-[1.15fr_1fr_auto] md:items-center md:gap-10"
        >
          <h3 className="font-display text-[1.75rem] font-bold leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
          <span className="mt-2 inline-flex w-fit items-center gap-2 text-sm md:mt-0">
            <span className="underline decoration-accent decoration-2 underline-offset-8">
              Read article
            </span>
            <ArrowRight size={15} />
          </span>
        </a>
      ))}
    </div>
  );
}
