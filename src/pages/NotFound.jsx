import { TextLink } from "../components/TextLink.jsx";

export function NotFound() {
  return (
    <section className="min-h-[65vh] py-20">
      <p className="eyebrow">404</p>
      <h1 className="page-title mt-4">This page wandered off.</h1>
      <p className="my-6 text-muted">Let’s get you back to the good stuff.</p>
      <TextLink href="/">Back home</TextLink>
    </section>
  );
}
