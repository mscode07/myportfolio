import { posts } from "./posts.js";

// Shared by browser rendering and the build-time HTML generator.
export function routeMeta(path) {
  const post = posts.find((p) => path === `/blog/${p.slug}/`);
  if (post)
    return {
      title: `${post.title} — mscode07`,
      description: post.excerpt,
      noindex: post.sample,
    };
  if (path === "/blog/")
    return {
      title: "Writing — mscode07",
      description:
        "Notes on building products, writing code, and sharing the process.",
    };
  if (path === "/about/" || path === "/resume/")
    return {
      title: `${path === "/about/" ? "About" : "Resume"} — mscode07`,
      description:
        "Full stack developer, content creator, and host of The Underdog Show.",
    };
  return {
    title: "mscode07 — Developer & Creator",
    description:
      "I build products, share what I learn, and host The Underdog Show. Explore my work, writing, and videos.",
  };
}
export const routes = [
  "/",
  "/blog/",
  "/about/",
  "/resume/",
  ...posts.map((p) => `/blog/${p.slug}/`),
];
