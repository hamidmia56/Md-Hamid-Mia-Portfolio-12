import { Testimonial } from "@/lib/types";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section id="testimonials" className="section">
      <h2 className="section-title">
        Kind <span>Words</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((t) => (
          <figure key={t.id} className="card">
            <blockquote className="mb-4 text-slate-300">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-semibold text-white">{t.name}</span>
              {t.role && <span className="text-slate-500"> · {t.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
