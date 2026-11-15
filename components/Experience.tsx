import { Experience } from "@/lib/types";

export default function ExperienceSection({
  items,
}: {
  items: Experience[];
}) {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="section">
      <h2 className="section-title">
        Work <span>Experience</span>
      </h2>
      <div className="space-y-6 border-l-2 border-slate-800 pl-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-slate-950" />
            <div className="card">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-white">
                  {item.role}
                  {item.company && (
                    <span className="text-accent"> · {item.company}</span>
                  )}
                </h3>
                <span className="text-sm text-slate-500">
                  {item.start_date}
                  {item.start_date && (item.end_date || item.is_current)
                    ? " — "
                    : ""}
                  {item.is_current ? "Present" : item.end_date}
                </span>
              </div>
              {item.description && (
                <p className="whitespace-pre-line text-sm text-slate-400">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
