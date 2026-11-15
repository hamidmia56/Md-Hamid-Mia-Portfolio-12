"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skill } from "@/lib/types";

const EMPTY = { name: "", category: "", level: 80, sort_order: 0 };

export default function SkillsAdmin() {
  const [items, setItems] = useState<Skill[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order");
    setItems((data as Skill[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const supabase = createClient();
    const payload = { ...form, category: form.category || "Other" };
    const { error } = editingId
      ? await supabase.from("skills").update(payload).eq("id", editingId)
      : await supabase.from("skills").insert(payload);
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
    if (!confirm("Delete this skill?")) return;
    await createClient().from("skills").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Skills</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSave} className="card space-y-4">
          <h2 className="font-semibold text-white">
            {editingId ? "Edit Skill" : "Add New Skill"}
          </h2>
          <div>
            <label className="label">Name *</label>
            <input
              required
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Category</label>
            <input
              className="input"
              placeholder="Frontend, Backend, Languages…"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div>
            <label className="label">
              Level: {form.level}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.level}
              onChange={(e) =>
                setForm({ ...form, level: Number(e.target.value) })
              }
              className="w-full accent-[rgb(var(--accent))]"
            />
          </div>
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
          {msg && <p className="text-sm text-slate-400">{msg}</p>}
          <div className="flex gap-3">
            <button type="submit" className="btn">
              {editingId ? "Update" : "Add Skill"}
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

        <div className="space-y-3">
          {items.length === 0 && (
            <p className="text-slate-500">No skills yet.</p>
          )}
          {items.map((s) => (
            <div key={s.id} className="card flex items-center gap-4 !py-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">
                  {s.name}{" "}
                  <span className="text-xs text-slate-500">{s.category}</span>
                </p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div
                    className="h-1.5 rounded-full bg-accent"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingId(s.id);
                  setForm({
                    name: s.name,
                    category: s.category,
                    level: s.level,
                    sort_order: s.sort_order,
                  });
                }}
                className="text-sm text-accent hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
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
