import Image from "next/image";
import { SiteSettings } from "@/lib/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  const socials = [
    { url: settings.github_url, label: "GitHub" },
    { url: settings.linkedin_url, label: "LinkedIn" },
    { url: settings.twitter_url, label: "Twitter" },
    { url: settings.instagram_url, label: "Instagram" },
  ].filter((s) => s.url);

  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {settings.avatar_url && (
          <Image
            src={settings.avatar_url}
            alt={settings.full_name}
            width={120}
            height={120}
            priority
            className="mb-8 h-28 w-28 rounded-full border-2 border-accent object-cover"
          />
        )}

        <p className="mb-3 text-accent">Hello, I&apos;m</p>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-6xl">
          {settings.full_name}
        </h1>
        <h2 className="mb-6 text-xl text-slate-400 sm:text-2xl">
          {settings.headline}
        </h2>
        <p className="mb-8 max-w-xl text-slate-400">{settings.bio}</p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn">
            View My Work
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </div>

        {socials.length > 0 && (
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-400 transition hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
