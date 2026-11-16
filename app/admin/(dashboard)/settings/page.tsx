"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";
import { SiteSettings } from "@/lib/types";

type SettingsForm = Omit<SiteSettings, "id" | "updated_at">;

const EMPTY: SettingsForm = {
  full_name: "",
  headline: "",
  bio: "",
  about_text: "",
  email: "",
  phone: "",
  location: "",
  resume_url: "",
  avatar_url: "",
  github_url: "",
  linkedin_url: "",
  twitter_url: "",
  instagram_url: "",
  facebook_url: "",
  tiktok_url: "",
  youtube_url: "",
  accent_color: "56 189 248",
  seo_title: "",
  seo_description: "",
};

const PRESETS = [
  { name: "Sky", value: "56 189 248" },
  { name: "Violet", value: "139 92 246" },
  { name: "Emerald", value: "16 185 129" },
  { name: "Rose", value: "244 63 94" },
  { name: "Amber", value: "245 158 11" },
];

export default function SettingsAdmin() {
  const [form, setForm] = useState<SettingsForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (data) {
        const { id: _id, updated_at: _u, ...rest } = data;
        setForm({ ...EMPTY, ...rest } as SettingsForm);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq("id", 1);
    setSaving(false);
    setMsg(error ? error.message : "Saved ✓ — refresh your website to see changes.");
  }

  if (loading) {
    return <p className="text-slate-500">Loading settings…</p>;
  }

  const set = (key: keyof SettingsForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const socialFields = [
    ["github_url", "GitHub"],
    ["linkedin_url", "LinkedIn"],
    ["twitter_url", "Twitter / X"],
    ["instagram_url", "Instagram"],
    ["facebook_url", "Facebook"],
    ["tiktok_url", "TikTok"],
    ["youtube_url", "YouTube"],
  ] as const;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-white">Site Settings</h1>
      <form onSubmit={handleSave} className="space-y-8">
        <section className="card space-y-4">
          <h2 className="font-semibold text-white">Profile</h2>
          <ImageUpload
            label="Profile Photo"
            value={form.avatar_url}
            onChange={(url) => set("avatar_url", url)}
          />
          <div>
            <label className="label">Full Name *</label>
            <input
              required
              className="input"
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Headline</label>
            <input
              className="input"
              placeholder="Full Stack Developer"
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Short Bio (hero section)</label>
            <textarea
              rows={2}
              className="input"
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />
          </div>
          <div>
            <label className="label">About Me Text</label>
            <textarea
              rows={5}
              className="input"
              value={form.about_text}
              onChange={(e) => set("about_text", e.target.value)}
            />
          </div>
        </section>

        <section className="card space-y-4">
          <h2 className="font-semibold text-white">Contact</h2>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Phone</label>
              <input
                className="input"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Location</label>
              <input
                className="input"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Resume URL (Google Drive / Dropbox link)</label>
            <input
              className="input"
              value={form.resume_url}
              onChange={(e) => set("resume_url", e.target.value)}
            />
          </div>
        </section>

        <section className="card space-y-4">
          <h2 className="font-semibold text-white">Social Links</h2>
          {socialFields.map(([key, label]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                type="url"
                className="input"
                placeholder={`https://.../${label.toLowerCase()}`}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}
          <p className="text-xs text-slate-500">
            Leave a field empty to show its icon as inactive. Add a profile URL to make it clickable.
          </p>
        </section>

        <section className="card space-y-4">
          <h2 className="font-semibold text-white">Appearance & SEO</h2>
          <div>
            <label className="label">Accent Color</label>
            <div className="flex flex-wrap items-center gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => set("accent_color", p.value)}
                  className={`h-9 w-9 rounded-full border-2 ${
                    form.accent_color === p.value
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: `rgb(${p.value})` }}
                  title={p.name}
                />
              ))}
            </div>
            <input
              className="input mt-3 !w-40"
              value={form.accent_color}
              onChange={(e) => set("accent_color", e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              RGB triplet, e.g. <code>56 189 248</code>
            </p>
          </div>
          <div>
            <label className="label">SEO Title</label>
            <input
              className="input"
              value={form.seo_title}
              onChange={(e) => set("seo_title", e.target.value)}
            />
          </div>
          <div>
            <label className="label">SEO Description</label>
            <textarea
              rows={2}
              className="input"
              value={form.seo_description}
              onChange={(e) => set("seo_description", e.target.value)}
            />
          </div>
        </section>

        {msg && <p className="text-sm text-slate-400">{msg}</p>}
        <button type="submit" disabled={saving} className="btn disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
