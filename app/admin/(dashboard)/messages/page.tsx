"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Message } from "@/lib/types";

export default function MessagesAdmin() {
  const [items, setItems] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [openId, setOpenId] = useState<number | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as Message[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(m: Message) {
    await createClient()
      .from("messages")
      .update({ is_read: !m.is_read })
      .eq("id", m.id);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this message?")) return;
    await createClient().from("messages").delete().eq("id", id);
    load();
  }

  const visible =
    filter === "unread" ? items.filter((m) => !m.is_read) : items;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <div className="flex gap-2">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm capitalize transition ${
                filter === f
                  ? "bg-accent/10 text-accent"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visible.length === 0 && (
          <p className="text-slate-500">No messages here yet.</p>
        )}
        {visible.map((m) => (
          <div
            key={m.id}
            className={`card cursor-pointer ${!m.is_read ? "border-accent/40" : ""}`}
            onClick={() => {
              setOpenId(openId === m.id ? null : m.id);
              if (!m.is_read) toggleRead(m);
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-white">
                  {!m.is_read && (
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
                  )}
                  {m.subject || "(no subject)"}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {m.name} · {m.email}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-slate-500">
                  {new Date(m.created_at).toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(m.id);
                  }}
                  className="text-sm text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            {openId === m.id && (
              <p className="mt-4 whitespace-pre-line border-t border-slate-800 pt-4 text-sm text-slate-300">
                {m.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
