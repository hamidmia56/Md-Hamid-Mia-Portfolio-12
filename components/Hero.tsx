import Image from "next/image";
import { SiteSettings, SocialLink } from "@/lib/types";

type SocialPlatform =
  | "facebook"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "telegram"
  | "custom";

function SocialIcon({ social }: { social: SocialLink }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "currentColor",
    "aria-hidden": true as const,
  };

  if (social.platform === "custom" && social.icon_url) {
    return <img src={social.icon_url} alt="" className="h-5 w-5 object-contain" />;
  }

  switch (social.platform as SocialPlatform) {
    case "facebook":
      return <svg {...common}><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" /></svg>;
    case "youtube":
      return <svg {...common}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>;
    case "tiktok":
      return <svg {...common}><path d="M19.6 7.1a5.7 5.7 0 0 1-3.5-1.2v8.2a5.9 5.9 0 1 1-5.1-5.8v3.1a2.9 2.9 0 1 0 2.1 2.8V2.5h3.1c.2 2 1.5 3.6 3.4 4.1v.5Z" /></svg>;
    case "whatsapp":
      return <svg {...common}><path d="M12.04 2a9.93 9.93 0 0 0-8.55 15l-1.3 4.75 4.86-1.27A9.94 9.94 0 1 0 12.04 2Zm0 18.1a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-2.88.75.77-2.8-.2-.31a8.15 8.15 0 1 1 6.75 3.67Zm4.47-6.1c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg>;
    case "instagram":
      return <svg {...common}><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 3.1a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2.2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5-3.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" /></svg>;
    case "twitter":
      return <svg {...common}><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.4 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" /></svg>;
    case "linkedin":
      return <svg {...common}><path d="M5.2 3.3a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM3.5 8.5h3.4v12H3.5v-12Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1v7.1h-3.4v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.4H9v-12Z" /></svg>;
    case "telegram":
      return <svg {...common}><path d="M21.8 4.2 18.6 20c-.2 1.1-.8 1.4-1.7.9l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.8 8.8-8c.4-.4-.1-.6-.6-.2L6.6 14.1 2 12.7c-1-.3-1-1 .2-1.5L20.1 4.3c.8-.3 1.5.2 1.7-.1Z" /></svg>;
    case "custom":
    default:
      return <svg {...common}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v5.5l4 2.4 1-1.7-3-1.8V7h-2Z" /></svg>;
  }
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  const socials = settings.social_links ?? [];

  const socialButtonClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-300 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-accent hover:bg-slate-800 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <section id="home" className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {settings.avatar_url && (
          <Image src={settings.avatar_url} alt={settings.full_name} width={120} height={120} priority className="mb-8 h-28 w-28 rounded-full border-2 border-accent object-cover" />
        )}
        <p className="mb-3 text-accent">Hello, I&apos;m</p>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-6xl">{settings.full_name}</h1>
        <h2 className="mb-6 text-xl text-slate-400 sm:text-2xl">{settings.headline}</h2>
        <p className="mb-8 max-w-xl text-slate-400">{settings.bio}</p>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn">View My Work</a>
          <a href="#contact" className="btn-outline">Contact Me</a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3" aria-label="Social media links">
          {socials.map((social) =>
            social.url ? (
              <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} className={socialButtonClass}>
                <SocialIcon social={social} />
              </a>
            ) : (
              <span key={social.id} aria-label={`${social.label} link not added yet`} title={`Add ${social.label} URL in Admin → Site Settings`} aria-disabled="true" className={`${socialButtonClass} cursor-not-allowed opacity-40 hover:translate-y-0 hover:border-slate-700 hover:bg-slate-900/70 hover:text-slate-300`}>
                <SocialIcon social={social} />
              </span>
            ),
          )}
        </div>
        <p className="mt-3 text-xs text-slate-500">Manage your social icons from Admin → Site Settings → Social Links.</p>
      </div>
    </section>
  );
}
