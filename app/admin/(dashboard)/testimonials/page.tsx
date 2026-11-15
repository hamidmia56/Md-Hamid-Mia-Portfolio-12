"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Testimonial } from "@/lib/types";

const EMPTY = { name: "", role: "", quote: "", sort_order: 0 };

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order");
    setItems((data as Testimonial[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const supabase = createClient();
    const { error } = editingId
      ? await supabase.from("testimonials").update(form).eq("id", editingId)
      : await supabase.from("testimonials").insert(form);
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
    if (!confirm("Delete this testimonial?")) return;
    await createClient().from("testimonials").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Testimonials</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSave} className="card space-y-4">
          <h2 className="font-semibold text-white">
            {editingId ? "Edit Testimonial" : "Add New Testimonial"}
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
            <label className="label">Role / Company</label>
            <input
              className="input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Quote</label>
            <textarea
              rows={3}
              className="input"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
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
              {editingId ? "Update" : "Add Testimonial"}
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
            <p className="text-slate-500">No testimonials yet.</p>
          )}
          {items.map((t) => (
            <div key={t.id} className="card">
              <p className="mb-2 text-sm text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  <span className="font-medium text-white">{t.name}</span>
                  {t.role && (
                    <span className="text-slate-500"> · {t.role}</span>
                  )}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(t.id);
                      setForm({
                        name: t.name,
                        role: t.role,
                        quote: t.quote,
                        sort_order: t.sort_order,
                      });
                    }}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
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
