import { PostList } from "../components/PostList.jsx";

export function BlogIndex() {
  return (
    <section className="min-h-[70vh] py-14 sm:py-20">
      <p className="eyebrow">The blog</p>
      <h1 className="page-title mt-5">Notes from the journey.</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        On building products, writing code, and sharing the process.
      </p>
      <p className="mt-8 text-sm text-muted">
        These sample articles preview the reading experience. Original posts are
        on the way.
      </p>
      <div className="mt-10 border-t border-line">
        <PostList all />
      </div>
    </section>
  );
}
