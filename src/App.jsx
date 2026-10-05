import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import { BlogIndex } from "./pages/BlogIndex.jsx";
import { Article } from "./pages/Article.jsx";
import { About } from "./pages/About.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { posts } from "./posts.js";

function PageContent({ path }) {
  if (path === "/") return <Home />;
  if (path === "/blog/") return <BlogIndex />;
  if (path === "/about/") return <About />;
  if (path === "/resume/") return <About resume />;

  const post = posts.find((post) => path === `/blog/${post.slug}/`);
  return post ? <Article post={post} /> : <NotFound />;
}

export function App({ path: requestedPath }) {
  // Explicit paths are supplied by prerendering; browser visits use the URL.
  const pathname =
    requestedPath ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" className="shell" tabIndex={-1}>
        <PageContent path={path} />
¸      </main>
      <Footer />
    </>
  );
}
