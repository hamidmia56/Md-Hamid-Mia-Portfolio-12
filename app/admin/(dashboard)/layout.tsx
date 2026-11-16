"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/projects", label: "Projects", icon: "🚀" },
  { href: "/admin/skills", label: "Skills", icon: "⚡" },
  { href: "/admin/experience", label: "Experience", icon: "💼" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
  { href: "/admin/messages", label: "Messages", icon: "📬" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) setEmail(data.user.email ?? "");
    });
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen min-w-0 md:flex">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:hidden">
        <p className="font-bold text-white">Portfolio Admin</p>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xl text-white"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-200 md:sticky md:top-0 md:z-10 md:h-screen md:w-60 md:max-w-none md:translate-x-0 md:shadow-none ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-800 px-5 py-5">
          <p className="font-bold text-white">Portfolio Admin</p>
          {email && <p className="mt-1 truncate text-xs text-slate-500">{email}</p>}
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-slate-800 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <span>🌐</span> View Website
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>

      <main className="min-w-0 w-full overflow-x-hidden p-4 sm:p-6 md:flex-1 md:p-8">
        {children}
      </main>
    </div>
  );
}
