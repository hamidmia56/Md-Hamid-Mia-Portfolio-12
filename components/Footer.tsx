import { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} {settings.full_name}. All rights
        reserved.
      </p>
      <a href="/admin" className="mt-2 inline-block hover:text-accent">
        Admin Login
      </a>
    </footer>
  );
}
