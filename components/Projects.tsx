import Image from "next/image";
import { Project } from "@/lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="section">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="card flex flex-col">
            {project.image_url && (
              <Image
                src={project.image_url}
                alt={project.title}
                width={600}
                height={340}
                className="mb-4 h-44 w-full rounded-lg object-cover"
              />
            )}
            <h3 className="mb-2 text-lg font-semibold text-white">
              {project.title}
              {project.featured && (
                <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                  Featured
                </span>
              )}
            </h3>
            <p className="mb-4 flex-1 text-sm text-slate-400">
              {project.description}
            </p>
            {project.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-4 text-sm">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-accent"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
