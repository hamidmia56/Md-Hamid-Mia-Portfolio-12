"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";
import { Project } from "@/lib/types";

const EMPTY: Omit<Project, "id"> = {
  title: "",
  description: "",
  image_url: "",
  tags: [],
  live_url: "",
  repo_url: "",
  featured: false,
  sort_order: 0,
};

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    setItems((data as Project[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const supabase = createClient();
    const payload = { ...form, tags: form.tags };
    const { error } = editingId
      ? await supabase.from("projects").update(payload).eq("id", editingId)
      : await supabase.from("projects").insert(payload);
    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setForm(EMPTY);
    setEditingId(null);
    setMsg("Saved ✓");
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    await createClient().from("projects").delete().eq("id", id);
    load();
  }

  function handleEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      tags: p.tags ?? [],
      live_url: p.live_url,
      repo_url: p.repo_url,
      featured: p.featured,
      sort_order: p.sort_order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Projects</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSave} className="card space-y-4">
          <h2 className="font-semibold text-white">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>
          <div>
            <label className="label">Title *</label>
            <input
              required
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              rows={3}
              className="input"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <ImageUpload
            label="Project Image"
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
          />
          <div>
            <label className="label">Tags (comma separated)</label>
            <input
              className="input"
              placeholder="React, Supabase"
              value={form.tags.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Live URL</label>
              <input
                className="input"
                value={form.live_url}
                onChange={(e) =>
                  setForm({ ...form, live_url: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label">Repo URL</label>
              <input
                className="input"
                value={form.repo_url}
                onChange={(e) =>
                  setForm({ ...form, repo_url: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured
            </label>
            <div>
              <label className="label">Sort Order</label>
              <input
                type="number"
                className="input !w-24"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: Number(e.target.value) })
                }
              />
            </div>
          </div>
          {msg && <p className="text-sm text-slate-400">{msg}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Update" : "Add Project"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY);
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {items.length === 0 && (
            <p className="text-slate-500">No projects yet. Add your first one.</p>
          )}
          {items.map((p) => (
            <div key={p.id} className="card flex items-center gap-4">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="h-14 w-20 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-800 text-xl">
                  🚀
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">
                  {p.title}
                  {p.featured && (
                    <span className="ml-2 text-xs text-accent">★</span>
                  )}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {p.tags?.join(", ")}
                </p>
              </div>
              <button
                onClick={() => handleEdit(p)}
                className="text-sm text-accent hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-sm text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
