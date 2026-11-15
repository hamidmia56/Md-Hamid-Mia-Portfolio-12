"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Experience } from "@/lib/types";

const EMPTY = {
  role: "",
  company: "",
  description: "",
  start_date: "",
  end_date: "",
  is_current: false,
  sort_order: 0,
};

export default function ExperienceAdmin() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order");
    setItems((data as Experience[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const supabase = createClient();
    const { error } = editingId
      ? await supabase.from("experience").update(form).eq("id", editingId)
      : await supabase.from("experience").insert(form);
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
    if (!confirm("Delete this entry?")) return;
    await createClient().from("experience").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Work Experience</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSave} className="card space-y-4">
          <h2 className="font-semibold text-white">
            {editingId ? "Edit Entry" : "Add New Entry"}
          </h2>
          <div>
            <label className="label">Role *</label>
            <input
              required
              className="input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Company</label>
            <input
              className="input"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Start (e.g. Jan 2023)</label>
              <input
                className="input"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label">End</label>
              <input
                className="input"
                disabled={form.is_current}
                value={form.is_current ? "" : form.end_date}
                onChange={(e) =>
                  setForm({ ...form, end_date: e.target.value })
                }
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.is_current}
              onChange={(e) =>
                setForm({ ...form, is_current: e.target.checked })
              }
            />
            I currently work here
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
          {msg && <p className="text-sm text-slate-400">{msg}</p>}
          <div className="flex gap-3">
            <button type="submit" className="btn">
              {editingId ? "Update" : "Add Entry"}
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
            <p className="text-slate-500">No experience entries yet.</p>
          )}
          {items.map((x) => (
            <div key={x.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">
                    {x.role}
                    {x.company && (
                      <span className="text-accent"> · {x.company}</span>
                    )}
                  </p>
                  <p className="text-sm text-slate-500">
                    {x.start_date}
                    {x.start_date && (x.end_date || x.is_current) ? " — " : ""}
                    {x.is_current ? "Present" : x.end_date}
                  </p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button
                    onClick={() => {
                      setEditingId(x.id);
                      setForm({
                        role: x.role,
                        company: x.company,
                        description: x.description,
                        start_date: x.start_date,
                        end_date: x.end_date,
                        is_current: x.is_current,
                        sort_order: x.sort_order,
                      });
                    }}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(x.id)}
                    className="text-sm text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
