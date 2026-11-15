import { Skill } from "@/lib/types";

export default function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">
        My <span>Skills</span>
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category} className="card">
            <h3 className="mb-4 font-semibold text-white">{category}</h3>
            <div className="space-y-4">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <div key={skill.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
