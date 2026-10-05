import { FileText } from "@phosphor-icons/react";
import { TextLink } from "../components/TextLink.jsx";
import { Socials } from "../components/Socials.jsx";
import { site } from "../site.js";

export function About({ resume = false }) {
  return (
    <section className="mx-auto max-w-3xl py-14 sm:py-20">
      <p className="eyebrow">{resume ? "Resume" : "About me"}</p>
      <h1 className="page-title mt-5">mscode07.</h1>
      <p className="mt-6 text-2xl leading-relaxed">
        Full stack developer. Content creator.
        <br />
        Host of The Underdog Show.
      </p>
      <div className="prose mt-10 border-t border-line pt-8">
        <p>
          I’m a full stack software engineer focused on AI SaaS products.
          I build with Next.js, TypeScript, Hono, Cloudflare Workers, and
          PostgreSQL, taking products from architecture through deployment.
        </p>
        <p>
          Alongside building software, I share the process on X, make videos,
          and have conversations with builders and creators on The Underdog
          Show.
        </p>
        <h2>What I work with</h2>
        <p>
          React · Next.js · TypeScript · Hono · Cloudflare Workers · PostgreSQL ·
          Supabase · Drizzle ORM · Prisma · Docker · AWS
        </p>
        {resume && (
          <>
            <h2>Experience</h2>
            <h3>Software Developer · OnMouseClick</h3>
            <p>
              Developed full-stack applications with React, Next.js, and Node.js.
              Worked with clients from development through deployment, resolved
              production issues, and delivered new features.
            </p>
            <h2>Selected projects</h2>
            <h3>bot4U · AI SaaS platform</h3>
            <p>Built and launched website-trained AI chatbots for businesses,
              reaching 600+ registered users through launches, technical content,
              and community outreach.</p>
            <h3>CodeINN · AI website builder</h3>
            <p>Built a platform that turns text prompts into websites using
              Next.js, Supabase, Prisma, and NextAuth.</p>
            <h3>ProjectX · Social media platform</h3>
            <p>Built a Twitter-inspired platform with a Turborepo architecture,
              PostgreSQL, Docker, and GitHub Actions for CI/CD.</p>
            <h2>Education</h2>
            <h3>Kurukshetra University</h3>
            <p>Bachelor’s Degree in Computer Applications · 2020–2023</p>
          </>
        )}
        <h2>Say hello</h2>
        <p>
          Have a project, a question, or a story worth sharing?{" "}
          <a href={`mailto:${site.email}`}>Get in touch.</a>
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-6">
        {!resume && <TextLink href="/resume/">View resume</TextLink>}
        {resume && (
          <button
            className="text-link print:hidden"
            onClick={() => window.print()}
          >
            Print / save PDF <FileText size={17} />
          </button>
        )}
        <Socials />
      </div>
    </section>
  );
}
