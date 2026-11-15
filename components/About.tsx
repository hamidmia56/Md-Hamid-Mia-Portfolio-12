import { SiteSettings } from "@/lib/types";

export default function About({ settings }: { settings: SiteSettings }) {
  const facts = [
    settings.location ? { label: "Location", value: settings.location } : null,
    settings.email ? { label: "Email", value: settings.email } : null,
    settings.phone ? { label: "Phone", value: settings.phone } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section id="about" className="section">
      <h2 className="section-title">
        About <span>Me</span>
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="whitespace-pre-line leading-relaxed text-slate-400">
            {settings.about_text}
          </p>
        </div>
        <div className="card space-y-3">
          {facts.map((f) => (
            <div key={f.label}>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {f.label}
              </p>
              <p className="text-slate-200">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
