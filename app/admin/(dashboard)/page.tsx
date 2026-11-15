"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    unread: 0,
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [projects, skills, experience, messages] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("skills").select("id", { count: "exact", head: true }),
        supabase.from("experience").select("id", { count: "exact", head: true }),
        supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("is_read", false),
      ]);
      setStats({
        projects: projects.count ?? 0,
        skills: skills.count ?? 0,
        experience: experience.count ?? 0,
        unread: messages.count ?? 0,
      });
    }
    load();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects, href: "/admin/projects", icon: "🚀" },
    { label: "Skills", value: stats.skills, href: "/admin/skills", icon: "⚡" },
    { label: "Experience", value: stats.experience, href: "/admin/experience", icon: "💼" },
    { label: "Unread Messages", value: stats.unread, href: "/admin/messages", icon: "📬" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card hover:border-accent/50">
            <p className="text-3xl">{c.icon}</p>
            <p className="mt-2 text-3xl font-bold text-white">{c.value}</p>
            <p className="text-sm text-slate-400">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="card mt-8">
        <h2 className="mb-2 font-semibold text-white">Quick Start</h2>
        <ol className="list-inside list-decimal space-y-1 text-sm text-slate-400">
          <li>
            Go to <Link href="/admin/settings" className="text-accent hover:underline">Settings</Link> and fill in your name, bio and social links.
          </li>
          <li>
            Add your work under <Link href="/admin/projects" className="text-accent hover:underline">Projects</Link>.
          </li>
          <li>
            Check visitor messages under <Link href="/admin/messages" className="text-accent hover:underline">Messages</Link>.
          </li>
        </ol>
      </div>
    </div>
  );
}
