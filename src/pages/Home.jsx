import { Carousel } from "../components/Carousel.jsx";
import { TextLink } from "../components/TextLink.jsx";
import { Socials } from "../components/Socials.jsx";
import { PostList } from "../components/PostList.jsx";
import { ProjectList } from "../components/ProjectList.jsx";
import { PodcastIntro } from "../components/PodcastIntro.jsx";
import { TypingHeading } from "../components/TypingHeading.jsx";
import { site, episodes } from "../site.js";
import { posts } from "../posts.js";
import { useLatestVideos } from "../hooks/useLatestVideos.js";

export function Home() {
  const latestVideos = useLatestVideos();
  return (
    <>
      <section
        className="hero pb-16 pt-12 sm:pb-16 sm:pt-12 lg:pt-10"
        aria-labelledby="intro-title"
      >
        <div className="mb-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <img
            src="/images/portfolio-portrait.jpg"
            alt="mscode07 smiling at his developer workspace"
            width="800"
            height="800"
            className="size-40 shrink-0 rounded-2xl border border-line object-contain sm:size-52"
            fetchPriority="high"
          />
          <p className="eyebrow">
            Full stack developer <span className="px-1 text-muted">/</span>{" "}
            Content creator
          </p>
        </div>
        <TypingHeading />
        <p className="mt-6 max-w-3xl text-[clamp(1.25rem,2.45vw,2rem)] leading-[1.45] tracking-[-0.025em]">
          I build products, share what I learn,
          <br className="hidden sm:block" /> and host The Underdog Show.
        </p>
        <div className="mt-8 sm:mt-10">
          <Socials />
        </div>
      </section>
      <section
        id="work"
        className="section-space border-t border-line"
        aria-labelledby="work-title"
      >
        <p className="eyebrow">Things I’m building</p>
        <h2 id="work-title" className="section-title mt-3">
          Products & small experiments.
        </h2>
        <ProjectList />
      </section>
      <section
        id="blog"
        className="section-space border-t border-line"
        aria-labelledby="blog-title"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 id="blog-title" className="eyebrow">
              Latest from the blog
            </h2>
            {posts.every((p) => p.sample) && (
              <p className="mt-2 text-xs text-muted">
                Sample posts · a preview of the blog
              </p>
            )}
          </div>
          <TextLink href="/blog/">All posts</TextLink>
        </div>
        <PostList />
        <TextLink href={site.medium} external className="mt-6">
          Read more on Medium
        </TextLink>
      </section>
      <section
        id="videos"
        className="section-space border-t border-line"
        aria-labelledby="video-title"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">On YouTube</p>
            <h2 id="video-title" className="section-title mt-3">
              Building, learning, and sharing the process.
            </h2>
            <p className="mt-2 text-xs text-muted">
              Latest regular uploads · Shorts excluded
            </p>
          </div>
          {site.youtube && (
            <TextLink href={site.youtube} external>
              View channel
            </TextLink>
          )}
        </div>
        <Carousel items={latestVideos} label="YouTube videos" />
      </section>
      <section
        id="podcast"
        className="section-space border-t border-line"
        aria-labelledby="podcast-title"
      >
        <PodcastIntro />
        <Carousel items={episodes} label="podcast episodes" columns={2} />
      </section>
      <section
        id="about"
        className="section-space grid gap-6 border-t border-line md:grid-cols-[0.9fr_1fr] md:gap-16"
        aria-labelledby="about-title"
      >
        <div>
          <p className="eyebrow">A little about me</p>
          <h2
            id="about-title"
            className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            I’m mscode07.
          </h2>
        </div>
        <div>
          <p className="max-w-xl leading-relaxed text-muted">
            I’m a full stack developer and content creator. This is where I
            share what I build, write, and learn along the way.
          </p>
          <div className="mt-6 flex flex-wrap gap-8">
            <TextLink href="/about/">More about me</TextLink>
            <TextLink href={site.resume}>Resume</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
