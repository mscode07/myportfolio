import { ArrowLeft } from "@phosphor-icons/react";
import { TextLink } from "../components/TextLink.jsx";

export function Article({ post }) {
  const Content = post.Content;
  return (
    <article className="mx-auto max-w-3xl py-12 sm:py-20">
      <a
        href="/blog/"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        All writing
      </a>
      <p className="eyebrow mt-9">
        {post.category} <span className="px-2">/</span> {post.readingTime} read
      </p>
      <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl">
        {post.title}
      </h1>
      <p className="mt-6 text-xl leading-relaxed text-muted">{post.excerpt}</p>
      {post.sample && (
        <p className="my-8 border-l-2 border-accent py-2 pl-4 text-sm text-muted">
          Sample article — preview content, not a published personal story.
        </p>
      )}
      <div className="prose border-t border-line pt-8">
        <Content />
      </div>
      <div className="mt-12 border-t border-line pt-6">
        <TextLink href="/blog/">More writing</TextLink>
      </div>
    </article>
  );
}
